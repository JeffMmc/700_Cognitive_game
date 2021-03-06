var currentUser = sessionStorage.getItem("currentUser");

function initialData(userName){
	console.log('current User:'+userName);
	if(!localStorage[userName]){
		console.log('create User:'+userName);
		var l1=new Array();
		var l2=new Array();
		var l3=new Array();
		var userData = {'correct1':0,'wrong1':0,
						'correct2':0,'wrong2':0,
					    'correct3':0,'wrong3':0,
					    'highScore1':0,'highScore2':0,
					    'records1':l1,'records2':l2,'records3':l3
					    };	
		localStorage[userName]=JSON.stringify(userData);				
	}
	//console.log(userData.correctl1);
	//userData.correctl1=1;
	//console.log(userData.correctl1);	
}


function checkHighScore(newValue,array){
	console.log('loooooooooooooooooooook : '+array);
	console.log("Max array:"+　Math.max.apply(null, array));
	var maxVal = Math.max.apply(null, array);
	if((newValue>maxVal) ||(array.length<1)){
		var userData=JSON.parse(localStorage[userName]);
		userData['highScore'+currentLevel]=newValue;
		localStorage[userName]=JSON.stringify(userData);
		return true;
	}else{
		return false;
	}
}

function saveNewScore(userName,variable,value){
	var userData=JSON.parse(localStorage[userName]);
	var records=userData[variable];
	var newRecords=checkHighScore(value,records);
	records.push(value);
	localStorage[userName]=JSON.stringify(userData);
	if(newRecords){
		return true;
	}else{
		return false;
	}	
}

function increment(userName,variable){	
	var userData=JSON.parse(localStorage[userName]);
	console.log(variable);
	console.log(userData[variable]);
	userData[variable]+=1;
	localStorage[userName]=JSON.stringify(userData);
	console.log(userData[variable]);

}

//Store score into localStorage
function persistScore(){
    var scoreIndex = 0;
    for (var key in localStorage){
        if(key.substr(0, currentUser.length+6) == currentUser + "Memory"){
            scoreIndex += 1;
        }
    }

    var presistData = {'score':preScore,'level':preLevel,
        'correct':preCorrect,'wrong':preWrong,
		'hint': hint-1, 'time': timeUsed
    };
    localStorage.setItem(currentUser+'Memory'+scoreIndex, JSON.stringify(presistData));
}