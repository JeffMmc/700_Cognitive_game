var canvas;
var scorebar, data, menu;

window.onload = function(){
	checkLogin();
    initResult();
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
        if(key.substr(0, currentUser.length+2) == currentUser + "Mt"){
            scoreIndex += 1;
        }
    }

    scoreIndex -= 1;
	var userdata = JSON.parse(localStorage.getItem(currentUser+"Mt"+scoreIndex));
	var lastScore = userdata.score;

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
		window.location.replace("menu.html");
	}
	
	var replayButton = document.createElement("button");
	replayButton.innerHTML = "Replay";
	replayButton.onclick = function(){
		window.location.replace("multitasking.html");
	}
	
	menu.appendChild(backButton);
	menu.appendChild(replayButton);
}