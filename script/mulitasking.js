var canvas;
var vehicleElement;
var countdown;
var obstacleType = ["block", "bonus", "breakable"];
var fields = new Array(2);
var generateInterval, moveInterval, scoreInterval, speedInterval,timerInterval,roadMovingInterval;


window.onload = function(){
    console.log("Ready");
    //clear session storage;
    window.sessionStorage.clear();
	countdown = 60;
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
	resumeInterval();
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
	field.style.backgroundImage = "url('src/grass.png')";
	
	//Generate track
	for(var j = 0; j < 2; j++){
		var trackElement = document.createElement("div");
		trackElement.classList.add("track");
		field.tracks[j] = trackElement;
		if(j == 0){
			vehicleElement = vehicle();
			vehicleElement.fieldNum = fieldNum;
			trackElement.appendChild(vehicleElement);
		}
		trackElement.style.backgroundImage = "url('src/road.png')";
		trackElement.style.backgroundPosition = "0px 100px";
		trackElement.yPos = 0;
		field.appendChild(trackElement);
		
	}
	
	//Generate button
	var moveButton = document.createElement("button");
	moveButton.classList.add("moveButton");
	moveButton.style.backgroundImage = "url('src/sliderRight.png')";
	moveButton.vehicle = vehicleElement;
	vehicleElement.moveButton = moveButton;
	moveButton.onclick = function(){
		if(moveButton.vehicle.position == "left"){
			moveButton.vehicle.parentNode.removeChild(moveButton.vehicle);
			fields[moveButton.vehicle.fieldNum].tracks[1].appendChild(moveButton.vehicle);
			moveButton.vehicle.position = "right";
			moveButton.style.backgroundImage = "url('src/sliderLeft.png')";
		}else if(moveButton.vehicle.position == "right"){
			moveButton.vehicle.parentNode.removeChild(moveButton.vehicle);
			fields[moveButton.vehicle.fieldNum].tracks[0].appendChild(moveButton.vehicle);
			moveButton.vehicle.position = "left";
			moveButton.style.backgroundImage = "url('src/sliderRight.png')";
		}
	}
	field.appendChild(moveButton);
	
	
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

function roadMoving(){
	for(var i = 0; i < 2 ; i++){
		for(var j = 0; j < 2; j++){
			if(fields[i].tracks[j].yPos <= 400){
				fields[i].tracks[j].yPos += overallSpeed;
			}else{
				fields[i].tracks[j].yPos = 0;
			}
			
			fields[i].tracks[j].style.backgroundPosition = "0px " + fields[i].tracks[j].yPos +"px";
		}
	}
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
