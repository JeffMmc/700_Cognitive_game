var canvas;

window.onload = function(){
    initResult();
}

function initResult(){
	canvas = document.getElementById("gc");
	var i = 0;
	while(localStorage.getItem('Mt' + i) != null){
		var score = document.createElement("p");
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
		canvas.appendChild(score);
		canvas.appendChild(blcok);
		canvas.appendChild(bonus);
		canvas.appendChild(breakable);
		
		i += 1;
	}
	
	var backButton = document.createElement("button");
	backButton.innerHTML = "Back";
	backButton.onclick = function(){
		window.location.replace("multitasking.html");
	}
	
	canvas.appendChild(backButton);
}