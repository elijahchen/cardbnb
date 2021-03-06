const express       = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/mUser"),
    Location        = require("./models/mLocation"),
    Comment         = require("./models/mComment");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://user:testapp@ds129050.mlab.com:29050/ecdata");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
seedDB();

// ======================
// PASSPORT CONFIGURATION
// ======================
app.use(require("express-session")({
    secret: "The sun rises at noon.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
   res.locals.currentUser = req.user;
   next(); // Necessary to continue from middleware
});

// =============
// ROUTE MAPPING
// =============
app.get("/", function (req, res) {
    res.render("landing");
});

//INDEX ROUTE - show all locations
app.get("/locations", function (req, res) {
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
app.post("/locations", function (req, res) {
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
app.get("/locations/new", function (req, res) {
    res.render("locations/new");
});

//SHOW - shows more info about one location
app.get("/locations/:id", function (req, res) {
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

// ==============
// COMMENT ROUTES
// ==============

app.get("/locations/:id/comments/new", isLoggedIn, function (req, res) {
    Location.findById(req.params.id, function (err, loc) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {location: loc});
        }
    });
});

app.post("/locations/:id/comments", isLoggedIn, function (req, res) {
    Location.findById(req.params.id, function (err, loc) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            Comment.create(req.body.comment, function (err, com) {
                if (err) {
                    console.log(err);
                } else {
                    loc.comments.push(com);
                    loc.save();
                    res.redirect("/locations/" + loc._id);
                }
            });
        }
    });
});

// =====================
// AUTHENTICATION ROUTES
// =====================

app.get("/signup", function (req, res) {
   res.render("signup");
});

app.post("/signup", function (req, res) {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/locations");
        });
    });
});

// Show the login form
app.get("/login", function (req, res) {
    res.render("login");
});

// Handling the login logic
app.post("/login", passport.authenticate("local", {
        successRedirect: "/locations",
        failureRedirect: "/login"
    }), function (req, res) {
        res.send("JFOAJFASJF");
});

// Logout
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/locations");
});

// =========
// FUNCTIONS
// =========

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, process.env.IP, function () {
    console.log("SERVER STARTED");
});