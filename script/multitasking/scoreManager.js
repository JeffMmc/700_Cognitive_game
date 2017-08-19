var score = 0;
var block = 0, bonus = 0, breakable = 0;
var blockSuccess = 0, bonusSuccess = 0, breakableSuccess = 0; 
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
		new Audio('src/speedup.mp3').play();
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

