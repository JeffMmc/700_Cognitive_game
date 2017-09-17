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
	if((newValue>Math.max(array))||array.length){
		var userData=JSON.parse(localStorage[userName]);
		userData['highScore'+currentLevel]=newValue;
		localStorage[userName]=JSON.stringify(userData);
		return true;
	}else{
		return false;
	}
}

function saveData(userName,variable,value){
	var userData=JSON.parse(localStorage[userName]);
	userData[variable]=value;	
	localStorage[userName]=JSON.stringify(userData);
}

function saveNewScore(userName,variable,value){
	var userData=JSON.parse(localStorage[userName]);
	var records=userData[variable];
	records.push(value);
	var newRecords=checkHighScore(value,records);
	localStorage[userName]=JSON.stringify(userData);
	if(newRecords){
		return true;
	}else{
		return false;
	}	
}

function getData(userName,variable){
	 var userData=JSON.parse(localStorage[userName]);
	 return userData[variable];
}

function getAllData(userName){
    var userData=JSON.parse(localStorage[userName]);
    return userData;
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