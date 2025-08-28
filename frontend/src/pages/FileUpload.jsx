import React, { useState } from "react";
import API from "../api/axios";

const FileUpload = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState("Medium");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);     
      formData.append("name", name);
      formData.append("quality", quality);

      
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const { data } = await API.post("/api/v1/upload", formData, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
    });

      alert("File uploaded successfully!");
      console.log(data);

      setName("");
      setFile(null);
      setQuality("Medium");
    } catch (err) {
      console.error("Upload error:", err.response || err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto bg-white shadow rounded space-y-3"
    >
      <h2 className="text-xl font-bold">Upload File</h2>

      <input
        type="text"
        placeholder="Enter file name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full border p-2 rounded"
        required
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full"
        required
      />

      <select
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        className="block w-full border p-2 rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default FileUpload;
