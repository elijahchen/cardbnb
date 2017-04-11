const express = require("express"),
    router = express.Router({mergeParams: true}),
    Location = require("../models/mLocation"),
    Comment = require("../models/mComment");

// ==============
// COMMENT ROUTES
// ==============

router.get("/new", isLoggedIn, function (req, res) {
    Location.findById(req.params.id, function (err, loc) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {location: loc});
        }
    });
});

router.post("/", isLoggedIn, function (req, res) {
    Location.findById(req.params.id, function (err, loc) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            Comment.create(req.body.comment, function (err, com) {
                if (err) {
                    console.log(err);
                } else {
                    // Add username and id to connect
                    com.author.id = req.user._id;
                    com.author.username = req.user.username;
                    com.save();

                    loc.comments.push(com);
                    loc.save();
                    res.redirect("/locations/" + loc._id);
                }
            });
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