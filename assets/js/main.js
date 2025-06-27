const originalUsers = [
    {id:1,name:"Juan Daniel",lastName:"Rua",email:"juan@gmail.com",phoneNumber:"1234567",country:"Colombia",city:"Medellin",address:"Calle 66 # 44b - 55", postalCode: "050001",password:"password1",images:[], logs:[], notes:[]},

    {id:2, name:"Laura Sofía", lastName:"Gómez", email:"laura@gmail.com", phoneNumber:"7654321", country:"Colombia", city:"Bogotá", address:"Carrera 12 # 45 - 78", postalCode: "110111", password:"password2", images:[], logs:[], notes:[]},

    {id:3, name:"Carlos Andrés", lastName:"Torres", email:"carlos@gmail.com", phoneNumber:"3012345678", country:"Colombia", city:"Cali", address:"Calle 9 # 34 - 21", postalCode: "760001", password:"password3", images:[], logs:[], notes:[]},

    {id:4, name:"Mariana", lastName:"Pérez", email:"mariana@gmail.com", phoneNumber:"3123456789", country:"Colombia", city:"Barranquilla", address:"Avenida 30 # 15 - 60", postalCode: "080001", password:"password4", images:[], logs:[], notes:[]},

    {id:5, name:"Santiago", lastName:"Ramírez", email:"santiago@gmail.com", phoneNumber:"3224567890", country:"Colombia", city:"Bucaramanga", address:"Calle 45 # 20 - 15", postalCode: "680001", password:"password5", images:[], logs:[], notes:[]}

]


if(!window.localStorage.getItem("users")){
    window.localStorage.setItem("users",JSON.stringify(originalUsers))
}

let users = JSON.parse(window.localStorage.getItem("users"))

let emailField = document.getElementById("email")
let passwordField = document.getElementById("password")

let buttonLogIn = document.querySelector("button")

buttonLogIn.addEventListener("click",()=>{

    if(emailField.value && passwordField.value){

    for(const user of users){

        if((user.email == emailField.value) && user.password == passwordField.value){

            window.location = "assets/html/images.html"

        }

    }


}

})



