// content.js
function bloquearPublicaciones() {
  const publicaciones = document.querySelectorAll(".publicacion"); // Selector de ejemplo
  publicaciones.forEach(publicacion => {
    const texto = publicacion.textContent.toLowerCase();
    if (texto.includes("hola") || texto.includes("qué tal")) { // Ejemplo de detección
      publicacion.remove();
    }
  });
}

bloquearPublicaciones(); // Ejecutar al cargar la página

// Opcional: Ejecutar periódicamente para nuevas publicaciones
setInterval(bloquearPublicaciones, 5000);
