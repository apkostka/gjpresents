
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res){
	res.render('index', { title: 'Express' });
});

var io = require('socket.io').listen(app.listen(app.get('port')));
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

var Twit = require('twit');
var T = new Twit({
	consumer_key: 'qMN0bEAf2zAxJ5xj88HOhw',
	consumer_secret: 'oyIaJDMjQ36m4RpSxErNfxWVH63MYnXLb5u9mspdCo',
	access_token: '1706015071-KGbKCIZqC7BFQVqJwshUa8XJiw71xNFONNqw8ig',
	access_token_secret: 'k4LAreow3M3eX56KdyI5ANexrKlopATZH0bV7Wmr9TQ'
});

var stream = T.stream('user', { track: ['gjpresents'] });

io.sockets.on('connection', function(socket){

	var feed = T.get('search/tweets', 
  	{ q: 'infographic -RT', count: 6 },
  	function(err,reply){
  		if(err) console.log(err);
  		socket.emit('feed', { feed: reply.statuses });
  	}
  );

  var timeline = T.get('statuses/mentions_timeline', 
  	{ count: 6 },
  	function(err,reply){
  		if(err) console.log(err);
  		socket.emit('timeline', { timeline: reply });
  	}
  );
  
  stream.on('connect', function(){
  	socket.emit('TwitConnect', { message: 'Connected' });
  });
	stream.on('tweet', function(tweet){
		socket.emit('tweet', { tweet: tweet });
	});
});