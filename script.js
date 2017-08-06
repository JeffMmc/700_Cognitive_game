window.onload = function(){
    console.log("Ready");
    //clear session storage;
    window.sessionStorage.clear();

    startGame(document.getElementById('gameDifficulty').value);

    

    // Array.from(document.getElementsByClassName("cards")).forEach(function(el){
    //     el.addEventListener("click",function(){
    //         console.log(this);
    //     });
    // });

    document.getElementById("gameDifficulty").addEventListener("change",function(){
        restart();
    })
    
}

function startGame(diff){
    var canvas = document.getElementById("gc");
    var difficulty = diff;
    var preventClick = true;
    var difficultyColumn = [3,4,4];
    var difficultyRow = [2,3,4];

    var numberOfCol = difficultyColumn[difficulty];
    var numberOfRow = difficultyRow[difficulty];
    
    var randomNumbers = [];
    var totalNumbers = numberOfCol * numberOfRow;
    for(var i = 0; i < totalNumbers; i++){
        randomNumbers.push(i);
    }

    console.log(randomNumbers);
    
    for(var i = 0; i < numberOfRow; i++){
        var rowElement = document.createElement("div");
        rowElement.classList += "flex-row";
        for(var j = 0; j < numberOfCol; j++){
            var random = Math.floor((Math.random() * randomNumbers.length));
            var num = (randomNumbers.splice(random,1)[0] + 1);

            var cardElement = document.createElement("div");
            cardElement.classList = "cards cards-" + numberOfCol + " hidden";
            cardElement.id = num;
            if(num > (totalNumbers/2)){
                num = findPair(num, totalNumbers);
            }
            cardElement.dataset.url = "'url(img/" + num + ".png)'";
            cardElement.innerHTML = num;
            //show sneakpeak for 1s
            cardElement.classList.add("selected");
            cardElement.classList.add("background-" + num);
            
            cardElement.addEventListener("click",function(){
                if(!preventClick){
                    console.log(this.id);
                    if(!this.classList.contains("matched")){
                        if(window.sessionStorage.select1 === undefined){
                            window.sessionStorage.select1 = this.id;
                            this.classList += " selected";
                            window.setTimeout(() => {
                                this.classList.add("background-" + this.innerHTML);
                            },250);
                            
                            
                        } else if(window.sessionStorage.select2 === undefined){
                            window.sessionStorage.select2 = this.id;
                            this.classList += " selected";
                            window.setTimeout(() => {
                                this.classList.add("background-" + this.innerHTML);
                            },250);

                            window.setTimeout(() => {
                                if(matchPair(window.sessionStorage.select1,window.sessionStorage.select2,totalNumbers)){
                                    console.log("matched!");
                                    //do whatever
                                    
                                    var el1 = window.sessionStorage.select1;
                                    var el2 = window.sessionStorage.select2;
                                    el1 = document.getElementById(el1);
                                    el2 = document.getElementById(el2);
                                    el1.classList += " matched";
                                    el2.classList += " matched";

                                    window.sessionStorage.clear();
                                    if(checkGameState(totalNumbers)){
                                        var winElement = document.getElementById("win");
                                        winElement.classList.add("fade");
                                        // winElement.innerHTML = "Congratulations!";
                                    }
                                } else {
                                    console.log("awww doesnt match.");
                                    //clear storage.
                                    preventClick = true;
                                    window.setTimeout(function(){
                                        preventClick = false;
                                        var el1 = window.sessionStorage.select1;
                                        var el2 = window.sessionStorage.select2;
                                        el1 = document.getElementById(el1);
                                        el2 = document.getElementById(el2);
                                        el1.classList.remove("selected");
                                        el2.classList.remove("selected");
                                        el1.classList.remove("background-" + el1.innerHTML);
                                        el2.classList.remove("background-" + el2.innerHTML);
                                        window.sessionStorage.clear();
                                    },500);
                                    
                                }
                            },250);

                        }
                    }
                    
                }
                
                
            });
            rowElement.appendChild(cardElement);
        }
        canvas.appendChild(rowElement);
    }

    var delay = fadeIn(150);
    window.setTimeout(() => {
        endSneakPeak();
        preventClick = false;
    },1000 + (delay));


}

function fadeIn(delay){
    var counter = 1;
    var cardElements = document.getElementsByClassName("cards");
    Array.from(cardElements).forEach(function(element){
       window.setTimeout(() => {
            element.classList.add("fade");
       },delay * counter);
       counter++;
    });

    return counter*delay;
    
}

function endSneakPeak(){
    Array.from(document.getElementsByClassName("cards")).forEach(function(element){
        element.classList.remove("selected");
        element.classList.remove("background-" + element.innerHTML);
    });
}

function restart(){
    document.getElementById("gc").innerHTML = "<div id='win'>Congratulations!</div>";
    var difficulty = document.getElementById("gameDifficulty").value;
    console.log(difficulty);
    startGame(difficulty);
}

function checkGameState(totalNumbers){
    var count = 0;
    Array.from(document.getElementsByClassName("cards")).forEach(function(element){
        if(element.classList.contains("matched")){
            count++;
        }
    });

    if(count === totalNumbers){
        return true;
    } else {
        return false;
    }
}

function matchPair(select1,select2,totalNumbers){
    if(select1 == findPair(select2,totalNumbers)){
        return true;
    }

    return false;
}

function findPair(index, totalNumbers){
    return (totalNumbers - index) + 1;
}