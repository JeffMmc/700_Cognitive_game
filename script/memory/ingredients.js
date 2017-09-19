function Ingredients(ingredients){
    this.basket = ingredients;

    this.shuffleIngredients = function(){
        this.basket = shuffle(this.basket);
    }

    this.createCounter = function(){
        var counter = document.createElement("div");
        counter.setAttribute("id", "counter");
        return counter;
    }

    this.removeCounter = function(){
        document.getElementById("counter").remove();
    }

    this.selectIngredient=function(index,ingredientName){
        var el = document.getElementById("ingredient-" + index);
        if(el.className.split(" ").indexOf("selected") > -1){
            //exist
            pot.addIngredient(ingredientName);
            this.clearSelect(-1);
            this.clearDescription();
        } else {
            //no exist m8
            el.className += " selected";
            //do logic to add description
            this.addSelectedDescription(index, ingredientName);
            this.clearSelect(index);
        }
        //add selected to element
        //el.className = "ingredient-block" //overwrite class name with just this value
        //check selected, if selected then add pot
        //if something else, then give selected. remove the other selected
    }

    this.selectTutorialIngredient = function(index, ingredientName, addedFlag = false){
        var el = document.getElementById("ingredient-" + index);
        if(el.className.split(" ").indexOf("selected") > -1){
            //exist
            pot.addTutorialIngredient(ingredientName, addedFlag);
            this.clearSelect(-1);
            this.clearDescription();
        } else {
            //no exist m8
            el.className += " selected";
            //do logic to add description
            this.addSelectedDescription(index, ingredientName);
            this.clearSelect(index);
        }
    }

    this.addSelectedDescription = function(index, ingredientName){
        this.clearDescription();
        var selectedDescription = document.createElement("p");
        selectedDescription.innerText = ingredientName;
        selectedDescription.setAttribute("id","selected-description");
        var location = getIngredientLocation(ingredientName, "ingredient-block");
        selectedDescription.style.left = (location.x + 5) + "px";
        selectedDescription.style.top = (location.y + 50) + "px";
        addToScreen(selectedDescription);
    }

    this.clearDescription = function(){
        var sd = document.getElementById("selected-description");
        if(sd) {
            sd.remove();
        }
    }

    this.clearSelect = function(selectedIndex){
        //clear all class name except selected index
        var ingredientBlocks = document.getElementsByClassName("ingredient-block");
        for(var i = 0; i < ingredientBlocks.length; i++){
            if(i !== selectedIndex){
                ingredientBlocks[i].className = "ingredient-block";
            }
        }
    }

    this.generateIngredient = function(){
        var counter = this.createCounter();
        this.shuffleIngredients();

        for(var i = 0; i < this.basket.length; i++){
            //maybe create ingredient object
            var ingredientName = this.basket[i];
            var ingredientBlock = document.createElement("div");
            ingredientBlock.className = "ingredient-block";
            ingredientBlock.setAttribute("id", "ingredient-"+i);
            ingredientBlock.setAttribute("onclick", "ingredients.selectIngredient(" + i + ",'" + ingredientName + "')");
            var ingredientImage = document.createElement("img");
            ingredientImage.setAttribute("src", "assets/img/" + ingredientName + ".png");
            ingredientImage.className = "ingredient-block-img";
            ingredientBlock.appendChild(ingredientImage);
            counter.appendChild(ingredientBlock);
        }

        return counter;

    }

    this.generateTutorialIngredient = function(){
        var counter = this.createCounter();
        this.shuffleIngredients();

        for(var i = 0; i < this.basket.length; i++){
            var ingredientName = this.basket[i];
            var ingredientBlock = document.createElement("div");
            ingredientBlock.className = "ingredient-block";
            ingredientBlock.setAttribute("id", "ingredient-"+i);
            if(ingredientName === "chicken" || ingredientName === "rice"){
                ingredientBlock.setAttribute("onclick", "ingredients.selectTutorialIngredient(" + i + ",'" + ingredientName + "')");
            }
            var ingredientImage = document.createElement("img");
            ingredientImage.setAttribute("src", "assets/img/" + ingredientName + ".png");
            ingredientImage.className = "ingredient-block-img";
            ingredientBlock.appendChild(ingredientImage);
            counter.appendChild(ingredientBlock);
        }
        return counter;
    }

    this.refreshCounter = function(){
        this.clearCounter();
        var counter = this.getCounter();
        this.shuffleIngredients();

        for(var i = 0; i < this.basket.length; i++){
            //maybe create ingredient object
            var ingredientName = this.basket[i];
            var ingredientBlock = document.createElement("div");
            ingredientBlock.className = "ingredient-block";
            ingredientBlock.setAttribute("id", "ingredient-"+i);
            ingredientBlock.setAttribute("onclick", "ingredients.selectIngredient(" + i + ",'" + ingredientName + "')");
            var ingredientImage = document.createElement("img");
            ingredientImage.setAttribute("src", "assets/img/" + ingredientName + ".png");
            ingredientImage.className = "ingredient-block-img";
            ingredientBlock.appendChild(ingredientImage);
            counter.appendChild(ingredientBlock);
        }

    }

    this.getCurrentIngredientBlock = function(index){
        return document.getElementById("ingredient-" + index);
    }

    this.clearCounter = function(){
        var counter = this.getCounter();
        while (counter.firstChild) {
            counter.removeChild(counter.firstChild);
        }
    }

    this.getCounter = function(){
        return document.getElementById("counter");
    }

    //function to shuffle an array of elements
    var shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
}