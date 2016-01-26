var express         = require('express');
var router          = express.Router();
var User            = require('../models/user.js');
var passport        = require('passport'),
    local_strategy  = require('passport-local'),
    local_mongoose  = require('passport-local-mongoose');

router.get('/', function(req, res){
    res.render('home');
});

// ========================
// AUTH ROUTES
// ========================

// Show registration form
router.get('/register', function(req, res){
    res.render('register');
});

// Handle registration submission
router.post('/register', function(req, res){
    var u = new User({username: req.body.username});
    User.register(u, req.body.password, function(e, user){
        if(e){
            req.flash("error", e.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
        });
    });
});

// Show login form
router.get('/login', function(req, res){
    res.render('login');
});

// Handle login submission
router.post('/login', passport.authenticate('local', {
    // Middleware
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){});

// Logout Route
router.get('/logout', function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect('/campgrounds');
});

module.exports = router;