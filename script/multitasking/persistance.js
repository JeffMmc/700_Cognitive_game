function recordMultaskingScore(){
	var scoreIndex = 0;
    for (var key in localStorage){
        if(key.substr(0, currentUser.length+2) == currentUser + "Mt"){
			scoreIndex += 1;
		}
    }

    persistScore(scoreIndex);
    sessionStorage.setItem("newHighScore", 0);

    if(scoreIndex == 0){
        //First score of all time
        sessionStorage.setItem("newHighScore", 1);
        localStorage.setItem(currentUser + "lMtBest", score);
	}else{
        var bestScore = localStorage.getItem(currentUser + "lMtBest");

        if(score > bestScore){
        	sessionStorage.setItem("newHighScore", 1);
            sessionStorage.setItem("lastHighScore", bestScore);
            localStorage.setItem(currentUser + "lMtBest", score);
		}
	}

}

//Store score into localStorage
function persistScore(scoreIndex){
    var userData = {'MtBl':block,'MtBlS':blockSuccess,
        'MtBo':bonus,'MtBoS':bonusSuccess,
        'MtBr':breakable,'MtBrS':breakableSuccess,
        'score':score,'combo':maxCombo
    };

    localStorage.setItem(currentUser+'Mt'+scoreIndex, JSON.stringify(userData));
}

//For debugging
function printRecord(){
	var i = 0;
	while (localStorage.getItem('Mt' + i) != null){
		console.log(i + " : " + localStorage.getItem('Mt' + i));
		i += 1;
	}
}
