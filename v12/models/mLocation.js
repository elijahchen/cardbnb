let mongoose = require("mongoose");

// === Schema Setup ===
const LocationSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
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