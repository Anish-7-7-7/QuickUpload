import React, { useState } from "react";
import API from "../api/axios";

const Folder = ({ folders, onFolderCreated }) => {
  const [name, setName] = useState("");
  const [parentFolder, setParentFolder] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(
        "/api/v1/folder",
        { name, parentFolder: parentFolder || null },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (data.success) {
        onFolderCreated(data.folder);
        setName("");
        setParentFolder("");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create folder");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Folder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded flex-1"
      />
      <select
        value={parentFolder}
        onChange={(e) => setParentFolder(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">--No Parent--</option>
        {folders.map(f => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
};

export default Folder;
