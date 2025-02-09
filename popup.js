// popup.js
document.getElementById("bloquear").addEventListener("click", () => {
  chrome.scripting.executeScript({
    tabId: chrome.tabs.getCurrent().id,
    function: () => {
      // Función para bloquear publicaciones (la misma que en content.js)
      function bloquearPublicaciones() {
        const publicaciones = document.querySelectorAll(".publicacion"); // Selector de ejemplo
        publicaciones.forEach(publicacion => {
          const texto = publicacion.textContent.toLowerCase();
          if (texto.includes("hola") || texto.includes("qué tal")) { // Ejemplo de detección
            publicacion.remove();
          }
        });
      }

      bloquearPublicaciones(); // Ejecutar al hacer clic en el botón

      // Opcional: Ejecutar periódicamente para nuevas publicaciones
      setInterval(bloquearPublicaciones, 5000);
    },
  });
});
