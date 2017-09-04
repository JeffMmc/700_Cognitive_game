window.onload = function(){
    //clear session storage;
    window.sessionStorage.clear();
    generateExistUser();
    initRegisterButton();
    document.getElementById("register_panel").style.display = 'none';
}

function generateExistUser(){
    var userlist = document.getElementById("id_List");

    for (var key in localStorage){
        if(key.substr(0,5) == "user_"){
            var userid = document.createElement("Button");
            userid.classList.add("id_user");
            userid.innerHTML = localStorage.getItem(key);
            userid.id = localStorage.getItem(key);
            userid.onclick = function () {
                sessionStorage.setItem('currentUser', this.id);
                window.location.replace("index.html");
            }
            userlist.appendChild(userid);
        }
    }
}

function initRegisterButton(){
    var registerButton = document.getElementById("register_button");
    registerButton.onclick = function () {
        document.getElementById("login_panel").style.display = 'none';
        document.getElementById("register_panel").style.display = null;
    }

    var registerConfirm = document.getElementById("register_confirm");
    registerConfirm.onclick = function () {
        var username = document.getElementById("register_input").value;

        if(username.length == 0) {
            alert("Please enter your name");
        }else if(localStorage.getItem("user_" + username) === null){
            localStorage.setItem("user_" + username, username);
            sessionStorage.setItem('currentUser', username);
            window.location.replace("index.html");
        }else{
            alert(username + " has been used");
        }
    }

    var registerCancel = document.getElementById("register_cancel");
    registerCancel.onclick = function () {
        document.getElementById("register_panel").style.display = 'none';
        document.getElementById("login_panel").style.display = null;
    }

}