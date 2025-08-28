import React, { useState } from "react";
import API from "../api/axios";

const FileSearch = () => {
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.get(`/api/v1/search?q=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFiles(data.files);
    } catch (err) {
      console.error("Search error:", err.response || err);
      alert("Search failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-2 mb-4"
      >
        <input
          type="text"
          placeholder="Search files by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border p-2 rounded w-full sm:w-auto"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">
          Search
        </button>
      </form>

      {/* Files List */}
      <ul className="flex flex-col gap-2">
        {files.map((file) => (
          <li key={file._id} className="break-words">
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {file.name} {file.quality && `(${file.quality})`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileSearch;
