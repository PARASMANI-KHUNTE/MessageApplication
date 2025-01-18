import  { useState, useEffect, useContext, createContext, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Components/Navbar";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create Context
const ChatContext = createContext();

// Chat Provider
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user
  const [chatData, setChatData] = useState(null); // Active chat details

  const updateUser = (userData) => setUser(userData);
  const updateChatData = (data) => setChatData(data);

  return (
    <ChatContext.Provider value={{ user, chatData, updateUser, updateChatData }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);

// Combined Component
const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [liveMessages, setLiveMessages] = useState([]);
  const [receiverDetails, setReceiverDetails] = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const [senderUserId , setSenderUserId] = useState({})
  const ws = useRef(null);

  const { user, chatData, updateUser, updateChatData } = useChatContext();

  // Fetch users on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const decoded = jwtDecode(token)
    setSenderUserId(decoded.userId)
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/users`);
        setUsers(response.data);
      } catch (error) {
        toast.error("Error fetching users: " + error.message);
      }
    };

    fetchUsers();
  }, []);

  // Fetch receiver details and messages when chatData changes
  useEffect(() => {
    if (!chatData) return;

    const fetchChatDetails = async () => {
      try {
        const receiverResponse = await axios.get(`${BASE_URL}/api/user/${chatData.receiverId}`);
        setReceiverDetails(receiverResponse.data);

        const messagesResponse = await axios.get(`${BASE_URL}/api/chat/${chatData.chatid}/messages`);
        setMessages(messagesResponse.data);

        const userIds = messagesResponse.data.map((msg) => msg.sender);
        const uniqueUserIds = [...new Set(userIds)];

        const userDetails = await Promise.all(
          uniqueUserIds.map((id) => axios.get(`${BASE_URL}/api/user/${id}`))
        );
        const userMap = userDetails.reduce((map, res) => ({ ...map, [res.data.id]: res.data.name }), {});
        setUsersMap(userMap);
      } catch (error) {
        console.error("Error fetching chat details: ", error);
      }
    };

    fetchChatDetails();
  }, [chatData]);

  // Establish WebSocket connection
  useEffect(() => {
    if (!chatData) return;

    const wsUrl = `ws://localhost:5000/?chatid=${chatData.chatid}&sender=${chatData.senderId}&receiver=${chatData.receiverId}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => console.log("WebSocket connection established");
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLiveMessages((prev) => [...prev, data]);
    };
    ws.current.onclose = () => console.log("WebSocket connection closed");

    return () => ws.current && ws.current.close();
  }, [chatData]);

  const handleUserClick = async (receiverId) => {

    try {
      const response = await axios.post(`${BASE_URL}/api/chat/create`, {
        senderId: senderUserId,
        receiverId,
      });
      console.log("Chat room created successfully:", response.data);
      // Continue with the rest of the logic
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };
  

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      text: message,
      sender: chatData.senderId,
      receiver: chatData.receiverId,
      timestamp: new Date().toISOString(),
    };

    ws.current.send(JSON.stringify(messageData));
    setLiveMessages((prev) => [...prev, messageData]);
    setMessage("");
  };

  // Filter users
  const filteredUsers = users.filter((u) => u.email !== user?.email && u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
     <Navbar />
   
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Application</h1>

      {!chatData ? (
        <div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 mb-4 w-full"
          />

          {filteredUsers.map((u) => (
            <div
              key={u.id}
              onClick={() => handleUserClick(u.id)}
              className="p-4 border rounded-lg cursor-pointer"
            >
              <img
                src={u.ProfileUrl || "https://dummyimage.com/40x40/cccccc/000000&text=User"}
                alt={u.name}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h2>{u.name}</h2>
              <p>{u.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-lg mx-auto border rounded-lg">
          <div className="flex items-center p-4 bg-gray-100 border-b">
            {receiverDetails && (
              <>
                <img
                  src={receiverDetails.ProfileUrl || "https://via.placeholder.com/40"}
                  alt="Receiver"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <h1 className="text-lg font-semibold">{receiverDetails.name || "Receiver"}</h1>
              </>
            )}
          </div>

          <div className="flex-1 p-4 overflow-y-auto" style={{ height: "300px" }}>
            {[...messages, ...liveMessages].map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg max-w-xs ${
                  msg.sender === chatData.senderId
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs text-gray-500 block">{usersMap[msg.sender]}</span>
              </div>
            ))}
          </div>

          <div className="flex p-4 border-t">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-lg p-2 mr-2"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
    </>
  );
};

export default function App() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
}
