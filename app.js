var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function (req,res) {
    res.render("landing");
});

app.get("/locations", function (req, res) {
    var loc = [
        {name: "loc 1", image: "http://c2.staticflickr.com/2/1414/856595888_fef1676db4_z.jpg?zz=1"},
        {name: "loc 2", image: "http://c2.staticflickr.com/2/1414/856595888_fef1676db4_z.jpg?zz=1"},
        {name: "loc 3", image: "http://c2.staticflickr.com/2/1414/856595888_fef1676db4_z.jpg?zz=1"},
        {name: "loc 4", image: "http://c2.staticflickr.com/2/1414/856595888_fef1676db4_z.jpg?zz=1"},
        {name: "loc 5", image: "http://c2.staticflickr.com/2/1414/856595888_fef1676db4_z.jpg?zz=1"},
        {name: "loc 6", image: "http://c2.staticflickr.com/2/1414/856595888_fef1676db4_z.jpg?zz=1"},
    ];
});

app.listen(3000, process.env.IP, function () {
    console.log("SERVER STARTED");
});