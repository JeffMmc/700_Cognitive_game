var canvas;
var scorebar, data, menu;

window.onload = function(){
    initResult();
	for (var key in localStorage){
		console.log(key + " : " + localStorage.getItem(key));
		localStorage.removeItem(key);
	}
}

function initResult(){
	canvas = document.getElementById("gc");
	scorebar = document.getElementById("result_score");
	data = document.getElementById("result_data");
	menu = document.getElementById("result_menu");
	var i = 0;
	while(localStorage.getItem('Mt' + i) != null){
		var score = document.createElement("h1");
		var blcok = document.createElement("p");
		var bonus = document.createElement("p");
		var breakable = document.createElement("p");
		
		score.innerHTML = "Score : " + localStorage.getItem('Mt' + i);
		blcok.innerHTML = "Block Avoided: " + localStorage.getItem('MtBl' + i) + "(" + 
			(localStorage.getItem('MtBlS' + i) / localStorage.getItem('MtBl' + i)) * 100 + "%)";
		bonus.innerHTML = "Bonus gained: " + localStorage.getItem('MtBo' + i) + "(" + 
			(localStorage.getItem('MtBoS' + i) / localStorage.getItem('MtBo' + i)) * 100 + "%)";
		breakable.innerHTML = "Breakable broke: " + localStorage.getItem('MtBr' + i) + "(" + 
			(localStorage.getItem('MtBrS' + i) / localStorage.getItem('MtBr' + i)) * 100 + "%)";
		scorebar.appendChild(score);
		data.appendChild(blcok);
		data.appendChild(bonus);
		data.appendChild(breakable);
		
		i += 1;
		break;
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
	
	menu.appendChild(backButton);
	menu.appendChild(replayButton);
	
	console.log("Block : " + localStorage.getItem('currentBl'));
	console.log("Success : " + localStorage.currentBlS);
	console.log("Bonus : " + localStorage.currentBo);
	console.log("Success : " + localStorage.currentBoS);
	console.log("Breakable : " +  localStorage.currentBr);
	console.log("Success : " +  localStorage.currentBrS);
}