var fs = require("fs");
var keys = require("./keys.js");
var figlet = require("figlet");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var action = process.argv[2];
var value = process.argv[3];


switch (action) {
    case "my-tweets":
        twitter();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        omdb();
        break;

    case "do-what-it-says":
        doIt();
        break;
}


function twitter() {

    figlet('Twitter API', function (err, data) {
        console.log('\n');
        console.log(data)
    });

    var client = new Twitter(keys);
    var params = {
        screen_name: 'wehbDesign'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log('\n');
            console.log('            ===================================');
            console.log('\n');
            for (var i = 0; i < tweets.length; i++) {

                console.log('Tweet: ' + tweets[i].text + ' / Created: ' + tweets[i].created_at);
            }
            console.log('\n');
            console.log('            ===================================');
            console.log('\n');
        }
    });
}

function spotify() {

    figlet('Spotify API', function (err, data) {
        console.log('\n');
        console.log(data)
    });

    var spotify = new Spotify({
        id: 'ad0474555b81410ea40a3803de6fbeca',
        secret: '42afa4e301754eababc266767c570a5b'
    });

    if (value === undefined) {

        spotify.search({
            type: 'track',
            limit: 1,
            query: 'The Sign Ace Of Base'
        }, function (err, data) {

            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var jsonResults = JSON.stringify(data.tracks.items[0]);
            var artistsName = JSON.stringify('Artist Name: ' + data.tracks.items[0].album.artists[0].name);
            var songName = JSON.stringify('Song Name: ' + data.tracks.items[0].name);
            var previewLink = JSON.stringify('Preview Link: ' + data.tracks.items[0].preview_url);
            var albumName = JSON.stringify('Album Name: ' + data.tracks.items[0].album.name);

            console.log('\n');
            console.log('            ===================================');
            console.log('\n');
            console.log(artistsName);
            console.log(songName);
            console.log(previewLink);
            console.log(albumName);
            console.log('\n');
            console.log('            ===================================');
            console.log('\n');

        });

    } else {

        spotify.search({
            type: 'track',
            limit: 1,
            query: value
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var jsonResults = JSON.stringify(data.tracks.items[0]);
            var artistsName = JSON.stringify('Artist Name: ' + data.tracks.items[0].album.artists[0].name);
            var songName = JSON.stringify('Song Name: ' + data.tracks.items[0].name);
            var previewLink = JSON.stringify('Preview Link: ' + data.tracks.items[0].preview_url);
            var albumName = JSON.stringify('Album Name: ' + data.tracks.items[0].album.name);

            console.log('\n');
            console.log('            ===================================');
            console.log('\n');
            console.log(artistsName);
            console.log(songName);
            console.log(previewLink);
            console.log(albumName);
            console.log('\n');
            console.log('            ===================================');
            console.log('\n');

        });
    }
}

function omdb() {

    figlet('ODMb API', function (err, data) {
        console.log('\n');
        console.log(data)
    });

    if (value === undefined) {

        defaultSearch = 'http://www.omdbapi.com/?apikey=40e9cece&t=mr.nobody'
        request(defaultSearch, function (error, response) {
            var results = JSON.parse(response.body);

            console.log('\n');
            console.log('            ===================================');
            console.log('\n');
            console.log('Movie Title: ' + results.Title);
            console.log('Release Year: ' + results.Year);
            console.log(results.Ratings[0].Source + ' ' + results.Ratings[0].Value);
            console.log(results.Ratings[1].Source + ' ' + results.Ratings[1].Value);
            console.log('Country: ' + results.Country);
            console.log('Language: ' + results.Language);
            console.log('Plot: ' + results.Plot);
            console.log('Actors: ' + results.Actors);
            console.log('\n');
            console.log('            ===================================');
            console.log('\n');

        });

    } else {

        var movieQuery = 'http://www.omdbapi.com/?apikey=40e9cece&t=' + value;
        request(movieQuery, function (error, response) {
            var results = JSON.parse(response.body);

            console.log('\n');
            console.log('            ===================================');
            console.log('\n');
            console.log('Movie Title: ' + results.Title);
            console.log('Release Year: ' + results.Year);
            console.log(results.Ratings[0].Source + ' ' + results.Ratings[0].Value);
            console.log(results.Ratings[1].Source + ' ' + results.Ratings[1].Value);
            console.log('Country: ' + results.Country);
            console.log('Language: ' + results.Language);
            console.log('Plot: ' + results.Plot);
            console.log('Actors: ' + results.Actors);
            console.log('\n');
            console.log('            ===================================');
            console.log('\n');

        });
    }
}

function doIt() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var output = data.split(",");
        action = output[0];
        value = output[1];

        console.log('\n');
        console.log(output);

        switch (action) {
            case "my-tweets":
                twitter();
                break;

            case "spotify-this-song":
                spotify();
                break;

            case "movie-this":
                omdb();
                break;

            case "do-what-it-says":
                doIt();
                break;
        }

    });
}