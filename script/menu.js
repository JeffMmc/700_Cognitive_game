var canvas;
var memoryLink;
var multitaskingLink;

window.onload = function(){
    console.log("Ready");
    //clear session storage;
    window.sessionStorage.clear();
	initMenu();
}

function initMenu(){
	canvas = document.getElementById("gc");
	memoryLink = document.createElement("button");
	
}