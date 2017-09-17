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
	canvas = document.getElementById("gc");
	data = document.getElementById("data");

	chartData =  [['Day', 'Score'],['2004',  1000]];
    comboData =  [['Day', 'Max Combo'],['2004',  1000]];
    stoneData =  [['Day', 'Success Rate(%)'],['2004',  1000]];
    gemData =  [['Day', 'Success Rate(%)'],['2004',  1000]];
    chestData =  [['Day', 'Success Rate(%)'],['2004',  1000]];

	var dataTable = document.getElementById("data_table");
	
	var i = 0;
	while(localStorage.getItem(currentUser + 'Mt' + i) != null){
		var row = document.createElement("tr");

		//General data
        var play = document.createElement("th");
		var score = document.createElement("th");
        var combo = document.createElement("th");

        play.innerHTML = i+1;
        score.innerHTML = localStorage.getItem(currentUser + 'Mt' + i);
        combo.innerHTML = localStorage.getItem(currentUser + 'MtCombo' + i);

        row.appendChild(play);
        row.appendChild(score);
        row.appendChild(combo);

        //Stone
		var block = document.createElement("th");
        var blockS = document.createElement("th");
        var blockR = document.createElement("th");

        block.innerHTML = localStorage.getItem(currentUser + 'MtBl' + i);
        blockS.innerHTML = localStorage.getItem(currentUser + 'MtBlS' + i);
        var blockRate = (localStorage.getItem(currentUser + 'MtBlS' + i) / localStorage.getItem(currentUser + 'MtBl' + i)) * 100;
        blockR.innerHTML = blockRate.toFixed(2);

        row.appendChild(block);
        row.appendChild(blockS);
        row.appendChild(blockR);

		//Gem
		var bonus = document.createElement("th");
        var bonusS = document.createElement("th");
        var bonusR = document.createElement("th");

        bonus.innerHTML = localStorage.getItem(currentUser + 'MtBo' + i);
        bonusS.innerHTML = localStorage.getItem(currentUser + 'MtBoS' + i);
        var bonusRate = (localStorage.getItem(currentUser + 'MtBoS' + i) / localStorage.getItem(currentUser + 'MtBo' + i)) * 100;
        bonusR.innerHTML = bonusRate.toFixed(2);

        row.appendChild(bonus);
        row.appendChild(bonusS);
        row.appendChild(bonusR);

		//Chest
		var breakable = document.createElement("th");
        var breakableS = document.createElement("th");
        var breakableR = document.createElement("th");

        breakable.innerHTML = localStorage.getItem(currentUser + 'MtBr' + i);
        breakableS.innerHTML = localStorage.getItem(currentUser + 'MtBrS' + i);
		var breakableRate = (localStorage.getItem(currentUser + 'MtBrS' + i) / localStorage.getItem(currentUser + 'MtBr' + i)) * 100;
		breakableR.innerHTML = breakableRate.toFixed(2);

		row.appendChild(breakable);
		row.appendChild(breakableS);
		row.appendChild(breakableR);

        dataTable.appendChild(row);
		
		i += 1;
		chartData[i] = ["Play" + i,  parseInt(localStorage.getItem(currentUser + 'Mt' + (i-1)))];
        comboData[i] = ["Play" + i,  parseInt(localStorage.getItem(currentUser + 'MtCombo' + (i-1)))];
        stoneData[i] = ["Play" + i, parseInt(blockRate) ];
        gemData[i] = ["Play" + i,  parseInt(bonusRate)];
        chestData[i] = ["Play" + i,  parseInt(breakableRate)];
	}
	
	var startIndex;
	if(i > 19){
		chartDataNum = i+1;
	}else{
		startIndex = 1;
	}
	
	var backButton = document.createElement("button");
	backButton.innerHTML = "Back";
	backButton.onclick = function(){
		window.location.replace("menu.html");
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