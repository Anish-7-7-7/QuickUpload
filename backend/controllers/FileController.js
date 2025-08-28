const File = require("../model/File");
const Folder = require("../model/Folder");
const cloudinary = require("../config/cloudinary");

// Upload File
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file provided" });

    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mern_files", resource_type: "auto" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const newFile = new File({
      name: req.body.name,
      fileUrl: uploaded.secure_url,
      quality: req.body.quality || "Medium",
      uploadedBy: req.user._id,
      folder: req.body.folderId || null,
    });

    await newFile.save();
    res.json({ success: true, file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create Folder
exports.createFolder = async (req, res) => {
  try {
    const { name, parentFolder } = req.body;

    const folder = new Folder({
      name,
      parentFolder: parentFolder || null,
      createdBy: req.user._id,
    });

    await folder.save();
    res.json({ success: true, folder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get User Profile (Folders + Files)
exports.getProfile = async (req, res) => {
  try {
    const user = req.user;

    // Get all folders of this user
    const folders = await Folder.find({ createdBy: user._id });

    // Get all files of this user
    const files = await File.find({ uploadedBy: user._id });

    const folderFilesMap = { all: files }; 
    folders.forEach(f => folderFilesMap[f._id] = []); 

    files.forEach(file => {
      const fid = file.folder ? file.folder.toString() : null;
      if (fid && folderFilesMap[fid]) {
        folderFilesMap[fid].push(file);
      }
    });

    res.json({
      success: true,
      user: { name: user.name, email: user.email },
      folders,
      folderFilesMap
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Search Files by Name
exports.searchFiles = async (req, res) => {
  try {
    const { q } = req.query; // search term
    if (!q) return res.status(400).json({ success: false, message: "Query is required" });

    // Find only the logged-in user's files
    const files = await File.find({
      uploadedBy: req.user._id,
      name: { $regex: q, $options: "i" }, // case-insensitive match
    });

    res.json({ success: true, files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

