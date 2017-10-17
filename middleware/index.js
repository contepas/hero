// all teh middleware goes here
var middlewareObj = {};
var Hero = require("../models/hero");
var Comment = require("../models/comment");

middlewareObj.checkHeroOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Hero.findById(req.params.id, function(err, foundHero){
            if(err || !foundHero){
                req.flash("error", "Hero not found");
                res.redirect("back");
            } else {
                //does user own the hero?
                if(foundHero.author.id.equals(req.user._id)){ //x.equals(y) compare x (object) with y (string), mangoose method 
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "comment not found");
                res.redirect("back");
            } else {
                //does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){ //x.equals(y) compare x (object) with y (string), mangoose method 
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;