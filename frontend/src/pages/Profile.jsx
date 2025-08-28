import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { UserCircle } from "lucide-react"; 



const Profile = () => {
  const [user, setUser] = useState({});
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile and files
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get user info
        const { data: userData } = await API.get("/api/v1/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(userData.user);

        // Get user files
        const { data: filesData } = await API.get("/api/v1/search", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setFiles(filesData.files || []);
      } catch (err) {
        console.error("Error fetching profile:", err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* User Info */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg mb-8">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-lg mt-1">{user.email}</p>
      </div>

      {/* My Files */}
      <h3 className="text-xl font-semibold mb-4">My Files</h3>

      {files.length === 0 ? (
        <p className="text-gray-500">You have no uploaded files yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <div
              key={file._id}
              className="border rounded shadow-sm overflow-hidden bg-white"
            >
              <img
                src={file.fileUrl}
                alt={file.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h4 className="font-semibold text-gray-800">{file.name}</h4>
                <p className="text-gray-500 text-sm">{file.quality}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

