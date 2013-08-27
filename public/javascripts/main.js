jQuery(function($){

	var data = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : [65,59,90,81,56,55,40]
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : [28,48,40,19,96,27,100]
			}
		]
	};

	var nullData = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : []
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : []
			}
		]
	}

	var lineOptions = {
		scaleOverride: true,
		scaleSteps: 10,
		scaleStepWidth: 10,
		scaleStartValue: 0,
		scaleFontFamily: "'Open Sans',sans-serif",
		animationEasing: 'easeInOutQuint'
	};

/*
	function initChart(){
		makeChart(data);
		//$('fieldset#line1').html(makeForm(0));
		//$('fieldset#line2').html(makeForm(1));
	};
*/

	function getData(){

		var data = {
			line1: [],
			line2: []
		};

		$('#line1 input').each(function(){
			data.line1.push($(this).val());
		});
		$('#line2 input').each(function(){
			data.line2.push($(this).val());
		});

		return data;
	};

	function makeChart(data) {
		var c = $("#lineChart").get(0);
		var ctx = c.getContext("2d");
		var myNewChart = new Chart(ctx).Line(data,lineOptions);
	};

	function clearChart() {
		var c = $("#lineChart").get(0);
		var ctx = c.getContext("2d");
		var myNewChart = new Chart(ctx).Line(nullData,lineOptions);
	}

	//INIT CHARTS
	makeChart(data);

	$('#lineChartContainer').waypoint(function(direction){
		if(direction == 'down') makeChart(data);
	}, { offset: 'bottom-in-view' });

	$('#lineChartContainer').waypoint(function(){
		clearChart();
	}, { offset: '120%' });

/* FORM CONTROLS
	function makeForm(dataset) {
		var html = '';
		for(var i = 0;i < data.labels.length; i++){
			html += '<label>'+data.labels[i]+' <input type="range" max="100" min="0" value="'+data.datasets[dataset].data[i]+'"/><br /></label>'
		};
		return html;
	};

	$('form#chartControl').on('change',function(e){
		e.preventDefault();

		newData = getData();
		data.datasets[0].data = newData.line1;
		data.datasets[1].data = newData.line2;
		makeChart(data);
		
		return false;
	});
*/

});