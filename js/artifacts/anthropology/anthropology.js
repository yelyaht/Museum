// anthropology.js

// ============ TEXT MODAL (brief history on image click) ============
(function () {
  const tmodal  = document.getElementById('tmodal');
  const tbody   = document.getElementById('tmodal-body');
  const closeBtn = tmodal ? tmodal.querySelector('.tmodal-close') : null;

  if (!tmodal || !tbody || !closeBtn) return;

  function openFrom(selector, trigger) {
    const src = document.querySelector(selector);
    if (!src) { console.warn('Missing tmodal content:', selector); return false; }

    // Inject hidden block’s HTML into modal body (images will be hidden via CSS)
    tbody.innerHTML = src.innerHTML;

    // Open
    tmodal.classList.add('open');
    document.body.classList.add('modal-open');

    // Focus close for accessibility
    closeBtn.focus();

    // Save trigger to restore focus
    if (trigger) tmodal.dataset.lastTrigger = saveTrigger(trigger);

    return false;
  }

  function closeModal() {
    tmodal.classList.remove('open');
    document.body.classList.remove('modal-open');
    tbody.innerHTML = '';

    // Restore focus
    const sel = tmodal.dataset.lastTrigger;
    if (sel) {
      const opener = document.querySelector(sel);
      if (opener) opener.focus();
      delete tmodal.dataset.lastTrigger;
    }
  }

  function saveTrigger(el) {
    if (!el) return '';
    if (el.id) return `#${el.id}`;
    if (el.classList && el.classList.length) {
      return `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`;
    }
    return el.tagName ? el.tagName.toLowerCase() : '';
  }

  // Click ANY artifact image with data-tmodal-target → open the text modal
  document.querySelectorAll('.artifact-media img[data-tmodal-target]').forEach((img) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSel = img.getAttribute('data-tmodal-target');
      openFrom(targetSel, img);
    });
  });

  // Close on backdrop or X
  tmodal.addEventListener('click', (e) => {
    if (e.target === tmodal || e.target.closest('.tmodal-close')) closeModal();
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tmodal.classList.contains('open')) closeModal();
  });

  // Keep the global helper for existing "brief history" links, if you still use them
  window.openBrief = function (selector) { return openFrom(selector, null); };
})();


// ============ IMAGE MODAL (zoom images) ============
(function () {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = modal ? modal.querySelector('.modal-close') : null;

  if (!modal || !modalImg || !closeBtn) {
    // Image modal not present; bail quietly.
    return;
  }

  function openImg(src, alt, captionText) {
    modalImg.src = src;
    modalImg.alt = alt || '';
    if (captionText) {
      modalCaption.textContent = captionText;
      modalCaption.removeAttribute('aria-hidden');
    } else {
      modalCaption.textContent = '';
      modalCaption.setAttribute('aria-hidden', 'true');
    }
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeImg() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    modalImg.src = '';
    modalImg.alt = '';
  }

  // Click any artifact image to zoom
  document.querySelectorAll('.artifact-media img').forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const fullSrc = img.getAttribute('data-full') || img.src;
      const alt = img.getAttribute('alt') || '';
      const row = img.closest('.dragon-row, .siren-row, .cerberus-row');
      const captionText = row ? (row.querySelector('h3')?.innerText || '') : alt;
      openImg(fullSrc, alt, captionText);
    });
  });

  closeBtn.addEventListener('click', closeImg);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeImg(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeImg();
  });
})();
