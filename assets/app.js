/* Uñas y Estética Mada — interacciones */
(function () {
  var h = document.getElementById('hamb'), m = document.getElementById('menu');
  if (h && m) {
    h.addEventListener('click', function () {
      m.classList.toggle('abierto');
      h.setAttribute('aria-expanded', m.classList.contains('abierto') ? 'true' : 'false');
    });
    m.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        m.classList.remove('abierto'); h.setAttribute('aria-expanded', 'false');
      });
    });
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.rev').forEach(function (e) { io.observe(e); });

  var figs = [].slice.call(document.querySelectorAll('.gal figure'));
  var v = document.getElementById('visor'), vi = document.getElementById('visor-img'), idx = 0;
  function abre(i) {
    if (!figs.length) return;
    idx = (i + figs.length) % figs.length;
    var f = figs[idx];
    vi.src = f.getAttribute('data-full');
    vi.alt = (f.querySelector('img') || {}).alt || '';
    v.classList.add('on');
  }
  function cierra() { v.classList.remove('on'); }
  figs.forEach(function (f, i) { f.addEventListener('click', function () { abre(i); }); });
  if (v) {
    document.getElementById('visor-cerrar').addEventListener('click', cierra);
    document.getElementById('visor-ant').addEventListener('click', function (ev) { ev.stopPropagation(); abre(idx - 1); });
    document.getElementById('visor-sig').addEventListener('click', function (ev) { ev.stopPropagation(); abre(idx + 1); });
    v.addEventListener('click', function (ev) { if (ev.target === v) cierra(); });
    document.addEventListener('keydown', function (ev) {
      if (!v.classList.contains('on')) return;
      if (ev.key === 'Escape') cierra();
      if (ev.key === 'ArrowLeft') abre(idx - 1);
      if (ev.key === 'ArrowRight') abre(idx + 1);
    });
  }
  var f = document.getElementById('cita');
  if (f) {
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var g = function (id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; };
      var t = 'Hola Mada, soy ' + g('nom') + '. Quiero cita para: ' + g('serv') + '.';
      if (g('dia')) t += ' Me viene bien ' + g('dia') + '.';
      if (g('msg')) t += ' ' + g('msg');
      t += ' (Te escribo desde la web)';
      window.location.href = 'https://wa.me/34610335582?text=' + encodeURIComponent(t);
    });
  }
})();
