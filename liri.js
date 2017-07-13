//log.txt
//spotify this ace of base

var userCommand = process.argv[2];
var nodeArgs = process.argv;

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');


var spotify = new Spotify({
  id: '9461e9f48abe4e4fb804c2af0eba711b',
  secret: '3c771f191c804a4fb1300893c942b992'
});

function doWhatItSays(){
	fs.readFile('random.txt', "utf8", function(err, data) {
		if (err) {
	    	console.log(err);
	  	}
	  	else {
	    	var dataArr = data.split(', ');
	    	var songName = dataArr[1].slice(1, -1);
	  	}
	spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
		}
		else {
		  	// console.log(data);
		  	var songs = data.tracks.items;
		  	// console.log(songs);
		  	songs.forEach(function(song) {
		  		console.log(song.preview_url);
		  		console.log(song.album.artists[0].name);
		  		console.log(song.name);
		  		console.log(song.album.name);
		  		console.log('------------------------------');
		 	});
		}
	});
	});
}

function spotifyThis(){
	var songName = '';
		if (process.argv[3] === undefined){
			songName = 'The Sign';
		} 
		else {
			songName = process.argv.slice(3).join(" ");
		}

	spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	  else {
	  	// console.log(data);
	  	var songs = data.tracks.items;
	  	// console.log(songs);
	  	songs.forEach(function(song) {
	  		console.log(song.preview_url);
	  		console.log(song.album.artists[0].name);
	  		console.log(song.name);
	  		console.log(song.album.name);
	  		console.log('------------------------------');
	  	});
	  }
	});
};

function myTweets(){
	var key = require("./keys.js");
	var client = new Twitter(key.twitterKeys);
	var params = {
		screen_name: 'jk_rowling'
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error && response.statusCode === 200){
			for(var i = 0; i < tweets.length; i++){
			console.log(tweets[i].text);
			console.log(' ');
			}
		}
	});
};

function movieThis(){
	var movieName = '';
		if (process.argv[3] === undefined){
			movieName = 'Mr. Nobody';
			console.log('Watch Mr. Nobody!');
		} 
		else {
			movieName = process.argv.slice(3).join(" ");
		}

	var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryURL, function(error, response, body){
		if (!error && response.statusCode === 200 && userCommand !== " "){
			
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}

function addToTextFile(){
	fs.appendFile('log.txt', ', ' +  function(err) {
	if (err) {
	    console.log(err);
	  	}
	  	else {

	  	}
	});
}


switch (userCommand){
	case 'movie-this':
		movieThis();
		break;
	case 'my-tweets': 
		myTweets();
		break;
	case 'spotify-this':
		spotifyThis();
		break;
	case 'do-what-it-says':
		doWhatItSays();
		break;
}





