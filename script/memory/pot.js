function Pot(dishes,recipes){
    this.recipes = recipes; //when Pot is initialise, it will hold all recipes that it currently knows
    this.pot = [];
    this.dishes = dishes;
    this.totalDish = dishes.length;
    this.currentDish = this.dishes.splice([Math.floor(Math.random() * this.dishes.length)],1)[0];

    this.addIngredient = function(ingredient){
        if(this.pot.length < 3){
            this.pot.push(ingredient);
            this.refreshPotBlock();
        }
    }

    this.addTutorialIngredient = function(ingredient,addedFlag = false){
        if(ingredient === "chicken" && this.pot.indexOf("chicken") == -1){
            this.pot.push(ingredient);
            this.refreshTutotrialPotBlock();
            removeArrowAndInstruction();
            var location = getIngredientLocation("rice", "ingredient-block");
            var arrow = arrowHover(location.x,location.y);
            updateInstruction("You can click on another ingredient to add it into the pot");
            addToScreen(arrow);
        } else if(ingredient === "rice" && this.pot.indexOf("rice") == -1 && this.pot.indexOf("chicken") >= 0){
                this.pot.push(ingredient);
                this.refreshTutotrialPotBlock();
                removeArrowAndInstruction();
            if(addedFlag){
                updateInstruction("Click on cook once you confirm that your recipe is correct.");
                var location = getIngredientLocation("cookbutton", null);

                var rice = getIngredientElement("rice", "pot-ingredient");
                rice.setAttribute("onclick", "");

                var arrow = arrowHover(location.x,location.y);
                addToScreen(arrow);
            } else {
                updateInstruction("You can click on the ingredient in the pot to remove it");
                var location = getIngredientLocation("rice", "pot-ingredient");
                var arrow = arrowHover(location.x,location.y);
                addToScreen(arrow);
            }
            
        }
    }

    this.generatePot = function(){
        var potBlock = document.createElement("div");
        potBlock.setAttribute("id", "pot-block");
        return potBlock;
    }

    this.refreshPotBlock = function(){
        var potBlock = document.getElementById("pot-block");
        this.clearPot();
        var i = 0;
        for(i;i < this.pot.length; i++){
            var potIngredient = document.createElement("div");
            potIngredient.className = "pot-ingredient";
            potIngredient.setAttribute("onclick", "pot.removeIngredient(" + i +")");
            var potIngredientImage = document.createElement("img");
            potIngredientImage.setAttribute("src", "assets/img/" + this.pot[i] + ".png");
            potIngredientImage.className = "pot-ingredient-img";
            potIngredient.appendChild(potIngredientImage);
            potBlock.appendChild(potIngredient);
        }

        while(i < 3){
            var potIngredient = document.createElement("div");
            potIngredient.className = "pot-ingredient";
            var potIngredientImage = document.createElement("img");
            potIngredientImage.className = "pot-ingredient-img";
            potIngredient.appendChild(potIngredientImage);
            potBlock.appendChild(potIngredient);
            i++;
        }

        if(this.pot.length > 0){
            var cookButton = this.generateCookButton();
            
            potBlock.appendChild(cookButton);
        }
        
    }

    this.refreshTutotrialPotBlock = function(){
        var potBlock = document.getElementById("pot-block");
        this.clearPot();
        var i = 0;
        for(i;i < this.pot.length; i++){
            var potIngredient = document.createElement("div");
            potIngredient.className = "pot-ingredient";
            if(this.pot[i] === "rice"){
                potIngredient.setAttribute("onclick", "pot.removeTutorialIngredient(" + i +")");
            }
            var potIngredientImage = document.createElement("img");
            potIngredientImage.setAttribute("src", "assets/img/" + this.pot[i] + ".png");
            potIngredientImage.className = "pot-ingredient-img";
            potIngredient.appendChild(potIngredientImage);
            potBlock.appendChild(potIngredient);
        }

        while(i < 3){
            var potIngredient = document.createElement("div");
            potIngredient.className = "pot-ingredient";
            var potIngredientImage = document.createElement("img");
            potIngredientImage.className = "pot-ingredient-img";
            potIngredient.appendChild(potIngredientImage);
            potBlock.appendChild(potIngredient);
            i++;
        }

        if(this.pot.length > 0){
            var cookButton = this.generateTutorialCookButton();
            
            potBlock.appendChild(cookButton);
        }
    }

    this.clearPot = function(){
        var potBlock = document.getElementById("pot-block");
        while (potBlock.firstChild) {
            potBlock.removeChild(potBlock.firstChild);
        }
    }

    this.removeIngredient = function(index){
        try{
            this.pot.splice(index,1);
            this.refreshPotBlock();
        } catch(e){
            console.log("unable to remove ingredient");
        }
    }

    this.removeTutorialIngredient = function(index){
        try{
            this.pot.splice(index,1);
            this.refreshTutotrialPotBlock();
            removeArrowAndInstruction();
            var bookLocation = getIngredientLocation("recipebook",null);
            var arrow = arrowHover(bookLocation.x,bookLocation.y);
            updateInstruction("You can click on the recipe book to refer to the recipes.");
            document.getElementById("recipe-book").setAttribute("onclick","showTutorialPopup()");
            addToScreen(arrow);
        } catch(e){
            console.log(e);
            console.log("unable to remove ingredient");
        }
    }

    this.generateCookButton = function(){
        var cookButton = document.createElement("div");
        cookButton.className = "cook-button";
        cookButton.setAttribute("onclick", "pot.cookDish()");
        var cookText = document.createElement("p");
        cookText.className = "cook-button-text";
        cookText.innerHTML = "Cook";
        cookButton.appendChild(cookText);

        return cookButton;
    }

    this.generateTutorialCookButton = function(){
        var cookButton = document.createElement("div");
        cookButton.className = "cook-button";
        cookButton.setAttribute("id", "cook-button-tutorial");
        cookButton.setAttribute("onclick", "pot.cookDish()");
        var cookText = document.createElement("p");
        cookText.className = "cook-button-text";
        cookText.innerHTML = "Cook";
        cookButton.appendChild(cookText);

        return cookButton;
    }

    this.cookDish = function(){
        var ingredientsObject = {};
        var current = this.getCurrentDish();
        var currentRecipe = this.recipes[current];

        for(var i = 0; i < this.pot.length; i++){
            if(ingredientsObject[this.pot[i]]){
                ingredientsObject[this.pot[i]] += 1;
            } else {
                ingredientsObject[this.pot[i]] = 1;
            }
        }

        for(var i = 0; i < currentRecipe.length; i++){
            if(ingredientsObject[currentRecipe[i]]){
                ingredientsObject[currentRecipe[i]] -= 1;
            } else {
                //not in pot, end loop and 
                console.log("no match");
                playButtonSound('wrongSound');
                increment(userName,'wrong'+currentLevel);
                this.pot = [];
                this.clearPot();
                ingredients.refreshCounter();
                return;
            }
        }

        for(var object in ingredientsObject) {
            if(ingredientsObject[object] !== 0){
                console.log("not a match");
                playButtonSound('wrongSound');
                increment(userName,'wrong'+currentLevel);
                this.pot = [];
                this.clearPot();
                ingredients.refreshCounter();
                return;
            }
        }

        this.pot = [];
        this.clearPot();
        console.log("Match");
        playButtonSound('correctSound');
        increment(userName,'correct'+currentLevel);
        score++;
        this.getNextDish(); //this checks for win condition.
        

    }

    this.getCurrentDish = function(){
        return this.currentDish;
    }

    this.getCurrentDishName = function(){

        switch(this.currentDish){
            case "chillicrab":
                return "Chilli Crab";
            case "chickenrice":
                return "Chicken Rice";
            case "currylaksa":
                return "Curry Laksa";
            case "nasilemak":
                return "Nasi Lemak";
            case "aiskacang":
                return "Ice Kacang";
        }
    }

    this.getNextDish = function(){
        updateScore(this.totalDish);
        if(this.dishes.length > 0){
            this.currentDish = this.dishes.splice([Math.floor(Math.random() * this.dishes.length)],1)[0];
            ingredients.refreshCounter();
            this.refreshDishBlock(); //only occurs when win condition fails.
            
        } else {
            //end game
            console.log("No more, you win!");
            ingredients.removeCounter();
            if(tutorialMode){
                showEndTutorialPopup();
            } else {
                stopTimer();
                showEndGamePopup();
            }
            
            
        }
        
    }

    this.refreshDishBlock = function(){
        //refresh dishblock
        document.getElementById("dish-image").setAttribute("src", "assets/img/" + pot.getCurrentDish() + ".png");
        document.getElementById("dish-description").innerHTML = pot.getCurrentDishName();
    }

    this.generateDishBlock = function(){
        //show current dish
        //requires pot object
        var dishBlock = document.createElement("div");
        dishBlock.setAttribute("id", "dish-block");
        var dishImage = document.createElement("img");
        dishImage.setAttribute("id", "dish-image");
        dishImage.setAttribute("src", "assets/img/" + this.getCurrentDish() + ".png");
        var dishDescription = document.createElement("p");
        dishDescription.setAttribute("id", "dish-description");
        dishDescription.innerHTML = this.getCurrentDishName();
        
        dishBlock.appendChild(dishImage);
        dishBlock.appendChild(dishDescription);
    
        return dishBlock;

    }
}