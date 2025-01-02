import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-200 text-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-semibold">
          Plotch
        </div>
        <div className="space-x-4">
          <a href="/" className="hover:bg-blue-300 hover:text-white px-3 py-2 rounded transition-colors duration-300">Home</a>
          <a href="/" className="hover:bg-blue-300 hover:text-white px-3 py-2 rounded transition-colors duration-300">About</a>
          <a href="/" className="hover:bg-blue-300 hover:text-white px-3 py-2 rounded transition-colors duration-300">Services</a>
          <a href="/" className="hover:bg-blue-300 hover:text-white px-3 py-2 rounded transition-colors duration-300">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
