const mongoose  = require("mongoose");
const Location  = require("./models/mLocation");
const Comment   = require("./models/mComment");

let data = [
    {
        name: "Chelsea Landmark Leasing",
        image: "https://mgnsw.org.au/media/thumbs/uploads/images/DSC_0062_2.jpg.600x400_q85_crop_upscale.jpg",
        description: "This corner 1BR/1BA has views to the south and east, floor-to-ceiling windows in the living room, and a separate windowed kitchen. The apartment also includes a washer and dryer and walk-in closet. Schedule a private tour today."
    },{
        name: "Heath Morgan Habitats",
        image: "http://playtivities.com/wp-content/uploads/2015/01/simple-cardboard-house-600x399.jpg",
        description: "BUILDING AMENITIES Laundry Room Gas Included Electric Included Live in Super Pets Allowed Heat Included Video Intercom Hot Water Included "
    },{
        name: "Gewurtz Properties",
        image: "https://c.fastcompany.net/multisite_files/fastcompany/imagecache/slideshow_large/slideshow/2013/11/3021937-slide-750-origami-02.jpg",
        description: "NO FEE. Beautiful open bedroom available for rent in amazing location in East Greenwich Village."
    },{
        name: "Brooklyn Group NYC",
        image: "http://www.cbc.ca/strombo/content/images/the-street-house-feature.jpg",
        description: "If you are looking for a lot of space for a very fair price, this is the place for you. 4 Very spacious bedrooms, a large living area. This is a duplex apartment. Huge windows that let in a lot of natural light!"
    },{
        name: "Fifth & Forever",
        image: "http://gossiplyfe.com/wp-content/uploads/2015/02/Box_Homes_KLEW.jpg",
        description: "Beautifully renovated 2 bedroom apartment in an elevator building in the heart of one of the best neighborhoods in Brooklyn. Features brand new stainless steel appliances and a marble bathroom. Surrounded by tons of shopping and entertainment."
    },{
        name: "Urban Sanctuary",
        image: "https://s-media-cache-ak0.pinimg.com/736x/70/f7/9d/70f79de59fc36dba5c5779a112850385.jpg",
        description: "Price is net effective rent based on one free month on 12 months lease."
    },{
        name: "Highline Residential",
        image: "http://icdn7.digitaltrends.com/image/wikkel1-720x480-c.png",
        description: "Updated kitchen and bathrooms! Just first and security to move in-no utilities included."
    }
];

function seedDB() {
    // Remove all listings
    Location.remove({}, function (err) {
        if(err){
            console.log(err);
        }
        console.log("Removed location!")
    });
    data.forEach(function (seed) {
       Location.create(seed, function (err, loc) {
          if(err){
              console.log(err);
          } else {
              console.log("Added a new location!");
              Comment.create({
                  text: "This place is great, WiFi needs work.",
                  author: "Recent Tenant"
              }, function (err, comment) {
                  if(err){
                      console.log(err);
                  } else {
                      loc.comments.push(comment);
                      loc.save();
                      console.log("Created new comment!");
                  }
              });
          }
       });
    });
}

module.exports = seedDB;