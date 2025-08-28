import React from "react";
import Navbar from "../components/Navbar";
import FileSearch from "./FileSearch";
import FileUpload from "./FileUpload";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Welcome to FileUploader 🚀
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Securely upload, search, and manage your files with ease🥶
          </p>
          <a
            href="#upload"
            className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* File Search Section */}
      <section id="search" className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          🔍 Search Your Files
        </h2>
        <div className="max-w-2xl mx-auto">
          <FileSearch />
        </div>
      </section>

      {/* File Upload Section */}
      <section id="upload" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            📂 Upload Your Files
          </h2>
          <div className="max-w-xl mx-auto">
            <FileUpload />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
