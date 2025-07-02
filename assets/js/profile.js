// Verificar sesion activa
function verifyLogIn() {
  if (sessionStorage.getItem("auth") !== "true" || !sessionStorage.getItem("user")) {
    window.location.href = "../../login.html";
  }
}

verifyLogIn(); 

// Obtener el correo del usuario que inició sesión
const sessionUser = sessionStorage.getItem("user");

// Obtener lista de usuarios del localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Buscar al usuario actual por su correo
let currentUser = users.find(u => u.email === sessionUser);

// Si no se encuentra el usuario, cerrar sesión
if (!currentUser) {
  sessionStorage.clear();
  window.location.href = "../../login.html";
}

// Mostrar el nombre del usuario en el encabezado
console.log(currentUser.name)
document.getElementById("userName").textContent = currentUser.name;

// Rellenar el formulario con los datos del usuario
document.getElementById("name").value = currentUser.name;
document.getElementById("lastName").value = currentUser.lastName;
document.getElementById("email").value = currentUser.email;
document.getElementById("phoneNumber").value = currentUser.phoneNumber;
document.getElementById("country").value = currentUser.country;
document.getElementById("city").value = currentUser.city;
document.getElementById("address").value = currentUser.address;
document.getElementById("postalCode").value = currentUser.postalCode;

// Evento al enviar el formulario
document.getElementById("profile-form").addEventListener("submit", function(e) {
  e.preventDefault(); // Evita que recargue la página

  // Actualiza los datos del usuario actual
  currentUser.name = document.getElementById("name").value;
  currentUser.lastName = document.getElementById("lastName").value;
  currentUser.phoneNumber = document.getElementById("phoneNumber").value;
  currentUser.country = document.getElementById("country").value;
  currentUser.city = document.getElementById("city").value;
  currentUser.address = document.getElementById("address").value;
  currentUser.postalCode = document.getElementById("postalCode").value;
  console.log(currentUser)

  // Actualiza el nombre en el encabezado
  document.getElementById("userName").textContent = currentUser.name || "Usuario";

  // Actualiza el usuario en el array y guarda en localStorage
  let index = users.findIndex(u => u.email === sessionUser);
  if (index !== -1) {
    users[index] = currentUser;
  }

  // Guardar usuarios actualizados
  localStorage.setItem("users", JSON.stringify(users));

  // Agregar registro de actividad
  addLog("Actualizó sus datos de perfil", currentUser, users);

  // Mostrar mensaje de éxito
  showMessage("Actualizado con éxito", "success");
});

// Muestra un mensaje temporal en la página
function showMessage(text, type) {
  const messageContainer = document.getElementById("message");
  messageContainer.textContent = text;
  messageContainer.className = `alert alert-${type} mt-3`;
  messageContainer.style.display = "block";
  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}

// Mostrar los logs del usuario en pantalla
let logsContainer = document.getElementById("logs");
if (logsContainer) {
  let myLogs = currentUser.logs || [];
  myLogs.forEach(log => {
    logsContainer.innerHTML += `<p class="mb-1">${log.time} — ${log.action}</p>`;
  });
}

// Evento para cerrar sesión
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "../../index.html";
  });
}

// Función para agregar un nuevo registro (log) de actividad
// function addLog(actionType, user, allUsers) {
//   const newLog = {
//     email: user.email,
//     time: new Date().toLocaleString(),
//     action: actionType
//   };
//   user.logs = user.logs || [];
//   user.logs.push(newLog);
//   localStorage.setItem("users", JSON.stringify(allUsers));
// }

function addLog(actionType,aimUser,allUsers) {
    const user = aimUser;
    console.log(user)
    if (!user) return;

    const logs = user.logs;
    const newLog = {
        user: user.email,
        // role: user.rol,
        time: new Date().toLocaleString(),
        action: actionType
    };

    logs.push(newLog);
    localStorage.setItem("users", JSON.stringify(allUsers));
    console.log(logs)
}
