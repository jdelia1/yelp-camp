var mongoose    = require('mongoose');
var Campground  = require('./models/campground.js');
var Comment     = require('./models/comment.js');

var data = [
    {
        name: "Clouds Rest", 
        img: "https://farm4.staticflickr.com/3514/3844623716_427ed81275.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices risus vel venenatis iaculis. Maecenas condimentum ac nibh quis finibus. Sed tincidunt libero ut quam molestie iaculis. Morbi id ipsum nec enim semper tempus eu at ipsum. Curabitur quis placerat felis, pretium condimentum purus. Nulla sed dolor non urna accumsan facilisis eget id lacus. Vestibulum facilisis dui bibendum odio faucibus tincidunt. Donec dictum lobortis mauris, eget laoreet leo cursus ut."
    },
    {
        name: "Moon Place", 
        img: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices risus vel venenatis iaculis. Maecenas condimentum ac nibh quis finibus. Sed tincidunt libero ut quam molestie iaculis. Morbi id ipsum nec enim semper tempus eu at ipsum. Curabitur quis placerat felis, pretium condimentum purus. Nulla sed dolor non urna accumsan facilisis eget id lacus. Vestibulum facilisis dui bibendum odio faucibus tincidunt. Donec dictum lobortis mauris, eget laoreet leo cursus ut."
    },
    {
        name: "Kid Jail", 
        img: "https://farm4.staticflickr.com/3529/3822708859_feb1ab4414.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices risus vel venenatis iaculis. Maecenas condimentum ac nibh quis finibus. Sed tincidunt libero ut quam molestie iaculis. Morbi id ipsum nec enim semper tempus eu at ipsum. Curabitur quis placerat felis, pretium condimentum purus. Nulla sed dolor non urna accumsan facilisis eget id lacus. Vestibulum facilisis dui bibendum odio faucibus tincidunt. Donec dictum lobortis mauris, eget laoreet leo cursus ut."
    },
    {
        name: "Beer Cheese Soup Island", 
        img: "https://farm6.staticflickr.com/5578/14641078910_00f5ec5e17.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices risus vel venenatis iaculis. Maecenas condimentum ac nibh quis finibus. Sed tincidunt libero ut quam molestie iaculis. Morbi id ipsum nec enim semper tempus eu at ipsum. Curabitur quis placerat felis, pretium condimentum purus. Nulla sed dolor non urna accumsan facilisis eget id lacus. Vestibulum facilisis dui bibendum odio faucibus tincidunt. Donec dictum lobortis mauris, eget laoreet leo cursus ut."
    }
];

function seedDB(){
    // Flush Campgrounds table before start
    Campground.remove({}, function(e){
        if(e){
            console.log(e);
        }else{
            console.log("Removed");
        }
        
        // data.forEach(function(seed){
        //     Campground.create(seed, function(e, data){
        //         if(e){
        //             console.log(e);
        //         }else{
        //             console.log("Created a campground");
        //             Comment.create({
        //                 text: "Man I wish there was internet.",
        //                 author: "Homer"
        //             }, function(e, comment){
        //                 if(e){
        //                     console.log(e);
        //                 }else{
        //                     data.comments.push(comment);
        //                     data.save();
        //                     console.log("Created comment");
        //                 }
        //             });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;