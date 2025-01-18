import { createContext, useContext, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const HelpContext = createContext();
const baseurl = import.meta.env.VITE_API_BASE_URL;

export const HelpProvider = ({ children }) => {
  const [helpState, setHelpState] = useState({
    id: null,
    email: null,
    otp: null,
    password : null
  });

  

  const handleForgotPassword = async (email) => {
    try {
      const response = await axios.post(`${baseurl}/api/auth/forgot-password`, { email });
      
      // Assuming response.data contains the token
      if (response.status === 200 && response.data.token) {
        const decoded = jwtDecode(response.data.token);
        
        // Update help state with decoded user info
        setHelpState({
          id: decoded?.userId,
          email: email,
        });
      }
    } catch (error) {
      console.error("Failed Resetting password", error);
      throw error;  // Rethrow the error after logging it
    }
  };

  const handleOtpVerification = async (userId,otp) =>{
    try {
        const response = await axios.post(`${baseurl}/api/auth/verify-otp`, { userId, otp });
        if(response.status === 200){
            return `${response.data.message}`
        }else{
            return `${response.data.message}`
        }

      
    } catch (error) {
        console.error("Failed Resetting password", error);
      throw error;
    }
  }

  const handelPasswordUpdate = async (userId,password)=>{
    try {
        const response = await axios.put(`${baseurl}/api/auth/update-password`, { userId, password });
        if(response.status === 200){
            return `${response.data.message}`
        }else{
            return `${response.data.message}`
        }

    } catch (error) {
        console.error("Failed updating password", error);
      throw error;
    }
  }



  return (
    <HelpContext.Provider value={{ helpState, forgotPassword: handleForgotPassword  , verifyOtp : handleOtpVerification , updatePassword : handelPasswordUpdate}}>
      {children}
    </HelpContext.Provider>
  );
};

export const useHelp = () => useContext(HelpContext);
