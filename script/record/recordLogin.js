window.onload = function(){
    //clear session storage;
    window.sessionStorage.clear();
    generateExistUser();
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
                window.location.replace("record.html");
            }
            userlist.appendChild(userid);
        }
    }
}
