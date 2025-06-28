const Agregar = document.getElementById("Agregar")
const inputURL = document.querySelector("input")
const buttonPost = document.querySelector("button")

 

buttonPost.addEventListener("click",()=>{

    if(!inputURL.value){

        alert("No ingresaste nada")

    } else {

        let imgURL = inputURL.value
        let imgContainer = document.createElement("div")
        imgContainer.innerHTML = `<div class="card d-flex flex-column align-items-center">
        <img src="${imgURL}" class="img img-fluid">
        <button class="btn btn-danger" id="img-eliminar">Eliminar</button></div>`
        Agregar.appendChild(imgContainer)

        let botonEliminar = imgContainer.querySelector("#img-eliminar")

        botonEliminar.addEventListener("click",()=>{
            
            if(confirm("Estas seguro que deseas eliminar la imagen?")){
                imgContainer.remove()
            } 
        })

        inputURL.value = ""

       
    }

})
















