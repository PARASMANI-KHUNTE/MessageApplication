// import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import { toast } from 'react-toastify';
import { useHelp } from "../context/HelpContext";
// const BASE_URL = "https://chat-app-server-zwfu.onrender.com";

const OtpVeification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const {helpState, verifyOtp} = useHelp()
    const handleSubmitBtn = async (e) => {
        e.preventDefault(); // Fix typo
        try {
            const userId = helpState.id;
            console.log("userId -",userId )
            await verifyOtp(userId, otp); // Call the login function from context
            toast.success("OTP Verified Successfully!")
            navigate("/reset-password"); // Redirect to a protected route on success
          } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials.");
          }
        
      
    };



    return (
        <>
        <div className='h-screen flex flex-col '>
            <Nav />

        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">Verify OTP</h1>
            <form onSubmit={handleSubmitBtn} className="bg-white p-6 rounded-lg shadow-md w-80">
                <div className="mb-4">
                    <label className="block text-gray-700">Enter OTP</label>
                    <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter 4-digit OTP"
                        maxLength="4"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Verify
                </button>
               
            </form>
        </div>
         

        </div>

           
        </>
       
    );
};

export default OtpVeification;