function verifyLogIn(){
    if(window.sessionStorage.getItem("auth") != "true"){
        window.location = "../../login.html"
    }
}   

verifyLogIn()


let users = JSON.parse(window.localStorage.getItem("users"))


const notasContainer = document.querySelector('.notas-container');
const agregarBtn = document.getElementById('agregar-nota');
const notaTexto = document.getElementById('nota-texto');

// --- LocalStorage helpers ---
function guardarUsuariosEnLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}

function cargarUsuariosDeLocalStorage() {
  const data = localStorage.getItem('users');
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

// --- Cargar usuarios desde localStorage si existen ---
const usuariosGuardados = cargarUsuariosDeLocalStorage();
if (usuariosGuardados) {
  for (let i = 0; i < users.length; i++) {
    // Sincroniza solo las notas y logs, para no perder estructura
    users[i].notes = usuariosGuardados[i]?.notes || users[i].notes;
    users[i].logs = usuariosGuardados[i]?.logs || users[i].logs;
  }
}

function crearNota(texto, idx = null) {
  const nota = document.createElement('div');
  nota.className = 'nota';
  nota.innerHTML = `
    <div class="nota-columna">
      <p>${texto}</p>
    </div>
    <div class="nota-columna">
      <div class="nota-acciones">
        <a href="#" class="eliminar">Eliminar</a>
        <a href="#" class="editar">Editar</a>
      </div>
    </div>
  `;
  // Eventos para editar y eliminar
  const editarBtn = nota.querySelector('.editar');
  const eliminarBtn = nota.querySelector('.eliminar');
  const p = nota.querySelector('p');

  editarBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const nuevoTexto = prompt('Editar nota:', p.textContent);
    if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
      p.textContent = nuevoTexto;
      if (usuarioActivo && idx !== null) {
        usuarioActivo.notes[idx] = nuevoTexto;
        guardarUsuariosEnLocalStorage();
        console.log("Edito una nota")
        addLog("Editar nota",usuarioActivo,users)
      }
    }
  });

  eliminarBtn.addEventListener('click', function(e) {
    e.preventDefault();
    nota.remove();
    if (usuarioActivo && idx !== null) {
      usuarioActivo.notes.splice(idx, 1);
      guardarUsuariosEnLocalStorage();
      mostrarNotasUsuario(usuarioActivo);
      addLog("Eliminar nota",usuarioActivo,users)

    }
  });

  notasContainer.appendChild(nota);
}

// Función para mostrar las notas de un usuario
function mostrarNotasUsuario(usuario) {
  notasContainer.innerHTML = '';
  usuario.notes.forEach((nota, idx) => {
    crearNota(nota, idx);
  });
}

// Función para obtener usuario por nombre exacto
function obtenerUsuario() {
  let userIndex = window.localStorage.getItem("userIndex")
  return users[parseInt(userIndex)]
  // return users.find(u => u.name.toLowerCase() === nombre.toLowerCase());
}

// Cambia aquí el nombre del usuario que "inicia sesión"
const nombreUsuarioActivo = "Juan Daniel"; // Cambia a "Laura Sofía" para probar con otro usuario
let usuarioActivo = null;

document.addEventListener('DOMContentLoaded', () => {
  usuarioActivo = obtenerUsuario(nombreUsuarioActivo);
  document.getElementById("userName").textContent = usuarioActivo.name;
  if (usuarioActivo) {
    mostrarNotasUsuario(usuarioActivo);
  } else {
    notasContainer.innerHTML = '<p style="color:red">Usuario no encontrado</p>';
  }
});

agregarBtn.addEventListener('click', () => {
  const texto = notaTexto.value.trim();
  if (texto && usuarioActivo) {
    usuarioActivo.notes.push(texto); // Agrega la nota al usuario activo
    guardarUsuariosEnLocalStorage();
    mostrarNotasUsuario(usuarioActivo);
    notaTexto.value = '';
    addLog("Agregar una nota",usuarioActivo,users)
  }
});



// Manejar el cierre de sesión
// const logoutBtn = document.getElementById("logout");

// if (logoutBtn) {
//   logoutBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//     sessionStorage.clear(); // Elimina 
//     window.location.href = "../../login.html"; 
//   });
// }