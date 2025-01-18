import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);

  const createChat = (chatData) => {
    setChats((prevChats) => [...prevChats, chatData]);
  };

  return (
    <ChatContext.Provider value={{ chats, activeUserId, setActiveUserId, createChat }}>
      {children}
    </ChatContext.Provider>
  );
};
