var canvas;
var vehicleElement;
var countdown;
var obstacleType = ["block", "bonus", "breakable"];
var fields = new Array(2);
var generateInterval, moveInterval, scoreInterval, speedInterval,timerInterval;


window.onload = function(){
    console.log("Ready");
    //clear session storage;
    window.sessionStorage.clear();
	countdown = 10;
	statrGame();
	updateScore(0);
	updateSpeedText();
}

function statrGame(){
	canvas = document.getElementById("gc");
	var trackNum = 2;
	canvas.appendChild(scorebar());
	updateTimer();
	for(var i = 0; i < trackNum; i++){
		fields[i] = field(i);
		canvas.appendChild(fields[i]);
	}
	generateObstacle();
	
	generateInterval = setInterval(generateObstacle, 5000);
	moveInterval = setInterval(obstacleMove, 1000/30);
	scoreInterval = setInterval(updateScore, 1000);
	speedInterval = setInterval(updateSpeed, 5000);
	timerInterval = setInterval(updateTimer, 1000);
}

function scorebar(){
	var scorebar = document.createElement("div");
	scorebar.classList.add("scorebar");
	
	var scoreElement = document.createElement("p");
	scoreElement.id = "score";
	var speedElement = document.createElement("p");
	speedElement.id = "speed";
	var countdownTimer = document.createElement("p");
	countdownTimer.id = "countdownTimer";
	
	scorebar.appendChild(scoreElement);
	scorebar.appendChild(speedElement);
	scorebar.appendChild(countdownTimer);
	
	return scorebar;
}

function field(fieldNum){
	var field = document.createElement("div");
	field.classList.add("field");
	field.tracks = new Array(2);
	
	for(var j = 0; j < 2; j++){
		var trackElement = document.createElement("div");
		trackElement.classList.add("track");
		field.tracks[j] = trackElement;
		if(j == 0){
			vehicleElement = vehicle();
			vehicleElement.fieldNum = fieldNum;
			trackElement.appendChild(vehicleElement);
		}
		field.appendChild(trackElement);
		
	}
	
	return field;
}

function updateTimer(){
	if(countdown > 0){
		countdown -= 1;
		var minutes = Math.floor(countdown/60);
		var seconds = Math.floor(countdown % 60);
	
		var timerText = document.getElementById("countdownTimer");
		timerText.innerHTML = "Time left: " + minutes + ":" + seconds;
	}else{
		endMultitaskingGame();
	}
	
}

function endMultitaskingGame(){
	recordScore(score);
	clearInterval(generateInterval);
	clearInterval(moveInterval);
	clearInterval(scoreInterval);
	clearInterval(speedInterval);
	clearInterval(timerInterval);
	document.getElementById("gc").innerHTML = "";
	printRecord();
}
