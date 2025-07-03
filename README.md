Crudzocial- JJJJB
Nombre del Equipo: JJJJB

Integrantes:

BRAHIAM RUIZ

JOHAN RAMIREZ MARIN

JUAN MANUEL ARANGO ARANA

JUAN DANIEL RUA MARIN

JULIO CESAR MOLINA MONTOYA

Descripción del Sistema y su Objetivo
Crudzocial es una aplicación web sencilla diseñada para gestionar perfiles de usuario, permitiendo el inicio de sesión, la visualización y edición de datos personales, así como la gestión de imágenes, notas y registros de actividad (logs).

El objetivo principal del sistema es proporcionar una plataforma básica para que los usuarios puedan mantener su información personal actualizada y llevar un registro de actividades importantes de manera organizada. Además, se busca demostrar el uso de tecnologías web fundamentales como HTML, CSS y JavaScript para construir una aplicación interactiva.

Tecnologías Utilizadas
HTML5: Estructura de las páginas web.

CSS3: Estilos y diseño de la interfaz de usuario.

Bootstrap 5.2.3: Framework CSS para un diseño responsivo y componentes predefinidos.

Animate.css: Biblioteca para animaciones CSS.

JavaScript: Lógica del lado del cliente para la interacción del usuario y la gestión de datos.

Cómo Ejecutar y Probar el Sistema
Para ejecutar y probar el sistema, sigue estos pasos:

Clona el repositorio:

Bash

git clone https://docs.github.com/es/repositories
Navega al directorio del proyecto:

Bash

cd Crudzocial-NombreEquipo
Abre el archivo index.html:
Simplemente abre el archivo index.html en tu navegador web preferido (Google Chrome, Mozilla Firefox, etc.). No se requiere un servidor web para las funcionalidades básicas, ya que todo se ejecuta en el cliente.

Credenciales de prueba:
Puedes iniciar sesión con los siguientes usuarios predefinidos (se almacenan en localStorage si no existen):

Correo

Contraseña

juan@gmail.com

password1

laura@gmail.com

password2

carlos@gmail.com

password3

mariana@gmail.com

password4

santiago@gmail.com

password5


Exportar a Hojas de cálculo
Descripción de las Funcionalidades Implementadas
Inicio de Sesión: Los usuarios pueden iniciar sesión utilizando su correo electrónico y contraseña. La autenticación es básica y se maneja en el cliente.

Gestión de Perfil: Una vez autenticado, el usuario puede ver y editar sus datos personales como nombre, apellido, número de teléfono, país, ciudad, dirección y código postal. El correo electrónico se muestra pero no es editable.

Navegación: El sistema cuenta con un menú de navegación que permite al usuario acceder a diferentes secciones:

Imágenes: Sección para gestionar imágenes del perfil (se asume que esta funcionalidad se implementará o ya existe).

Notas: Sección para ver y gestionar notas personales (se asume que esta funcionalidad se implementará o ya existe).

Logs: Sección para ver un registro de actividades (se asume que esta funcionalidad se implementará o ya existe).

Cierre de Sesión: Permite al usuario cerrar su sesión actual.

Explicación de cómo se usan localStorage, sessionStorage, funciones, permisos adicionales al admin y logs
localStorage
Se utiliza localStorage para persistir los datos de los usuarios. En el archivo main.js, al iniciar la aplicación, se verifica si ya existen usuarios guardados en localStorage. Si no existen, se inicializa un arreglo originalUsers y se guarda en localStorage bajo la clave "users". Esto asegura que los datos de los usuarios persistan incluso después de cerrar el navegador.

JavaScript

if(!window.localStorage.getItem("users")){
    window.localStorage.setItem("users",JSON.stringify(originalUsers))
}
let users = JSON.parse(window.localStorage.getItem("users"))
Además, cuando un usuario inicia sesión, su userIndex (la posición del usuario en el arreglo users) se guarda en localStorage para poder recuperarlo fácilmente en otras páginas que necesiten los datos del usuario logueado.

JavaScript

window.localStorage.setItem("userIndex", i);
sessionStorage
Se emplea sessionStorage para manejar la autenticación del usuario durante la sesión actual del navegador. Cuando un usuario inicia sesión exitosamente, se guardan dos elementos en sessionStorage:

