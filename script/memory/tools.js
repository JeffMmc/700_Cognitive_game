//global variable to hold all window intervals
windowIntervals = [];
timerInterval = [];
timeUsed=0;

//returns a node object.
function createClickButton(buttonText, callbackFunction){
    var startButton = document.createElement("div");
    startButton.className += "game-button";
    //
    startButton.addEventListener("click", callbackFunction);

    var startButtonText = document.createElement("h3");
    startButtonText.innerHTML = buttonText;
    startButtonText.className = "button-text";
    startButton.appendChild(startButtonText);

    return startButton;
}

function createBackButton(){
    console.log("creating back button");
    var backButton = document.createElement("div");
    backButton.className = "back-button";
    backButton.addEventListener("click", goToMainScreen);

    return backButton;
}

//add ingredients to pot object

//create recipeblock for popup
function createRecipeBlock(recipes,dishName){
    var recipeBlock = document.createElement("div");
    if(recipes[dishName]){
        //build it
        recipeBlock.className = "recipe-block";
         for(var j = 0; j < recipes[dishName].length; j++){
             var recipeIngredient = document.createElement("div");
             recipeIngredient.className = "recipe-ingredient";
             var recipeIngredientImage = document.createElement("img");
             recipeIngredientImage.setAttribute("src", "assets/img/" + recipes[dishName][j] + ".png");
             recipeIngredient.appendChild(recipeIngredientImage);
             recipeBlock.appendChild(recipeIngredient);
         }
         if(recipes[dishName].length < 3){
            var recipeIngredient = document.createElement("div");
            recipeIngredient.className = "recipe-ingredient";
            var recipeIngredientImage = document.createElement("img");
            recipeIngredient.appendChild(recipeIngredientImage);
            recipeBlock.appendChild(recipeIngredient);
         }
         var equals = document.createElement("img");
         equals.className = "recipe-equals";
         equals.setAttribute("src", "assets/img/blueForward.png");
         recipeBlock.appendChild(equals);
         var dishResult = document.createElement("img");
         dishResult.className = "final-dish";
         dishResult.setAttribute("src", "assets/img/" + dishName + ".png");
         recipeBlock.appendChild(dishResult);
    }

    return recipeBlock;
}

//create dummy recipe block
function createEmptyRecipeBlock(){
    var recipeBlock = document.createElement("div");
    recipeBlock.className = "recipe-block";
    for(var j = 0; j < 3; j++){
        var recipeIngredient = document.createElement("div");
        recipeIngredient.className = "recipe-ingredient";
        var recipeIngredientImage = document.createElement("img");
        recipeIngredient.appendChild(recipeIngredientImage);
        recipeBlock.appendChild(recipeIngredient);
    }
    return recipeBlock;
}

//create popup

function createPopupBoard(){
    var popupBoard = document.createElement("div");
    popupBoard.setAttribute("id","board");
    popupBoard.className = "hide";

    var popupHeader = document.createElement("h2");
    popupHeader.setAttribute("id","board-header");
    popupHeader.innerHTML = "Recipes"

    popupBoard.appendChild(popupHeader);
    
    return popupBoard;
}

//create instruction popup
function createInstructionPopup(){
    var popupBoard = document.createElement("div");
    popupBoard.setAttribute("id","board");
    popupBoard.className = "hide";

    var popupHeader = document.createElement("h2");
    popupHeader.setAttribute("id","board-header");
    popupHeader.innerHTML = "Welcome to Get Cooking!"

    popupBoard.appendChild(popupHeader);

    var instructions = document.createElement("p");
    instructions.className = "board-text";
    instructions.innerHTML = "Match ingredients according to the recipe book."
    //load dishes
     popupBoard.appendChild(instructions);
    return popupBoard;
}

//show popup 
function showPopupBoard(){
    document.getElementById("recipe-book").className = "hide";
    document.getElementById("board").className = "";
    hint+=1;
}

//hide popup
function hidePopupBoard(){
    document.getElementById("recipe-book").className = "";
    document.getElementById("board").className = "hide";

    if(!gameStarted){
        createTimer();
        gameStarted = true;
    }
}

