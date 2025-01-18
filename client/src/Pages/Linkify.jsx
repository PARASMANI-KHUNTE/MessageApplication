import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Linkify = () => {
  const { authState } = useAuth(); // Access authState from AuthContext
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [authState.isAuthenticated, navigate]); // Add dependencies to avoid stale values

  return (
    <>
      <div>
        <Navbar />
      </div>
    </>
  );
};

export default Linkify;
