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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 sm:gap-2 items-stretch sm:items-center"
    >
      <input
        type="text"
        placeholder="Folder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded flex-1 w-full sm:w-auto"
      />
      <select
        value={parentFolder}
        onChange={(e) => setParentFolder(e.target.value)}
        className="border p-2 rounded flex-1 w-full sm:w-auto"
      >
        <option value="">--No Parent--</option>
        {folders.map((f) => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
      >
        Create
      </button>
    </form>
  );
};

export default Folder;
