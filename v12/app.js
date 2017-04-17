const express       = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/mUser"),
    Location        = require("./models/mLocation"),
    Comment         = require("./models/mComment"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash");

// Requiring routes
const commentRoutes     = require("./routes/comments"),
    locationRoutes      = require("./routes/locations"),
    indexRoutes         = require("./routes/index");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://user:testapp@ds129050.mlab.com:29050/ecdata");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seed the database
// seedDB();

app.locals.moment = require("moment");

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
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next(); // Necessary to continue from middleware
});

app.use("/", indexRoutes);
app.use("/locations/:id/comments", commentRoutes);
app.use("/locations", locationRoutes);

app.listen(3000, process.env.IP, function () {
    console.log("SERVER STARTED");
});