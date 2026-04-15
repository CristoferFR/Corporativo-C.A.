document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('#main-menu');
  if (!toggle || !menu) return;

  // Toggle main menu
  toggle.addEventListener('click', function(e) {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when clicking outside (mobile)
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        if (menu.classList.contains('open')) {
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  // Ensure menu closes on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Make dropdowns togglable on mobile by clicking the .dropbtn
  const dropBtns = menu.querySelectorAll('.dropbtn');
  dropBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = btn.closest('.dropdown');
        if (!parent) return;
        parent.classList.toggle('open');
      }
    });
  });
});
