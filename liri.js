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