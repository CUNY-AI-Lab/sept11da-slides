'use strict';

let idx = 0;
const slides = Array.from(document.querySelectorAll('section.slide'));
const scrubber = document.getElementById('slide-scrubber');
const sliderCounter = document.getElementById('slider-counter');
const sliderProgress = document.querySelector('.slider-progress');
const sliderThumb = document.querySelector('.slider-thumb');
const lightbox = document.getElementById('image-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const announcer = document.getElementById('slide-announcer');
const deckLink = document.getElementById('deckLink');
const deckSecondaryLink = document.getElementById('deckSecondaryLink');
const deckTertiaryLink = document.getElementById('deckTertiaryLink');
const deckLinkDefault = deckLink ? deckLink.getAttribute('href') : '';
const leafletMaps = window.__deckLeafletMaps || (window.__deckLeafletMaps = []);
let announceTimer = null;
let fitFrame = null;
let lightboxTrigger = null;

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function fragsOf(slide) {
  return Array.from(slide.querySelectorAll('.frag'));
}

/* Keep every presentation slide inside the viewport. Text panels are bounded
   by CSS; when a panel is unusually dense, reduce its entire typographic
   layout instead of introducing a slide or nested-panel scrollbar. */
function fitTextPanel(panel) {
  if (!panel) return;
  panel.style.zoom = '1';
  var scale = 1;
  var minScale = 0.42;
  var overflows = function() {
    var bounds = panel.getBoundingClientRect();
    var clippedText = Array.from(panel.querySelectorAll('h1, h2, h3, p, li, a, .label, .series-head, .qr-row')).some(function(el) {
      if (!el.getClientRects().length) return false;
      var rect = el.getBoundingClientRect();
      return rect.left < bounds.left - 1 || rect.right > bounds.right + 1 ||
        rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1;
    });
    return clippedText || panel.scrollHeight > panel.clientHeight + 1 ||
      panel.scrollWidth > panel.clientWidth + 1;
  };

  while (overflows() && scale > minScale) {
    scale = Math.max(minScale, scale - 0.02);
    panel.style.zoom = scale.toFixed(2);
  }
  panel.dataset.fitScale = scale.toFixed(2);
}

function fitActiveSlide() {
  if (document.body.classList.contains('overview')) return;
  var slide = slides[idx];
  if (!slide) return;
  fitTextPanel(slide.querySelector('.content'));
  fitTextPanel(slide.querySelector('.title-card'));
}

function queueFit() {
  if (fitFrame) cancelAnimationFrame(fitFrame);
  fitFrame = requestAnimationFrame(function() {
    fitFrame = null;
    fitActiveSlide();
  });
}

function show(i, revealAll) {
  var next = clamp(i, 0, slides.length - 1);
  // Kill gallery timers and reset init flag so they reinitialize on re-entry
  slides[idx].querySelectorAll('.stage-gallery').forEach(function(g) {
    if (g._timer) { clearInterval(g._timer); g._timer = null; }
    delete g.dataset.init;
  });
  slides[idx].classList.remove('active');
  idx = next;
  slides[idx].classList.add('active');
  slides[idx].scrollTop = 0;
  fragsOf(slides[idx]).forEach(function(f) { f.classList.toggle('visible', !!revealAll); });
  syncAllBoroughsOnShow();
  fitActiveSlide();

  if (sliderCounter) sliderCounter.textContent = (idx + 1) + ' / ' + slides.length;
  if (scrubber) scrubber.value = String(idx + 1);

  var progress = ((idx + 1) / slides.length) * 100;
  if (sliderProgress) sliderProgress.style.width = progress + '%';
  if (sliderThumb) sliderThumb.style.left = 'calc(' + progress + '% - 10px)';

  history.replaceState(null, '', '#' + (idx + 1));

  if (deckLink) {
    var link = slides[idx].getAttribute('data-link') || deckLinkDefault;
    deckLink.setAttribute('href', link);
    deckLink.textContent = slides[idx].getAttribute('data-link-label') ||
      link.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  if (deckSecondaryLink) {
    var secondaryLink = slides[idx].getAttribute('data-secondary-link');
    if (secondaryLink) {
      deckSecondaryLink.setAttribute('href', secondaryLink);
      deckSecondaryLink.textContent = slides[idx].getAttribute('data-secondary-link-label') || secondaryLink;
      deckSecondaryLink.hidden = false;
    } else {
      deckSecondaryLink.hidden = true;
      deckSecondaryLink.removeAttribute('href');
      deckSecondaryLink.textContent = '';
    }
  }

  if (deckTertiaryLink) {
    var tertiaryLink = slides[idx].getAttribute('data-tertiary-link');
    if (tertiaryLink) {
      deckTertiaryLink.setAttribute('href', tertiaryLink);
      deckTertiaryLink.textContent = slides[idx].getAttribute('data-tertiary-link-label') || tertiaryLink;
      deckTertiaryLink.hidden = false;
    } else {
      deckTertiaryLink.hidden = true;
      deckTertiaryLink.removeAttribute('href');
      deckTertiaryLink.textContent = '';
    }
  }

  var f = slides[idx].querySelector('.content');
  if (f) f.scrollTop = 0;
  if (f && document.activeElement !== scrubber) {
    f.setAttribute('tabindex', '-1');
    f.focus({ preventScroll: true });
  }

  initGalleries(slides[idx]);

  setTimeout(function() {
    leafletMaps.forEach(function(map) {
      try {
        map.invalidateSize(false);
        if (typeof map.__deckRefit === 'function') map.__deckRefit();
      } catch (e) {}
    });
    var canv = slides[idx].querySelector('canvas');
    if (canv && typeof canv.__deckResize === 'function') {
      try { canv.__deckResize(); } catch (e) {}
    }
  }, 60);

  if (announcer) {
    if (announceTimer) clearTimeout(announceTimer);
    announceTimer = setTimeout(function() {
      var label = slides[idx].getAttribute('aria-label') || ('Slide ' + (idx + 1));
      announcer.textContent = 'Slide ' + (idx + 1) + ' of ' + slides.length + ': ' + label;
    }, 140);
  }
}

function advance() {
  var frags = fragsOf(slides[idx]);
  var hidden = frags.filter(function(f) { return !f.classList.contains('visible'); });
  if (hidden.length) {
    var frag = hidden[0];
    frag.classList.add('visible');
    syncGalleryForward(frag, slides[idx]);
    syncBoroughForward(frag);
  } else if (idx < slides.length - 1) {
    show(idx + 1);
  }
}

function retreat() {
  var frags = fragsOf(slides[idx]);
  var shown = frags.filter(function(f) { return f.classList.contains('visible'); });
  if (shown.length) {
    var frag = shown[shown.length - 1];
    frag.classList.remove('visible');
    syncGalleryBackward(frag, slides[idx]);
    syncBoroughBackward(frag);
  } else if (idx > 0) {
    show(idx - 1, true);
  }
}

/* ── Borough-label reveal sync (LW5 CUNY map) ── */
function syncBoroughForward(frag) {
  if (!frag || !frag.dataset || !frag.dataset.borough) return;
  if (typeof window.__cunyBoroughReveal === 'function') {
    window.__cunyBoroughReveal(frag.dataset.borough, true);
  }
}
function syncBoroughBackward(frag) {
  if (!frag || !frag.dataset || !frag.dataset.borough) return;
  if (typeof window.__cunyBoroughReveal === 'function') {
    window.__cunyBoroughReveal(frag.dataset.borough, false);
  }
}
function syncAllBoroughsOnShow() {
  if (typeof window.__cunyBoroughReveal !== 'function') return;
  var known = ['staten-island', 'manhattan', 'bronx', 'queens', 'brooklyn'];
  var activeFrags = Array.from(document.querySelectorAll('[data-borough].frag'));
  // Default: hide everything; then re-apply based on current visibility.
  known.forEach(function(b) { window.__cunyBoroughReveal(b, false); });
  activeFrags.forEach(function(frag) {
    if (frag.classList.contains('visible')) {
      window.__cunyBoroughReveal(frag.dataset.borough, true);
    }
  });
}

/* ── Gallery ↔ fragment sync ── */
function syncGalleryForward(frag, slide) {
  var gallery = slide.querySelector('.stage-gallery');
  if (!gallery) return;
  if (frag.dataset.startGallery !== undefined) {
    startGalleryTimer(gallery);
  }
  if (frag.dataset.galleryIdx !== undefined) {
    showGalleryItem(gallery, parseInt(frag.dataset.galleryIdx, 10));
  }
}

function syncGalleryBackward(frag, slide) {
  var gallery = slide.querySelector('.stage-gallery');
  if (!gallery) return;
  if (frag.dataset.startGallery !== undefined && gallery._timer) {
    clearInterval(gallery._timer);
    gallery._timer = null;
    showGalleryItem(gallery, 0);
  }
  if (frag.dataset.galleryIdx !== undefined) {
    var visible = fragsOf(slide).filter(function(f) {
      return f.classList.contains('visible') && f.dataset.galleryIdx !== undefined;
    });
    showGalleryItem(gallery, visible.length
      ? parseInt(visible[visible.length - 1].dataset.galleryIdx, 10) : 0);
  }
}

function closeLightbox() {
  if (!lightbox || !lightbox.open) return;
  lightbox.close();
}

function finishLightboxClose() {
  var trigger = lightboxTrigger;
  lightboxTrigger = null;
  document.body.classList.remove('lightbox-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  lightboxCaption.textContent = '';
  if (trigger && trigger.isConnected && !trigger.closest('.gallery-item:not(.active)')) {
    trigger.focus({ preventScroll: true });
  }
}

function openLightbox(img) {
  if (!lightbox || !img || lightbox.open) return;
  var captionEl = img.closest('figure') ? img.closest('figure').querySelector('figcaption') : null;
  var captionText = captionEl ? (captionEl.textContent || '').trim() : '';
  lightboxTrigger = img;
  lightboxImage.src = img.currentSrc || img.src;
  lightboxImage.alt = img.alt || captionText || 'Zoomed slide image';
  lightboxCaption.textContent = captionText || img.alt || '';
  swipeOk = false;
  wheelLock = false;
  lightbox.showModal();
  document.body.classList.add('lightbox-open');
  if (lightboxClose) lightboxClose.focus({ preventScroll: true });
}

function setZoomableImageState(img, enabled) {
  var description = (img.alt || '').trim();
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', description ? 'View larger image: ' + description : 'View larger slide image');
  img.tabIndex = enabled ? 0 : -1;
  if (enabled) img.removeAttribute('aria-hidden');
  else img.setAttribute('aria-hidden', 'true');
}

function toggleOverview() {
  var on = document.body.classList.toggle('overview');
  if (on) {
    slides[idx].scrollIntoView({ block: 'center', behavior: 'instant' });
  } else {
    queueFit();
  }
}

/* ── Gallery (multi-image carousel in stage) ── */
function initGalleries(slide) {
  var galleries = slide.querySelectorAll('.stage-gallery');
  galleries.forEach(function(gallery) {
    if (gallery.dataset.init) return;
    gallery.dataset.init = '1';
    var items = gallery.querySelectorAll('.gallery-item');
    var dots = gallery.querySelector('.gallery-dots');
    if (!dots || items.length < 2) return;
    var current = Array.from(items).findIndex(function(item) { return item.classList.contains('active'); });
    if (current < 0) current = 0;
    dots.innerHTML = '';
    items.forEach(function(item, i) {
      var dot = document.createElement('button');
      dot.className = 'gallery-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', 'Image ' + (i + 1) + ' of ' + items.length);
      dot.setAttribute('aria-pressed', i === current ? 'true' : 'false');
      dot.addEventListener('click', function() { showGalleryItem(gallery, i); });
      dots.appendChild(dot);
    });
    if ('fragSync' in gallery.dataset) return;
    startGalleryTimer(gallery);
  });
}

function showGalleryItem(gallery, i) {
  var items = gallery.querySelectorAll('.gallery-item');
  var dots = gallery.querySelectorAll('.gallery-dot');
  items.forEach(function(item, j) {
    var active = j === i;
    item.classList.toggle('active', active);
    setZoomableImageState(item, active);
  });
  dots.forEach(function(dot, j) {
    var active = j === i;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

/* ── Event listeners ── */
slides.forEach(function(s, i) {
  s.setAttribute('data-slide-num', i + 1);
  s.querySelectorAll('.stage img').forEach(function(img) {
    setZoomableImageState(img, !img.classList.contains('gallery-item') || img.classList.contains('active'));
  });
  var title = s.querySelector('.content h1');
  if (s.classList.contains('placeholder-slide') && title) {
    var len = (title.textContent || '').trim().length;
    /* CDSDV intentionally pairs a long formal title with two source
       renderings; keep its figure-side layout instead of hiding the stage. */
    if (len > 52 && !s.classList.contains('cdsdv-slide')) s.classList.add('crowded');
    // Dense detection: 5+ bullets, OR any bullet body >80 chars, OR total bullet chars >260
    var bullets = s.querySelectorAll('.content > ul > li, .content > ul > li > ul > li');
    var totalChars = 0;
    var longBullet = false;
    bullets.forEach(function(li) {
      var t = (li.textContent || '').trim();
      totalChars += t.length;
      if (t.length > 80) longBullet = true;
    });
    if (bullets.length >= 5 || longBullet || totalChars > 260) s.classList.add('dense');
  }
  s.addEventListener('click', function() {
    if (!document.body.classList.contains('overview')) return;
    document.body.classList.remove('overview');
    show(i, true);
  });
});

function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen();
    } else if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(function() {});
    }
  } catch (err) {}
}

function isForwardKey(e) {
  return ['ArrowRight', 'Right', 'PageDown', ' ', 'Spacebar', 'Space'].includes(e.key) || e.code === 'Space';
}

function isBackKey(e) {
  return ['ArrowLeft', 'Left', 'PageUp'].includes(e.key);
}

document.addEventListener('keydown', function(e) {
  if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (lightbox && lightbox.open) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === 'Tab' && lightboxClose) {
      e.preventDefault();
      lightboxClose.focus({ preventScroll: true });
    }
    return;
  }
  var focusedImage = e.target.closest && e.target.closest('.stage img[role="button"]');
  var imageActivation = e.key === 'Enter' || [' ', 'Spacebar', 'Space'].includes(e.key) || e.code === 'Space';
  if (focusedImage && imageActivation) {
    e.preventDefault();
    openLightbox(focusedImage);
    return;
  }
  if (e.key === 'Escape') {
    e.preventDefault();
    if (document.body.classList.contains('blanked')) { document.body.classList.remove('blanked'); return; }
    toggleOverview();
    return;
  }
  if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFullscreen(); return; }
  if (e.key === 'b' || e.key === 'B' || e.key === '.') {
    e.preventDefault();
    document.body.classList.toggle('blanked');
    if (announcer) announcer.textContent = document.body.classList.contains('blanked') ? 'Screen blanked' : 'Screen restored';
    return;
  }
  if (lightbox && lightbox.classList.contains('open')) return;
  if (document.body.classList.contains('overview')) return;
  if (isForwardKey(e)) { e.preventDefault(); advance(); }
  if (isBackKey(e)) { e.preventDefault(); retreat(); }
  if (e.key === 'Home') { e.preventDefault(); show(0); }
  if (e.key === 'End') { e.preventDefault(); show(slides.length - 1, true); }
});

