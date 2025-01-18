import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    userProfilePicUrl: " ", // Placeholder image
  });
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    // If the user is not authenticated or the token is not present
    if (!authState.isAuthenticated || !token) {
      navigate("/login");
    } else {
      setLoading(true);
      try {
        const decoded = jwtDecode(token);
   
        setUserDetails({
          userName: decoded.name,
          userEmail: decoded.email,
          userProfilePicUrl: decoded.ProfileUrl || "https://via.placeholder.com/100", // Fallback image
        });
      } catch (error) {
        toast.error("Invalid token. Please log in again.");
        navigate("/login");
      }
      setLoading(false);
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
                  onError={(e) => e.target.src = "https://via.placeholder.com/100"} // Fallback on error
                />

              <div>
                {/* User Info */}
                <p className="text-xl font-semibold text-gray-800">{userDetails.userName}</p>
                <p className="text-gray-500">{userDetails.userEmail}</p>
                {/* <button
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-2"
                  aria-label="Edit Profile"
                >
                  <i className="fas fa-edit mr-2"></i>Edit Profile
                </button> */}
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
