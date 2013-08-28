//Line graph data
var data = {
	labels : ["1","2","3"],
	datasets : [
		{
			fillColor : "rgba(209,85,77,0.5)",
			strokeColor : "rgba(209,85,77,1)",
			pointColor : "rgba(209,85,77,1)",
			pointStrokeColor : "#fff",
			data : [65,59,90]
		},
		{
			fillColor : "rgba(54,129,200,0.5)",
			strokeColor : "rgba(54,129,200,1)",
			pointColor : "rgba(54,129,200,1)",
			pointStrokeColor : "#fff",
			data : [28,48,40]
		}
	]
};
var lineOptions = {
	scaleOverride: true,
	scaleSteps: 10,
	scaleStepWidth: 10,
	scaleStartValue: 0,
	scaleFontFamily: "'Open Sans',sans-serif",
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
			$('#whyEffective .chrome-frame').append('<canvas id="readChart" width="'+$('#whyEffective .chrome-frame').width()+'" height="400"></canvas><ul class="legend"><li class="blue">Read</li><li class="red">Retain</li></ul>');
			var ctx = $('#readChart').get(0).getContext('2d');
			var newChart = new Chart(ctx).Line(data,lineOptions);
		});
		return false;
	});
});