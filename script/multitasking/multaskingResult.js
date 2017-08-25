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
	if(i == 1){
		i = 0;
	}else{
		i -= 2;
	}

	var lastScore = localStorage.getItem('Mt' + i);
	var lastblockRate = (localStorage.getItem('MtBlS' + i) / localStorage.getItem('MtBl' + i)) * 100;
	var lastbonusRate = (localStorage.getItem('MtBoS' + i) / localStorage.getItem('MtBoS' + i)) * 100;
	var lastbreakableRate = (localStorage.getItem('MtBrS' + i) / localStorage.getItem('MtBr' + i)) * 100;
	console.log("a + " + localStorage.getItem('currentScore') / lastScore);
	//Comment on performance
	if(i == 0){
        score.innerHTML = "Good Job For The First Day.";
	}
	else if(localStorage.getItem('currentScore') / lastScore > 1.2){
		score.innerHTML = (lastScore / localStorage.getItem('currentScore') * 100).toFixed(2) + "% improvement. Amazing";
	}else if (localStorage.getItem('currentScore') / lastScore > 1.0){
		score.innerHTML = (lastScore / localStorage.getItem('currentScore') * 100).toFixed(2) + "% improvement. Good Job";
	}else{
		score.innerHTML = "Good Job";
	}
	scorebar.appendChild(score);

	var improvement = false;
	if(blockRate > lastblockRate){
		blcok.innerHTML = "Rock avoid rate improved";
		data.appendChild(blcok);
        improvement = true;
	}
	
	if(bonusRate > lastbonusRate){
		bonus.innerHTML = "Gem collect rate improved";
		data.appendChild(bonus);
        improvement = true;
	}
	
	if(bonusRate > lastbonusRate){
		breakable.innerHTML = "Chest open rate improved";
		data.appendChild(breakable);
        improvement = true;
	}

	if(!improvement){
        blcok.innerHTML = "Average performance";
        data.appendChild(blcok);
	}
	
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