// --- Image Modal (Vampires' Crypt) ---
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

  // Bind to this page's side-column images (and card images if you add them later)
  const imgs = document.querySelectorAll('.vampires-side-column img, .card-image img');
  imgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const fullSrc = img.getAttribute('data-full') || img.currentSrc || img.src;
      const alt = img.getAttribute('alt') || '';
      // Use the banner title as caption, fallback to alt
      const banner = document.querySelector('.banner-title h2');
      const captionText = banner?.innerText || alt;
      openModal(fullSrc, alt, captionText);
    });
  });

  // Close actions
  closeBtn.addEventListener('click', closeModal);
  closeBtn.addEventListener('mousedown', e => e.preventDefault());
  closeBtn.addEventListener('click', () => closeBtn.blur());
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
