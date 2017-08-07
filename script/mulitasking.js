var canvas;
var vehicleElement;
var obstacleType = ["block", "bonus", "breakable"];
var fields = new Array(2);


window.onload = function(){
    console.log("Ready");
    //clear session storage;
    window.sessionStorage.clear();
	statrGame();
	updateScore(0);
	updateSpeedText();
	
	
}

function statrGame(){
	canvas = document.getElementById("gc");
	var trackNum = 2;
	canvas.appendChild(scorebar());

	for(var i = 0; i < trackNum; i++){
		fields[i] = field(i);
		canvas.appendChild(fields[i]);
	}
	generateObstacle();
	setInterval(generateObstacle, 5000);
	setInterval(obstacleMove, 1000/30);
	setInterval(updateScore, 1000);
	setInterval(updateSpeed, 5000);
}

function scorebar(){
	var scorebar = document.createElement("div");
	scorebar.classList.add("scorebar");
	
	var scoreElement = document.createElement("p");
	scoreElement.id = "score";
	var speedElement = document.createElement("p");
	speedElement.id = "speed";
	
	scorebar.appendChild(scoreElement);
	scorebar.appendChild(speedElement);
	
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



