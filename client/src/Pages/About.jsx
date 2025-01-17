import Nav from "../Components/Nav";

const About = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {/* Navbar */}
        <Nav />
        
        {/* Main content */}
        <section className="flex-1 py-10 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-semibold text-blue-600 mb-6">About Linkify</h1>
            <p className="text-lg mb-6 text-gray-700">
              Welcome to <span className="font-bold text-blue-600">Linkify</span>! 
              A real-time chat application designed to make communication seamless, engaging, and productive.
              Whether you're chatting with friends, collaborating with teammates, or sharing files, Linkify is 
              built to handle it all.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2 text-left">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Real-Time Chat</h2>
                <p className="text-gray-600 mb-4">
                  Stay connected with your friends, family, and colleagues in real time. 
                  Linkify allows instant messaging without any delays, making it ideal for both casual conversations 
                  and professional collaborations. 
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-gray-600">Instant messaging with no lag.</li>
                  <li className="text-gray-600">Group chats for better collaboration.</li>
                  <li className="text-gray-600">Push notifications to never miss a message.</li>
                </ul>
              </div>

              <div className="w-full md:w-1/2 text-left">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">File Transfer</h2>
                <p className="text-gray-600 mb-4">
                  Sharing files with others has never been easier. With Linkify, you can send documents, images, 
                  videos, and more without any hassle. Our file transfer feature supports fast, reliable, and secure 
                  sharing so that you can focus on what matters most.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-gray-600">Transfer files of various formats.</li>
                  <li className="text-gray-600">Seamless drag-and-drop file sharing.</li>
                  <li className="text-gray-600">Secure and encrypted transfers for privacy.</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 bg-blue-100 py-8 px-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Why Choose Linkify?</h3>
              <p className="text-lg text-gray-700 mb-6">
                Linkify combines the power of real-time communication with a simple, user-friendly interface. 
                Our platform ensures smooth interactions with no interruptions, making it the perfect solution for both 
                personal and professional use. Whether you need to have a quick conversation, send a file, or collaborate 
                on a project, Linkify has got you covered.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                Get Started Today
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
