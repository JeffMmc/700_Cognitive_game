function recordMultaskingScore(){
	var logDate = dateFormating();
	var recorded = false;
	
	if(localStorage.lastMultitasking == null){
		//First score of all time
		persistScore(0);
	}else if(localStorage.lastMultitasking == logDate){
		//New score of the day
		localStorage.setItem('lastMultitasking', logDate);
		var highscore;
		
		var recorded = false;
		var i = 0;
		while(!recorded){
			if(localStorage.getItem('Mt' + i) == null){
				highscore = localStorage.getItem('Mt' + (i-1));
				//New High score
				if(score > highscore){
					persistScore(i - 1);
				}
				recorded = true;
			}
			i += 1;
		}
		
	}else{
		//First score of the day
		localStorage.setItem('lastMultitasking', logDate);
		
		var recorded = false;
		var i = 0;
		while(!recorded){
			if(localStorage.getItem('Mt' + i) == null){
				highscore = localStorage.getItem('Mt' + (i-1));
				//New High score
				if(score > highscore){
					persistScore(i - 1);
				}
				recorded = true;
			}
			i += 1;
		}
	}
	
	localStorage.setItem('lastMultitasking', logDate);
}

function addNewScore(){
	for (var i = 0; i < 19; i++){
		localStorage.setItem('MultitaskingScore' + i, localStorage.getItem('MultitaskingScore' + (i+1)));
	}
	localStorage.setItem('MultitaskingScore20', score);
}

//Store score into localStorage
function persistScore(scoreIndex){
		localStorage.setItem(['Mt' + scoreIndex], score);
		localStorage.setItem('MtBl' + scoreIndex, block);
		localStorage.setItem('MtBlS' + scoreIndex, blockSuccess);
		localStorage.setItem('MtBo' + scoreIndex, bonus);
		localStorage.setItem('MtBoS' + scoreIndex, bonusSuccess);
		localStorage.setItem('MtBr' + scoreIndex, breakable);
		localStorage.setItem('MtBrS' + scoreIndex, breakableSuccess);
}

function dateFormating(){
	var d = new Date();
	var month, day;
	if(d.getMonth() + 1 < 10){
		month = "0" + (d.getMonth() + 1).toString();
	}else{
		month = (d.getMonth() + 1).toString();
	}
	
	if(d.getDate() < 10){
		day = "0" + d.getDate().toString();
	}else{
		day = d.getDate().toString();
	}
	
	return d.getFullYear().toString() + month + day + "multitasking";
}

//For debugging
function printRecord(){
	var i = 0;
	while (localStorage.getItem('Mt' + i) != null){
		console.log(i + " : " + localStorage.getItem('Mt' + i));
		i += 1;
	}
}

function printScore(){
	var canvas = document.getElementById("gc");
	var i = 0;
	while(localStorage.getItem('Mt' + i) != null){
		var score = document.createElement("p");
		var blcok = document.createElement("p");
		var bouns = document.createElement("p");
		var breakable = document.createElement("p");
		
		score.innerHTML = "Score : " + localStorage.getItem('MtBl' + i);
		blcok.innerHTML = "Block Avoided: " + localStorage.getItem('Mt' + i) + "(" + (localStorage.getItem('MtBlS' + i) / localStorage.getItem('MtBl' + i))	+ ")";
		canvas.appendChild(score);
		canvas.appendChild(blcok);
		
		i += 1;
	}
	
	
	
}