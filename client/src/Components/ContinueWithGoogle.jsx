import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode'; // Fixed the import
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ContinueWithGoogle = () => {
  const navigate = useNavigate();
  const { LoginWithGoogle } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential; // Ensure token exists
      if (!token) {
        throw new Error("Google login failed: No token received.");
      }

      const decoded = jwtDecode(token); // Decode the token
      const { sub: googleId, name, email, picture } = decoded; // Extract details

      await LoginWithGoogle(googleId, name, email, picture);
      toast.success("Login Successful");
      navigate('/home');
    } catch (error) {
      console.error("Google login error:", error.message);
      toast.error("Login Failed");
    }
  };

  const handleError = () => {
    toast.error("Login Failed");
    console.log("Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default ContinueWithGoogle;
