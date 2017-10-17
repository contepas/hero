var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Hero           = require("./models/hero"),
    Comment        = require("./models/comment"),
    User           = require("./models/user")
//    seedDB         = require("./seeds");

//requiring routes
var commentRoutes    = require("./routes/comments"),
    heroRoutes = require("./routes/heroes"),
    indexRoutes      = require("./routes/index");

mongoose.Promise = require('bluebird');

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url, {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Look what you made me do",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middelware for evrey route to check if the user is logged in
app.use(function(req, res, next){ 
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// prefix routes
app.use("/", indexRoutes);
app.use("/heroes", heroRoutes);
app.use("/heroes/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The HeroesBlog Server Has Started!");
});