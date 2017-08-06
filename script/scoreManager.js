var score = 0;
var scoreText = document.getElementById("score");
var collision = false;
var overallSpeed = 3;

function updateScore(){
	score += overallSpeed;
	scoreText.innerHTML = "Score : " + score;
}

function bonusScore(addition){
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
	
	collision = false;
}