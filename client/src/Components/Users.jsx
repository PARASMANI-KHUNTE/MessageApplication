import { useState } from "react";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");





  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

 
    </div>
  );
};

export default Users;