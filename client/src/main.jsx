import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { HelpProvider } from './context/HelpContext.jsx';
import { ToastContainer } from 'react-toastify';  // Import the ToastContainer
import 'react-toastify/dist/ReactToastify.css';   
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <HelpProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
        <ToastContainer />  {/* Place ToastContainer here */}
      </HelpProvider>
    </AuthProvider>
  </StrictMode>
);
