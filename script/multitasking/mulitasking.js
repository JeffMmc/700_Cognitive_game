window.onload = function(){
    console.log("Ready");
    //clear session storage;
    window.sessionStorage.clear();
	countdown = 60;
	statrGame();
	updateScore(0);
	updateSpeedText();
	bgm.play();
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
	resumeInterval();
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

function pauseInterval(){
	clearInterval(generateInterval);
	clearInterval(moveInterval);
	clearInterval(scoreInterval);
	clearInterval(speedInterval);
	clearInterval(timerInterval);
	clearInterval(roadMovingInterval);
}

function resumeInterval() {
	generateInterval = setInterval(generateObstacle, 5000);
	moveInterval = setInterval(obstacleMove, 1000/30);
	scoreInterval = setInterval(updateScore, 1000);
	speedInterval = setInterval(updateSpeed, 10000);
	timerInterval = setInterval(updateTimer, 1000);
	roadMovingInterval = setInterval(roadMoving, 1000/30);
}

function endMultitaskingGame(){
	recordMultaskingScore(score);
	pauseInterval();
	document.getElementById("gc").innerHTML = "";
	
	localStorage.setItem('currentScore', score);
	localStorage.setItem('currentBl', block);
	localStorage.setItem('currentBlS', blockSuccess);
	localStorage.setItem('currentBo', bonus);
	localStorage.setItem('currentBoS', bonusSuccess);
	localStorage.setItem('currentBr', breakable);
	localStorage.setItem('currentBrS', breakableSuccess);

	
	printRecord();
	for (var key in localStorage){
		console.log(key);
		//localStorage.removeItem(key);
	}
	window.location.replace("multaskingResult.html");
}
