function updateScore(){
	scoreText = document.getElementById("score");
	score += (overallSpeed + combo);
	scoreText.innerHTML = "Score : " + score;
}

//Check player's performance and change the speed
function updateSpeed(){
	if (!collision && overallSpeed <= 10){
		overallSpeed += 1;
		new Audio('src/multitasking/music/speedup.mp3').play();
	}else if (collision && overallSpeed > 2){
		overallSpeed -= 1;
	}
	
	updateSpeedText();
	collision = false;
}

function countCombo(){
	comboText = document.getElementById("combo");
	combo += 1;
	comboText.innerHTML = combo + " Combo";
	if(combo > maxCombo){
		maxCombo = combo;
	}
}

function resetCombo() {
    comboText = document.getElementById("combo");
    combo = 0;
    comboText.innerHTML = combo + " Combo"
}

function updateSpeedText(){
	speedText = document.getElementById("speed");
	speedText.innerHTML = "Speed : " + overallSpeed;
}

