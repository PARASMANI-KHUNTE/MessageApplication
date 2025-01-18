import { BrowserRouter as Router , Routes , Route } from "react-router-dom"

import Home from "./Pages/Home"
import About from "./Pages/About"
import Profile from "./Pages/Profile"
import Login from "./Pages/Login"
import Help from "./Pages/Help"
import OtpVeification from "./Pages/OtpVeification"
import ResetPassword from "./Pages/ResetPassword"
import Signup from "./Pages/Signup"
import Linkify from "./Pages/Linkify"
import Chats from "./Pages/Chats"
import ChatApp from './Components/ChatApp'
const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/help" element={<Help />}/>
        <Route path="/OtpVeification" element={<OtpVeification />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/home" element={<Linkify />}/>
        <Route path="/Chats" element={<Chats />}/>
        <Route path="/ChatApp" element={<ChatApp />}/>
      </Routes>
    </Router>
  )
}

export default App