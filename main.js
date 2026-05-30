// Lógica General de la Aplicación
document.addEventListener('DOMContentLoaded', () => {
  // --- Lógica del Carrusel (Solo si existe en la página) ---
  const track = document.getElementById('carouselTrack');
  if (track) {
    const slides = Array.from(track.children);
    const slideCount = slides.length;
    let currentIndex = 0;
    
    function moveToNextSlide() {
      currentIndex++;
      if (currentIndex >= slideCount) {
        currentIndex = 0;
      }
      track.style.transform = `translateX(-${(currentIndex * 100) / slideCount}%)`;
    }
    
    // Auto-scroll cada 3 segundos
    setInterval(moveToNextSlide, 3000);
  }

  // --- Lógica del Lightbox (Popup de Imágenes Ampliables) ---
  // 1. Inyectar dinámicamente la estructura del lightbox al final del body
  const lightboxHTML = `
    <div id="globalLightbox" class="lightbox-modal">
      <span class="lightbox-close" id="lightboxClose">&times;</span>
      <img class="lightbox-content" id="lightboxImage" src="" alt="">
      <div class="lightbox-caption" id="lightboxCaption"></div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  const lightbox = document.getElementById('globalLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
    
    // 2. Abrir Lightbox
    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightboxCaption.textContent = alt || 'Galería de La Casa del Sr. Pérez';
      
      lightbox.style.display = 'flex';
      // Reflow para activar animación CSS
      lightbox.offsetHeight;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Detener scroll de la página de fondo
    }

    // 3. Cerrar Lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll
      
      // Esperar la transición de CSS (300ms) antes de ocultar el display
      setTimeout(() => {
        if (!lightbox.classList.contains('active')) {
          lightbox.style.display = 'none';
          lightboxImg.src = '';
        }
      }, 300);
    }

    // 4. Delegación de eventos en body para capturar imágenes cliqueables
    document.body.addEventListener('click', (e) => {
      const clickedImg = e.target.closest('.clickable-image');
      if (clickedImg && clickedImg.tagName === 'IMG') {
        openLightbox(clickedImg.src, clickedImg.alt);
      }
    });

    // 5. Cerrar al pulsar el botón ✖
    lightboxClose.addEventListener('click', closeLightbox);

    // 6. Cerrar al hacer clic en el fondo difuminado
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // 7. Cerrar al pulsar la tecla Escape (Accesibilidad)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});
