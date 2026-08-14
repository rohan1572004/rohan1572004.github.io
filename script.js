// ---------------------------------------------
// EDIT THESE to personalize the rotating roles
// ---------------------------------------------
const ROLES = [
  "Web Developer",
  "Full Stack Projects",
  "Cloud Deployment",
  "AI & ML Enthusiast"
];

// ---- Profile viewer counter ----
const visitorCountEl = document.getElementById('visitorCount');
if (visitorCountEl) {
  const storageKey = 'portfolio_profile_views';
  const saved = Number(localStorage.getItem(storageKey));
  const currentCount = Number.isFinite(saved) && saved >= 1 ? saved + 1 : 1;
  localStorage.setItem(storageKey, String(currentCount));
  visitorCountEl.textContent = new Intl.NumberFormat('en-US').format(currentCount);
}

// ---- Rotating typewriter for hero role ----
const roleEl = document.getElementById('typedRole');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop(){
  const current = ROLES[roleIdx];

  if(!deleting){
    roleEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if(charIdx === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400); // pause at full word
      return;
    }
  } else {
    roleEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if(charIdx === 0){
      deleting = false;
      roleIdx = (roleIdx + 1) % ROLES.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 70);
}
typeLoop();

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ---- Scroll reveal ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('show'); observer.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Certifications marquee: duplicate content for a seamless infinite loop ----
const track = document.getElementById('marqueeTrack');
if (track) {
  track.innerHTML += track.innerHTML; // duplicate once so the 50% translateX loop is seamless
}

// ---- Floating particles background ----
const particlesWrap = document.getElementById('particles-js');
if (particlesWrap) {
  const particleCount = 36;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = Math.random() * 16 + 12;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesWrap.appendChild(particle);
  }
}

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Certificate lightbox modal ----
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalName = document.getElementById('certModalName');
const certModalClose = document.getElementById('certModalClose');

function openCertModal(cardEl){
  const thumb = cardEl.querySelector('img.cert-thumb');
  if(!thumb) return;
  certModalImg.src = thumb.src;
  certModalImg.alt = thumb.alt || 'Certificate';
  certModalName.textContent = 'Rohan Waghmare';
  certModal.classList.add('open');
  certModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // lock background scroll
}

function closeCertModal(){
  certModal.classList.remove('open');
  certModal.setAttribute('aria-hidden', 'true');
  certModalImg.src = '';
  certModalName.textContent = 'Rohan Waghmare';
  document.body.style.overflow = '';
}

if (certModal) {
  certModalClose.addEventListener('click', closeCertModal);
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeCertModal(); // click on dark backdrop closes it
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('open')) closeCertModal();
  });
}