//hide tutorial mode popup
function hideTutorialPopup(){
    document.getElementById("recipe-book").className = "";
    document.getElementById("board").className = "hide";

    if(!gameStarted){
        createTimer();
        gameStarted = true;
        //show tool tip
        var location = getIngredientLocation("chicken", "ingredient-block");
        
        var arrow = arrowHover(location.x,location.y);
        
        var hoverText = createInstruction("Click on the ingredient to add ingredient to pot");

        document.getElementById("recipe-book").setAttribute("onclick", ""); //disabled it until you reach the point to enable.
    
        addToScreen(arrow, hoverText);
    } else {
        //game started. 
        var location = getIngredientLocation("rice","ingredient-block");
        var arrow = arrowHover(location.x,location.y);
        updateInstruction("Click on rice to add it back into the pot");
        //update the onclick method of rice
        var rice = getIngredientElement("rice", "ingredient-block");
        var riceIndex = rice.getAttribute("id").split("-")[1];
        rice.setAttribute("onclick", "ingredients.selectTutorialIngredient(" + riceIndex + ",'rice', true)");
        document.getElementById("recipe-book").setAttribute("onclick", ""); //disabled it until you reach the point to enable.
        addToScreen(arrow);
    }
}

function showTutorialPopup(){
    showPopupBoard();
    var notes = document.createElement("p");
    notes.className = "instruction-text";
    notes.innerText = "Note: You'll lose point every time you use the recipe book!".toUpperCase();
    notes.style.color = "#dc3545";
    notes.style.fontWeight = "bold";
    document.getElementById("board").appendChild(notes);
    var rice = getIngredientElement("rice", "ingredient-block");
    rice.setAttribute("onclick", "");
    var chicken = getIngredientElement("chicken", "ingredient-block");
    chicken.setAttribute("onclick", "");
    removeArrowAndInstruction();
}

//create instruction text
function createInstruction(text){
    var hoverText = document.createElement("div");
    hoverText.innerText =text;
    hoverText.setAttribute("id", "hover-text");
    return hoverText;
}

//update instruction text
function updateInstruction(text){
    var instructionText = document.getElementById("hover-text");
    instructionText.innerText = text;
}

//function get ingredient index
function getIngredientElement(object, context){
    var elements = document.getElementsByClassName(context);
    var id = 0;
    for(id; id < elements.length; id++){
        var elementImg = elements[id].firstChild.getAttribute("src");
        if(elementImg === "assets/img/"+ object + ".png"){
            //its this one
            return elements[id];
        }

    }

    return null;
}

//get the particular element to hover on
function getIngredientLocation(object, context){
    if(object === "recipebook"){
        var book = document.getElementById("recipe-book");
        var bookTop = book.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 40;
        var bookLeft = book.getBoundingClientRect().left - document.body.getBoundingClientRect().left;
    
        return {x: bookLeft, y:bookTop};

    } else if(object === "cookbutton"){
        var cb = document.getElementById("cook-button-tutorial");
        var cbTop = cb.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 40;
        var cbLeft = cb.getBoundingClientRect().left - document.body.getBoundingClientRect().left;

        return {x: cbLeft, y: cbTop};
    } else {
        var elements = document.getElementsByClassName(context);
        var id = 0;
        for(id; id < elements.length; id++){
            var elementImg = elements[id].firstChild.getAttribute("src");
            if(elementImg === "assets/img/"+ object + ".png"){
                //its this one
                console.log(elementImg);
                break;
            }
    
        }
    
        var topPos = elements[id].getBoundingClientRect().top - document.body.getBoundingClientRect().top - 40;
        var leftPos = elements[id].getBoundingClientRect().left - document.body.getBoundingClientRect().left;
    
        return {x: leftPos, y:topPos};
    }
    
}

