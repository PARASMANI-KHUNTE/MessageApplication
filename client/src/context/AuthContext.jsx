import { createContext , useState ,useContext, useEffect} from "react";
const AuthContext = createContext();
import axios from "axios";
import {jwtDecode} from 'jwt-decode'
const baseurl = import.meta.env.VITE_API_BASE_URL;
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    id : null,
    email : null,
  });

  const handleSignup = async (name,email,mobile,password)=>{
    try {
      const response =await axios.post(`${baseurl}/api/auth/signup`,{name,email,mobile,password})
       if(response.status === 200){
        handleLogin(email,password)
       }
    } catch (error) {
      console.error("SignUp failed:", error);
      throw error;
    }
  }


const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${baseurl}/api/auth/login`, { email, password });
    
    if (response.status === 200) {
      const { token } = response.data;
      
      // Decode the JWT to extract the payload
      const decoded = jwtDecode(token);
      
      // Store token in localStorage for persistence
      localStorage.setItem("authToken", token);
      
      // Update auth state
      setAuthState({
        isAuthenticated: true,
        user: decoded.name, // Assuming 'name' is part of the decoded payload
        token: token,
        id: decoded.id, // Assuming 'id' is part of the decoded payload
        email: email,
      });
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      id : null,
      email : null
    });
  };

  const validateToken = async (token) => {
    try {
      // Send the token to the server for verification
      const response = await axios.post(`${baseurl}/api/auth/verify-token`, { token });
  
      // Check if the response status is 200 and token is valid
      if (response.status === 200 && response.data.isValid) {
        // Update authentication state with the user and payload from response
        const { payload } = response.data;
  
        setAuthState({
          isAuthenticated: true,
          user: payload.payload.name,  // Accessing nested payload
          token: token,  // Store the token in state
          id: payload.payload.id,  // Accessing nested payload
          email: payload.payload.email,  // Accessing nested payload
        });
      } else {
        // If the token is invalid or unauthorized, log out
        handleLogout();
      }
    } catch (error) {
      // If an error occurs (e.g., token verification fails), log out
      handleLogout();
    }
  };
  

 

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) validateToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ authState,signup: handleSignup,  login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
