// components/FileUpload.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axios";

const FileUpload = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState("Medium");
  const [folderId, setFolderId] = useState("");
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const { data } = await API.get("/api/v1/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (data.success) setFolders(data.folders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFolders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("quality", quality);
      formData.append("folderId", folderId);

      const { data } = await API.post("/api/v1/upload", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert("Uploaded!");
      setName("");
      setFile(null);
      setQuality("Medium");
      setFolderId("");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow rounded space-y-3">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2 w-full rounded" />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required className="w-full" />
      <select value={quality} onChange={(e) => setQuality(e.target.value)} className="border p-2 w-full rounded">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select value={folderId} onChange={(e) => setFolderId(e.target.value)} className="border p-2 w-full rounded">
        <option value="">--Select Folder--</option>
        {folders.map((f) => (
          <option key={f._id} value={f._id}>{f.name}</option>
        ))}
      </select>
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default FileUpload;
