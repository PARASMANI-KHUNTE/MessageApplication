// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Nav from "../Components/Nav";

const Help = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleSubmitBtn = async (e) => {
        e.preventDefault();
        toast("Otp send to ",email)
        navigate('/OtpVeification')
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
    
<ToastContainer />
    </>
  )
}

export default Help