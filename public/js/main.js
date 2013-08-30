//Effectiveness graph data
var barData = {
	labels : ["With Pictures","Without"],
	datasets : [
		{
			fillColor : "rgba(54,129,200,0.5)",
			strokeColor : "rgba(54,129,200,1)",
			pointStrokeColor : "#fff",
			data : [95,35]
		},
		{
			fillColor : "rgba(209,85,77,0.5)",
			strokeColor : "rgba(209,85,77,1)",
			pointStrokeColor : "#fff",
			data : [65,20]
		}
	]
};
var options = {
	scaleOverride: true,
	scaleSteps: 10,
	scaleStepWidth: 10,
	scaleStartValue: 0,
	scaleFontFamily: "'Open Sans',sans-serif",
	scaleFontSize: 20,
	barValueSpacing: 120,
	barDatasetSpacing: 10,
	animationEasing: 'easeInOutQuint'
};

//Trends graph data
var trendData = {
	labels : ["2009","2010","2011","2012","2013"],
	datasets : []
};
var twitterData = {
	fillColor : "rgba(54,129,200,0.5)",
	strokeColor : "rgba(54,129,200,1)",
	pointColor : "rgba(54,129,200,1)",
	pointStrokeColor : "#fff",
	data : [10,20,30,40,50]
};
var googleData = {
	fillColor : "rgba(209,85,77,0.5)",
	strokeColor : "rgba(209,85,77,1)",
	pointColor : "rgba(209,85,77,1)",
	pointStrokeColor : "#fff",
	data : [30,40,50,60,70]
};
var lineOptions = {
	scaleOverride: true,
	scaleSteps: 10,
	scaleStepWidth: 10,
	scaleStartValue: 0,
	scaleFontFamily: "'Open Sans',sans-serif",
	scaleFontSize: 20,
	animationEasing: 'easeInOutQuint'
};

//Bottom Line graph data
var pieData = [
	{
		value: 15,
		color: '#3681C8'
	},
	{
		value: 85,
		color: '#D1554D'
	}
];
function pieCallback() {
	$('#bottomLine h2.yes').fadeTo(500,1,function(){
		$('#bottomLine h2.hellYes').delay(500).fadeTo(500,1);
	});
};
var pieOptions = {
	segmentShowStroke: true,
	segmentStrokeColor: '#154A7B',
	segmentStrokeWidth: 2,
	animation: true,
	animationSteps: 50,
	animationEasing: 'easeInOutQuint',
	animateRotate: true,
	onAnimationComplete: pieCallback
};

//DOM manipulation - GO!!!
jQuery(function($){

	$('#intro').height($(window).height());

	$('#whatAreThey #dummyInfographic').waypoint(function(direction){
		$('#dummyInfographic .text').delay(200).fadeTo(500,1,function(){
			$('#dummyInfographic .chart').delay(500).fadeTo(500,1,function(){
				$('#dummyInfographic .illustration').delay(500).fadeTo(500,1);
			});
		});
	}, { offset: 'bottom-in-view' });

	//Effectiveness chart
	$('a.makeChart').on('click', function(e){	
		e.preventDefault();
		$('.makeChart').fadeOut(500,function(){
			$('#whyEffective .chrome-frame p').addClass('blur');
			
			//Make Chart
			$('#whyEffective .chrome-frame .chart').html('<canvas id="readChart" width="'+$('#whyEffective .chrome-frame .chart').width()+'" height="400"></canvas><ul class="legend"><li class="blue">Read</li><li class="red">Retain</li></ul>');
			var ctx = $('#readChart').get(0).getContext('2d');
			var newChart = new Chart(ctx).Bar(barData, options);
		});
		return false;
	});

	//Trends chart
	function trendChart(datasets) {
		trendData.datasets = datasets;
		var ctx = $('#trendChart').get(0).getContext('2d');
		var newChart = new Chart(ctx).Line(trendData, lineOptions);
	}
	$('#whoUses .chart').html('<canvas id="trendChart" width="'+$('#whoUses .chart').width()+'" height="400"></canvas>');
	var datasets = [googleData,twitterData];
	trendChart(datasets);

	$('#whoUses .trendSort a.google').on('click', function(e){
		e.preventDefault();
		trendChart([googleData]);
		return false;
	});
	$('#whoUses .trendSort a.twitter').on('click', function(e){
		e.preventDefault();
		trendChart([twitterData]);
		return false;
	});
	$('#whoUses .trendSort a.plus').on('click', function(e){
		e.preventDefault();
		trendChart([googleData,twitterData]);
		return false;
	});

	//Should We chart
	$('#bottomLine .chart').waypoint(function(){
		var ctx = $('#bottomLine .chart canvas').get(0).getContext('2d');
		var newChart = new Chart(ctx).Pie(pieData, pieOptions);
	}, { offset: 'bottom-in-view', triggerOnce: true });

	//Twitter Stream
	var socket = io.connect('http://localhost:3000');
	socket.on('TwitConnect', function(data){
		console.log(data.message);
	});
	socket.on('feed', function(data){
		if(data.feed){
			feed = data.feed;
			$.each(feed, function(index,tweet){
				$('#whoUses .chrome-frame ul').prepend('<li><div class="profile"><img src="'+tweet.user.profile_image_url+'"/></div><p>'+tweet.text+'</p></li>')
			});
		}
	});
	socket.on('tweet', function(data){
		console.log($('#whoUses .chrome-frame ul li').length);
		if($('#whoUses .chrome-frame ul li').length > 4){
			$('#whoUses .chrome-frame ul li').each(function(index,el){
				if(index > 4){
					$(el).remove();
				}
			});
		}
		if(data.tweet){
			var tweet = data.tweet;
			$('#bottomLine .chrome-frame ul').prepend('<li><div class="profile"><img src="'+tweet.user.profile_image_url+'"/></div><p>'+tweet.text+'</p></li>')
		};
	});
});