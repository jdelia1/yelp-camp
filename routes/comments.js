var express     = require('express');
var router      = express.Router({mergeParams: true});
var Campground  = require('../models/campground.js');
var Comment     = require('../models/comment.js');
var middleware  = require('../middleware');

// ========================
// COMMENTS ROUTES
// ========================

// NEW -- Show form to submit new comment
router.get('/new', middleware.is_logged_in, function(req, res){
    Campground.findById(req.params.id, function(e, cg){
        if(e){
            console.log(e);
        }else{
            res.render('comments/new', {cg: cg});
        }
    });
});

// CREATE -- Add new comment to campground
router.post('/', middleware.is_logged_in, function(req, res){
    Campground.findById(req.params.id, function(e, cg){
        if(e){
            console.log(e);
            res.redirect('/campgrounds');
        }else{
            Comment.create(req.body.comment, function(e, comment){
                if(e){
                    console.log(e);
                }else{
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    cg.comments.push(comment);
                    cg.save();
                    res.redirect('/campgrounds/' + cg._id);
                }
            });
        }
    });
});

// EDIT -- Show the form to edit a comment.
router.get('/:comment_id/edit', middleware.check_comment_ownership, function(req, res){
    Comment.findById(req.params.comment_id, function(e, comment){
        if(e){
            console.log(e);
            res.redirect('back');
        }else{
            res.render('comments/edit', {cg_id: req.params.id, comment: comment});
        }
    });
});

// UPDATE -- Update a comment
router.put('/:comment_id', middleware.check_comment_ownership, function(req, res){
    Comment.findById(req.params.comment_id, function(e, comment_id){
        if(e){
            console.log(e);
            res.redirect('back');
        }else{
            Comment.update({_id: comment_id}, {text: req.body.comment.text}, function(e, comment){
                if(e){
                    console.log(e);
                    res.redirect('back');
                }else{
                    res.redirect('/campgrounds/' + req.params.id);
                }
            });
        }
    });
});

// DESTROY --
router.delete('/:comment_id', middleware.check_comment_ownership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(e){
        if(e){
            console.log(e);
            req.flash("error", "Something went wrong: Comment not found.");
            res.redirect('back');
        }
        req.flash("success", "Comment has been deleted.");
        res.redirect('/campgrounds/' + req.params.id);
    });
});

module.exports = router;