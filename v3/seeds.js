const mongoose = require("mongoose");
const Campground = require("./models/mLocation");

function seedDB() {
    // Remove all listings
    Campground.remove({}, function (err) {
        if(err){
            console.log(err);
        }
        console.log("Removed location!")
    });
}

module.exports = seedDB;