/**Refer to tools.js for a list of functions to help create elements, etc */
userName='Jing';
currentLevel=0;
hint=-1;
window.onload = function(){
    checkLogin();
    localStorage.clear();
    initialData(userName); 
    //<embed src="/music/good_enough.mp3" width="180" height="90" loop="false" autostart="false" hidden="true" />
    //wait till everything is loaded before doing DOM manipulation
    game = document.getElementById("game");

    //loading screen (load all assets)
    var loading = document.createElement("img");
    loading.setAttribute("id","loading");
    loading.setAttribute("src","assets/img/loading.png");
    
    game.appendChild(loading);
    loadbgm('springish');
    setUpbuttonSound()
    loading.remove();
    
    //this should only be loaded once all assets are loaded into the game
    var logo = document.createElement("img");
    logo.setAttribute("id","logo");
    logo.setAttribute("src","assets/img/logo.png");
    game.appendChild(logo);
    
    var startButton = createClickButton("Start Game", goToMainScreen);
    game.appendChild(startButton);

    
    //clearScreen(game);
}

//Core functionalities for game
function startGame(level){
    hint=-1;
    clearScreen();
    changebgm('Levels');
    loadKitchen();

    var ingredientsArray = ["prawn","crab","chilli","tomato","chicken","rice","noodles","egg","coconut","ice","sugar","peanut"];
    var recipes = {
        "chillicrab": ["chilli","tomato","crab"],
        "chickenrice": ["chicken","rice"],
        "currylaksa": ["noodles","egg","prawn"],
        "nasilemak": ["rice","coconut","chilli"],
        "aiskacang": ["ice","peanut","sugar"]}
        var dishes = [];

    score = 0;
    time = 100;
    gameStarted = false;
    tutorialMode = false;

    switch(level){
        case 1:
            console.log("start level 1");
            dishes = ["chillicrab","chickenrice"];
            time = 300;
            currentLevel=1
            break;
        case 2:
            dishes = ["chillicrab","chickenrice","currylaksa"];
            time = 240;
            currentLevel=2
            break;
        case 3:
            dishes = ["chillicrab","chickenrice","currylaksa","nasilemak", "aiskacang"];
            time = 180;
            currentLevel=3
            break;
        default:
            goToMainScreen(); //something went wrong, kick em out of game
            break;
    }

    var backButton = createBackButton();
    addToScreen(backButton);

    var timer = document.createElement("p");
    timer.innerHTML = "Time left: " + time + "s";
    timer.setAttribute("id","timer");

    var scoreBoard = document.createElement("p");
    scoreBoard.innerHTML = "Dishes Completed: " + score + "/" + dishes.length;
    scoreBoard.setAttribute("id","score-board");

    var recipeBook = document.createElement("div");
    recipeBook.setAttribute("id","recipe-book");
    recipeBook.innerHTML = "Recipe\nBook"
    recipeBook.setAttribute("onclick", "showPopupBoard()");

    var popupBoard = createPopupBoard();
    var boardContent = document.createElement("div");
    boardContent.setAttribute("id","board-content");

    //load dishes
    for(var i = 0; i < dishes.length; i++){
        var dishName = dishes[i];
        //generate recipe block.. accept array of ingredients and dishname
        var recipeBlock = createRecipeBlock(recipes, dishName);
        boardContent.appendChild(recipeBlock);
    }

    //generate at least 3
    while(i < 3){
        var recipeBlock = createEmptyRecipeBlock();
        boardContent.appendChild(recipeBlock);
        i++;
    }

    popupBoard.appendChild(boardContent);

    var instructionText = document.createElement("p");
    instructionText.className = "instruction-text";
    instructionText.innerHTML = "Click 'Close' when you're ready to play.";
    popupBoard.appendChild(instructionText);

    var closePopup = createClickButton("Close", hidePopupBoard);
    closePopup.setAttribute("id", "popup-button");
    closePopup.className = "close-button";
    popupBoard.appendChild(closePopup);

    addToScreen(popupBoard,timer,scoreBoard,recipeBook); //arrangement is important for elements to show up infront.

    pot = new Pot(dishes, recipes);
    var potView = pot.generatePot();

    ingredients = new Ingredients(ingredientsArray);
    var counter = ingredients.generateIngredient();

    var dishBlock = pot.generateDishBlock();
    
    addToScreen(dishBlock,potView,counter);

    showPopupBoard();
    
}

