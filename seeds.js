var mongoose   = require("mongoose"),
    Hero = require("./models/hero"),
    Comment    = require("./models/comment");

var data = [
    {
        name: "Flying",
        image: "http://i39.tinypic.com/24qlnqx.jpg",
        description: "Bacon ipsum dolor amet ball tip ham hock landjaeger flank tongue tail corned beef ground round chicken pastrami cupim jerky sirloin t-bone leberkas. Venison sausage pastrami cow andouille jowl picanha doner meatloaf porchetta short ribs. Flank swine rump landjaeger jerky. Andouille pork brisket pork chop ribeye doner shoulder tri-tip burgdoggen. Sausage turducken chicken spare ribs. Pork pancetta meatloaf corned beef short loin tongue, pork belly doner tenderloin turkey strip steak sausage."
    },
    {
        name: "Fighting",
        image: "http://www.wolfstad.com/dcw/images/comics/fullsize/it_pk2c.jpg",
        description: "Bacon ipsum dolor amet ball tip ham hock landjaeger flank tongue tail corned beef ground round chicken pastrami cupim jerky sirloin t-bone leberkas. Venison sausage pastrami cow andouille jowl picanha doner meatloaf porchetta short ribs. Flank swine rump landjaeger jerky. Andouille pork brisket pork chop ribeye doner shoulder tri-tip burgdoggen. Sausage turducken chicken spare ribs. Pork pancetta meatloaf corned beef short loin tongue, pork belly doner tenderloin turkey strip steak sausage."
    },
    {
        name: "Swimming",
        image: "http://www.wolfstad.com/dcw/images/comics/fullsize/it_pkna42.jpg",
        description: "Bacon ipsum dolor amet ball tip ham hock landjaeger flank tongue tail corned beef ground round chicken pastrami cupim jerky sirloin t-bone leberkas. Venison sausage pastrami cow andouille jowl picanha doner meatloaf porchetta short ribs. Flank swine rump landjaeger jerky. Andouille pork brisket pork chop ribeye doner shoulder tri-tip burgdoggen. Sausage turducken chicken spare ribs. Pork pancetta meatloaf corned beef short loin tongue, pork belly doner tenderloin turkey strip steak sausage."
    },
];

function seedDB(){
    //Remove all heroes
    Hero.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed heroes!");
        //add a few heroes
        data.forEach(function(seed){
            Hero.create(seed, function(err, hero){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a hero");
                    //create a comment
                    Comment.create(
                        {
                            text:   "Pk is great!",
                            author: "Lyla"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                hero.comments.push(comment);
                                hero.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
    
    //add a few comments
}

module.exports = seedDB;