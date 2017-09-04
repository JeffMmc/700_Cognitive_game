function recordMultaskingScore(){
	var scoreIndex = 0;
    for (var key in localStorage){
        if(key.substr(0, currentUser.length+5) == currentUser + "MtBlS"){
			scoreIndex += 1;
		}
    }

    persistScore(scoreIndex);
    sessionStorage.setItem("newHighScore", 0);

    if(scoreIndex == 0){
        //First score of all time
        sessionStorage.setItem("newHighScore", 1);
        localStorage.setItem(currentUser + "MtBest", score);
	}else{
        var bestScore = localStorage.getItem(currentUser + "MtBest");

        if(score > bestScore){
        	sessionStorage.setItem("newHighScore", 1);
            sessionStorage.setItem("lastHighScore", bestScore);
            localStorage.setItem(currentUser + "MtBest", score);
		}
	}

}

//Store score into localStorage
function persistScore(scoreIndex){
		localStorage.setItem(currentUser + 'Mt' + scoreIndex, score);
		localStorage.setItem(currentUser +'MtBl' + scoreIndex, block);
		localStorage.setItem(currentUser +'MtBlS' + scoreIndex, blockSuccess);
		localStorage.setItem(currentUser +'MtBo' + scoreIndex, bonus);
		localStorage.setItem(currentUser +'MtBoS' + scoreIndex, bonusSuccess);
		localStorage.setItem(currentUser +'MtBr' + scoreIndex, breakable);
		localStorage.setItem(currentUser +'MtBrS' + scoreIndex, breakableSuccess);
    	localStorage.setItem(currentUser +'MtCombo' + scoreIndex, maxCombo);
}

//For debugging
function printRecord(){
	var i = 0;
	while (localStorage.getItem('Mt' + i) != null){
		console.log(i + " : " + localStorage.getItem('Mt' + i));
		i += 1;
	}
}
