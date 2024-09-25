import React from 'react';
import { Link } from 'react-router-dom';
import storm_logo from '../assets/storm.png'; 

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={storm_logo} alt="Logo" className="h-8 w-8 mr-2" />
          <Link to="/" className="text-white text-lg">Home</Link>
        </div>
        <div>
          <Link to="/login" className="text-white px-4">Login</Link>
          <Link to="/register" className="text-white px-4">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
