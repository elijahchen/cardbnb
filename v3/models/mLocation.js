let mongoose = require("mongoose");

// === Schema Setup ===
const LocationSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// === Model Setup ===
module.exports = mongoose.model("Location", LocationSchema);