function generateObstacle(){
	var tracks = document.getElementsByClassName("track");
	var blockExist = false;
	
	for(var i = 0; i < 2; i++){

		var obstacleTypeNum = Math.floor(Math.random() * 3);

		var obs = obstacle(obstacleType[obstacleTypeNum]);

		tracks[Math.floor(Math.random() * 2) + i * 2].appendChild(obs);
		
		switch (obstacleTypeNum) {
			//Action of block
			case 0:

			obs.onclick = function(){
				//No Action
			};
			break;
			
			//Action of bonus
			case 1:
			obs.onclick = function(){
			};
			break;
			
			//Action of breakable
			case 2:
			obs.onclick = function(){
				breakable += 1;
				breakableSuccess += 1;
				destroyObstacle(this);
			};
			break;
		}
	}
}

//Create an obstacle object
function obstacle(obsType){
	var obstacle = document.createElement("div");
	obstacle.posX = 0;
	obstacle.posY = 0;
	
	obstacle.classList.add(obsType);
	obstacle.classList.add("obstacle");
	obstacle.style.top = obstacle.posY + 'px';
	obstacle.style.left = obstacle.posX + 'px';

	return obstacle;
}

//Update the position of obstacles
function obstacleMove(){
	
	var obstacle = document.getElementsByClassName("obstacle");
	for (var i = 0; i < obstacle.length; i++){
		obstacle[i].posY += overallSpeed;
		obstacle[i].style.top = obstacle[i].posY + 'px';
		
		//Destroy the obstacle when it leave the track
		if(obstacle[i].posY > 420){
			if(obstacle[i].className=="block obstacle"){
				block += 1;
				blockSuccess += 1;
			}
			destroyObstacle(obstacle[i]);
		}//Deal with collision
		else if(obstacle[i].posY > 310){
			var childOfTrack = obstacle[i].parentNode.children;
			for(var j = 0; j < childOfTrack.length; j++){
				if(childOfTrack[j].className == "vehicle"){
					if(obstacle[i].className=="bonus obstacle"){
						destroyObstacle(obstacle[i]);
						bonusScore(5);
						bonus += 1;
						bonusSuccess += 1;
					}else if(obstacle[i].className=="breakable obstacle"){
						breakable += 1;
						collision = true;
						destroyObstacle(obstacle[i]);
					}else{
						block += 1;
						collision = true;
						destroyObstacle(obstacle[i]);
					}
				}
			}
		}
		
	}
}

function destroyObstacle(obs){
	obs.parentNode.removeChild(obs);
}