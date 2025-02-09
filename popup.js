document.getElementById("bloquear").addEventListener("click", () => {
  chrome.scripting.executeScript({
    tabId: chrome.tabs.getCurrent().id,
    function: () => {
      // Inyectar script de detección de idioma (puedes usar una librería como franc)
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/franc@4.1.1/dist/franc.min.js'; // Reemplaza con la URL de tu librería
      document.head.appendChild(script);

      // Función para bloquear publicaciones
      function bloquearPublicaciones() {
        // Selectores actualizados (inspecciona el código de Facebook para obtener los más recientes)
        const publicaciones = document.querySelectorAll('[role="article"]'); // Ejemplo de selector
        publicaciones.forEach(publicacion => {
          const texto = publicacion.textContent.toLowerCase();
          try {
            const idioma = franc(texto); // Detectar idioma con la librería
            if (idioma === 'spa') { // Bloquear si es español
              publicacion.remove();
            }
          } catch (error) {
            // Manejar errores si la librería no puede detectar el idioma
            console.error("Error al detectar idioma:", error);
          }
        });
      }

      bloquearPublicaciones(); // Ejecutar al hacer clic en el botón

      // Observar cambios en el DOM para bloquear nuevas publicaciones (puede afectar el rendimiento)
      const observer = new MutationObserver(bloquearPublicaciones);
      observer.observe(document.body, { childList: true, subtree: true });

      // Detener la observación cuando se cierra la pestaña (opcional)
      window.addEventListener('beforeunload', () => {
        observer.disconnect();
      });
    },
  });
});
