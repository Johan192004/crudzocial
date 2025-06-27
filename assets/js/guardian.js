export function verifyLogIn(){
    if(window.sessionStorage.getItem("auth") != "true"){
        window.location = "../../login.html"
    }
}   