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
