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
	var menuButton = document.createElement("button");
	menuButton.id = "menuButton";
	menuButton.pause = false;
	menuButton.onclick = function(){
		if(menuButton.pause){
			resumeInterval();
			menuButton.pause = false;
		}else{
			pauseInterval();
			menuButton.pause = true;
		}
		
		console.log("pause");
	}
	
	scorebar.appendChild(scoreElement);
	scorebar.appendChild(speedElement);
	scorebar.appendChild(countdownTimer);
	scorebar.appendChild(menuButton);
	
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