//function create arrow hover 
function arrowHover(x,y){
    var topPos = y;
    var leftPos = x;

    direction = "backward";

    var arrow = document.createElement("div");

    arrow.setAttribute("id","hover-arrow");
    arrow.style.top = topPos + "px";
    arrow.style.left = leftPos + "px";

    var upperLimit = y - 25;
    var lowerLimit = y;

    var interval = window.setInterval(function(){
        if(direction === "backward"){
            topPos -= 1;
            arrow.style.top = topPos + "px";
            if(topPos < upperLimit){
                direction = "forward";
            }
        } else {
            //forward
            topPos += 1;
            arrow.style.top = topPos + "px";
            if(topPos > lowerLimit){
                direction = "backward";
            }
        }

    }, 1000/45);

    registerInterval(interval);

    return arrow;
}

function removeArrowAndInstruction(){
    document.getElementById("hover-arrow").remove();
    clearAllInterval();
    document.getElementById("hover-text").innerText = "";
}

//register intervals with variable
function registerInterval(interval){
    windowIntervals.push(interval);
}

//clear all intervals
function clearAllInterval(){
    for(var i = 0; i < windowIntervals.length; i++){
        window.clearInterval(windowIntervals[i]);
    }

    windowIntervals = [];
}

//show end game screen
function showEndGamePopup(){
    showPopupBoard();
    clearBoard();
    //get parent board
    var board = document.getElementById("board");
    //modify header
    var popupHeader = document.createElement("h2");
    popupHeader.setAttribute("id","board-header");
    popupHeader.innerHTML = "Congratulations!";
    board.appendChild(popupHeader);
    
    var result=calculateResult(score);
    var popupScore = document.createElement("h2");
    popupScore.className+=" board-text";
    popupScore.innerHTML = 'Score : '+result[0];
    board.appendChild(popupScore);
    var newRecords=saveNewScore(userName,'records'+currentLevel,result[0]);
    if(newRecords){
    var popupNewRecords = document.createElement("h2");
    popupNewRecords.className+=" board-text";
    popupNewRecords.innerHTML = 'New High Score!';
    board.appendChild(popupNewRecords);
    }
    preScore = result[0];

    var popupComment = document.createElement("h2");
    popupComment.className+=" board-text";
    popupComment.innerHTML = result[1];
    board.appendChild(popupComment);


    var goToLevelScreen = createClickButton("Finish", goToLevelSelection);
    goToLevelScreen.className = "close-button";
    
    board.appendChild(goToLevelScreen);
    persistScore();
    timeUsed=0;
    for (var key in localStorage){
        console.log(key + " : " + localStorage.getItem(key));
        //localStorage.removeItem(key);
    }
  
}

function calculateResult(dishes){
    var totalTime;
    var punish=0;
    switch(currentLevel){
        case 1:
            totalTime=180;
            punish=hint*3;
        break;
        case 2:
            totalTime=240;
            punish=hint*4;
        break;
        case 3:
            totalTime=300;
            punish=hint*5;
        break;

    }
    var timePerDish=(timeUsed/dishes);
    console.log('timePerDish: '+timePerDish);
    var percentage=1-(timePerDish/totalTime);
    var comment = setComment(percentage);
    var finalScore=(percentage*100).toFixed(0)-punish;
    if(finalScore<0){
        finalScore=0;
    }
    console.log('finalScore: '+finalScore);
    result=[finalScore,comment];
    return result;
}

function setComment(percentage){
    var comment;
        if(percentage>0.9){
            comment='You are amazing! Keep up the great work!';
        }
        else if(percentage>0.7){
            comment='Excellent! Keep working harder!';
        }
        else if(percentage>0.5){
            comment='Excellent! Keep working harder!';
        }
        else if(percentage>0.3){
            comment='Excellent! Keep working harder!';
        }else{
             comment='Try Harder!'
        }
       
        return comment;
}



