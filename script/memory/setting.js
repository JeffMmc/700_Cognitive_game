function goToSetting(){
    clearScreen(game);
    var audio = document.getElementById('bgm');
	var settingTitle=document.createElement('img');
	settingTitle.setAttribute('src','assets/img/settings.png');
	settingTitle.setAttribute('id','set-logo');
    var goBackbtn = createClickButton('Back',goToMainScreen);
    var volTxt = document.createElement('p');
    volTxt.innerHTML='Volume';
    volTxt.setAttribute('id','volTxt');
    volTxt.setAttribute('class','button-text');
    var slider=document.createElement('input');
    slider.setAttribute('type','range');
    slider.setAttribute('value', audio.volume*100);
    slider.setAttribute('onchange','showValue(this.value)');
    var volNum = document.createElement('p');
    volNum.innerHTML=audio.volume*100;
    volNum.setAttribute('id','volNum');
    volNum.setAttribute('class','button-text');
    
    addToScreen(settingTitle,volTxt,slider,volNum,goBackbtn);
}

function showValue(newValue){
    var audio = document.getElementById('bgm');
	document.getElementById("volNum").innerHTML= newValue;
	var vol=newValue/100;
	audio.volume=vol;

    var cAudio=document.getElementById('correctSound');
    var wAudio=document.getElementById('wrongSound');
    cAudio.volume=vol;
    wAudio.volume=vol;
}