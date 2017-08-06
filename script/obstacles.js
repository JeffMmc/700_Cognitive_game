function generateObstacle(){
	var tracks = document.getElementsByClassName("track");
	
	for(var i = 0; i < tracks.length; i++){
		var obstacleTypeNum = Math.floor(Math.random() * 3);
		var obs = obstacle(obstacleType[obstacleTypeNum]);

		tracks[i].appendChild(obs);
		
		switch (obstacleTypeNum) {
			//Action of block
			case 0:
			obs.onclick = function(){
				
			};
			break;
			
			//Action of bonus
			case 1:
			obs.onclick = function(){
				destroyObstacle(this)
				bonusScore(10);
			};
			break;
			
			//Action of breakable
			case 2:
			obs.onclick = function(){
				destroyObstacle(this);
			};
			break;
		}
	}
}

function obstacle(obsType){
	var obstacle = document.createElement("div");
	obstacle.posX = 60;
	obstacle.posY = 0;
	
	obstacle.classList.add(obsType);
	obstacle.classList.add("obstacle");
	obstacle.style.top = obstacle.posY + 'px';
	obstacle.style.left = obstacle.posX + 'px';

	return obstacle;
}

function obstacleMove(){
	
	var obstacle = document.getElementsByClassName("obstacle");
	for (var i = 0; i < obstacle.length; i++){
		obstacle[i].posY += overallSpeed;
		obstacle[i].style.top = obstacle[i].posY + 'px';
		
		if(obstacle[i].posY > 420){
			destroyObstacle(obstacle[i]);
		}else if(obstacle[i].posY > 290){
			var childOfTrack = obstacle[i].parentNode.children;
			
			for(var j = 0; j < childOfTrack.length; j++){
				if(childOfTrack[j].className == "vehicle"){
					if(obstacle[i].className=="bonus obstacle"){
						destroyObstacle(obstacle[i]);
						bonusScore(5);
					}else{
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

function blockAction(){
	
}

function bonusAction(){
	
}

function breakableAction(){
	
}