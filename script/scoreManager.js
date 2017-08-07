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
		console.log("collision false");
		overallSpeed += 1;
	}else if (collision && overallSpeed > 2){
		console.log("collision true");
		overallSpeed -= 1;
	}
	
	updateSpeedText();
	collision = false;
}

function updateSpeedText(){
	speedText = document.getElementById("speed");
	speedText.innerHTML = "Speed : " + overallSpeed;
}