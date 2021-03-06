const mongoose = require("mongoose");

// === Schema Setup ===
const commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// === Model Setup & Export ===
module.exports = mongoose.model("Comment", commentSchema);