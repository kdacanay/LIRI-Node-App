//------Variables-------------------------------------------//

require("dotenv").config(); 
var keys = require("./keys.js");

//----node Spotify package to retrieve song information-------//
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs = require("fs");
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
    
    case "do-what-it-says":
          doWhatItSays();
          
          break;      
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

            //-------used for log.txt---------------------------------//
            var time = moment().format("DD-MM-YYYY h:mm:ss");

            logText("\n===============New Log====================" + "\nDate/Time: " + time 
            + "\nArtist/Band: " + userInput + "\nVenue: " + venue + "\nLocation: " + location + "\nDate: " + date); 
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
            limit: 10

    }, function (err, response) {

        if (err) {
            return console.log("Error has occurred" + err);
        }
        for (var i=0; i<response.tracks.items.length; i++) {
        var artist = response.tracks.items[i].artists[0].name;
        var song = response.tracks.items[i].name;
        var album = response.tracks.items[i].album.name;
        var previewLink = response.tracks.items[i].preview_url;

        console.log("\nHere are your results of the song your requested...");
        
        console.log("\n=========================================");
        
        console.log(
        "\nArtist/Band: " + artist +
        "\nTrack Title: " + song +
        "\nAlbum Name: " + album +
        "\nPreview Song: " + previewLink
           );

        console.log("\n=========================================");
        
        //------used for log.txt---------------------------//

        var time = moment().format("DD-MM-YYYY h:mm:ss");

        logText("\n===============New Log====================" + "\nDate/Time: " + time + 
        "\nArtist: " + artist + "\nSong: " + song + "\nAlbum: " + album + 
        "\nPreview: " + previewLink);
        }  
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
            
            //------used for log.txt-------------------------------//
            var time = moment().format("DD-MM-YYYY h:mm:ss");

            logText("\n===============New Log====================" + "\nDate/Time: " + time + 
            "\nTitle: " + title + "\nYear: " + year + "\nIMDB" + imdb + "\nActors:" 
            + actors + "\nRotten Tomatoes: " + rotTom + "\nCountry: " + country + "\nPlot: " + plot);
        
        });
    }

//-----------Do What It Says Function------------------//
//-----------use fs node package to use random.txt file---------//
//-----------to call one of the LIRI commands--------------------//

function doWhatItSays () {

        fs.readFile("random.txt", "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }
            console.log("\n=========================================");

            console.log(data);

            var dataArray = data.split(",");
            var dataChoose = dataArray[0];
            var dataInput = dataArray[1];

            if (dataChoose === "spotify-this-song") {
                spotifyThisSong(dataInput);
            }
            else if (dataChoose === "movie-this") {
                movieThis(dataInput);
            }
            else if (dataChoose === "concert-this") {
                concertThis(dataInput);
            }
            else {
                console.log("There has been an error. Please try again.")
            }
         })
}

//-----------Log.txt Functions-----------------------------------//
//---------output the data to a .txt file called log.txt----------//
//----------do not overwrite your file each time command is ran--------//

function logText(text) {

        fs.appendFile("log.txt", text, function(err) {

        if (err) {
            console.log(err);
}
})
};
//-----run logText function in each function to log inputs-----------//
