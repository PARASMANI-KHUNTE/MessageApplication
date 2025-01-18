import { useState ,useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
// Set the base URL for your API
import { useAuth } from "../context/AuthContext";

import {  toast } from 'react-toastify';
import Nav from '../Components/Nav';

const Signup = () => {
    const { authState } = useAuth(); 
    const { signup } = useAuth(); 
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [mobile , setMobile] = useState('');
    const [password , setpassword] = useState('');
    const [loading, setLoading] = useState(false);

       useEffect(() => {
            if (!authState.isAuthenticated) {
              navigate('/signup'); // Redirect to login if not authenticated
            }else{
                navigate('/home')
            }
          }, [authState.isAuthenticated, navigate]); // Add dependencies to avoid stale values
        
    
    const handelSignupBtn = async (e) =>{
        e.preventDefault()
        try {
            await signup(name,email,mobile,password); // Call the login function from context
            navigate("/home"); // Redirect to a protected route on success
          } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials.");
          }
          finally {
            setLoading(false); // Ensure loading state is reset
          }
        
    }

    return (
        <>
    <div className='h-screen flex flex-col '>
     <Nav />
     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handelSignupBtn} className="bg-white p-6 rounded-lg shadow-md w-80">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                        type="email"
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                        type="tel"
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="mobile"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <div className="relative">
                        <input
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                            type={passwordVisible ? 'text' : 'password'}
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Password"
                            pattern="(?=.*\d)(?=.*[A-Z]).{8,12}"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 text-gray-500"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Confirm Password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 text-gray-500"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        >
                            {confirmPasswordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button
            type="submit"
            className={`w-full px-3 py-2 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
        >
            {loading ? 'Signing up...' : 'Signup'}
        </button>
                <p className="font-extralight mt-3">Note :-  Password must contain 1 uppercase and a number</p>
            </form>
            <div className="mt-6">
                <p className="text-gray-700 mb-2">Or continue with:</p>
                <div className="flex space-x-4">
                    <button
                        className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        onClick={() => toast('Google comming soon')}
                    >
                        Google
                    </button>
                    <button
                        className="flex items-center justify-center px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400"
                        onClick={() => toast('Facebook comming soon')}
                    >
                        Facebook
                    </button>
                    <button
                        className="flex items-center justify-center px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400"
                        onClick={() => toast('LinkedIn comming soon')}
                    >
                        LinkedIn
                    </button>
                </div>
            </div>
    
        </div>
        </div>
        </>
        
    );
};

export default Signup;