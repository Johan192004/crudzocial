let users = JSON.parse(window.localStorage.getItem("users"))
let chosenUserIndex = parseInt(JSON.parse(window.localStorage.getItem("userIndex")))

const Agregar = document.getElementById("Agregar")
const inputURL = document.querySelector("input")
const buttonPost = document.querySelector("button")


let chosenUser = users[chosenUserIndex]

for(const URL in chosenUser.images){
    let imgContainer = document.createElement("div")
    imgContainer.innerHTML = `<div class="card d-flex flex-column align-items-center">
    <img src="${chosenUser.images[URL]}" class="img img-fluid">
    <button class="btn btn-danger" id="img-eliminar">Eliminar</button></div>`
    Agregar.appendChild(imgContainer)

    let botonEliminar = imgContainer.querySelector("#img-eliminar")

    botonEliminar.addEventListener("click",()=>{
        
        if(confirm("Estas seguro que deseas eliminar la imagen?")){
            imgContainer.remove()

            chosenUser.images.splice(URL,1)
            window.localStorage.setItem("users",JSON.stringify(users))
        } 

        
    })

    inputURL.value = ""
}
 
function verifyLogIn(){
    if(window.sessionStorage.getItem("auth") != "true"){
        window.location = "../../login.html"
    }
}   

verifyLogIn()

buttonPost.addEventListener("click",()=>{

    if(!inputURL.value){

        alert("No ingresaste nada")

    } else {

        let latestValidImgIndex = chosenUser.images.length
        console.log(latestValidImgIndex)
   

        let imgURL = inputURL.value
        let imgContainer = document.createElement("div")
        imgContainer.innerHTML = `<div class="card d-flex flex-column align-items-center">
        <img src="${imgURL}" class="img img-fluid">
        <button class="btn btn-danger" id="img-eliminar">Eliminar</button></div>`
        Agregar.appendChild(imgContainer)

        chosenUser.images.push(imgURL)

        let botonEliminar = imgContainer.querySelector("#img-eliminar")

        botonEliminar.addEventListener("click",()=>{
            
            if(confirm("Estas seguro que deseas eliminar la imagen?")){
                imgContainer.remove()

                console.log(latestValidImgIndex)
                chosenUser.images.splice(latestValidImgIndex,1)
                window.localStorage.setItem("users",JSON.stringify(users))
            } 
        })

        inputURL.value = ""

       
    }

})
















