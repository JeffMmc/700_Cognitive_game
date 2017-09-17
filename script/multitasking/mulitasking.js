window.onload = function(){
	checkLogin();
	countdown = 10;
	statrGame();
	updateScore(0);
	updateSpeedText();
}
// Generate UI and init game
function statrGame(){
	canvas = document.getElementById("gc");
	var trackNum = 2;
	canvas.appendChild(scorebar());
	updateTimer();
	for(var i = 0; i < trackNum; i++){
		fields[i] = field(i);
		canvas.appendChild(fields[i]);
	}
	canvas.appendChild(startGameButton());
	currentUser = sessionStorage.getItem("currentUser");
}

//Play time count down
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

//Pause or end the game
function pauseInterval(){
	clearInterval(generateInterval);
	clearInterval(moveInterval);
	clearInterval(scoreInterval);
	clearInterval(speedInterval);
	clearInterval(timerInterval);
	clearInterval(roadMovingInterval);
	bgm.pause();
}

//Start or resume the game
function resumeInterval() {
	generateInterval = setInterval(generateObstacle, 5000);
	moveInterval = setInterval(obstacleMove, 1000/30);
	scoreInterval = setInterval(updateScore, 2000);
	speedInterval = setInterval(updateSpeed, 10000);
	timerInterval = setInterval(updateTimer, 1000);
	roadMovingInterval = setInterval(roadMoving, 1000/30);
    //bgm.play();
}

//End of the game. Save play result to session storage.
function endMultitaskingGame(){
	recordMultaskingScore(score);
	pauseInterval();
	document.getElementById("gc").innerHTML = "";
	
	sessionStorage.setItem('currentScore', score);
    sessionStorage.setItem('currentBl', block);
    sessionStorage.setItem('currentBlS', blockSuccess);
    sessionStorage.setItem('currentBo', bonus);
    sessionStorage.setItem('currentBoS', bonusSuccess);
    sessionStorage.setItem('currentBr', breakable);
    sessionStorage.setItem('currentBrS', breakableSuccess);
    sessionStorage.setItem('maxCombo', maxCombo);

	window.location.replace("multaskingResult.html");
}
