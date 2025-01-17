import { Link } from "react-router-dom";
import Nav from "../Components/Nav";

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Nav />

        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Linkify</h1>
          <p className="text-lg mb-6">
            Connect, chat, and collaborate with your friends and teams instantly.
          </p>
          <Link
            to={'/signup'}
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Join Us Today
          </Link>
        </header>

        {/* Features Section */}
        <section className="py-16 px-6 bg-gray-100">
          <h2 className="text-center text-3xl font-bold mb-10 text-gray-700">
            Why Choose Linkify?
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="p-6 bg-white shadow-md rounded-md hover:shadow-lg transition duration-300">
              <i className="fas fa-comments text-blue-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Real-Time Messaging</h3>
              <p>
                Experience lightning-fast messaging with zero delays, whether for
                personal or professional use.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-md hover:shadow-lg transition duration-300">
              <i className="fas fa-users text-green-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Group Chats</h3>
              <p>
                Create groups to stay connected with your friends, family, or
                team members seamlessly.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-md hover:shadow-lg transition duration-300">
              <i className="fas fa-shield-alt text-red-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p>
                Enjoy end-to-end encryption to keep your conversations safe and
                private.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-blue-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started with Linkify Today!</h2>
          <p className="mb-6">
            Sign up now and take your conversations to the next level.
          </p>
          <Link
            to={'/signup'}
            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Sign Up Now
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-10 px-6 mt-auto">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3">About Linkify</h3>
              <p>
                Linkify is your go-to platform for real-time communication,
                designed to make your conversations simple and secure.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Connect With Us</h3>
              <ul className="flex gap-4">
                <li>
                  <a
                    href="https://github.com"
                    className="text-white hover:text-gray-400 transition duration-300"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    className="text-white hover:text-gray-400 transition duration-300"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://example.com"
                    className="text-white hover:text-gray-400 transition duration-300"
                  >
                    <i className="fas fa-globe"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center mt-6">&copy; 2025 Linkify. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
