var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express();

mongoose.connect("mongodb://user:testapp@ds129050.mlab.com:29050/ecdata");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// === Schema Setup ===
var locationSchema = new mongoose.Schema({
    name: String,
    image: String
});

// === Model Setup ===
var Location = mongoose.model("Location", locationSchema);

Location.create(
    {
        name: "loc 1",
        image: "http://i.imgur.com/K5maUDc.jpg"
    }, function (err, location){
        if(err){
            console.log(err);
        } else {
            console.log("Newly created location");
            console.log(location);
        }
    });

var locations = [
    {name: "loc 1", image: "http://i.imgur.com/K5maUDc.jpg"},
    {name: "loc 2", image: "http://i.imgur.com/K5maUDc.jpg"},
    {name: "loc 3", image: "http://i.imgur.com/K5maUDc.jpg"},
    {name: "loc 4", image: "http://i.imgur.com/K5maUDc.jpg"},
    {name: "loc 5", image: "http://i.imgur.com/K5maUDc.jpg"},
    {name: "loc 6", image: "http://i.imgur.com/K5maUDc.jpg"},
    {name: "loc 7", image: "http://i.imgur.com/K5maUDc.jpg"},
];

app.get("/", function (req,res) {
    res.render("landing");
});

app.get("/locations", function (req, res) {
    res.render("locations", {locations: locations});
});
app.post("/locations", function (req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var newLoc = {name: name, image: image};
   locations.unshift(newLoc);
   res.redirect("/locations")
});

app.get("/locations/new", function (req, res) {
   res.render("new.ejs");
});
app.post("/locations", function (req, res) {
    res.send("POST ROUTE HERE");
});

app.get("/locations/new");

app.listen(3000, process.env.IP, function () {
    console.log("SERVER STARTED");
});