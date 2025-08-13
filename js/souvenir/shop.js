// --- Image enlargement (Souvenir Shop) ---
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

  // Event delegation: works for all product cards
  document.addEventListener('click', (e) => {
    const img = e.target.closest('.card-image img');
    if (!img) return;
    const fullSrc = img.dataset.full || img.src;
    const alt = img.alt || '';
    const captionText = img.closest('.creature-card')?.querySelector('h3')?.innerText || alt;
    openModal(fullSrc, alt, captionText);
  });

  // Close actions
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
})();
