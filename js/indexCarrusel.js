// Carrusel: slide lateral (derecha -> izquierda) mostrando una imagen a la vez
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel .carousel-images');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('img'));
  if (!slides.length) return;

  const displaySeconds = 3; // tiempo que queda visible cada slide
  const transitionMs = 900; // duración de la transición (ms)

  // preparar estilos
  container.style.transition = `transform ${transitionMs}ms ease`;
  container.style.willChange = 'transform';
  container.style.display = 'flex';

  // compute sizes in pixels to avoid percent rounding issues
  let frameWidth = container.parentElement.clientWidth;
  function updateSizes() {
    frameWidth = container.parentElement.clientWidth;
    slides.forEach(s => { s.style.flex = `0 0 ${frameWidth}px`; s.style.width = `${frameWidth}px`; });
    container.style.width = `${frameWidth * slides.length}px`;
  }
  updateSizes();

  let current = 0;
  let timer = null;

  const total = slides.length;
  function show(index) {
    const x = index * frameWidth;
    container.style.transform = `translateX(-${x}px)`;
    current = index;
  }

  function next() {
    show((current + 1) % slides.length);
  }

  function start() {
    stop();
    timer = setInterval(next, displaySeconds * 1000);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // Inicializar
  show(0);
  start();

  // pausa on hover
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', () => { if (!timer) start(); });
  // recalc on resize
  window.addEventListener('resize', () => {
    const wasRunning = !!timer;
    stop();
    updateSizes();
    // reposition to current slide
    show(current);
    if (wasRunning) start();
  });
});