var btnPrev = document.getElementById('btn-prev');
var btnNext = document.getElementById('btn-next');
var btnFullscreen = document.getElementById('btn-fullscreen');
if (btnPrev) btnPrev.addEventListener('click', retreat);
if (btnNext) btnNext.addEventListener('click', advance);
if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

if (scrubber) {
  scrubber.min = 1;
  scrubber.max = slides.length;
  scrubber.step = 1;
  scrubber.addEventListener('input', function(e) {
    show(parseInt(e.target.value) - 1, true);
  });
}

/* ── Touch / swipe ── */
var tx = 0, ty = 0, swipeOk = false;

document.addEventListener('touchstart', function(e) {
  if (lightbox && lightbox.open) { swipeOk = false; return; }
  if (e.touches.length !== 1 || e.target.closest('.stage') || e.target === scrubber || e.target.closest('.sticky-footer')) { swipeOk = false; return; }
  tx = e.touches[0].clientX; ty = e.touches[0].clientY; swipeOk = true;
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (lightbox && lightbox.open) { swipeOk = false; return; }
  if (!swipeOk || e.touches.length !== 1) return;
  if (Math.abs(e.touches[0].clientY - ty) > Math.abs(e.touches[0].clientX - tx) * 1.5) swipeOk = false;
}, { passive: true });

