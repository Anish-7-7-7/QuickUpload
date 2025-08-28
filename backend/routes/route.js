const express = require("express");
const router = express.Router();

const{signup,Login} = require("../controllers/userController");
const{auth} = require("../middleware/auth");
const upload = require("../middleware/multer");
// File routes
const {
  uploadFile,
  createFolder,
  getProfile,
  searchFiles,
} = require("../controllers/FileController");

// File Upload
router.post("/upload", auth, upload.single("file"), uploadFile);

// Create Folder
router.post("/folder", auth, createFolder);

// Profile (folders + files)
router.get("/profile", auth, getProfile);

// Search Files
router.get("/search", auth, searchFiles);


// Profile routes
router.post("/Signup",signup);
router.post("/Login",Login);

module.exports = router;



