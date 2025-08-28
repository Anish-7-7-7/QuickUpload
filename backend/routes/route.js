const express = require("express");
const router = express.Router();

const{signup,Login} = require("../controllers/userController");
const{auth} = require("../middleware/auth");

// File routes
const { uploadFile, searchFiles, getProfileWithFiles } = require("../controllers/FileController");
const upload = require("../middleware/multer");
router.post("/upload",auth, upload.single("file"), uploadFile);
router.get("/search", auth, searchFiles);
router.get("/profile", auth, getProfileWithFiles);

// Profile routes
router.post("/Signup",signup);
router.post("/Login",Login);

module.exports = router;
