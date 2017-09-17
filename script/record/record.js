var canvas;
var scorebar, data;
var chartData, comboData, stoneData, genData, chestData;
var currentUser = sessionStorage.getItem("currentUser");

window.onload = function(){
    initResult();
    initUI();
	google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawScoreChart);
    google.charts.setOnLoadCallback(drawComboChart);
    google.charts.setOnLoadCallback(drawStoneChart);
    google.charts.setOnLoadCallback(drawGemChart);
    google.charts.setOnLoadCallback(drawChestChart);
	for (var key in localStorage){
		console.log(key + " : " + localStorage.getItem(key));
		//localStorage.removeItem(key);
	}
}

function initResult(){
    initMultitaskingRecord();
}

/*
* Drawing charts for each status
* */
function drawScoreChart(){
	var data = google.visualization.arrayToDataTable(chartData);
	var options = {
	  title: 'Score Record',
	  curveType: 'function',
	  legend: { position: 'bottom' }
	};
	var chart = new google.visualization.LineChart(document.getElementById('score_chart'));
	chart.draw(data, options);
}

function drawComboChart(){
    var data = google.visualization.arrayToDataTable(comboData);
    var options = {
        title: 'Combo Record',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('combo_chart'));
    chart.draw(data, options);
}

function drawStoneChart(){
    var data = google.visualization.arrayToDataTable(stoneData);
    var options = {
        title: 'Stone Success Rate',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('stone_chart'));
    chart.draw(data, options);
}

function drawGemChart(){
    var data = google.visualization.arrayToDataTable(gemData);
    var options = {
        title: 'Gem Success Rate',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('gem_chart'));
    chart.draw(data, options);
}

function drawChestChart(){
    var data = google.visualization.arrayToDataTable(chestData);
    var options = {
        title: 'Chest Success Rate',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chest_chart'));
    chart.draw(data, options);
}

function initUI() {
    document.getElementById("user_name").innerHTML = currentUser + "'s Play History";
    document.getElementById("record_back").onclick = function () {
    	window.location.replace("recordLogin.html");
	}
    document.getElementById("record_back").style.marginTop = "10px";
}