import { useEffect, useState } from "react";
import axios from "axios";
import { useChat } from "../context/ChatContext"; // Import ChatContext
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // For redirection

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { activeUserId, setActiveUserId, createChat, chats } = useChat(); // Use ChatContext
  const navigate = useNavigate(); // Hook for redirection

  // Get the logged-in user's data from localStorage with a safety check
  const userData = localStorage.getItem("user");
  let id = null;
  let email = null;

  if (userData) {
    const parsedUser = JSON.parse(userData);
    id = parsedUser?.id;
    email = parsedUser?.email;
  }

  // If user is not found in localStorage, redirect to login
  useEffect(() => {
    if (!id || !email) {
      toast.error("You are not logged in. Redirecting to login page...");
      navigate("/login"); // Redirect to login page
    }
  }, [id, email, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/users`);
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        toast.error(`Error fetching users: ${error.message}`);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (receiverId) => {
    // Check if there's already a chat with this user
    const existingChat = chats.find((chat) =>
      chat.members.includes(receiverId)
    );

    if (existingChat) {
      // If chat exists, set that as the active chat
      setActiveUserId(receiverId);
      return;
    }

    try {
      // Send request to create a chat room
      const response = await axios.post(`${BASE_URL}/api/chat/create`, {
        senderId: id,
        receiverId,
      });

      if (response.status === 200) {
        const { chatid } = response.data;
        console.log("chatid - ", chatid);

        // Dispatch the chat data to the context
        createChat({
          chatid,
          senderId: id,
          receiverId,
          message: "",
        });

        // Set active user
        setActiveUserId(receiverId);

        console.log("Chat room created successfully!");
      } else {
        toast.error("Failed to create chat room.");
      }
    } catch (error) {
      toast.error(`Error creating chat room: ${error.message}`);
      console.log(`Error creating chat room: ${error.message}`);
    }
  };

  // Filter users, excluding the logged-in user
  const filteredUsers = Array.isArray(users)
    ? users
        .filter((user) => user.email !== email)
        .filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* Users List */}
      <div className="flex flex-col gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                activeUserId === user.id ? "bg-blue-100" : "bg-white"
              }`}
              onClick={() => handleUserClick(user.id)}
            >
              <img
                src={user.ProfileUrl || "https://via.placeholder.com/150"}
                alt={user.name}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h2 className="font-bold">{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Users;
