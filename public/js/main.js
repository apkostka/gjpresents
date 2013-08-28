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
});