## LIRI Bot 
Coding Bootcamp Homework #10: Introduction to Node.js


### Technical Description

LIRI is a Language Interpretation and Recognition Interface that searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

* Overview:
    - This application is a command line node app that will take in a user input and return a response as programmed

* How it works:
    - Once the app file is initiated in the command line, the user is prompted to choose one of four commands

    - When searching for a band or artist using the "concert-this" command, 
    it will return a list of all events that are available on bands in town with the following data for each:
        venue name
        venue location
        event date

    - When searching for a song by title using the "spotify-this-song" command, 
    it will return the following data:
        Artist(s) name(s)
        The song's name
        A preview link of the song from Spotify
        The album that the song is from

    If no song is provided then your program will default to "The Sign" by Ace of Base.

    - When searching for a movie by title using the "movie-this" command, 
    it will return the following data:
        Title of the movie
        Year the movie came out
        IMDB Rating of the movie
        Rotten Tomatoes Rating of the movie
        Country where the movie was produced
        Language of the movie
        Plot of the movie
        Actors in the movie

    If no movie is provided, the program will output data for the movie 'Mr. Nobody.'

    - When you select "do-what-it-says" command: the app runs  what is designated in the random.txt file. The random.txt file must contain an input for any of the three other functions plus a search parameter


    - All input and output data will also be logged in the log.txt file


* Technologies used:
    - Inquirer prompt method
    - NPM packages
    -  Javascript/jQuery 
        - data validation
        - conditional statements
        - API calls/AJAX
        - for loops


* Technical Approach

    - The app is initiated with the inquirer prompt method to capture which command the user wants to run. If anything other than the 'do-what-it-says' command is selected, the user will be prompted to input an item to search.  If concert-this is selected and the user does not enter an item to search, the app will stop running.  Otherwise, the app will return the appropriate data. If the user selects the 'do-what-it-says' command, the app will run as programmed without another prompt.  
    - Each command is contained in a function, with the response and output of each command is a separate function called inside
    - Plus a function for logging the correct data to the log.txt file




![Gif-1](./gifs/liri_gif_1.gif)

![Gif-2](./gifs/liri_gif_2.gif)

![Gif-3](./gifs/liri_gif_3.gif)