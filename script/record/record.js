var canvas;
var scorebar, data;
var chartData;

window.onload = function(){
    initResult();
	google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
	for (var key in localStorage){
		console.log(key + " : " + localStorage.getItem(key));
		//localStorage.removeItem(key);
	}
}

function initResult(){
	canvas = document.getElementById("gc");
	data = document.getElementById("data");
	
	chartData =  [['Day', 'Score'],['2004',  1000]]
	
	var i = 0;
	while(localStorage.getItem('Mt' + i) != null){
		var score = document.createElement("p");
		var blcok = document.createElement("p");
		var bonus = document.createElement("p");
		var breakable = document.createElement("p");
		
		var blockRate = (localStorage.getItem('MtBlS' + i) / localStorage.getItem('MtBl' + i)) * 100;
		var bonusRate = (localStorage.getItem('MtBoS' + i) / localStorage.getItem('MtBo' + i)) * 100;
		var breakableRate = (localStorage.getItem('MtBrS' + i) / localStorage.getItem('MtBr' + i)) * 100;
		
		score.innerHTML = "Day" + (i+1) + "<br />" + "Score : " + localStorage.getItem('Mt' + i);
		blcok.innerHTML = "Block Avoided: " + localStorage.getItem('MtBl' + i) + "(" + blockRate.toFixed(2) + "%)";
		bonus.innerHTML = "Bonus gained: " + localStorage.getItem('MtBo' + i) + "(" + bonusRate.toFixed(2) + "%)";
		breakable.innerHTML = "Breakable broke: " + localStorage.getItem('MtBr' + i) + "(" + breakableRate.toFixed(2) + "%)";
		data.appendChild(score);
		data.appendChild(blcok);
		data.appendChild(bonus);
		data.appendChild(breakable);
		
		i += 1;
		chartData[i] = ["Day" + i,  parseInt(localStorage.getItem('Mt' + (i-1)))];
	}
	
	var startIndex;
	if(i > 19){
		chartDataNum = i+1;
	}else{
		startIndex = 1;
	}
	
	for(var j = startIndex; j < i; j++){
		chartData[j] = ["Day" + j,  parseInt(localStorage.getItem('Mt' + (j-1)))];
		console.log(chartData[j]);
	}
	
	var backButton = document.createElement("button");
	backButton.innerHTML = "Back";
	backButton.onclick = function(){
		window.location.replace("index.html");
	}
	
	var replayButton = document.createElement("button");
	replayButton.innerHTML = "Replay";
	replayButton.onclick = function(){
		window.location.replace("multitasking.html");
	}
	
	
	console.log("Block : " + localStorage.getItem('currentBl'));
	console.log("Success : " + localStorage.currentBlS);
	console.log("Bonus : " + localStorage.currentBo);
	console.log("Success : " + localStorage.currentBoS);
	console.log("Breakable : " +  localStorage.currentBr);
	console.log("Success : " +  localStorage.currentBrS);
}

function drawChart(){

	var data = google.visualization.arrayToDataTable(chartData);

	var options = {
	  title: 'Multitasking Record',
	  curveType: 'function',
	  legend: { position: 'bottom' }
	};

	var chart = new google.visualization.LineChart(document.getElementById('line_chart'));

	chart.draw(data, options);
}