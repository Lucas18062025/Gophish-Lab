(function () {
  'use strict';

  /* ============================================================
     GOPHISH-LAB — CLIENT LOGIC (app.js)
     100% compliant with Content-Security-Policy: script-src 'self'
     ============================================================ */

  /* ---------- Lightbox accesible: <dialog> nativo + teclado ---------- */
  var shots = [
    {
      png: 'screenshots/01-gophish-dashboard.png',
      webp: 'screenshots/01-gophish-dashboard.webp',
      cap: 'Dashboard GoPhish — métricas en tiempo real de la campaña "Viernes 12"',
      alt: 'Dashboard de GoPhish con métricas en tiempo real de la campaña Viernes 12'
    },
    {
      png: 'screenshots/02-email-template-editor.png',
      webp: 'screenshots/02-email-template-editor.webp',
      cap: 'Editor de Email Template — HTML puro con variables GoPhish ({{.FirstName}}, {{.URL}})',
      alt: 'Editor de plantilla de email HTML en GoPhish'
    },
    {
      png: 'screenshots/07-credentials-captured.png',
      webp: 'screenshots/07-credentials-captured.webp',
      cap: 'Timeline forense — vista de detalle con parámetros capturados: usuario y contraseña',
      alt: 'Timeline forense y credenciales capturadas en GoPhish'
    }
  ];

  var dlg = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-cap');
  var counter = document.getElementById('lb-counter');
  var current = 0;
  var opener = null;

  function render() {
    if (!img || !cap || !counter || !shots[current]) return;
    img.src = shots[current].webp || shots[current].png;
    img.onerror = function () {
      img.onerror = null;
      img.src = shots[current].png;
    };
    img.alt = shots[current].alt;
    cap.textContent = shots[current].cap;
    counter.textContent = (current + 1) + ' / ' + shots.length;
  }

  function open(i) {
    if (!dlg) return;
    opener = document.activeElement;
    current = i;
    render();
    if (typeof dlg.showModal === 'function') {
      dlg.showModal();
    } else {
      dlg.setAttribute('open', '');
    }
    var closeBtn = document.getElementById('lb-close');
    if (closeBtn) closeBtn.focus();
  }

  function move(d) {
    current = (current + d + shots.length) % shots.length;
    render();
  }

  document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idx = parseInt(btn.getAttribute('data-lightbox'), 10);
      if (!isNaN(idx)) open(idx);
    });
  });

  var closeBtn = document.getElementById('lb-close');
  if (closeBtn && dlg) {
    closeBtn.addEventListener('click', function () {
      if (typeof dlg.close === 'function') dlg.close();
      else dlg.removeAttribute('open');
    });
  }

  var prevBtn = document.getElementById('lb-prev');
  if (prevBtn) prevBtn.addEventListener('click', function () { move(-1); });

  var nextBtn = document.getElementById('lb-next');
  if (nextBtn) nextBtn.addEventListener('click', function () { move(1); });

  if (dlg) {
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg) {
        if (typeof dlg.close === 'function') dlg.close();
        else dlg.removeAttribute('open');
      }
    });

    dlg.addEventListener('close', function () {
      if (opener && typeof opener.focus === 'function') opener.focus();
    });

    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        move(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        move(1);
      }
    });
  }

  /* ---------- Scrollspy: sección activa en la barra de navegación ---------- */
  var links = document.querySelectorAll('.navlinks a[data-spy]');
  var map = {};
  links.forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      map[href.slice(1)] = a;
    }
  });

  if ('IntersectionObserver' in window && Object.keys(map).length > 0) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = map[en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-25% 0px -55% 0px' });

    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }
})();
