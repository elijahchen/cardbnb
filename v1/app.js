var express = require("express");
var bodyParser = require("body-parser")
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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