// Verificamos si ya existen usuarios
let users = JSON.parse(localStorage.getItem("users")) || [];

// Seleccionamos el formulario
const form = document.getElementById("register-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtenemos los valores de los inputs
  const newUser = {
    id: users.length + 1,
    name: document.getElementById("name").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim().toLowerCase(),
    password: document.getElementById("password").value.trim(),
    phoneNumber: document.getElementById("phoneNumber").value.trim(),
    country: document.getElementById("country").value.trim(),
    city: document.getElementById("city").value.trim(),
    address: document.getElementById("address").value.trim(),
    postalCode: document.getElementById("postalCode").value.trim(),
    images: [],
    logs: [],
    notes: []
  };

  // Validamos si el email ya existe
  const emailExists = users.some(user => user.email === newUser.email);

  if (emailExists) {
    alert("Este correo ya está registrado.");
    return;
  }

  // Agregamos el nuevo usuario
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("¡Registro exitoso!");
  window.location.href = "./../../index.html"; 
});
