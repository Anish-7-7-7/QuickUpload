import React, { useState } from "react";
import API from "../api/axios";

const FileSearch = () => {
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.get(`/api/v1/search?query=${query}`, {
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
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search files by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>

      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
              {file.name} ({file.quality})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileSearch;
