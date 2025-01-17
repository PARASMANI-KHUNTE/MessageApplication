import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Nav from '../Components/Nav';


const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading state to true during API call
      
      
            toast('Login successful');
            navigate('/home'); // Navigate to home page
      };
  return (
    <>
    <div className='h-screen flex flex-col '>
    <Nav />
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        
   
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
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
        <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordVisible ? 'text' : 'password'}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter your password"
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
        <button
            type="submit"
            className={`w-full px-3 py-2 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
        >
            {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="flex justify-between mt-4">
            <button
                type="button"
                className="text-blue-600"
                onClick={() => navigate('/help')}
            >
                Forgot Password
            </button>
            <button
                type="button"
                className="text-blue-600"
                onClick={() => navigate('/signup')}
            >
                New? Signup
            </button>
        </div>
    </form>
    <div className="mt-6">
        <p className="text-gray-700 mb-2">Or continue with:</p>
        <div className="flex space-x-4">
            <button
                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={()=>toast("Google Coming soon")}
            >
                Google
            </button>
            <button
                className="flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => toast('Facebook coming soon')}
            >
                Facebook
            </button>
            <button
                className="flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => toast('LinkedIn coming soon')}
            >
                LinkedIn
            </button>
        </div>
    </div>

    <ToastContainer />
</div>
    </div>
    </>
    
  )
}

export default Login