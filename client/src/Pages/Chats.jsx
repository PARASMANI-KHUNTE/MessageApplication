
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import ChatRoom from "../Components/ChatRoom";
import Users from "../Components/Users";
const Chats = () => {
    const Chatsid = true

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
        {/* Users Section */}
        <div className="col-span-1 border-r overflow-y-auto">
          <Users />
        </div>

        {/* ChatsRoom Section */}
        <div className="col-span-2 flex justify-center items-center">
          {Chatsid ? <ChatRoom />: <p className="text-center">No Chats Selected</p>}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Chats;