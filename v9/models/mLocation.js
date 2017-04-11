let mongoose = require("mongoose");

// === Schema Setup ===
const LocationSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            username: String,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// === Model Setup & Export ===
module.exports = mongoose.model("Location", LocationSchema);