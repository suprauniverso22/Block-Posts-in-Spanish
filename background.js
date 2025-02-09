chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "bloquearPublicaciones") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id }, // <-- Cambio importante: usar 'target'
      function: () => {
        // Inyectar script de detección de idioma (franc) - Optimizado
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/franc@4.1.1/dist/franc.min.js';
        script.onload = () => { // Ejecutar bloquearPublicaciones() después de cargar franc
          bloquearPublicaciones();
        };
        document.head.appendChild(script);

        function bloquearPublicaciones() {
          // Selectores actualizados y robustos (¡Inspeccionar Facebook para los más recientes!)
          // Este selector es un ejemplo, debes inspeccionar la página de Facebook
          // y copiar el selector correcto para los posts.
          const publicaciones = document.querySelectorAll('[role="article"]');
          publicaciones.forEach(publicacion => {
            const texto = publicacion.textContent.toLowerCase();
            try {
              const idioma = franc(texto);
              if (idioma === 'spa') {
                publicacion.remove();
              }
            } catch (error) {
              console.error("Error al detectar idioma:", error);
            }
          });
        }

        // Observador de cambios en el DOM - Con optimización para el rendimiento
        let observer = new MutationObserver(bloquearPublicaciones);
        const targetNode = document.body; // Observar el body
        const config = { childList: true, subtree: true }; // Observar hijos y subárbol
        observer.observe(targetNode, config);

        // Desconectar el observador al salir de la página
        window.addEventListener('beforeunload', () => {
          observer.disconnect();
        });
      }
    });
  }
});
