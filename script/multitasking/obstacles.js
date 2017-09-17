function generateObstacle(){
	var tracks = document.getElementsByClassName("track");
	var blockExist = false;

    for(var i = 0; i < 2; i++){

        var obstacleTypeNum = Math.floor(Math.random() * 3);
        var obs = obstacle(obstacleType[obstacleTypeNum]);

        tracks[Math.floor(Math.random() * 2) + i * 2].appendChild(obs);

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
	obstacle.style.display = "inline";

	//Handle onclick event
	if(obsType == "breakable"){
        var hammer = new Hammer(obstacle);
        hammer.on("panleft panright tap press", function (ev) {
            breakable += 1;
            breakableSuccess += 1;
            obstacle.classList = "breakablesub";
            try{
                countCombo();
            }catch (err){};
            scoreSE.play();
            destroyChest(obstacle);
        });
	}
	return obstacle;
}

//Update the position of obstacles
function obstacleMove(){
	
	var obstacle = document.getElementsByClassName("obstacle");
	for (var i = 0; i < obstacle.length; i++){
		obstacle[i].posY += overallSpeed;
		obstacle[i].style.top = obstacle[i].posY + 'px';
		
		//Destroy the obstacle when it leave the track
		if(obstacle[i].posY > 340){
			if(obstacle[i].className=="block obstacle"){
				block += 1;
				blockSuccess += 1;
				try{
                    countCombo();
                }catch (err){};

				scoreSE.play();
			}else if(obstacle[i].className=="bonus obstacle"){
                bonus += 1;
				collision = true;
                try{
                    resetCombo();
                }catch (err){};

			}else if(obstacle[i].className=="breakable obstacle"){
                breakable += 1;
                collision = true;
                try{
                    resetCombo();
                }catch (err){};
			}
			destroyObstacle(obstacle[i]);
		}//Deal with collision
		else if(obstacle[i].posY > 230){
			var childOfTrack = obstacle[i].parentNode.children;
			for(var j = 0; j < childOfTrack.length; j++){
				if(childOfTrack[j].className == "vehicle"){
					if(obstacle[i].className=="bonus obstacle"){
						destroyObstacle(obstacle[i]);
						bonus += 1;
						bonusSuccess += 1;
                        try{
                            countCombo();
                        }catch (err){};
						scoreSE.play();
					}else if(obstacle[i].className=="breakable obstacle"){
						breakable += 1;
						collision = true;
                        try{
                            resetCombo();
                        }catch (err){};;
						destroyObstacle(obstacle[i]);
                        var crashSE = new Audio('src/multitasking/music/crash.mp3');
                        crashSE.volume = 0.3;
                        crashSE.play();
					}else{
						block += 1;
						collision = true;
                        try{
                            resetCombo();
                        }catch (err){};
						destroyObstacle(obstacle[i]);
                        var crashSE = new Audio('src/multitasking/music/crash.mp3');
                        crashSE.volume = 0.3;
                        crashSE.play();
					}
				}
			}
		}
		
	}
}

//Destory obstacle instantly
function destroyObstacle(obs){
	obs.parentNode.removeChild(obs);
}

//Destroy function for chest which has delay
function destroyChest(obs){
	setTimeout(function () {
        obs.parentNode.removeChild(obs);
    }, 1000);
}