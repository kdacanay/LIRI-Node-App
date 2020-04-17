//------Variables

require("dotenv").config(); 
var keys = require("./keys.js");
//----node Spotify package to retrieve song information-------//
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var axios = require("axios");
// var fs = require("fs");
var moment = require("moment");
//------user input variables
var chooseAPI = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

//-----switch-case statements for each function to run------//

switch(chooseAPI) {
    case "concert-this":
          concertThis(userInput);
          break;
   
    case "spotify-this-song":
          if (!userInput) {
          
            console.log("\nNo request made, the default song is: ");
            spotifyThisSong("The Sign, Ace of Base");
          
          } else {
          
            spotifyThisSong(userInput);
            break;
          }
    case "movie-this":
          if (!userInput) {

            console.log("\nIf you haven't watched 'Mr. Nobody', then you should: ");
            movieThis("Mr. Nobody");
            console.log("\nIt's on Netflix!");

          } else {

          movieThis(userInput);
          break;
          } 
};

//-----Bands in Town Search Function----------------////
//-----Axios and Bands In Town----------------------////
//-------prints out a searched band/artist:---------// 
//-------name of venue, location, and date----////

function concertThis (userInput) {

    console.log("\nSearching BandsInTown for your request...");
    
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    
    axios({
        method: "GET",
        url: queryURL
    }) 
    .then(function(response) {

        console.log("\nHere are your results...");
        
        console.log("\n===========================================");
        
        //---use for loop w/variables to display in console-----//
        for (var i=0; i<response.data.length; i++) {

            var venue = response.data[i].venue.name;
            var location = response.data[i].venue.city + ", " + response.data[i].venue.region;
            var date = moment(response.data[i].datetime).format("MM/DD/YYYY");
        
            //---use \n to seperate results into readable lines---------------//
            console.log(
                "\n" + "Artist/Band: " + userInput + 
                "\n" + "Venue: " + venue +
                "\n" + "Location: " + location +
                "\n" + "Date: " + date 
            ); 
            console.log("\n============================================");
        }
    });
}

//----------Spotify Function -----------------------------//
//------prints out searched song name:---------------//
//---------Artist, song's name, preview link from Spotify----------//
//-----------Album song is from------------------------------//

function spotifyThisSong(userInput) {
        
        spotify.search ({

            type: "track",
            query: userInput,
            limit: 20

    }, function (err, response) {

        if (err) {
            return console.log("Error has occurred" + err);
        }
       
        var artist = response.tracks.items[0].album.artists[0].name;
        var song = response.tracks.items[0].name;
        var album = response.tracks.items[0].album.name;
        var previewLink = response.tracks.items[0].preview_url;

        console.log("\nHere are your results of the song your requested...");
        
        console.log("\n=========================================");
        
        console.log(
        "\nArtist/Band: " + artist +
        "\nTrack Title: " + song +
        "\nAlbum Name: " + album +
        "\nPreview Song: " + previewLink
           );
        console.log("\n=========================================");
        })
    };

//----------OMDB Function ---------------------------------------//
//----------Prints out: Title, Year, IMDB rating, ---------------//
//----------Rotten Tomatoes Rating, Country, Language-------------//
//----------Plot, Actors -----------------------------------------//

function movieThis(userInput) {

        console.log("Searching for your movie...");

        var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + userInput;

        axios({
            method: "GET",
            url: queryURL
        })
        .then(function(response) {

            var title = response.data.Title;
            var year = response.data.Year;
            var imdb = response.data.imdbRating;
            var rotTom = response.data.Ratings[1].Value;
            var country = response.data.Country;
            var language = response.data.Language;
            var plot = response.data.Plot;
            var actors = response.data.Actors;

            console.log("\nHere are your results: ");

            console.log("\n=========================================");

            console.log(
                "\nTitle: " + title +
                "\nYear: " + year +
                "\nIMDB Rating: " + imdb +
                "\nRotten Tomatoes: " + rotTom +
                "\nCountry: " + country +
                "\nLanguage: " + language +
                "\nPlot: " + plot +
                "\nActors: " + actors 
            );
            console.log("\n=========================================");
        });
    }
