// Navbar dinámico
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Animación de entrada de secciones
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('section, .hero-section').forEach(el => observer.observe(el));

// Formulario de contacto con toast
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Mensaje enviado', 'Gracias por contactarnos. Te responderemos pronto.', 'success');
      form.reset();
    });
  }
});

// Función para mostrar toast
function showToast(title, msg, type = 'info') {
  const container = document.querySelector('.toast-container');
  const colors = { info: 'bg-info', success: 'bg-success', error: 'bg-danger' };
  const toast = document.createElement('div');
  toast.className = `toast text-white ${colors[type] || 'bg-info'} border-0 align-items-center fade show mb-2`;
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body"><strong>${title}</strong>: ${msg}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  container.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  toast.addEventListener('hidden.bs.toast', () => toast.remove());
}
