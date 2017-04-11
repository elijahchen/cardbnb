const express = require("express"),
    router = express.Router({mergeParams: true}),
    Location = require("../models/mLocation"),
    Comment = require("../models/mComment"),
    middleware  = require("../middleware");

// ==============
// COMMENT ROUTES
// ==============

router.get("/new", middleware.isLoggedIn, function (req, res) {
    Location.findById(req.params.id, function (err, loc) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {location: loc});
        }
    });
});

router.post("/", middleware.isLoggedIn, function (req, res) {
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

// Comments edit
router.get("/:comment_id/edit", middleware.verifyCommentOwner, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, com) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {location_id: req.params.id, comment: com});
        }
    });
});

// Comments update
router.put("/:comment_id", middleware.verifyCommentOwner, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, com) {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/locations/" + req.params.id);
        }
    });
});

// Comments destroy
router.delete("/:comment_id", middleware.verifyCommentOwner, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/locations/" + req.params.id);
        }
    });
});

module.exports = router;