//Check if user is logged in. If not, redirect to login page
function checkLogin(){
    if(sessionStorage.getItem("currentUser") == null){
        window.location.replace("index.html");
    }
}