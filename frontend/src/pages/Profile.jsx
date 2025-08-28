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

  const displayedFiles = () => {
    if (selectedFolder === "all") return folderFilesMap["all"] || [];
    if (selectedSubFolder === "all") return folderFilesMap[selectedFolder] || [];
    return folderFilesMap[selectedSubFolder] || [];
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold text-blue-600 mb-3 sm:mb-0 sm:mr-6">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold truncate">{user.name}</h1>
          <p className="text-gray-100 text-sm sm:text-base truncate">{user.email}</p>
        </div>
      </div>

      {/* Create Folder */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Create Folder</h2>
        <Folder folders={folders} onFolderCreated={handleFolderCreated} />
      </div>

    
      <div className="mb-4 flex overflow-x-auto space-x-2 sm:space-x-3 py-2">
        <button
          onClick={() => setSelectedFolder("all")}
          className={`flex-shrink-0 px-3 py-2 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap ${
            selectedFolder === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        {folders.filter(f => !f.parentFolder).map(f => (
          <button
            key={f._id}
            onClick={() => setSelectedFolder(f._id)}
            className={`flex-shrink-0 px-3 py-2 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap ${
              selectedFolder === f._id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Subfolder Tabs */}
      {subFolders.length > 0 && (
        <div className="mb-4 flex overflow-x-auto space-x-2 sm:space-x-3 py-2 ml-0 sm:ml-4">
          <button
            onClick={() => setSelectedSubFolder("all")}
            className={`flex-shrink-0 px-3 py-2 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap ${
              selectedSubFolder === "all" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            All
          </button>
          {subFolders.map(sf => (
            <button
              key={sf._id}
              onClick={() => setSelectedSubFolder(sf._id)}
              className={`flex-shrink-0 px-3 py-2 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap ${
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
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Files</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedFiles().map(file => (
            <div key={file._id} className="border rounded shadow p-2 flex flex-col">
              <img
                src={file.fileUrl}
                alt={file.name}
                className="w-full h-40 sm:h-32 md:h-40 object-cover rounded"
              />
              <p className="mt-2 text-center text-sm sm:text-base font-medium break-words truncate">{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
