// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Nav from "../Components/Nav";

import { useHelp } from "../context/HelpContext";

const Help = () => {
    const { forgotPassword } = useHelp();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmitBtn = async (e) => {
        e.preventDefault();
        try {
            // Attempt to send OTP
            await forgotPassword(email);

            // Notify the user that OTP was sent
            toast.success(`OTP sent to ${email}`);

            // Navigate to OTP verification page
            navigate('/OtpVeification');
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed. Please check your email.");
        }
    };
  return (
    <>
     <div className='h-screen flex flex-col '>
     <Nav />
     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">Forgot Password</h1>
            <form onSubmit={handleSubmitBtn} className="bg-white p-6 rounded-lg shadow-md w-80">
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Next
                </button>
            </form>
        </div>
    </div>

    </>
  )
}

export default Help