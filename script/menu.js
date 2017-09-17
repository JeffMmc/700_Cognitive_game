var canvas;
var memoryLink;
var multitaskingLink;

window.onload = function(){
    checkLogin();
	initMenu();
}

function initMenu(){
	var title = document.getElementById("title_text");
    title.innerHTML = "Welcome, " + sessionStorage.getItem("currentUser");

    var logout = document.getElementById("logout");
    logout.onclick = function () {
		window.location.replace("index.html");
    }
}