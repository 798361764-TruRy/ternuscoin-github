/* ============================================================
   TernusCoin.com — Interactive Script
   Scroll fade-in · Countdown timer · FAQ · Toast
   Zero dependencies · Vanilla JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Countdown Timer ──────────────────────────────────────── */
  var targetDate = new Date('2026-09-01T00:00:00Z').getTime();
  var cdDays = document.getElementById('cd-days');
  var cdHours = document.getElementById('cd-hours');
  var cdMins = document.getElementById('cd-mins');
  var cdSecs = document.getElementById('cd-secs');
  var metricCd = document.getElementById('metric-countdown');

  function updateCountdown() {
    var now = Date.now();
    var diff = targetDate - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = '0';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSecs) cdSecs.textContent = '00';
      if (metricCd) metricCd.textContent = 'Today';
      return;
    }

    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);

    if (cdDays) cdDays.textContent = d;
    if (cdHours) cdHours.textContent = h < 10 ? '0' + h : h;
    if (cdMins) cdMins.textContent = m < 10 ? '0' + m : m;
    if (cdSecs) cdSecs.textContent = s < 10 ? '0' + s : s;
    if (metricCd) metricCd.textContent = d;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ── Scroll fade-in (IntersectionObserver) ────────────────── */
  var els = document.querySelectorAll('[data-anim]');

  function reveal(el) { el.classList.add('visible'); }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          reveal(entries[i].target);
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    for (var i = 0; i < els.length; i++) { io.observe(els[i]); }
  } else {
    for (var j = 0; j < els.length; j++) { reveal(els[j]); }
  }

  /* ── Stagger animation delay for grid children ────────────── */
  var grids = document.querySelectorAll(
    '.value-grid, .playbook-grid, .acquire-grid, .follow-grid, .timeline, .metrics-grid, .faq-list'
  );
  for (var g = 0; g < grids.length; g++) {
    var items = grids[g].querySelectorAll('[data-anim]');
    for (var n = 0; n < items.length; n++) {
      items[n].style.transitionDelay = (n * 0.08) + 's';
    }
  }

  /* ── Progress bar animation on visibility ─────────────────── */
  var bars = document.querySelectorAll('.metric-bar-fill');
  if ('IntersectionObserver' in window && bars.length) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(function () { bar.style.width = width; }, 100);
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (bar) { barObserver.observe(bar); });
  }

  /* ── Toast utility ────────────────────────────────────────── */
  var toastEl = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  /* ── Copy helper ──────────────────────────────────────────── */
  var copyBtns = document.querySelectorAll('[data-copy]');

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { showToast('Copied to clipboard'); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showToast('Copied to clipboard'); }
      catch (e) { showToast('Copy failed'); }
      document.body.removeChild(ta);
    }
  }

  for (var k = 0; k < copyBtns.length; k++) {
    copyBtns[k].addEventListener('click', function () {
      var text = this.getAttribute('data-copy');
      if (text) copyText(text);
    });
  }

})();
