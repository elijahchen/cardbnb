const Location    = require("../models/mLocation"),
    Comment         = require("../models/mComment");

// ALL OF THE MIDDLEWARE
let middlewareObj = {};

middlewareObj.verifyPostOwner = function(req, res, next) {
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
};

middlewareObj.verifyCommentOwner = function(req, res, next) {
    // Is user authenticated
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, com) {
            if(err){
                res.redirect("back");
            } else {
                // Does user own the comment
                if(com.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back")
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login first!");
    res.redirect("/login");
};

module.exports = middlewareObj;