var fs = require("fs");
var keys = require("./keys.js");

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
        imdb();
        break;

    case "do-what-it-says":
        doIt();
        break;
}


function twitter() {

    var Twitter = require('twitter');
    var client = new Twitter(keys);
    var params = {
        screen_name: 'wehbDesign'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {

                console.log('Tweet: ' + tweets[i].text + ' / Created: ' + tweets[i].created_at);
            }
        }
    });
}

function spotify() {

    if (value === undefined) {

        var Spotify = require('node-spotify-api');
        var spotify = new Spotify({
            id: 'ad0474555b81410ea40a3803de6fbeca',
            secret: '42afa4e301754eababc266767c570a5b'
        });
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

            console.log(artistsName);
            console.log(songName);
            console.log(previewLink);
            console.log(albumName);

        });

    } else {

        var Spotify = require('node-spotify-api');
        var spotify = new Spotify({
            id: 'ad0474555b81410ea40a3803de6fbeca',
            secret: '42afa4e301754eababc266767c570a5b'
        });
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

            console.log(artistsName);
            console.log(songName);
            console.log(previewLink);
            console.log(albumName);

        });
    }
}

function imdb() {


    if (value === undefined) {

        defaultSearch = 'http://www.omdbapi.com/?apikey=40e9cece&t=mr.nobody'
        var request = require('request');
        request(defaultSearch, function (error, response) {
            var results = JSON.parse(response.body);

            console.log('Movie Title: ' + results.Title);
            console.log('Release Year: ' + results.Year);
            console.log(results.Ratings[0].Source + ' ' + results.Ratings[0].Value);
            console.log(results.Ratings[1].Source + ' ' + results.Ratings[1].Value);
            console.log('Country: ' + results.Country);
            console.log('Language: ' + results.Language);
            console.log('Plot: ' + results.Plot);
            console.log('Actors: ' + results.Actors);

        });

    } else {
        var movieQuery = 'http://www.omdbapi.com/?apikey=40e9cece&t=' + value;

        var request = require('request');
        request(movieQuery, function (error, response) {
            var results = JSON.parse(response.body);

            console.log('Movie Title: ' + results.Title);
            console.log('Release Year: ' + results.Year);
            console.log(results.Ratings[0].Source + ' ' + results.Ratings[0].Value);
            console.log(results.Ratings[1].Source + ' ' + results.Ratings[1].Value);
            console.log('Country: ' + results.Country);
            console.log('Language: ' + results.Language);
            console.log('Plot: ' + results.Plot);
            console.log('Actors: ' + results.Actors);

        });
    }
}

function doIt() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var output = data.split(",");

        for (var i = 0; i < output.length; i++) {

            console.log(output[i]);
        }
    });
}