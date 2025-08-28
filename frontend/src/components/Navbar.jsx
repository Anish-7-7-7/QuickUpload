import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png'; // 

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-xl rounded-b-l">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo + Text */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-white tracking-wide">FileUploader</span>
          </Link>

          {/* Hamburger Icon for mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-8 text-sm items-center">
            <li>
              <Link to="/" className="text-white font-semibold px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-yellow-300 transition">Home</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white font-semibold px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-yellow-300 transition">Contact Us</Link>
            </li>
            {token ? (
              <>
                <li>
                  <Link to="/profile" className="text-white font-semibold px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-yellow-300 transition">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-white font-semibold px-3 py-2 rounded-lg hover:bg-red-600 transition">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white font-semibold px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-yellow-300 transition">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="text-white font-semibold px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-yellow-300 transition">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-gray-800 rounded-xl shadow-lg p-4 space-y-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-white hover:text-yellow-300">Home</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-white hover:text-yellow-300">Contact Us</Link>
            {token ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block text-white hover:text-yellow-300">Profile</Link>
                <button onClick={handleLogout} className="w-full text-left text-white hover:text-red-400">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-white hover:text-yellow-300">Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="block text-white hover:text-yellow-300">Signup</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
