// code to read and set any environment variables with the dotenv package
require("dotenv").config();

// other required packages
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var inquirer = require("inquirer");

// code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// able to access your keys information like so
var spotify = new Spotify(keys.spotify);

// first prompt question lets the user selects one of four commands
inquirer
  .prompt([
    {
      type: "list",
      name: "command",
      message: "Select a command:",
      choices: [
        "concert-this",
        "spotify-this-song",
        "movie-this",
        "do-what-it-says"
      ]
    }
  ])
  .then(function(answer) {
    var command = answer.command;
    var fullCommand = [];

    if (command) {
      fullCommand.push(command);
    }

    // if command is anything except "do-what-it-says", the user will be prompted to enter a search term
    if (command !== "do-what-it-says") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "userInput",
            message: "What would you like to search for?"
          }
        ])
        .then(function(answer) {
          userInput = answer.userInput;

          if (userInput) {
            fullCommand.push(userInput);
            log("\n" + "\ncommand line: " + fullCommand);

            userInputArray = userInput.split(" ");
            userInput = userInputArray.join("+");

            if (command === "spotify-this-song") {
              spotiFy(userInput);
            }
            if (command === "movie-this") {
              movie(userInput);
            }
            if (command === "concert-this") {
              bandsInTown(userInput);
            }
          }

          if (command === "concert-this" && !userInput) {
            console.log("Please enter a band/artist to search!");
          }
          if (command === "spotify-this-song" && !userInput) {
            spotiFy(userInput);
          }
          if (command === "movie-this" && !userInput) {
            movie(userInput);
          }
        });
    }

    if (command === "do-what-it-says") {
      log("\n" + "\ncommand line: " + fullCommand);

      random();
    }
  });

function log(text) {
  fs.appendFile("log.txt", text, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

function bandsInTown(artistName) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artistName +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      bandsInTownResponse(response);
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function bandsInTownResponse(y) {
  for (let index = 0; index < y.data.length; index++) {
    var venueName = y.data[index].venue.name;
    var venueCity = y.data[index].venue.city;
    var eventDateUnformatted = y.data[index].datetime;
    eventDateSplit = eventDateUnformatted.split("T");
    eventDateFormat = "YYYY-MM-DD";
    convertedDate = moment(eventDateSplit[0], eventDateFormat);
    formattedDate = convertedDate.format("MM/DD/YYYY");

    console.log("Name of Venue:" + venueName);
    console.log("Venue Location:" + venueCity);
    console.log("Date of Event:" + formattedDate);
    console.log(" ");

    log(
      "\nResponse: " +
        "\n    Venue Name: " +
        venueName +
        "\n    Venue Location: " +
        venueCity +
        "\n    Event Date: " +
        formattedDate
    );
  }
}

function spotiFy(song) {
  if (song) {
    spotify.search({ type: "track", query: song }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      spotiFyResponse(data);
    });
  } else {
    spotify.search({ type: "track", query: "The Sign" }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      spotiFyResponse(data);
    });
  }
}

function spotiFyResponse(y) {
  var artistName = y.tracks.items[0].artists[0].name;
  var songName = y.tracks.items[0].name;
  var previewLink = y.tracks.items[0].preview_url;
  var albumName = y.tracks.items[0].album.name;

  console.log("Artist(s): " + artistName);
  console.log("song name: " + songName);
  console.log("Spotify Preview link: " + previewLink);
  console.log("From Album: " + albumName);

  log(
    "\nResponse: " +
      "\n    Artist(s) Name: " +
      artistName +
      "\n    Song Name: " +
      songName +
      "\n    Spotify Preview Link: " +
      previewLink +
      "\n    From Album: " +
      albumName
  );
}

function movie(movieInput) {
  if (movieInput) {
    axios
      .get(
        "http://www.omdbapi.com/?t=" +
          movieInput +
          "&y=&plot=short&apikey=trilogy"
      )
      .then(function(response) {
        movieResponse(response);
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  } else {
    axios
      .get(
        "http://www.omdbapi.com/?t=" +
          "Mr. Nobody" +
          "&y=&plot=short&apikey=trilogy"
      )
      .then(function(response) {
        movieResponse(response);
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
}

function movieResponse(y) {
  var response = y.data;

  var movieTitle = response.Title;
  var released = response.Year;
  var imdbRating = response.imdbRating;
  var rottenRating = response.Ratings[1].Value;
  var countryProducted = response.Country;
  var language = response.Language;
  var moviePlot = response.Plot;
  var actors = response.Actors;

  console.log("Movie Title:" + movieTitle);
  console.log("Year Released: " + released);
  console.log("IMDB Rating: " + imdbRating);
  console.log("Rotten Tomatoes Rating: " + rottenRating);
  console.log("Country where produced: " + countryProducted);
  console.log("Language: " + language);
  console.log("Movie Plot: " + moviePlot);
  console.log("Actors: " + actors);

  log(
    "\nResponse: " +
      "\n    Movie Title: " +
      movieTitle +
      "\n    Year Released: " +
      released +
      "\n    IMDB Rating: " +
      imdbRating +
      "\n    Rotten Tomatoes Rating: " +
      rottenRating +
      "\n    Country where Produced: " +
      countryProducted +
      "\n    Language: " +
      language +
      "\n    Movie Plot: " +
      moviePlot +
      "\n    Actors: " +
      actors
  );
}

function random() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");

    var command1 = dataArr[0];
    var title = dataArr[1];

    if (command1 === "concert-this") {
      bandsInTown(title);
    }
    if (command1 === "spotify-this-song") {
      spotiFy(title);
    }
    if (command1 === "movie-this") {
      movie(title);
    }
  });
}