//show end tutorial screen
function showEndTutorialPopup(){
    showPopupBoard();
    clearBoard();
    //get parent board
    var board = document.getElementById("board");
    //modify header
    var popupHeader = document.createElement("h2");
    popupHeader.setAttribute("id","board-header");
    popupHeader.innerHTML = "Congratulations!"
    var boardContent = document.createElement("div");
    boardContent.setAttribute("id", "board-content-tutorial");
    boardContent.style.marginBottom = "60px";
    var popupText = document.createElement("p");
    popupText.className = "board-text";
    popupText.innerHTML = "<br><br><br>You have finished the tutorial. Click select level to start training."
    boardContent.appendChild(popupText);
    board.appendChild(popupHeader);
    board.appendChild(boardContent);

    var goToLevelScreen = createClickButton("Select Level", goToLevelSelection);
    goToLevelScreen.className = "close-button";
    
    
    board.appendChild(goToLevelScreen);
    TimeUsed=0;
}

//show when timer ends
function showNiceTryPopup(){
    showPopupBoard();
    clearBoard();
    //get parent board
    var board = document.getElementById("board");
    //modify header
    var popupHeader = document.createElement("h2");
    popupHeader.setAttribute("id","board-header");
    popupHeader.innerHTML = "Nice Try!"
    board.appendChild(popupHeader);

    var goToLevelScreen = createClickButton("Finish", goToLevelSelection);
    goToLevelScreen.className = "close-button";
    
    board.appendChild(goToLevelScreen);
    TimeUsed=0;
}

//clear recipe block (only call this on end screen)
function clearBoard(){
    var board = document.getElementById("board");
    while(board.firstChild){
        board.removeChild(board.firstChild);
    }
}

//load kitchen asset
function loadKitchen(){
    game.className = "kitchen";
}
function removeKitchen(){
    game.className = "";
}



//clear screen based on given game context
function clearScreen(){
    //param is the game context.
    while (game.firstChild) {
        game.removeChild(game.firstChild);
    }
}

//add all arguments into game
function addToScreen(){
    for (i = 0; i < arguments.length; i++) {
        game.appendChild(arguments[i]);
    }
}

//create timer
function createTimer(){
    console.log("start timer");
    var interval = window.setInterval(function(){
        if(time > 0){
            time -= 1;
        } else {
            //game ended
            stopTimer();
            console.log("game end");
            showNiceTryPopup();
        }
        updateTimer();
    },1000);

    timerInterval.push(interval);
}

//stop timer
function stopTimer(){
    for(var i = 0; i < timerInterval.length; i++){
        window.clearInterval(timerInterval[i]);
    }
    console.log("timer stopped");
}


//update timer on screen
function updateTimer(){
    document.getElementById("timer").innerHTML = "Time left: " + time + "s";
    timeUsed+=1;
}

//update scores
function updateScore(dishes){
    var sb = document.getElementById("score-board");
    sb.innerHTML = "Dishes Completed: " + score + "/" + dishes;
}



function loadbgm(songName){

    var bgm=document.createElement('audio');
    bgm.setAttribute('src','assets/music/'+songName+'.mp3');
    bgm.setAttribute('autoplay','autoplay');
    bgm.setAttribute('loop','loop');
    bgm.volume=0.01;
    bgm.setAttribute('id','bgm');
    game.after(bgm);
}

function changebgm(songName){
    
    bgm.setAttribute('src','assets/music/'+songName+'.mp3');
}

function setUpbuttonSound(){
    
    var correctSound=document.createElement('audio');
    correctSound.setAttribute('src','assets/music/correct.wav');
    correctSound.setAttribute('autostart','false');
    correctSound.setAttribute('id','correctSound');
    correctSound.volume=0.3;
    game.after(correctSound);

    var wrongSound=document.createElement('audio');
    wrongSound.setAttribute('src','assets/music/wrong.wav');
    wrongSound.setAttribute('autostart','false');
    wrongSound.setAttribute('id','wrongSound');
    wrongSound.volume=0.3;
    game.after(wrongSound);

    var buttonSound=document.createElement('audio');
    buttonSound.setAttribute('src','assets/music/button.wav');
    buttonSound.setAttribute('autostart','false');
    buttonSound.setAttribute('id','buttonSound');
      
}

function playButtonSound(soundType){
    console.log(soundType);
    var sound=document.getElementById(soundType);
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}
