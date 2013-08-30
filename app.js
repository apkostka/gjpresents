
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

io.sockets.on('connection', function(socket){
	var Twit = require('twit');
	var T = new Twit({
		consumer_key: '2SyDSvXmNovejvtYHiEGVQ',
		consumer_secret: 'j4x75dLiQs6T5MOcfUfNP0wm4gzwxwCN1h2GQxX3w',
		access_token: '73980942-fbl5WWJD7SP4mdZzjhomXkh6Z7L5sTOuft3gs2Z08',
		access_token_secret: 'Fdj6NyRteSsnmI06qmgf8nsCoSXfBueSkMVkHzV4A'
	});

  var stream = T.stream('user', { track: ['AndrewKostka'] });
  stream.on('connect', function(){
  	socket.emit('TwitConnect', { message: 'Connected' });
  });
	stream.on('tweet', function(tweet){
		socket.emit('tweet', { tweet: tweet });
	});
});