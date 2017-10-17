var express    = require("express");
var router     = express.Router();
var Hero       = require("../models/hero");
var middleware = require("../middleware");

//INDEX - show all heroes
router.get("/", function(req, res){
    // Get all camprgrounds from DB
    Hero.find({}, function(err, allHeroes){
        if(err){
            console.log(err);
        } else {
            res.render("heroes/index", {heroes:allHeroes});//{name:data}
        }
    });
});

//CREATE - add new hero to database
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to heroes array
    var name  = req.body.name,
        image = req.body.image,
        desc  = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newHero = {name:name, image:image, description:desc, author:author};
    
    // Create a new hero and save to DB
    Hero.create(newHero, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to heroes page
            res.redirect("/heroes");
        }
    });
});

// NEW - show form to create new hero
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("heroes/new");
});

// SHOW - shows more info about one hero
router.get("/:id", function(req, res){
    //find the hero with provided ID
    Hero.findById(req.params.id).populate("comments").exec(function(err, foundHero){
       if(err || !foundHero){
           req.flash("error", "Hero not found");
           res.redirect("back");
       } else {
           //render show template with that hero
           res.render("heroes/show", {hero: foundHero});
       }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkHeroOwnership, function(req, res){
        Hero.findById(req.params.id, function(err, foundHero){
            if(err){
                console.log(err);
            } else {
                res.render("heroes/edit", {hero: foundHero});
            }
        });
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkHeroOwnership, function(req, res){
    //find and update the correct hero
    //req.bosy.hero => hero[name], hero[image], ... (vedi edit.ejs)
    Hero.findByIdAndUpdate(req.params.id, req.body.hero, function(err, updatedHero){
        if(err){
            res.redirect("/heroes");
        } else {
            res.redirect("/heroes/" + req.params.id);
        }
    });
    //redirect somwhere(show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkHeroOwnership, function(req, res){
    Hero.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/heroes");
        } else {
            res.redirect("/heroes");
        }
    });
});

module.exports = router;