const mongoose = require("mongoose");

// === Schema Setup ===
const commentSchema = mongoose.Schema({
    text: String,
    author: String,
});

// === Model Setup & Export ===
module.exports = mongoose.model("Comment", commentSchema);