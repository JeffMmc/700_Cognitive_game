var canvas;
var scorebar, data;
var chartData, comboData, stoneData, genData, chestData;
var score1, score2, score3, time1, time2, time3, rate1, rate2, rate3;
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
    initMemoryRecord();
}

function initUI() {
    document.getElementById("user_name").innerHTML = currentUser + "'s Play History";
    document.getElementById("record_back").onclick = function () {
    	window.location.replace("recordLogin.html");
	}
    document.getElementById("record_back").style.marginTop = "10px";
}