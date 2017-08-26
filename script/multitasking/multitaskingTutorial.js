var tutorialScoreBar;
var stage1, stage2, stage3;
var stage = 1;
var tutorialStart = true;

window.onload = function(){
    console.log("Ready");
    //clear session storage;
    window.sessionStorage.clear();
    countdown = 60;
    startTutorial();
    resumeInterval();
    //bgm.play();
}

function startTutorial(){
    canvas = document.getElementById("gc");
    tutorialScoreBar();
    canvas.appendChild(tutorialScoreBar);
    fields[0] = field(0);
    canvas.appendChild(fields[0]);
    fields[0].style.position = "relative";
    fields[0].style.top = "-6px";
    fields[0].style.left = "200px";

}

function pauseInterval(){
    clearInterval(generateInterval);
    clearInterval(moveInterval);
    clearInterval(roadMovingInterval);
}

function resumeInterval() {
    stage1 = setInterval(tutorialGenerateObstacle, 5000, 0, Math.floor(Math.random() * 2));
    setInterval(tutorialFlow, 5000, 0, 0);
    moveInterval = setInterval(obstacleMove, 1000/30);
    roadMovingInterval = setInterval(tutorialRoadMoving, 1000/30);
}

function tutorialRoadMoving(){
    for(var j = 0; j < 2; j++){
        if(fields[0].tracks[j].yPos <= 400){
            fields[0].tracks[j].yPos += 3;
        }else{
            fields[0].tracks[j].yPos = 0;
        }

        fields[0].tracks[j].style.backgroundPosition = "0px " + fields[0].tracks[j].yPos +"px";
    }
}

function tutorialGenerateObstacle(obsNum, trackNum){
    var tracks = document.getElementsByClassName("track");

    var obs = obstacle(obstacleType[obsNum]);
    tracks[trackNum].appendChild(obs);

    switch (obsNum) {
        //Action of block
        case 0:

            obs.onclick = function(){
                //No Action
            };
            break;

        //Action of bonus
        case 1:
            obs.onclick = function(){
                //No Action
            };
            break;

        //Action of breakable
        case 2:
            obs.onclick = function(){
                breakable += 1;
                breakableSuccess += 1;
                this.classList = "breakablesub";
                var b = this;
                scoreSE.play();
                setTimeout(function(){
                    destroyObstacle(b);
                }, 1000);


            };
            break;
    }
}

function tutorialScoreBar(){
    tutorialScoreBar = scorebar();
    tutorialScoreBar.innerHTML = "";
    tutorialScoreBar.style.textAlign = "center";

    var tutorialText = document.createElement("h1");
    tutorialText.id = "tutorialText";
    tutorialText.innerHTML = "Swipe/Click the arrow to avoid the rock";
    tutorialScoreBar.appendChild(tutorialText);
    tutorialScoreBar.text = tutorialText;
}

function tutorialFlow(){
    console.log(tutorialStart);
    if(tutorialStart){
        if(blockSuccess > 2 && bonusSuccess > 2 && breakableSuccess > 2){
            if(stage == 3){
                clearInterval(stage3);
                tutorialStart = false;
                stage = 0;

            }

        }else if(blockSuccess > 2 && bonusSuccess > 2) {
            if(stage == 2){
                clearInterval(stage2);
                tutorialStart = false;
                stage = 3;
                new Audio('src/speedup.mp3').play();
            }

        }else if(blockSuccess > 2){
            if(stage == 1){
                clearInterval(stage1);
                tutorialStart = false;
                stage = 2;

            }

        }
    }else{
        if(blockSuccess > 2 && bonusSuccess > 2 && breakableSuccess > 2){
            console.log("end");
            tutorialScoreBar.text.innerHTML = "Good Job. Let's start.";
            new Audio('src/speedup.mp3').play();
        }else if(blockSuccess > 2 && bonusSuccess > 2) {
            console.log("stage3");
            tutorialScoreBar.text.innerHTML = "Tap the treasure chest to open it";
            stage3 = setInterval(tutorialGenerateObstacle, 5000, 2, Math.floor(Math.random() * 2));
            tutorialStart = true;
            new Audio('src/speedup.mp3').play();
        }else if(blockSuccess > 2){
            console.log("stage2");
            tutorialScoreBar.text.innerHTML = "Swipe/Click the arrow to get the gem";
            stage2 = setInterval(tutorialGenerateObstacle, 5000, 1, Math.floor(Math.random() * 2));
            tutorialStart = true;
            new Audio('src/speedup.mp3').play();
        }
    }

}