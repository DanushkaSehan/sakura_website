'use strict';

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');
const lbCounter = document.getElementById('lb-counter');

let currentIndex = 0;

const images = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt,
}));

function openLightbox(index) {
    currentIndex = index;
    showImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showImage() {
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    if (lbCounter) {
        lbCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lbPrev) lbPrev.addEventListener('click', showPrev);
if (lbNext) lbNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

// Touch/swipe support
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
        diff > 0 ? showNext() : showPrev();
    }
});
