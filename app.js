// Dependencies
var express         = require('express'),
    body_parser     = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    local_strategy  = require('passport-local'),
    local_mongoose  = require('passport-local-mongoose'),
    method_override = require('method-override'),
    flash           = require('connect-flash'),
    app             = express();
    
var cg_routes       = require('./routes/campgrounds.js'),
    comm_routes     = require('./routes/comments.js'),
    auth_routes     = require('./routes/index.js');
    
// Model dependencies
var Campground  = require('./models/campground.js');
var Comment     = require('./models/comment.js');
var User        = require('./models/user.js');
// var seedDB      = require('./seeds.js');
// seedDB();

// Application Settings
app.set('view engine', 'ejs');      // Set default extension to .ejs
app.use(express.static(__dirname + '/public'));  // Use '/public' for static files
app.use(body_parser.urlencoded({extended: true}));
app.use(method_override('_method'));
app.use(flash());

// Passport Configuration
app.use(require('express-session')({
    secret: "ayy hommie",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new local_strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set Local Configuration
app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Mongoose Settings
mongoose.connect('mongodb://localhost/yelp_camp');

// process.env.PORT required for Cloud9 to get allotted port,
// but if running on localhost, user specifies port.
var PORT    = process.env.PORT || 3000,
    IP      = process.env.IP   || '192.168.0.100';

app.use('/', auth_routes);
app.use('/campgrounds', cg_routes);
app.use('/campgrounds/:id/comments', comm_routes);

// 404 Handler Route (KEEP THIS LAST)
app.get('*', function(req, res){
    res.send("404");
});

// Tell Express to listen for requests (start server)
app.listen(PORT, IP, function(){
    console.log("Server has started.");
});