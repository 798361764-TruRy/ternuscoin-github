/* ============================================================
   TernusCoin.com — Interactive Script
   Scroll fade-in · Toast · Smooth anchor
   Zero dependencies · Vanilla JS · IE11+ compatible
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll fade-in (IntersectionObserver) ────────────────── */
  var els = document.querySelectorAll('[data-anim]');

  function reveal(el) {
    el.classList.add('visible');
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          reveal(entries[i].target);
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    for (var i = 0; i < els.length; i++) {
      io.observe(els[i]);
    }
  } else {
    /* Fallback: show everything at once */
    for (var j = 0; j < els.length; j++) {
      reveal(els[j]);
    }
  }

  /* ── Toast utility ────────────────────────────────────────── */
  var toastEl = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2200);
  }

  /* ── Copy helper (data-copy attribute) ────────────────────── */
  var copyBtns = document.querySelectorAll('[data-copy]');

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('Copied to clipboard');
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast('Copied to clipboard');
      } catch (e) {
        showToast('Copy failed — please copy manually');
      }
      document.body.removeChild(ta);
    }
  }

  for (var k = 0; k < copyBtns.length; k++) {
    copyBtns[k].addEventListener('click', function () {
      var text = this.getAttribute('data-copy');
      if (text) copyText(text);
    });
  }

  /* ── Stagger animation delay for grid children ────────────── */
  function staggerGrid() {
    var grids = document.querySelectorAll('.value-grid, .playbook-grid, .acquire-grid, .follow-grid, .timeline');
    for (var g = 0; g < grids.length; g++) {
      var items = grids[g].querySelectorAll('[data-anim]');
      for (var n = 0; n < items.length; n++) {
        items[n].style.transitionDelay = (n * 0.08) + 's';
      }
    }
  }
  staggerGrid();

})();
