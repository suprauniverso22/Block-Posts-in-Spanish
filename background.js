chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "bloquearPublicaciones") {
    chrome.scripting.executeScript({
      tabId: sender.tab.id,  // Inyectar en la pestaña que envió el mensaje
      function: () => {
        // Inyectar script de detección de idioma (puedes usar una librería como franc)
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/franc@4.1.1/dist/franc.min.js'; // Reemplaza con la URL de tu librería
        document.head.appendChild(script);

        // Función para bloquear publicaciones (adaptada del código anterior)
        function bloquearPublicaciones() {
          const publicaciones = document.querySelectorAll('[role="article"]'); // Ejemplo de selector (¡revisar!)
          publicaciones.forEach(publicacion => {
            const texto = publicacion.textContent.toLowerCase();
            try {
              const idioma = franc(texto); // Detectar idioma con la librería
              if (idioma === 'spa') { // Bloquear si es español
                publicacion.remove();
              }
            } catch (error) {
              console.error("Error al detectar idioma:", error);
            }
          });
        }

        bloquearPublicaciones(); // Ejecutar al hacer clic en el botón

        // Observar cambios en el DOM para bloquear nuevas publicaciones (¡cuidado con el rendimiento!)
        const observer = new MutationObserver(bloquearPublicaciones);
        observer.observe(document.body, { childList: true, subtree: true });

        // Detener la observación cuando se cierra la pestaña (opcional)
        window.addEventListener('beforeunload', () => {
          observer.disconnect();
        });

      }
    });
  }
});
