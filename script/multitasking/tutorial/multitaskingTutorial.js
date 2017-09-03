var tutorialScoreBar;
var stage1, stage2, stage3;
var stage = 0;
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

    if(!(localStorage.getItem("passTutorial") === null)){
        canvas.appendChild(skipButton());
    }


}

function pauseInterval(){
    clearInterval(generateInterval);
    clearInterval(moveInterval);
    clearInterval(roadMovingInterval);
}

function resumeInterval() {
    setInterval(tutorialFlow, 2500, 0, 0);
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

function tutorialGenerateObstacle(obsNum){
    var tracks = document.getElementsByClassName("track");

    var obs = obstacle(obstacleType[obsNum]);
    tracks[Math.floor(Math.random() * 2)].appendChild(obs);

    var obsText = document.createElement("p");
    obsText.id = "obsText";
    obsText.style.zIndex = "1";
    obs.appendChild(obsText);

    switch (obsNum) {
        //Action of block
        case 0:
            obsText.innerHTML = "Avoid";
            obs.onclick = function(){
                //No Action
            };
            break;

        //Action of bonus
        case 1:
            obsText.innerHTML = "Collect";
            obs.onclick = function(){
                //No Action
            };
            break;

        //Action of breakable
        case 2:
            obsText.innerHTML = "Tap";
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
    tutorialText.innerHTML = "Hi, let's start the tutorial.";
    tutorialScoreBar.appendChild(tutorialText);
    tutorialScoreBar.text = tutorialText;
}

function tutorialFlow(){

    if(tutorialStart){
        if(blockSuccess > 1 && bonusSuccess > 1 && breakableSuccess > 1){
            if(stage == 3){
                clearInterval(stage3);
                tutorialStart = false;
                stage = 4;
                localStorage.setItem("passTutorial", true);
            }

        }else if(blockSuccess > 1 && bonusSuccess > 1) {
            if(stage == 2){
                clearInterval(stage2);
                tutorialStart = false;
                stage = 3;
            }

        }else if(blockSuccess > 1){
            if(stage == 1){
                clearInterval(stage1);
                tutorialStart = false;
                stage = 2;
            }
        }else{
            if(stage == 0) {

                tutorialStart = false;
                stage = 1;
            }
        }
    }else{
        if(blockSuccess > 1 && bonusSuccess > 1 && breakableSuccess > 1){
            console.log("end");
            tutorialScoreBar.text.innerHTML = "Good Job. Let's start.";
            canvas.appendChild(stratButton());
            new Audio('src/speedup.mp3').play();
            tutorialStart = true;
        }else if(blockSuccess > 1 && bonusSuccess > 1) {
            console.log("stage3");
            tutorialScoreBar.text.innerHTML = "Tap the treasure chest to open it";
            stage3 = setInterval(tutorialGenerateObstacle, 5000, 2);
            tutorialStart = true;
            new Audio('src/speedup.mp3').play();
        }else if(blockSuccess > 1){
            console.log("stage2");
            tutorialScoreBar.text.innerHTML = "Swipe/Click the arrow to get the gem";
            stage2 = setInterval(tutorialGenerateObstacle, 5000, 1);
            tutorialStart = true;
            new Audio('src/speedup.mp3').play();
        }else{
            console.log("stage1");
            tutorialScoreBar.text.innerHTML = "Swipe/Click the arrow to avoid the rock";
            stage1 = setInterval(tutorialGenerateObstacle, 5000, 0);
            tutorialStart = true;
        }
    }
    console.log(stage);
}

function stratButton(){
    var startButton = document.createElement("button");
    startButton.onclick = function () {
        window.location.replace("multitasking.html");
    }
    startButton.classList.add("startGame");
    startButton.innerHTML = "Start";
    startButton.style.position = "absolute";
    startButton.style.top = "420px";
    startButton.style.left = "650px";
    return startButton;
}

function skipButton(){
    var skipButton = document.createElement("button");
    skipButton.onclick = function () {
        window.location.replace("multitasking.html");
    }
    skipButton.classList.add("startGame");
    skipButton.innerHTML = "Skip";
    skipButton.style.position = "absolute";
    skipButton.style.top = "350px";
    skipButton.style.left = "650px";
    return skipButton;
}