const express   = require("express"),
    router      = express.Router(),
    Location    = require("../models/mLocation");

// ============
// INDEX ROUTES - show all locations
// ============
router.get("/", function (req, res) {
    //Get all locations from DB
    Location.find({}, function (err, loc) {
        if (err) {
            console.log(err);
        } else {
            res.render("locations/index", {locations: loc, currentUser: req.user});
        }
    });
});

//CREATE - Add new route to database
router.post("/", isLoggedIn, function (req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newLoc = {name: name, image: image, description: desc};
    //Create a new location and save to DB
    Location.create(newLoc, function (err) {
        if (err) {
            console.log("ERROR");
        } else {
            res.redirect("/locations");
        }
    });
});

//NEW - show form to create new location
router.get("/new", isLoggedIn, function (req, res) {
    res.render("locations/new");
});

//SHOW - shows more info about one location
router.get("/:id", function (req, res) {
    //Replace with Show Page
    Location.findById(req.params.id).populate("comments").exec(function (err, loc) {
        if (err) {
            console.log(err);
        } else {
            //Render show template with that location
            res.render("locations/show", {location: loc});
        }
    });
});

// =========
// FUNCTIONS
// =========

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;