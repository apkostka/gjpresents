
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	var Twit = require('twit');
	var T = new Twit({
		consumer_key: '2SyDSvXmNovejvtYHiEGVQ',
		consumer_secret: 'j4x75dLiQs6T5MOcfUfNP0wm4gzwxwCN1h2GQxX3w',
		access_token: '73980942-fbl5WWJD7SP4mdZzjhomXkh6Z7L5sTOuft3gs2Z08',
		access_token_secret: 'Fdj6NyRteSsnmI06qmgf8nsCoSXfBueSkMVkHzV4A'
	});

  var stream = T.get('search/tweets', 
  	{ q: 'infographics -RT', count: 6 },
  	function(err,reply){
  		if(err) console.log(err);
  		res.render('index', { title: 'Express', tweets: reply.statuses });
  	}
  );
};