var canvas;
var scorebar, data, menu;

window.onload = function(){
	console.log(sessionStorage.getItem("currentUser"));
    initResult();
	for (var key in localStorage){
		console.log(key + " : " + localStorage.getItem(key));
		//localStorage.removeItem(key);
	}
    for (var key in sessionStorage){
        console.log(key + " : " + sessionStorage.getItem(key));
        //localStorage.removeItem(key);
    }
}

function initResult(){
	canvas = document.getElementById("gc");
	scorebar = document.getElementById("result_score");
	data = document.getElementById("result_data");
	menu = document.getElementById("result_menu");
	currentUser = sessionStorage.getItem("currentUser");
	
	var score = document.createElement("h1");
    var newHighScore = document.createElement("p");
	var improvement = document.createElement("p");
	var maxCombo = document.createElement("p");

    var scoreIndex = 0;
    for (var key in localStorage){
        if(key.substr(0, currentUser.length+5) == currentUser + "MtBlS"){
            scoreIndex += 1;
        }
    }
	scoreIndex -=1;
	var lastScore = localStorage.getItem(currentUser+"Mt"+scoreIndex);

	//New High Score
	if(sessionStorage.getItem("newHighScore") == 1){

        newHighScore.innerHTML = "New High Score!";
        data.appendChild(newHighScore);
	}

	//Improvement
	if(sessionStorage.getItem("newHighScore") == 1){
        console.log(sessionStorage.getItem("newHighScore"));
		if(scoreIndex == 0){
			improvement.innerHTML = "Good job for the first play";
		}else{
            var improvedScore = lastScore - sessionStorage.getItem("lastHighScore");
            improvement.innerHTML = improvedScore + " Points Higher";
		}
        data.appendChild(improvement);
	}else{
        improvement.innerHTML = "Good job!";
        data.appendChild(improvement);
	}

	//Max Combo
    maxCombo.innerHTML = "Max Combo: " + sessionStorage.getItem("maxCombo");
	data.appendChild(maxCombo);

	//Score
	score.innerHTML = "Score: " +  lastScore;
	scorebar.appendChild(score);
	
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

	console.log("Block : " + sessionStorage.getItem('currentBl'));
	console.log("Success : " + sessionStorage.currentBlS);
	console.log("Bonus : " + sessionStorage.currentBo);
	console.log("Success : " + sessionStorage.currentBoS);
	console.log("Breakable : " +  sessionStorage.currentBr);
	console.log("Success : " +  sessionStorage.currentBrS);
}