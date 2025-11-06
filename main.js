document.addEventListener('DOMContentLoaded', function(){
  const slides = Array.from(document.querySelectorAll('.carousel .slide'));
  const dotsWrapper = document.getElementById('carousel-dots');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const carousel = document.getElementById('carousel');
  let current = slides.findIndex(s => s.classList.contains('active'));
  if(current < 0) current = 0;

  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.dataset.index = i;
    btn.setAttribute('aria-label', slides[i].dataset.title || ('Slide ' + (i+1)));
    btn.setAttribute('role', 'tab');
    if(i === current) btn.classList.add('active');
    btn.addEventListener('click', () => goTo(i));
    dotsWrapper.appendChild(btn);
  });

  function show(i){
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === i);
      s.setAttribute('aria-hidden', idx === i ? 'false' : 'true');
    });
    Array.from(dotsWrapper.children).forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  function goTo(i){
    current = (i + slides.length) % slides.length;
    show(current);
  }

  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  let autoplay = setInterval(next, 6000);
  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => autoplay = setInterval(next, 6000));

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') next();
    if(e.key === 'ArrowLeft') prev();
  });

  // simple contact handler (contact page)
  window.handleSubmit = function(e){
    e.preventDefault();
    const form = document.getElementById('contactForm');
    if(!form) return;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !subject || !message){
      alert('Por favor, preencha todos os campos.');
      return;
    }
    alert('Mensagem enviada. Entraremos em contato em breve.');
    form.reset();
  };

  // fill footer year
  const yearEls = document.querySelectorAll('#year');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());
});