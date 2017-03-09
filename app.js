var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function (req,res) {
    res.render("landing");
});

app.get("/locations", function (req, res) {
    var locations = [
        {name: "loc 1", image: "http://i.imgur.com/K5maUDc.jpg"},
        {name: "loc 2", image: "http://i.imgur.com/K5maUDc.jpg"},
        {name: "loc 3", image: "http://i.imgur.com/K5maUDc.jpg"},
        {name: "loc 4", image: "http://i.imgur.com/K5maUDc.jpg"},
        {name: "loc 5", image: "http://i.imgur.com/K5maUDc.jpg"},
        {name: "loc 6", image: "http://i.imgur.com/K5maUDc.jpg"},
    ];
    res.render("locations", {locations: locations});
});

app.listen(3000, process.env.IP, function () {
    console.log("SERVER STARTED");
});