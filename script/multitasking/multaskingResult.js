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
	
	//Get data of last play
	var i = 0;
	while(localStorage.getItem('Mt' + i) != null){
		i += 1;
	}
	if(i > 0){
		i -=1;
	}
	var lastScore = localStorage.getItem('Mt' + i);
	var lastblockRate = (localStorage.getItem('MtBlS' + i) / localStorage.getItem('MtBl' + i)) * 100;
	var lastbonusRate = (localStorage.getItem('MtBoS' + i) / localStorage.getItem('MtBoS' + i)) * 100;
	var lastbreakableRate = (localStorage.getItem('MtBrS' + i) / localStorage.getItem('MtBr' + i)) * 100;
	
	//Comment on performance
	if(lastScore / localStorage.getItem('currentScore') > 1.2){
		score.innerHTML = "You have very good improvement than yesterday";
	}else if (lastScore / localStorage.getItem('currentScore') > 1.0){
		score.innerHTML = "You have good improvement than yesterday";
	}else{
		score.innerHTML = "You have similar performance as yesterday";
	}
	scorebar.appendChild(score);
	
	/*if(blockRate > lastblockRate){
		blcok.innerHTML = "Rock avoid rate improved";
		data.appendChild(blcok);
	}
	
	if(bonusRate > lastbonusRate){
		bonus.innerHTML = "Gem collect rate improved";
		data.appendChild(bonus);
	}
	
	if(bonusRate > lastbonusRate){
		breakable.innerHTML = "Chest open rate improved";
		data.appendChild(breakable);
	}*/
	
	blcok.innerHTML = "Rock avoid rate improved";
	data.appendChild(blcok);
	bonus.innerHTML = "Gem collect rate improved";
	data.appendChild(bonus);
	breakable.innerHTML = "Chest open rate improved";
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