const originalUsers = [
    {id:1,name:"Juan Daniel",lastName:"Rua",email:"juan@gmail.com",phoneNumber:"1234567",country:"Colombia",city:"Medellin",address:"Calle 66 # 44b - 55", postalCode: "050001",password:"password1",images:["https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR1K53M5KVkQW6Az6xQpLeQJyKoJHAW9aON9syospfNNx4_lHa1_1-g8v4UO2w37yTZIMyDyfXuPfGc7V574DYItTgU5obCEqWsmlXB5P8", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSqsHsVxaj7SalYt6C5vml8etZKmEx-NJ9LQGZPAOfRNwy-JLVeWc_AmEtZLZVQGSq-Sg--6WCGITk2NCm_1ZBt3bsSWAl9ktsQE4VQkg"], logs:[], notes:[
    "Termina el proyecto de Java antes del viernes.",
    "Recordar llamar al doctor para la cita anual.",
    "Aprender sobre promesas en JavaScript."
  ]},

    {id:2, name:"Laura Sofía", lastName:"Gómez", email:"laura@gmail.com", phoneNumber:"7654321", country:"Colombia", city:"Bogotá", address:"Carrera 12 # 45 - 78", postalCode: "110111", password:"password2", images:[], logs:[], notes:[
    "Hacer 30 minutos de ejercicio hoy.",
    "Revisar el presupuesto del mes.",
    "Escribir una página del diario personal."
  ]},

    {id:3, name:"Carlos Andrés", lastName:"Torres", email:"carlos@gmail.com", phoneNumber:"3012345678", country:"Colombia", city:"Cali", address:"Calle 9 # 34 - 21", postalCode: "760001", password:"password3", images:[], logs:[], notes:[
    "Estudiar 1 hora de inglés con Anki.",
    "Leer al menos 10 páginas del libro actual.",
    "Organizar los archivos del escritorio."
  ]},

    {id:4, name:"Mariana", lastName:"Pérez", email:"mariana@gmail.com", phoneNumber:"3123456789", country:"Colombia", city:"Barranquilla", address:"Avenida 30 # 15 - 60", postalCode: "080001", password:"password4", images:[], logs:[], notes:[
    "Investigar sobre frameworks de desarrollo web.",
    "Limpiar el cuarto antes de las 6 pm.",
    "Practicar algoritmos durante 20 minutos."
  ]},

    {id:5, name:"Santiago", lastName:"Ramírez", email:"santiago@gmail.com", phoneNumber:"3224567890", country:"Colombia", city:"Bucaramanga", address:"Calle 45 # 20 - 15", postalCode: "680001", password:"password5", images:[], logs:[], notes:[
    "Buscar ideas para el canal de YouTube.",
    "Enviar correo al profesor con las dudas.",
    "Desconectarse del celular al menos 1 hora antes de dormir."
  ]}

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
      console.log("primero")

        for(const user in users){
          

            if((users[user].email == emailField.value) && (users[user].password == passwordField.value)){
                console.log("encontre")

                window.sessionStorage.setItem("auth","true")
                window.localStorage.setItem("userIndex",user)
                window.location = "assets/html/notes.html"

            }

        }


    }

})

