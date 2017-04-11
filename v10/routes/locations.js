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
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newLoc = {name: name, image: image, description: desc, author: author};
    //Create a new location and save to DB
    Location.create(newLoc, function (err, loc) {
        if (err) {
            console.log(err);
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

//EDIT - modifies an existing location
router.get("/:id/edit", verifyOwner, function (req, res) {
    Location.findById(req.params.id, function (err, loc) {
        res.render("locations/edit", {location: loc});
    });
});

//UPDATE - submits the edited changes
router.put("/:id", verifyOwner, function (req, res) {
    Location.findByIdAndUpdate(req.params.id, req.body.location, function (err, loc) {
        if(err){
            res.redirect("/locations");
        } else {
            res.redirect("/locations/" + req.params.id);
        }
    });
});

//DESTROY - removing the listing
router.delete("/:id", verifyOwner, function (req, res) {
    Location.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect("/locations");
        } else {
            res.redirect("/locations");
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

function verifyOwner(req, res, next) {
    // Is user authenticated
    if(req.isAuthenticated()){
        Location.findById(req.params.id, function (err, loc) {
            if(err){
                res.redirect("back");
            } else {
                // Does user own the listing
                if(loc.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back")
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;