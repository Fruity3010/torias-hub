/* ─────────────────────────────────────────────
   Toria's Hub — shared site script
   Used by all pages (index, about, contact, programs, get-involved, stories)
   Each block guards with feature detection so it's safe on pages
   that don't include the relevant element.
   ───────────────────────────────────────────── */

/* AOS init */
if (window.AOS) {
  AOS.init({ duration: 750, once: true, easing: 'ease-out-cubic', offset: 60 });
}

/* ── Mobile menu ── */
function toggleMenu() {
  var btn  = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  var open = menu.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMenu() {
  var btn  = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  menu.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
document.addEventListener('click', function(e) {
  var menu = document.getElementById('mobileMenu');
  var btn  = document.getElementById('hamburger');
  if (menu && btn && menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) {
    closeMenu();
  }
});

/* ── Scrolled header + active anchor on the homepage ── */
window.addEventListener('scroll', function() {
  var header = document.getElementById('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 40);

  /* Anchor-style active link (homepage only — pages use nav-link.active in markup) */
  var sections = document.querySelectorAll('section[id], div.stats-band');
  var anchorLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (!anchorLinks.length) return;
  var cur = '';
  sections.forEach(function(s) { if (window.scrollY >= s.offsetTop - 110) cur = s.id; });
  anchorLinks.forEach(function(a) {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
  });
});

/* ── Lead capture modal (homepage) ── */
function openLeadModal() {
  var m = document.getElementById('leadCaptureModal');
  if (!m) return;
  m.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeLeadModal() {
  var m = document.getElementById('leadCaptureModal');
  if (!m) return;
  m.classList.remove('is-open');
  document.body.style.overflow = '';
}

(function() {
  var modal = document.getElementById('leadCaptureModal');
  if (!modal) return;
  modal.addEventListener('click', function(e) { if (e.target === modal) closeLeadModal(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLeadModal(); });

  var form = document.getElementById('leadCaptureForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var fn = document.getElementById('leadFirstName');
    var em = document.getElementById('leadEmail');
    var fnErr = document.getElementById('leadFirstNameError');
    var emErr = document.getElementById('leadEmailError');
    var ok = true;

    if (!fn.value.trim()) {
      fnErr.textContent = 'First name is required.'; fnErr.style.display = 'block';
      fn.classList.add('is-invalid'); ok = false;
    } else { fnErr.style.display = 'none'; fn.classList.remove('is-invalid'); }

    if (!em.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) {
      emErr.textContent = 'Please enter a valid email.'; emErr.style.display = 'block';
      em.classList.add('is-invalid'); ok = false;
    } else { emErr.style.display = 'none'; em.classList.remove('is-invalid'); }

    if (!ok) return;
    var btn = document.getElementById('leadSubmitBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="lead-btn-spinner"></span> Sending&hellip;';
    setTimeout(function() {
      closeLeadModal();
      btn.disabled = false;
      btn.textContent = 'Download Report';
      form.reset();
    }, 1500);
  });
})();
