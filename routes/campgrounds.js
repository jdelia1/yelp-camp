var express     = require('express');
var router      = express.Router();
var Campground  = require('../models/campground.js');
var middleware  = require('../middleware');

// ========================
// CAMPGROUND ROUTES
// ========================

// INDEX -- Show all campgrounds
router.get('/', function(req, res){
    // Display all campgrounds in the database
    Campground.find({}, function(e, cg){
        if(e){
            console.log(e);
        }else{
            res.render('campgrounds/index', {camps: cg});
        }
    });
});

// CREATE -- Add new campground to db
router.post('/', middleware.is_logged_in, function(req, res){
    // Create new campground object from post results
    var name = req.body.name;
    var img  = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var new_camp = {name: name, img: img, desc: desc, author: author};
    // Create new database entry with campground object
    Campground.create(new_camp, function(e, new_cg){
        if(e){
            req.flash("error", "Something went wrong: Campground not created.");
            console.log(e);
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds');
        }
    });
});

// NEW -- Show form to create new campground
router.get('/new', middleware.is_logged_in, function(req, res){
    res.render('campgrounds/new');
});

// SHOW -- View the specific campgrounds info page
router.get('/:id', function(req, res){
    // Find campground with :id
    var id = req.params.id;
    Campground.findById(id).populate('comments').exec(function(e, ret){
        if(e){
            req.flash("error", "Something went wrong: Campground not found.");
            console.log(e);
            req.redirect('back');
        }else{
            res.render('campgrounds/show', {cg: ret});
        }
    });
});

// EDIT -- Edit a campground that you have submitted
router.get('/:id/edit', middleware.check_cg_ownership, function(req, res) {
    Campground.findById(req.params.id, function(e, cg){
        if(e){
            req.flash("error", "Something went wrong: Campground not found.");
            console.log(e);
            res.redirect('back');
        }else{
            res.render('campgrounds/edit', {cg: cg});
        }
    });
});

// UPDATE -- Submit changes to a campground
router.put('/:id', middleware.check_cg_ownership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.cg, function(e, cg){
        if(e){
            req.flash("error", "Something went wrong: Campground not found.");
            console.log(e);
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DELETE -- Delete a specific campground
router.delete('/:id', middleware.check_cg_ownership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(e){
        if(e){
            req.flash("error", "Something went wrong: Campground not found.");
            console.log(e);
        }
        res.redirect('/campgrounds');
    });
});

module.exports = router;