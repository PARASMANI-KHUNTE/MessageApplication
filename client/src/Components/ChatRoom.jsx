import { useState } from "react";

const ChatRoom = () => {

    const [message, setMessage] = useState("");
  return (
    <div className="flex flex-col w-full max-w-lg mx-auto border rounded-lg shadow-md bg-white">
      {/* Navbar */}
      <div className="flex items-center p-4 bg-gray-100 border-b">
       
          <>
            <img
              src={"https://via.placeholder.com/40"}
              alt="Receiver"
              className="w-10 h-10 rounded-full mr-4"
            />
            <h1 className="text-lg font-semibold">{"Receiver"}</h1>
          </>
    
      </div>

      {/* Message box */}
      <div className="flex-1 p-4 overflow-y-auto" style={{ height: "300px" }}>
        
          <div>
            <p className="text-sm">fghjm</p>
            <span className="text-xs text-gray-500 block mt-1">
              {"Unknown"}
            </span>
          </div>
        
      </div>

      {/* Input box */}
      <div className="flex p-4 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-lg p-2 mr-2"
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;