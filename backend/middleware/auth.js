require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("Extracted token:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "Token Missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log("Invalid token");
      return res.status(401).json({ success: false, message: "Token Invalid" });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }
      req.user = user; 
    } catch (err) {
      console.error("DB error in auth middleware:", err);
      return res.status(500).json({ success: false, message: "Server Error" });
    }

    next();
  } catch (err) {
    console.error("Middleware error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
