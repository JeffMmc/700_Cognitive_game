var canvas;
var scorebar, data, menu;

window.onload = function(){
    initResult();
	for (var key in localStorage){
		console.log(key + " : " + localStorage.getItem(key));
		//localStorage.removeItem(key);
	}
}

function initResult(){
	canvas = document.getElementById("gc");
	scorebar = document.getElementById("result_score");
	data = document.getElementById("result_data");
	menu = document.getElementById("result_menu");
	
	var score = document.createElement("h1");
	var blcok = document.createElement("p");
	var bonus = document.createElement("p");
	var breakable = document.createElement("p");
	
	var blockRate = (localStorage.getItem('currentBlS') / localStorage.getItem('currentBl')) * 100;
	var bonusRate = (localStorage.getItem('currentBoS') / localStorage.getItem('currentBo')) * 100;
	var breakableRate = (localStorage.getItem('currentBrS') / localStorage.getItem('currentBr')) * 100;
	
	score.innerHTML = "Score : " + localStorage.getItem('currentScore');
	blcok.innerHTML = "Block Avoided: " + localStorage.getItem('currentBl') + "(" + blockRate.toFixed(2) + "%)";
	bonus.innerHTML = "Bonus gained: " + localStorage.getItem('currentBo') + "(" + bonusRate.toFixed(2) + "%)";
	breakable.innerHTML = "Breakable broke: " + localStorage.getItem('currentBr') + "(" + breakableRate.toFixed(2) + "%)";
	scorebar.appendChild(score);
	data.appendChild(blcok);
	data.appendChild(bonus);
	data.appendChild(breakable);
		

	
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
	
	menu.appendChild(backButton);
	menu.appendChild(replayButton);
	
	console.log("Block : " + localStorage.getItem('currentBl'));
	console.log("Success : " + localStorage.currentBlS);
	console.log("Bonus : " + localStorage.currentBo);
	console.log("Success : " + localStorage.currentBoS);
	console.log("Breakable : " +  localStorage.currentBr);
	console.log("Success : " +  localStorage.currentBrS);
}