# LIRI-NODE-APP

LIRI is a *Language Interpretation and Recognition Interface*.  It is a command line node app that takes a user's input, retrieves the requested data, and displays it back to the user.  LIRI sends requests using the ```axios``` package

* Bands in Town API (used for concerts)
* OMDB (movies)
* Spotify(songs)  

LIRI also will use the ```dotenv``` package to set variables specific to the computer running node, keeping the API keys private for Spotify, using ```.gitignore``` as well.  LIRI will also use the ```moment``` package to format dates in the concert search.

# Overview

The LIRI app uses four main commands: 

* ```concert-this``` (searches Bands in Town API)
* ```spotify-this-song``` (searches Spotify API)
* ```movie-this``` (searches OMDB API)
* ```do-what-it-says``` (runs the command and search item in ```random.txt``` file)

Using the command line, I navigated to the correct repository to run ```npm install```, which installs the necessary code packages needed for LIRI.  I also ran ```npm init -y```, which created the ```package.json``` file that is needed for third party npm packages.  There is also 2 text files: ```random.txt``` and ```log.txt```.  The ```liri.js``` file contains the Javascript code. 

# Liri.js

**Variables**

<img src="screenshots/SShotVariables.png" width = 500>

* ```chooseAPI``` variable takes user input for chosen command, which will be 2nd argument in array
* ```userInput``` variables takes user input for search item, 3rd in array

#### Switch-case Statement

<img src="screenshots/SShotSwitchStatements.png" width=500>

* switch-case statement switches between functions and runs them
* also runs default searches if ```userInput``` is blank and program is ran

#### Concert-This Function 

<img src="screenshots/SShotConcertThisFunction.png" width=500>

* uses ```axios``` package to retrieve data from *Bands in Town API*
* for loop to loop through response, retrieves requested artist/band input and displays:
    * Artist/Band
    * Venue
    * Location
    * Date

* Input: ```node liri.js concert-this {name of band/artist}``` on command line
* Screenshot Using ```concert-this``` function:
   
 <img src="screenshots/SSConcertBash.png" width=500>

#### Spotify-This-Song Function

<img src="screenshots/SShotSpotifyFunction.png" width=500>

* searches *track* information from *Spotify API*, limited to 10 results
* retrieves requested song title input and displays:
    * Artist/Band
    * Song Title
    * Album Name
    * Preview Link
    
* Input: ```node liri.js spotify-this-song {title of song}``` on command line
* Screenshot using ```spotify-this-song``` function:

<img src="screenshots/SSSpotifyBash.png" width=500>
    
#### Movie-This Function

<img src="screenshots/SShotMovieFunction.png" width=500>

* uses ```axios``` package to retrieve data from *OMDB API*
* retrieves requested movie input and displays:
   * Movie Title
   * Year
   * IMDB Rating
   * Rotten Tomatoes Rating
   * Country
   * Language
   * Plot
   * Actors
 
* Input: ```node liri.js movie-this {movie title}``` on command line
* Screenshot using ```movie-this``` function:

<img src="screenshots/SSMovieBash.png" width=500>

#### Do-What-It-Says Function

<img src="screenshots/SShotDoWhatItSaysFunction.png" width=500>

* uses ```fs.readfile``` function to read ```random.txt``` file, where user enters one of three commands, and displays results:

* ```concert-this```

<img src="screenshots/SSDoWhatItSaysConcert.png" width=500>

* Input: ```node liri.js do-what-it-says``` on command line
* Screenshot using "do-what-it-says" function

<img src="screenshots/SSDoWhatItSaysConcert(1).png" width=500>

* ```movie-this```

<img src="screenshots/SSDoWhatItSaysMovie.png" width=500>

* Input: ```node liri.js do-what-it-says``` on command line
* Screenshot using "do-what-it-says" function

<img src="screenshots/SSDoWhatItSaysMovie(1).png" width=500>

* ```spotify-this-song```

<img src="screenshots/SSDoWhatItSaysSpotifyBash.png" width=500>

* Input: ```node liri.js do-what-it-says``` on command line
* Screenshot using "do-what-it-says" function

<img src="screenshots/SSDoWhatItSaysSpotifyBash(1).png" width=500>

#### LogText Function

<img src="screenshots/SShotLogTextFunction.png" width=500>

* used ```fs.appendFile``` to read user's input and appends them to ```log.txt```
* each time user uses any of four functions, retrieved data is logged to ```log.txt```
* each log date stamped using ```moment``` package, located within each function:

   * ```var time = moment().format("DD-MM-YYYY h:mm:ss");```
   
* Screenshots of data logs:

<img src="screenshots/logtxt1.png" width=500>

<img src="screenshots/logtxt2.png" width=500>

<img src="screenshots/logtxt3.png" width=500>