//Tutorial
function startTutorial(){
    clearScreen();
    changebgm('Levels');
    loadKitchen();

    var ingredientsArray = ["prawn","crab","chilli","tomato","chicken","rice","noodles","egg","coconut","ice","sugar","peanut"];
    var recipes = {
        "chillicrab": ["chilli","tomato","crab"],
        "chickenrice": ["chicken","rice"],
        "currylaksa": ["noodles","egg","prawn"]}
    var dishes = ["chickenrice"];

    score = 0;
    time = 9999; //Almost an infinite amount, just incase user decides to afk :X
    tutorialMode = true;
    gameStarted = false;
    

    var backButton = createBackButton();
    addToScreen(backButton);

    var timer = document.createElement("p");
    timer.innerHTML = "Time left: " + time + "s";
    timer.setAttribute("id","timer");

    var scoreBoard = document.createElement("p");
    scoreBoard.innerHTML = "Dishes Completed: " + score + "/" + dishes.length;
    scoreBoard.setAttribute("id","score-board");

    var recipeBook = document.createElement("div");
    recipeBook.setAttribute("id","recipe-book");
    recipeBook.innerHTML = "Recipe\nBook"
    recipeBook.setAttribute("onclick", "showTutorialPopup()");

    var popupBoard = createInstructionPopup();

    var boardContent = document.createElement("div");
    boardContent.setAttribute("id","board-content-tutorial");

    for(var i = 0; i < dishes.length; i++){
        var dishName = dishes[i];
        //generate recipe block.. accept array of ingredients and dishname
        var recipeBlock = createRecipeBlock(recipes, dishName);
        boardContent.appendChild(recipeBlock);
    }

    //generate at least 3
    while(i < 3){
        var recipeBlock = createEmptyRecipeBlock();
        boardContent.appendChild(recipeBlock);
        i++;
    }

    popupBoard.appendChild(boardContent);

    var instructionText = document.createElement("p");
    instructionText.className = "instruction-text";
    instructionText.innerHTML = "Click 'Close' when you're ready to play.";
    popupBoard.appendChild(instructionText);

    var closePopup = createClickButton("Close", hideTutorialPopup);
    closePopup.setAttribute("id", "popup-button");
    closePopup.className = "close-button";
    popupBoard.appendChild(closePopup);

    addToScreen(popupBoard,timer,scoreBoard,recipeBook); //arrangement is important for elements to show up infront.

    pot = new Pot(dishes, recipes);
    var potView = pot.generatePot();

    ingredients = new Ingredients(ingredientsArray);
    var counter = ingredients.generateTutorialIngredient();

    var dishBlock = pot.generateDishBlock();
    
    addToScreen(dishBlock,potView,counter);

    showPopupBoard();
}

//Main Screen
function goToMainScreen(){
    clearScreen();
    stopTimer();
    removeKitchen();
    clearAllInterval();
    var logo = document.createElement("img");
    logo.setAttribute("id","top-logo");
    logo.setAttribute("src","assets/img/logo.png");
    game.appendChild(logo);

    var tutorialButton = createClickButton("Tutorial", startTutorial);
    var levelButton = createClickButton("Level Selection", goToLevelSelection);
    var settingsButton = createClickButton("Settings",  goToSetting);
    var userButton = createClickButton("Change User", function(){});

    addToScreen(tutorialButton,levelButton,settingsButton,userButton);
};

//Level Selection
function goToLevelSelection(){
    clearScreen();
    stopTimer();
    removeKitchen();
    clearAllInterval();

    var logo = document.createElement("img");
    logo.setAttribute("id","top-logo");
    logo.className = "level-header";
    logo.setAttribute("src","assets/img/level.png");
    game.appendChild(logo);

    var levelOne = createClickButton("Level One", function(){startGame(1)});
    var levelTwo = createClickButton("Level Two", function(){startGame(2)});
    var levelThree = createClickButton("Level Three", function(){startGame(3)});
    var backToMain = createClickButton("Back" ,goToMainScreen);

    addToScreen(levelOne,levelTwo,levelThree,backToMain);
};

