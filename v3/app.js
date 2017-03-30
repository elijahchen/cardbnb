let express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express();

mongoose.connect("mongodb://user:testapp@ds129050.mlab.com:29050/ecdata");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// === Schema Setup ===
const LocationSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// === Model Setup ===
const LocationModel = mongoose.model("Location", LocationSchema);

// var locations = [
//     {name: "loc 1", image: "https://mgnsw.org.au/media/thumbs/uploads/images/DSC_0062_2.jpg.600x400_q85_crop_upscale.jpg"},
//     {name: "loc 2", image: "http://playtivities.com/wp-content/uploads/2015/01/simple-cardboard-house-600x399.jpg"},
//     {name: "loc 3", image: "https://c.fastcompany.net/multisite_files/fastcompany/imagecache/slideshow_large/slideshow/2013/11/3021937-slide-750-origami-02.jpg"},
//     {name: "loc 4", image: "http://www.cbc.ca/strombo/content/images/the-street-house-feature.jpg"},
//     {name: "loc 5", image: "http://gossiplyfe.com/wp-content/uploads/2015/02/Box_Homes_KLEW.jpg"},
//     {name: "loc 6", image: "https://s-media-cache-ak0.pinimg.com/736x/70/f7/9d/70f79de59fc36dba5c5779a112850385.jpg"},
//     {name: "loc 7", image: "http://icdn7.digitaltrends.com/image/wikkel1-720x480-c.png"},
// ];

app.get("/", function (req,res) {
    res.render("landing");
});

//INDEX ROUTE - show all locations
app.get("/locations", function (req, res) {
    //Get all locations from DB
    LocationModel.find({}, function (err, allLocations) {
        if(err){
            console.log(err);
        } else {
            res.render("index", {locations:allLocations});
        }
    });
});

//CREATE - Add new route to database
app.post("/locations", function (req, res) {
   let name = req.body.name;
   let image = req.body.image;
   let desc = req.body.description;
   let newLoc = {name: name, image: image , description:desc};
   //Create a new location and save to DB
    LocationModel.create(newLoc, function (err) {
        if(err){
            console.log("ERROR");
        } else {
            res.redirect("/locations");
        }
    });
});

//NEW - show form to create new location
app.get("/locations/new", function (req, res) {
   res.render("new.ejs");
});

app.post("/locations", function (req, res) {
    res.send("POST ROUTE HERE");
});

//SHOW - shows more info about one location
app.get("/locations/:id", function (req, res) {
    //Replace with Show Page
    LocationModel.findById(req.params.id, function (err, foundLocation) {
        if(err){
            console.log(err);
        } else {
            //Render show template with that location
            console.log(foundLocation);
            res.render("show", {location: foundLocation});
        }
    });
    //Render show template with that location
    res.render("show");
});

app.listen(3000, process.env.IP, function () {
    console.log("SERVER STARTED");
});