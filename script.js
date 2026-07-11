document.getElementById('year').textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => observer.observe(el));

document.querySelectorAll('.btn, .service-card').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left - 50}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  });
});

document.querySelectorAll('[data-scroll-gallery]').forEach((viewport) => {
  const track = viewport.querySelector('.studio-gallery');
  const originals = [...track.children];

  originals.forEach((image) => {
    const duplicate = image.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    track.appendChild(duplicate);
  });

  let loopWidth = 0;
  const updateLoopWidth = () => {
    loopWidth = track.children[originals.length].offsetLeft;
    track.style.setProperty('--gallery-loop-width', `-${loopWidth}px`);
  };

  const refreshGallery = () => {
    updateLoopWidth();
  };

  window.addEventListener('load', refreshGallery);
  window.addEventListener('resize', refreshGallery);
  requestAnimationFrame(refreshGallery);
});