"auth": "true": Indica que el usuario está autenticado.

"user": users[i].email: Guarda el correo electrónico del usuario autenticado.

JavaScript

window.sessionStorage.setItem("auth", "true");
window.sessionStorage.setItem("user", users[i].email);
Estos valores se utilizan para verificar si el usuario tiene una sesión activa y para mostrar información específica del usuario en el encabezado. Al cerrar la sesión, estos elementos se eliminan de sessionStorage.

Funciones
El código utiliza funciones de JavaScript para modularizar la lógica y mejorar la reusabilidad. Por ejemplo:

El evento click del botón de inicio de sesión (buttonLogIn.addEventListener) contiene una función anónima que encapsula toda la lógica de validación de credenciales y redireccionamiento.

En archivos como profile.js (no proporcionado pero inferido), se espera que existan funciones para cargar y guardar los datos del perfil del usuario, así como para manejar la lógica de actualización.

Permisos Adicionales al Administrador
Basado en los archivos proporcionados, actualmente no se ha implementado un sistema explícito de roles o permisos adicionales para un administrador. Todos los usuarios son tratados de la misma manera en términos de acceso a las funcionalidades (images.html, notes.html, logs.html, profile.html).

Para implementar permisos de administrador, se necesitaría:

Propiedad isAdmin en el objeto de usuario: Añadir una propiedad booleana como isAdmin: true a los objetos de usuario en el arreglo originalUsers para identificar a los administradores.

Verificación en el código: Al iniciar sesión, se debería verificar esta propiedad y, si es true, otorgar acceso a funcionalidades o vistas exclusivas para administradores (ej., un menú de administración, la capacidad de editar otros usuarios, etc.).

Logs
Los usuarios tienen una propiedad logs que es un arreglo vacío (logs:[]). En el código actual, esta propiedad se inicializa pero no se evidencia una implementación activa para registrar eventos o acciones del usuario en estos logs.

Para utilizar los logs, se debería implementar una función que añada entradas a este arreglo cada vez que un usuario realiza una acción significativa (ej., inicio de sesión, actualización de perfil, creación de nota, etc.). Luego, la página logs.html (inferida) mostraría el contenido de este arreglo.

Qué Aprendieron como Equipo
Durante el desarrollo de Crudzocial, el equipo ha adquirido los siguientes aprendizajes:

Manipulación del DOM con JavaScript: Reforzamos la capacidad de interactuar con el HTML y CSS mediante JavaScript para crear interfaces dinámicas.

Gestión de datos en el cliente: Comprendimos la importancia y el uso práctico de localStorage y sessionStorage para la persistencia de datos y el manejo de sesiones en aplicaciones web.

Estructura de proyectos frontend: Mejoramos nuestras habilidades para organizar archivos HTML, CSS y JavaScript de manera coherente.

Integración de frameworks y librerías: Experimentamos con la integración de Bootstrap para el diseño responsivo y Animate.css para mejorar la experiencia de usuario con animaciones.

Depuración y resolución de problemas: Desarrollamos la capacidad de identificar y corregir errores en el código JavaScript y en el comportamiento de la interfaz.

Trabajo en equipo (si aplica): Aprendimos a colaborar en el control de versiones (Git/GitHub) y a dividir tareas para lograr un objetivo común.

Estado Actual del Proyecto
El proyecto Crudzocial se encuentra en un estado inicial funcional. Las siguientes funcionalidades están implementadas:

Inicio de sesión y autenticación básica: Los usuarios pueden ingresar al sistema con credenciales predefinidas.

Manejo de sesión: La información de autenticación persiste durante la sesión del navegador.

Visualización y edición de perfil: Los usuarios pueden ver y actualizar su información personal en la sección de perfil.

Navegación básica: Existe un sistema de menú que enlaza a las diferentes secciones del sistema.

Las funcionalidades de "Imágenes", "Notas" y "Logs" están estructuradas en la navegación, pero su implementación detallada aún está pendiente y representa las próximas etapas del desarrollo. La gestión de roles de administrador y el registro de logs activos son mejoras futuras planificadas.
