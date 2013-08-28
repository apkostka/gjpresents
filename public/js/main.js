//Line graph data
var data = {
	labels : ["Read","Retain"],
	datasets : [
		{
			fillColor : "rgba(209,85,77,0.5)",
			strokeColor : "rgba(209,85,77,1)",
			pointStrokeColor : "#fff",
			data : [95,75]
		},
		{
			fillColor : "rgba(54,129,200,0.5)",
			strokeColor : "rgba(54,129,200,1)",
			pointStrokeColor : "#fff",
			data : [25,10]
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

	$('a.makeChart').on('click', function(e){	
		e.preventDefault();
		$('.makeChart').fadeOut(500,function(){
			$('#whyEffective .chrome-frame p').addClass('blur');
			
			//Make Chart
			$('#whyEffective .chrome-frame').append('<canvas id="readChart" width="'+$('#whyEffective .chrome-frame').width()+'" height="400"></canvas><ul class="legend"><li class="red">With Pictures</li><li class="blue">Without</li></ul>');
			var ctx = $('#readChart').get(0).getContext('2d');
			var newChart = new Chart(ctx).Bar(data, options);
		});
		return false;
	});
});