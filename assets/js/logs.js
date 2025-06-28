// Obtener usuario activo desde sessionStorage
function getActiveUser() {
    return JSON.parse(sessionStorage.getItem("activeUser"));
}

// Obtener logs desde localStorage
function getLogs() {
    return JSON.parse(localStorage.getItem("logs")) || [];
}

// Guardar logs en localStorage
function saveLogs(logs) {
    localStorage.setItem("logs", JSON.stringify(logs));
}

// Agregar nuevo log (esta es la función que usarán tus compañeros)
function addLog(actionType) {
    const user = getActiveUser();
    if (!user) return;

    const logs = getLogs();
    const newLog = {
        user: user.email,
        role: user.rol,
        time: new Date().toLocaleString(),
        action: actionType
    };

    logs.push(newLog);
    saveLogs(logs);
}

// Mostrar logs en logs.html
(function showLogs() {
    if (!window.location.href.includes("logs.html")) return;

    const user = getActiveUser();
    if (!user) return;

    const allLogs = getLogs();

    // Filtrar logs: si es admin, ve todos; si no, ve solo los suyos
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
})();
