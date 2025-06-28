const sessionUser = sessionStorage.getItem("user") || "test@ejemplo.com"; // Usuario predeterminado para pruebas
// Comentar la redirección para desarrollo
// if (!sessionUser) {
//   window.location.href = "login.html";
// }

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = users.find(u => u.email === sessionUser) || {
  email: sessionUser,
  name: "",
  lastname: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  postalCode: ""
}; // Usuario predeterminado si no se encuentra

// Actualizar el nombre del usuario en el encabezado
document.getElementById("userName").textContent = currentUser.name || "Usuario";

// Rellenar el formulario con los datos del usuario
document.getElementById("name").value = currentUser.name;
document.getElementById("lastname").value = currentUser.lastname;
document.getElementById("email").value = currentUser.email;
document.getElementById("phone").value = currentUser.phone;
document.getElementById("country").value = currentUser.country;
document.getElementById("city").value = currentUser.city;
document.getElementById("address").value = currentUser.address;
document.getElementById("postalCode").value = currentUser.postalCode;

// Manejar el envío del formulario
document.getElementById("profile-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Actualizar propiedades del usuario actual (excepto email, que está deshabilitado)
  currentUser.name = document.getElementById("name").value;
  currentUser.lastname = document.getElementById("lastname").value;
  currentUser.phone = document.getElementById("phone").value;
  currentUser.country = document.getElementById("country").value;
  currentUser.city = document.getElementById("city").value;
  currentUser.address = document.getElementById("address").value;
  currentUser.postalCode = document.getElementById("postalCode").value;

  // Actualizar el nombre en el encabezado
  document.getElementById("userName").textContent = currentUser.name || "Usuario";

  // Actualizar o agregar el usuario en el arreglo de users
  let index = users.findIndex(u => u.email === sessionUser);
  if (index !== -1) {
    users[index] = currentUser;
  } else {
    users.push(currentUser);
  }

  // Guardar en localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Mostrar mensaje de éxito
  showMessage("Actualizado con éxito", "success");
});

// Función para mostrar mensajes en la página
function showMessage(text, type) {
  const messageContainer = document.getElementById("message");
  messageContainer.textContent = text;
  messageContainer.className = `alert alert-${type} mt-3`;
  messageContainer.style.display = "block";
  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000); // Ocultar después de 3 segundos
}

// Cargar y mostrar logs
let allLogs = JSON.parse(localStorage.getItem("logs")) || [];
let myLogs = allLogs.filter(log => log.email === sessionUser);

let logsContainer = document.getElementById("logs");
myLogs.forEach(log => {
  logsContainer.innerHTML += `<p class="mb-1">${log.date} — ${log.action}</p>`;
});

// Manejar el cierre de sesión
document.getElementById("logout").addEventListener("click", function(e) {
  e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
  sessionStorage.removeItem("user");
  window.location.href = "login.html";
});