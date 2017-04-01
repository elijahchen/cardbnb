let mongoose = require("mongoose");

// === Schema Setup ===
const LocationSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// === Model Setup & Export ===
module.exports = mongoose.model("Location", LocationSchema);