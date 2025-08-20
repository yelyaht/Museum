// --- Text Modal (archeology page) --- \\
console.log('[tmodal] script loaded');

(() => {
  const modal       = document.getElementById('tmodal');
  const modalBody   = document.getElementById('tmodal-body');
  const closeBtn    = modal ? modal.querySelector('.tmodal-close') : null;

  if (!modal || !modalBody || !closeBtn) return;

  function setDialogAria(isOpen) {
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    if (isOpen) {
      modal.classList.add('open');
      document.body.classList.add('tmodal-open');
      modal.removeAttribute('aria-hidden');
      modal.setAttribute('tabindex', '-1');
      modal.focus({ preventScroll: true });
    } else {
      modal.classList.remove('open');
      document.body.classList.remove('tmodal-open');
      modal.setAttribute('aria-hidden', 'true');
      modal.removeAttribute('tabindex');
    }
  }

  function openTextModal(fromEl) {
    const selector = fromEl.getAttribute('data-tmodal-target');
    if (!selector) return;

    const source = document.querySelector(selector);
    if (!source) return;

    // Inject the hidden item's content into the modal body
    modalBody.innerHTML = source.innerHTML;

    // After injecting content:
    const firstH2 = modalBody.querySelector('h2');
    if (firstH2) {
      firstH2.id = 'tmodal-live-title';
      modal.setAttribute('aria-labelledby', 'tmodal-live-title');
}

    // Move focus to first focusable element inside, else to close button
    setDialogAria(true);
    const focusable = modalBody.querySelector(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    (focusable || closeBtn).focus({ preventScroll: true });
  }

  function closeTextModal() {
    modalBody.innerHTML = '';
    setDialogAria(false);
    // optional: return focus to last trigger (managed below)
    lastTrigger && lastTrigger.focus && lastTrigger.focus();
  }

  // Keep track of what opened the modal for focus return
  let lastTrigger = null;

  // Event delegation: any element with [data-tmodal-target]
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-tmodal-target]');
    if (!trigger) return;
    e.preventDefault();
    lastTrigger = trigger;
    openTextModal(trigger);
  });

  // Close actions
  closeBtn.addEventListener('click', closeTextModal);
  closeBtn.addEventListener('mousedown', (e) => e.preventDefault());
  closeBtn.addEventListener('click', () => closeBtn.blur());

  // Click on overlay (outside dialog) closes
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTextModal();
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeTextModal();
  });

  // Basic focus trap inside the modal when open
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !modal.classList.contains('open')) return;
    const nodes = modal.querySelectorAll(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const focusables = Array.from(nodes).filter(el => !el.hasAttribute('disabled'));
    if (!focusables.length) return;

    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();

// --- Image Modal (archeology page) ---
(() => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = modal ? modal.querySelector('.modal-close') : null;

  if (!modal || !modalImg || !closeBtn) return;

  function openModal(src, alt, captionText) {
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
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('tabindex', '-1');
    modal.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    modalImg.src = '';
    modalImg.alt = '';
    modal.setAttribute('aria-hidden', 'true');
  }

  // Bind directly to THIS page's images
  document.querySelectorAll('.artifact-media img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const fullSrc = img.getAttribute('data-full') || img.src;
      const alt = img.getAttribute('alt') || '';
      const row = img.closest('.vampire-row, .werewolf-row, .elven-row');
      const captionText = row ? (row.querySelector('h3')?.innerText || '') : alt;
      openModal(fullSrc, alt, captionText);
    });
  });

  // Close actions
  closeBtn.addEventListener('click', closeModal);
  closeBtn.addEventListener('mousedown', (e) => e.preventDefault());
  closeBtn.addEventListener('click', () => closeBtn.blur());

  // Click outside inner closes
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
