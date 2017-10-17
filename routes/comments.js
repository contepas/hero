var express    = require("express");
var router     = express.Router({mergeParams: true});
var Hero = require("../models/hero");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find hero by id
    Hero.findById(req.params.id, function(err, hero){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {hero: hero});
        }
    });
});
// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup hero using ID
    Hero.findById(req.params.id, function(err, hero){
        if(err){
            console.log(err);
            res.redirect("/heroes");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    hero.comments.push(comment);
                    hero.save();
                    req.flash("success", "Successfully created comment");
                    res.redirect("/heroes/" + hero._id);
                }
            });
        }
    });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Hero.findById(req.params.id, function(err, foundHero){
        if(err || !foundHero){
            req.flash("error", "Hero not found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                res.render("comments/edit", {hero_id: req.params.id, comment: foundComment});
            }
        });
    });
});
// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/heroes/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/heroes/" + req.params.id);
        }
    });
});


module.exports = router;