document.addEventListener('DOMContentLoaded', function() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    // Fallback: activar todos
    reveals.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      const once = el.dataset.once === 'true';

      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add('active'), delay);
        if (once) {
          // Si solo debe animarse una vez, dejamos de observarlo
          observer.unobserve(el);
        }
      } else {
        // Al salir del viewport, quitamos la clase para permitir la repetición
        el.classList.remove('active');
      }
    });
  }, {
    threshold: 0.12
  });

  reveals.forEach(el => observer.observe(el));
});
