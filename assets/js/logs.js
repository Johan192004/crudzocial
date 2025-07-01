function verifyLogIn(){
    if(window.sessionStorage.getItem("auth") != "true"){
        window.location = "../../login.html"
    }
}   

verifyLogIn();

let usuarios = JSON.parse(localStorage.getItem("users"))
console.log(usuarios)
let userChosen = usuarios[parseInt(localStorage.getItem("userIndex"))]

// Obtener usuario activo desde sessionStorage
function getActiveUser() {
    return usuarios[parseInt(localStorage.getItem("userIndex"))];
    // return JSON.parse(sessionStorage.getItem("activeUser"));
}

// Obtener logs desde localStorage
function getLogs(usuario) {
    return usuario.logs;
}

// Guardar logs en localStorage
function saveLogs() {
    localStorage.setItem("users", JSON.stringify(usuarios));
}

// Agregar nuevo log
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

// Mostrar logs en logs.html
function showLogs() {
    console.log(!window.location.href.includes("logs.html"))
    if (!window.location.href.includes("logs.html")) return;

    const user = getActiveUser();
    if (!user) return;

    const allLogs = getLogs(userChosen);

    // // Filtrar logs: si es admin, ve todos; si no, ve solo los suyos
    const visibleLogs = user.rol === "admin"
         ? allLogs
         : allLogs.filter(log => log.user === user.email);

    const section = document.querySelector("section");

    if (visibleLogs.length === 0) {
        section.innerHTML = "<p>No hay logs registrados aún.</p>";
        return;
    }

    let content = `
        <h2 class="my-3">Historial de actividad</h2>
        <ul class="list-group">
    `;

    visibleLogs.reverse().forEach(log => {
        content += `
            <li class="list-group-item">
                <strong>${log.user}</strong> | 
                <em>${log.time}</em> → 
                ${log.action}
            </li>
        `;
    });

    content += "</ul>";
    section.innerHTML = content;
};


showLogs()


// Manejar el cierre de sesión
const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.clear(); // Elimina 
    window.location.href = "../../login.html"; 
  });
}
