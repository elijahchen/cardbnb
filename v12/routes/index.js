const express   = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/mUser");

// =============
// ROUTE MAPPING
// =============
router.get("/", function (req, res) {
    res.render("landing");
});

// =====================
// AUTHENTICATION ROUTES
// =====================

router.get("/signup", function (req, res) {
    res.render("signup", {page: "signup"});
});

router.post("/signup", function (req, res) {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to carbnb! " + req.body.username);
            res.redirect("/locations");
        });
    });
});

// Show the login form
router.get("/login", function (req, res) {
    res.render("login", {page: "login"});
});

// Handling the login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/locations",
    successFlash: "Welcome back!",
    failureRedirect: "/login",
    failureFlash: "Username or password is incorrect.",
}), function (req, res) {
});

// Logout
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have successfully logged out!")
    res.redirect("/locations");
});

module.exports = router;