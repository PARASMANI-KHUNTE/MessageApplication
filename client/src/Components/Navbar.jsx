import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <>
    <nav className="flex p-4 justify-between items-center bg-blue-600 text-white shadow-md sticky top-0 z-10">
          <div className="flex gap-3 items-center">
            <img
              className="w-10 h-10 rounded-full animate-bounce"
              src="/logo.png"
              alt="logo"
            />
         <Link className="font-bold text-xl tracking-wide" to={'/home'}>Linkify</Link>
          </div>
          <ul className="flex gap-6 font-medium">
            <li className="hover:underline">
              <Link to={'/ChatApp'}>Chats</Link>
            </li>
            <li className="hover:underline">
              <Link to={'/profile'}>Profile</Link>
            </li>
          </ul>
        </nav>
    </>
  )
}

export default Navbar