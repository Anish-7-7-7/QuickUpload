const File = require("../model/File");
const User = require("../model/User");
const cloudinary = require("../config/cloudinary");

exports.uploadFile = async (req, res) => {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    console.log("req.user._id:", req.user?._id);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    // Upload file to Cloudinary
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mern_files", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Save in DB
    const newFile = new File({
      name: req.body.name,
      fileUrl: uploaded.secure_url,
      quality: req.body.quality || "Medium",
      uploadedBy: req.user._id, // ✅ important: comes from auth middleware
    });

    await newFile.save();
    return res.json({ success: true, file: newFile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};



exports.searchFiles = async (req, res) => {
  try {
    const query = req.query.query || "";
    const userId = req.user._id; 

    const files = await File.find({
      uploadedBy: userId,            
      name: { $regex: query, $options: "i" } // case-insensitive search
    });

    res.json({ success: true, files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};




exports.getProfileWithFiles = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user info
    const user = await User.findById(userId).select("name email");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get files uploaded by this user
    const files = await File.find({ uploadedBy: userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
      files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



