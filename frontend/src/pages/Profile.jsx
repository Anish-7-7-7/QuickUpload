import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Folder from "./Folder";

const Profile = () => {
  const [user, setUser] = useState({});
  const [folders, setFolders] = useState([]);
  const [folderFilesMap, setFolderFilesMap] = useState({});
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [subFolders, setSubFolders] = useState([]);
  const [selectedSubFolder, setSelectedSubFolder] = useState("all");

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/api/v1/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (data.success) {
        setUser(data.user);
        setFolders(data.folders);
        setFolderFilesMap({ all: data.files, ...data.folderFilesMap });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFolderCreated = (folder) => {
    setFolders([...folders, folder]);
    setFolderFilesMap({ ...folderFilesMap, [folder._id]: [] });
  };

  // Update subfolders when a parent folder is selected
  useEffect(() => {
    if (selectedFolder === "all") {
      setSubFolders([]);
      setSelectedSubFolder("all");
    } else {
      const subs = folders.filter(f => f.parentFolder === selectedFolder);
      setSubFolders(subs);
      setSelectedSubFolder("all");
    }
  }, [selectedFolder, folders]);

  // Determine which files to show
  const displayedFiles = () => {
    if (selectedFolder === "all") return folderFilesMap["all"] || [];
    if (selectedSubFolder === "all") return folderFilesMap[selectedFolder] || [];
    return folderFilesMap[selectedSubFolder] || [];
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* User Info */}
      <div className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg shadow mb-6">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 mr-6">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-100">{user.email}</p>
        </div>
      </div>

      {/* Create Folder */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create Folder</h2>
        <Folder folders={folders} onFolderCreated={handleFolderCreated} />
      </div>

      {/* Parent Folder Tabs */}
      <div className="mb-4 flex space-x-3 overflow-x-auto">
        <button
          onClick={() => setSelectedFolder("all")}
          className={`px-4 py-2 rounded-full font-semibold ${
            selectedFolder === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        {folders.filter(f => !f.parentFolder).map(f => (
          <button
            key={f._id}
            onClick={() => setSelectedFolder(f._id)}
            className={`px-4 py-2 rounded-full font-semibold ${
              selectedFolder === f._id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Subfolder Tabs */}
      {subFolders.length > 0 && (
        <div className="mb-4 flex space-x-3 overflow-x-auto ml-4">
          <button
            onClick={() => setSelectedSubFolder("all")}
            className={`px-4 py-2 rounded-full font-semibold ${
              selectedSubFolder === "all" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            All
          </button>
          {subFolders.map(sf => (
            <button
              key={sf._id}
              onClick={() => setSelectedSubFolder(sf._id)}
              className={`px-4 py-2 rounded-full font-semibold ${
                selectedSubFolder === sf._id ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {sf.name}
            </button>
          ))}
        </div>
      )}

      {/* Files Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Files</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayedFiles().map(file => (
            <div key={file._id} className="border rounded shadow p-2">
              <img
                src={file.fileUrl}
                alt={file.name}
                className="w-full h-32 object-cover rounded"
              />
              <p className="mt-2 text-center font-medium">{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
