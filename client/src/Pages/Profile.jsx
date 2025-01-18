import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
const baseurl = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    userProfilePicUrl: "https://via.placeholder.com/100", // Placeholder image
  });
  const [loading, setLoading] = useState(true);

  // Fetch user details from the server
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/api/user/${authState.id}`);
      
      if (response.status === 200) {
        const { name, email, ProfileUrl } = response.data; // Extract the fields from the response
        setUserDetails({
          userName: name,
          userEmail: email,
          userProfilePicUrl: ProfileUrl || "https://via.placeholder.com/100", // Fallback image
        });
      }
    } catch (error) {
      console.error("Failed to fetch user details", error);
      toast.error("Failed to load user details.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/login");
    } else {
      fetchUserDetails();
    }
  }, [authState.isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex gap-4 items-center justify-between border rounded p-4 mt-8 mx-4 shadow-md">
        {loading ? (
          <div className="text-center w-full py-6">
            <span className="text-lg font-semibold">Loading...</span>
          </div>
        ) : (
          <>
            <div className="flex gap-4 items-center">
              {/* Profile Picture with Fallback */}
              <img
                className="rounded-full"
                width={100}
                height={100}
                src={userDetails.userProfilePicUrl}
                alt={`${userDetails.userName}'s profile`}
              />
              <div>
                {/* User Info */}
                <p className="text-xl font-semibold text-gray-800">{userDetails.userName}</p>
                <p className="text-gray-500">{userDetails.userEmail}</p>
                <button
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-2"
                  aria-label="Edit Profile"
                >
                  <i className="fas fa-edit mr-2"></i>Edit Profile
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white rounded-lg px-4 py-2 mt-2"
              aria-label="Logout"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
