import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="px-4 sm:px-6 md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 sm:gap-14 my-10 text-sm">

        {/* Logo & Description */}
        <div className="mb-8 sm:mb-0">
          <img className="mb-5 w-40" src={assets.logo} alt="QuickUpload Logo" />
          <p className="w-full sm:w-2/3 text-gray-600 leading-6">
            QuickUpload is your fastest way to share files — making it simple and secure to upload and download your documents, photos, and videos. We make moving your data easy and instant.
          </p>
        </div>

        {/* Company Links */}
        <div className="mb-8 sm:mb-0">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>
              <Link to="/contact" className="hover:underline hover:text-gray-800 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-8887543210</li>
            <li>support@QuickUpload.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © 2025 QuickUpload — All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
