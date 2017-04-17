const express   = require("express"),
    router      = express.Router(),
    Location    = require("../models/mLocation"),
    middleware  = require("../middleware"),
    geocoder    = require("geocoder");

// ============
// INDEX ROUTES - show all locations
// ============
router.get("/", function (req, res) {
    //Get all locations from DB
    Location.find({}, function (err, loc) {
        if (err) {
            console.log(err);
        } else {
            res.render("locations/index", {locations: loc, currentUser: req.user, page: "locations"});
        }
    });
});

//CREATE - Add new route to database
router.post("/", middleware.isLoggedIn, function (req, res) {
    // Retrieve data from form and add to locations array
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
        let lat = data.results[0].geometry.location.lat;
        let lng = data.results[0].geometry.location.lng;
        let location = data.results[0].formatted_address;
        let newLoc = {
            name: name,
            price: price,
            image: image,
            description: desc,
            author: author,
            location: location,
            lat: lat, lng: lng
        };
        //Create a new location and save to DB
        Location.create(newLoc, function (err, loc) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/locations");
            }
        });
    });
});

//NEW - show form to create new location
router.get("/new", middleware.isLoggedIn, function (req, res) {
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

//EDIT - modifies an existing location
router.get("/:id/edit", middleware.verifyPostOwner, function (req, res) {
    Location.findById(req.params.id, function (err, loc) {
        res.render("locations/edit", {location: loc});
    });
});

//UPDATE - submits the edited changes
router.put("/:id", middleware.verifyPostOwner, function (req, res) {
    geocoder.geocode(req.body.location, function (err, data) {
        let lat = data.results[0].geometry.location.lat;
        let lng = data.results[0].geometry.location.lng;
        let location = data.results[0].formatted_address;
        let newLoc = {
            name: name,
            price: price,
            image: image,
            description: desc,
            author: author,
            location: location,
            lat: lat, lng: lng
        };
        Location.findByIdAndUpdate(req.params.id, {$set: newLoc}, function (err, loc) {
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success", "Successfully Updated!")
                res.redirect("/locations/" + loc._id);
            }
        });
    });
});

//DESTROY - removing the listing
router.delete("/:id", middleware.verifyPostOwner, function (req, res) {
    Location.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect("/locations");
        } else {
            res.redirect("/locations");
        }
    });
});

module.exports = router;