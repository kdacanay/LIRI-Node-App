//------Variables

require("dotenv").config(); 
// var keys = require("./keys.js");

// var spotify = new spotify(keys.spotify);
var axios = require("axios");
// var fs = require("fs");
var moment = require("moment");
//------user input variables
var chooseAPI = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

//-----switch-case statements for each function to run------//
//------if/else statements if no userInput is made-----------//
switch(chooseAPI) {

    case "concert-this":
        if (userInput) {
            bandsinTown(userInput);
        }
        break;

}

//-----Bands in Town Search Function----------------////
//-----Axios and Bands In Town----------------------////
//-------prints out a searched band/artist:---------// 
//-------name of venue, location, and date----////

function bandsinTown (userInput) {

    console.log("Searching BandsInTown for your request...");
    
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    
    axios({
        method: "GET",
        url: queryURL
    }) 
    .then(function(response) {
        console.log("Here are your results....");
        //---use for loop w/variables to display in console-----//
        for (var i=0; i<response.data.length; i++) {

            var venue = response.data[i].venue.name;
            var location = response.data[i].venue.city + ", " + response.data[i].venue.region;
            var date = moment(response.data[i].datetime).format("MM/DD/YYYY");
        //---use \n to seperate results---------------//
            console.log(
                "\n" + "Artist/Band: " + userInput + 
                "\n" + "Venue: " + venue +
                "\n" + "Location: " + location +
                "\n" + "Date: " + date 
            ); 
        }
    });
}