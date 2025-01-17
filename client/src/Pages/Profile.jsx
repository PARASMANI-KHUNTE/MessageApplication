import Navbar from "../Components/Navbar"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and reset Redux state
    toast("Logged out")
    navigate('/login');
  };
    const userDetails = {
        userId : "esdaet342faca8234s2ffa",
        userName : "Parasmani Khunte",
        userEmail : "parasmanikhunte@gmail.com",
        userProfilePicUrl : "https://i.pinimg.com/736x/a6/bd/ed/a6bded5de461875640f99e303b2f8224.jpg"
      }
  return (
    <>
    <Navbar />
    <div className="flex gap-4 items-center justify-between border rounded  p-4">
            <div className="flex gap-4 items-center">
            <img className="rounded-full" width={100} src={userDetails.userProfilePicUrl} alt="Profile pic" />
            <div>
      <p>{userDetails.userName}</p>
      <p className="font-thin">{userDetails.userEmail}</p>
      <button className="fas fa-edit bg-blue-600 text-white rounded-lg p-1"> </button>
      </div>
      </div>
      <button onClick={handleLogout} className="fas fa-sign-out  bg-red-600 text-white rounded-lg p-1"></button>
    </div>
    <ToastContainer />
    </>
  )
}

export default Profile