import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-semibold">
         Plotch
        </div>
        <div className="space-x-4">
          <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded">Home</a>
          <a href="/about" className="hover:bg-gray-700 px-3 py-2 rounded">About</a>
          <a href="/services" className="hover:bg-gray-700 px-3 py-2 rounded">Services</a>
          <a href="/contact" className="hover:bg-gray-700 px-3 py-2 rounded">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
