//Generate top score bar
function scorebar(){
	var scorebar = document.createElement("div");
	scorebar.classList.add("scorebar");
	
	var scoreElement = document.createElement("p");
	scoreElement.id = "score";
	var speedElement = document.createElement("p");
	speedElement.id = "speed";
	var countdownTimer = document.createElement("p");
	countdownTimer.id = "countdownTimer";
    var comboCount = document.createElement("p");
    comboCount.id = "combo";
	var menuButton = document.createElement("button");
	menuButton.id = "menuButton";
	gamePause = false;
	pauseMenu = pauseMenu();
	menuButton.onclick = function(){
		if(gamePause){
			resumeInterval();
			gamePause = false;
			canvas.removeChild(pauseMenu);
		}else{
			pauseInterval();
			gamePause = true;
			canvas.insertBefore(pauseMenu, canvas.firstChild);
		}
		console.log("pause");
	}
	menuButton.disabled = true;
	
	scorebar.appendChild(scoreElement);
	scorebar.appendChild(speedElement);
	scorebar.appendChild(countdownTimer);
	scorebar.appendChild(menuButton);
    scorebar.appendChild(comboCount);
	
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

    var hammer = new Hammer(moveButton);
    hammer.on("tap press", function (ev) {
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
    });

	field.appendChild(moveButton);
	
	
	return field;
}

function roadMoving(){

	for(var i = 0; i < fields.length ; i++){
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

function pauseMenu(){
	var pauseM = document.createElement("div");
	pauseM.id = "pause_menu";
	
	var pauseText = document.createElement("h1");
	pauseText.innerHTML = "Pause";
	
	var resumeButton = document.createElement("button");
	resumeButton.innerHTML = "Resume";
	resumeButton.id = "resume_button";
	resumeButton.onclick = function(){
		resumeInterval();
		gamePause = false;
		canvas.removeChild(pauseMenu);
	}
	
	var backButton = document.createElement("button");
	backButton.innerHTML = "Menu";
	backButton.id = "back_button";
	backButton.onclick = function(){
		resumeInterval();
		window.location.replace("index.html");
	}
	
	pauseM.appendChild(pauseText);
	pauseM.appendChild(resumeButton);
	pauseM.appendChild(backButton);

	return pauseM;
}

function startGameButton() {
	var startGameButton = document.createElement("button");
	startGameButton.innerText = "Start";
	startGameButton.id = "startGameButton";
	startGameButton.onclick = function () {
        generateObstacle();
        resumeInterval();
        document.getElementById("menuButton").disabled = false;
        startGameButton.parentNode.removeChild(startGameButton);
    };
	return startGameButton;
}