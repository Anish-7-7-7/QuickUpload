const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fileUrl: { type: String, required: true },
  quality: { type: String, default: "Medium" },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
