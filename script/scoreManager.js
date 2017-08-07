var score = 0;
var scoreText;
var speedText;
var collision = false;
var overallSpeed = 3;

function updateScore(){
	scoreText = document.getElementById("score");
	score += overallSpeed;
	scoreText.innerHTML = "Score : " + score;
}

function bonusScore(addition){
	scoreText = document.getElementById("score");
	console.log(addition);
	score = score + addition;
	scoreText.innerHTML = "Score : " + score;
}

function updateSpeed(){
	if (!collision && overallSpeed <= 10){
		overallSpeed += 1;
	}else if (collision && overallSpeed > 2){
		overallSpeed -= 1;
	}
	
	updateSpeedText();
	collision = false;
}

function updateSpeedText(){
	speedText = document.getElementById("speed");
	speedText.innerHTML = "Speed : " + overallSpeed;
}

function recordScore(currentScore){
	var logDate = dateFormating();
	var recorded = false;
	
	if(localStorage.lastMultitasking == null){
		//First score of all time
		localStorage.setItem('MultitaskingScore0', currentScore);
	}else if(localStorage.lastMultitasking == logDate){
		//New score of the day
		localStorage.setItem('lastMultitasking', logDate);
		var highscore;
		
		for (var i = 0; i < 20; i++){
			if(localStorage.getItem('MultitaskingScore' + i) == null){
				highscore = localStorage.getItem('MultitaskingScore' + (i-1));
				if(currentScore > highscore){
					localStorage.setItem('MultitaskingScore' + (i-1), currentScore);
				}
				break;
			}
		}
		
	}else{
		//First score of the day, record < 20
		localStorage.setItem('lastMultitasking', logDate);
		
		for (var i = 0; i < 20; i++){
			if(localStorage.getItem('MultitaskingScore' + i) == null){
				localStorage.setItem('MultitaskingScore' + i, currentScore);
				recorded = true;
				break;
			}
		}
		
		//First score of the day, record > 20
		if(!recorded){
			addNewScore(currentScore);
		}
	}
	
	localStorage.setItem('lastMultitasking', logDate);
}

function addNewScore(currentScore){
	for (var i = 0; i < 19; i++){
		localStorage.setItem('MultitaskingScore' + i, localStorage.getItem('MultitaskingScore' + (i+1)));
	}
	localStorage.setItem('MultitaskingScore20', currentScore);
}

function dateFormating(){
	var d = new Date();
	var month, day;
	if(d.getMonth() + 1 < 10){
		month = "0" + (d.getMonth() + 1).toString();
	}else{
		month = (d.getMonth() + 1).toString();
	}
	
	if(d.getDate() < 10){
		day = "0" + d.getDate().toString();
	}else{
		day = d.getDate().toString();
	}
	
	return d.getFullYear().toString() + month + day + "multitasking";
}

//For debugging
function printRecord(){
	for (var i = 0; i < 20; i++){
		if(localStorage.getItem('MultitaskingScore' + i) != null){
			console.log(i + " : " + localStorage.getItem('MultitaskingScore' + i))
		}
	}
}