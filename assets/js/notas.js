const users = [
    {id:1,name:"Juan Daniel",lastName:"Rua",email:"juan@gmail.com",phoneNumber:"1234567",country:"Colombia",city:"Medellin",address:"Calle 66 # 44b - 55", postalCode: "050001",password:"password1",images:[], logs:[], notes:[
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
function obtenerUsuarioPorNombre(nombre) {
  return users.find(u => u.name.toLowerCase() === nombre.toLowerCase());
}

// Cambia aquí el nombre del usuario que "inicia sesión"
const nombreUsuarioActivo = "Juan Daniel"; // Cambia a "Laura Sofía" para probar con otro usuario
let usuarioActivo = null;

document.addEventListener('DOMContentLoaded', () => {
  usuarioActivo = obtenerUsuarioPorNombre(nombreUsuarioActivo);
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
  }
});