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

    this.generateIngredient = function(){
        var counter = this.createCounter();
        this.shuffleIngredients();

        for(var i = 0; i < this.basket.length; i++){
            //maybe create ingredient object
            var ingredientName = this.basket[i];
            var ingredientBlock = document.createElement("div");
            ingredientBlock.className = "ingredient-block";
            ingredientBlock.setAttribute("id", "ingredient-"+i);
            ingredientBlock.setAttribute("onclick", "pot.addIngredient('" + ingredientName + "')");
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
                ingredientBlock.setAttribute("onclick", "pot.addTutorialIngredient('" + ingredientName + "')");
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
            ingredientBlock.setAttribute("onclick", "pot.addIngredient('" + ingredientName + "')");
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