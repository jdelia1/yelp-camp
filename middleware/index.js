var Campground  = require('../models/campground.js');
var Comment     = require('../models/comment.js');

var mw_obj = {};

mw_obj.is_logged_in = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error",  "You must be logged in to do that.");
    res.redirect('/login');
};

mw_obj.check_comment_ownership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(e, comment){
            if(e){
                console.log(e);
                req.flash("error", "Something went wrong: Comment not found.");
                res.redirect('back');
            }else{
                if(comment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect('back');
                }
            }
        });
    }else{
        req.flash("error", "You must be logged in to do that.");
        res.redirect('back');
    }
};

mw_obj.check_cg_ownership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(e, cg){
            if(e){
                console.log(e);
                req.flash("error", "Something went wrong: Campground not found.");
                res.redirect('back');
            }else{
                if(cg.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect('back');
                }
            }
        });
    }else{
        req.flash("error", "You must be logged in to do that.");
        res.redirect('back');
    }
};

module.exports =  mw_obj;