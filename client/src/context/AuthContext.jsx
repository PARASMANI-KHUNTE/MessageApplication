import { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();
const baseurl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    id: null,
    email: null,
    profileUrl: null,
    googleId: null,
  });

  const handleSignup = async (name, email, mobile, password) => {
    try {
      const response = await axios.post(`${baseurl}/api/auth/signup`, {
        name,
        email,
        mobile,
        password,
      });
      if (response.status === 200) {
        await handleLogin(email, password);
      }
    } catch (error) {
      console.error("SignUp failed:", error);
      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${baseurl}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        const decoded = jwtDecode(token); // Decode the token
        localStorage.setItem("authToken", token); // Store token

        setAuthState({
          isAuthenticated: true,
          user: decoded.name,
          token,
          id: decoded.id,
          email,
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
      id: null,
      email: null,
      profileUrl: null,
      googleId: null,
    });
  };

  // Memoize validateToken using useCallback
  const validateToken = useCallback(async (token) => {
    try {
      const response = await axios.post(`${baseurl}/api/auth/verify-token`, { token });
      if (response.status === 200 && response.data.isValid) {
        const { payload } = response.data;

        setAuthState({
          isAuthenticated: true,
          user: payload.name,
          token,
          id: payload.id,
          email: payload.email,
        });
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      handleLogout();
    }
  }, []); // Empty dependency array since validateToken doesn't rely on external variables.

  const handleGoogleLogin = async (googleId, name, email, picture) => {
    if (!googleId || !name || !email || !picture) {
      console.error("Missing required fields for Google Login");
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/api/social/GoogleLogin`, {
        googleId,
        name,
        email,
        picture,
      });

      if (response.status === 200) {
        const { authToken } = response.data;
        const decoded = jwtDecode(authToken);
      
        localStorage.setItem("authToken", authToken); // Store token

        setAuthState({
          isAuthenticated: true,
          user: decoded.name,
          token: authToken,
          id: decoded.userId,
          email: decoded.email,
          profileUrl: decoded.profileUrl,
        });
      } else {
        console.error("Invalid response from server");
        handleLogout();
      }
    } catch (error) {
      console.error("Google login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      validateToken(token); // Use memoized validateToken
    }
  }, [validateToken]); // Dependency array includes validateToken

  return (
    <AuthContext.Provider
      value={{
        authState,
        signup: handleSignup,
        login: handleLogin,
        logout: handleLogout,
        LoginWithGoogle: handleGoogleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