document.addEventListener('touchend', function(e) {
  if (lightbox && lightbox.open) { swipeOk = false; return; }
  if (!swipeOk) return;
  var dx = e.changedTouches[0].clientX - tx;
  var dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) >= 48 && Math.abs(dx) >= Math.abs(dy) * 1.2) { dx < 0 ? advance() : retreat(); }
  else if (Math.abs(dx) < 16 && Math.abs(dy) < 16) { advance(); }
  swipeOk = false;
}, { passive: true });

/* ── Trackpad wheel ── */
var wheelLock = false;
document.addEventListener('wheel', function(e) {
  if (lightbox && lightbox.open) { wheelLock = false; return; }
  if (document.body.classList.contains('overview') || e.target === scrubber || e.target.closest('.sticky-footer') || wheelLock) return;
  var absX = Math.abs(e.deltaX), absY = Math.abs(e.deltaY);
  if (absX < 30 || absX < absY) return;
  wheelLock = true;
  e.deltaX > 0 ? advance() : retreat();
  setTimeout(function() { wheelLock = false; }, 400);
}, { passive: true });

document.addEventListener('click', function(e) {
  var img = e.target.closest('.stage img');
  if (img && !document.body.classList.contains('overview')) {
    e.preventDefault();
    e.stopPropagation();
    openLightbox(img);
    return;
  }
  if (lightbox && e.target === lightbox) closeLightbox();
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('cancel', function(e) {
    e.preventDefault();
    closeLightbox();
  });
  lightbox.addEventListener('close', finishLightboxClose);
}

function startGalleryTimer(gallery) {
  // Image and quote carousels never autoforward — advance happens only via
  // user input (keys, scrubber, or a .frag with data-gallery-idx).
  // A carousel may opt in to autoforward by setting data-autoforward="<ms>"
  // (references carousel uses this). fragSync always wins over autoforward.
  if ('fragSync' in gallery.dataset) return;
  var ms = parseInt(gallery.dataset.autoforward || '0', 10);
  if (!ms) return;
  var items = gallery.querySelectorAll('.gallery-item');
  if (items.length < 2) return;
  if (gallery._timer) clearInterval(gallery._timer);
  gallery._timer = setInterval(function() {
    var current = 0;
    items.forEach(function(item, i) { if (item.classList.contains('active')) current = i; });
    showGalleryItem(gallery, (current + 1) % items.length);
  }, ms);
}

document.addEventListener('visibilitychange', function() {
  var activeSlide = slides[idx];
  if (!activeSlide) return;
  activeSlide.querySelectorAll('.stage-gallery').forEach(function(g) {
    if (document.hidden) {
      if (g._timer) { clearInterval(g._timer); g._timer = null; g._wasRunning = true; }
    } else if (g._wasRunning && !('fragSync' in g.dataset)) {
      g._wasRunning = false;
      startGalleryTimer(g);
    }
  });
});

window.addEventListener('hashchange', function() {
  var m = location.hash.match(/^#(\d+)$/);
  if (m) show(parseInt(m[1], 10) - 1, true);
});

window.addEventListener('resize', queueFit);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(queueFit);
}

var m = location.hash.match(/^#(\d+)$/);
show(m ? clamp(parseInt(m[1], 10) - 1, 0, slides.length - 1) : 0, false);
