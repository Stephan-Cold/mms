// === Moment Maker Studios Gallery Script ===

// Initialize gallery on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    handleURLParameters();
});

function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');
    
    if (category && subcategory) {
        setTimeout(() => {
            const categoryCard = document.querySelector(`.category-card[data-category="${category}"][data-subcategory="${subcategory}"]`);
            if (categoryCard) {
                categoryCard.click();
            }
        }, 200);
    }
}

// === Gallery Data ===
const galleryData = {
    studio: {
        'kids-birthdays': [
            'images/kb/child-birthday-party-photography-newcastle-02.jpg',
            'images/kb/fun-kids-birthday-photo-session-newcastle-04.jpg',
            'images/kb/kids-birthday-cake-smash-newcastle-03.jpg',
            'images/kb/kids-birthday-photoshoot-newcastle-moment-maker-studios-01.jpg',
            'images/kb/kids-birthday-portrait-newcastle-photographer-05.jpg',
            'images/kb/moment-maker-studios-kids-birthday-gallery-06.jpg'
        ],
        'adult-birthdays': [
            'images/ab/adult-birthday-party-photography-newcastle-07.jpg',
            'images/ab/adult-birthday-photo-session-kwa-zulu-natal-09.jpg',
            'images/ab/angel-birthday.jpg',
            'images/ab/glamorous-adult-birthday-photoshoot-newcastle-11.jpg',
            'images/ab/professional-adult-birthday-photography-newcastle-10.jpg',
            'images/ab/studio-adult-birthday-photoshoot-newcastle-08.jpg'
        ],
        'maternity': [
            'images/m/photography-pregnancy-newcastle.jpg',
            'images/m/beautiful-pregnancy-photos-newcastle.jpg',
            'images/m/maternity-photoshoot-newcastle-kwazulu-natal.jpg',
            'images/m/maternity-portrait-session-newcastle.jpg',
            'images/m/expecting-mother-photoshoot-newcastle.jpg',
            'images/m/pregnancy-photography-newcastle-studio.jpg'
        ],
        'casual': [
            'images/c/candid-casual-shoot-newcastle-06.jpg',
            'images/c/casual-photo-session-newcastle-04.jpg',
            'images/c/casual-photography-newcastle-02.jpg',
            'images/c/casual-photoshoot-newcastle-kzn-01.jpg',
            'images/c/lifestyle-photography-newcastle-kzn-05.jpg',
            'images/c/relaxed-photoshoot-newcastle-03.jpg'
        ],
        'christmas-shoot': [
            'images/xmas/festive-solo-shoot.jpg',
            'images/xmas/christmas-family-shoot-newcastle.jpg',
            'images/xmas/gift-season-newcastle.jpg',
            'images/xmas/xmas-fever-studio.jpg',
            'images/xmas/xmas-family-newcastle.jpg',
            'images/xmas/together-festive-newcastle.jpg'
            
        ],
    },
    outdoor: {
        'weddings': [
            'images/w/moment-maker-studios-wedding-ceremony-newcastle-kzn.jpg',
            'images/w/newcastle-kzn-wedding-reception-photography.jpg',
            'images/w/outdoor-wedding-photography-newcastle-kzn.jpg',
            'images/w/wedding-photography-newcastle-kwazulu-natal-thumbnail-01.jpg',
            'images/w/wedding-photography-newcastle-kzn-bride-groom.jpg',
            'images/w/wedding-portrait-bride-newcastle-kzn.jpg'
        ],
        'matric-dance': [
            'images/md/elegant-matric-dance-photos-newcastle-06.jpg',
            'images/md/matric-dance-couple-photography-newcastle-05.jpg',
            'images/md/matric-dance-photography-newcastle-kzn-01.jpg',
            'images/md/matric-dance-portraits-newcastle-03.jpg',
            'images/md/moment-maker-studios-matric-dance-04.jpg',
            'images/md/newcastle-matric-dance-photoshoot-02.jpg'
        ],
        'traditional': [
            'images/tc/kwazulu-natal-cultural-wedding-photography-04.jpg',
            'images/tc/moment-maker-studios-traditional-ceremony-05.jpg',
            'images/tc/moment-maker-studios-wedding-ring-exchange-newcastle.jpg',
            'images/tc/south-african-traditional-wedding-photography-06.jpg',
            'images/tc/traditional-ceremony-photography-newcastle-kwazulu-natal-01.jpg',
            'images/tc/zulu-traditional-wedding-photographer-newcastle-02.jpg'
        ],
        'outdoor-birthdays': [
            'images/o/adult-birthday-celebration-photography-newcastle-02.jpg',
            'images/o/adult-birthday-event-photographer-newcastle-04.jpg',
            'images/o/adult-birthday-photoshoot-newcastle-01.jpg',
            'images/o/elegant-adult-birthday-photoshoot-kzn-05.jpg',
            'images/o/milestone-birthday-celebration-photography-newcastle-06.jpg',
            'images/o/newcastle-adult-birthday-portrait-03.jpg'
        ]
    },
    'full-outdoor': {
        'all': [
            'images/fo/african-heritage-traditional-ceremony-28.jpg',
            'images/fo/african-traditional-ceremony-newcastle-16.jpg',
            'images/fo/african-traditional-wedding-newcastle-04.jpg',
            'images/fo/best-outdoor-wedding-photographer-newcastle-08.jpg',
            'images/fo/black-tie-outdoor-matric-newcastle-10.jpg',
            'images/fo/bridesmaids-outdoor-wedding-newcastle-06.jpg',
            'images/fo/candid-outdoor-wedding-newcastle-kzn-05.jpg',
            'images/fo/catering-photography-newcastle.jpg',
            'images/fo/celebratory-traditional-ceremony-newcastle-11.jpg',
            'images/fo/colorful-traditional-ceremony-newcastle-08.jpg',
            'images/fo/costume-traditional-ceremony-newcastle-10.jpg',
            'images/fo/creative-matric-dance-outdoor-newcastle-05.jpg',
            'images/fo/creative-outdoor-birthday-newcastle-08.jpg',
            'images/fo/cultural-ceremony-outdoor-newcastle-03.jpg',
            'images/fo/cultural-wedding-traditional-newcastle-22.jpg',
            'images/fo/daytime-outdoor-birthday-newcastle-11.jpg',
            'images/fo/documentary-outdoor-wedding-newcastle-04.jpg',
            'images/fo/elegant-matric-dance-newcastle-04.jpg',
            'images/fo/food-photography-moment-maker.jpg',
            'images/fo/food-photography-newcastle.jpg',
            'images/fo/heritage-ceremony-newcastle-outdoor-05.jpg',
            'images/fo/heritage-traditional-ceremony-kzn-20.jpg',
            'images/fo/kwazulu-natal-wedding-photographer-outdoor-03.jpg',
            'images/fo/kzn-african-tradition-ceremony-photos-23.jpg',
            'images/fo/kzn-cultural-photography-traditional-17.jpg',
            'images/fo/kzn-traditional-photography-newcastle-27.jpg',
            'images/fo/modern-traditional-ceremony-newcastle-07.jpg',
            'images/fo/natural-light-matric-dance-newcastle-07.jpg',
            'images/fo/newcastle-cultural-wedding-photography-29.jpg',
            'images/fo/newcastle-outdoor-wedding-ceremony-02.jpg',
            'images/fo/newcastle-traditional-attire-photography-18.jpg',
            'images/fo/newcastle-zulu-cultural-photography-25.jpg',
            'images/fo/outdoor-wedding-photography-newcastle-kzn-01.jpg',
            'images/fo/ritual-ceremony-outdoor-newcastle-12.jpg',
            'images/fo/romantic-matric-dance-outdoor-newcastle-13.jpg',
            'images/fo/rustic-outdoor-wedding-newcastle-07.jpg',
            'images/fo/senior-dance-outdoor-newcastle-03.jpg',
            'images/fo/stylish-matric-dance-newcastle-14.jpg',
            'images/fo/sunset-matric-dance-newcastle-11.jpg',
            'images/fo/traditional-ceremony-outdoor-newcastle-kzn-01.jpg',
            'images/fo/traditional-ceremony-photography-newcastle-14.jpg',
            'images/fo/traditional-dance-photography-newcastle-19.jpg',
            'images/fo/traditional-marriage-photography-newcastle-24.jpg',
            'images/fo/traditional-ritual-outdoor-newcastle-09.jpg',
            'images/fo/traditional-wedding-celebration-kzn-26.jpg',
            'images/fo/tribal-ceremony-outdoor-newcastle-06.jpg',
            'images/fo/twenty-first-birthday-newcastle.jpg',
            'images/fo/venue-matric-dance-newcastle-12.jpg',
            'images/fo/venue-photography-newcastle.jpg',
            'images/fo/wedding-cuisine-moment-maker.jpg',
            'images/fo/zulu-traditional-celebration-photography-30.jpg',
            'images/fo/zulu-traditional-ceremony-newcastle-outdoors-02.jpg',
            'images/fo/zulu-traditional-event-photography-21.jpg',
            'images/fo/zulu-traditional-wedding-photography-kzn-15.jpg'
        ]
    }
};

let currentImages = [];
let currentImageIndex = 0;

// === Initialize the gallery ===
function initializeGallery() {
    setupCategoryButtons();
    setupSubcategoryButtons();
    setupLightbox();
    setupCategoryCards(); // Added for the new UI

    // Default initial load
    loadGalleryImages('studio', 'kids-birthdays');
}

// === New: Category Card Handling (the visible tiles) ===
function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    const galleryGridSection = document.getElementById('gallery-grid-section');
    const backToCategories = document.getElementById('back-to-categories');
    const categoryHub = document.getElementById('category-hub');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const subcategory = card.dataset.subcategory;

            categoryHub.classList.add('hidden');
            galleryGridSection.classList.remove('hidden');
            backToCategories.classList.remove('hidden');

            loadGalleryImages(category, subcategory);
        });
    });

    // Back button returns to category tiles
    if (backToCategories) {
        backToCategories.addEventListener('click', () => {
            categoryHub.classList.remove('hidden');
            galleryGridSection.classList.add('hidden');
            backToCategories.classList.add('hidden');
        });
    }
}

// === Legacy Support ===
function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.subcategory-section').forEach(section => section.classList.add('hidden'));
            const targetSection = document.getElementById(`${category}-subcategories`);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                const firstSub = targetSection.querySelector('.subcategory-btn');
                if (firstSub) {
                    firstSub.classList.add('active');
                    loadGalleryImages(category, firstSub.dataset.subcategory);
                }
            }
        });
    });
}

function setupSubcategoryButtons() {
    const subcategoryButtons = document.querySelectorAll('.subcategory-btn');
    subcategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subcategory = this.dataset.subcategory;
            const activeCategory = document.querySelector('.category-btn.active')?.dataset.category;
            if (!activeCategory) return;
            this.parentElement.querySelectorAll('.subcategory-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadGalleryImages(activeCategory, subcategory);
        });
    });
}

// === Load Images ===
function loadGalleryImages(category, subcategory) {
    const imageGrid = document.getElementById('image-grid');
    const loadingState = document.getElementById('loading-state');
    if (!imageGrid || !loadingState) return;

    loadingState.style.display = 'block';
    imageGrid.innerHTML = '';

    const images = galleryData[category]?.[subcategory] || [];
    if (images.length === 0) {
        setTimeout(() => {
            loadingState.style.display = 'none';
            imageGrid.innerHTML = '<p class="no-images">No images available for this category.</p>';
        }, 500);
        return;
    }

    currentImages = images;

    setTimeout(() => {
        loadingState.style.display = 'none';
        renderGalleryImages(images);
        imageGrid.classList.add('loaded');
    }, 800);
}

// === Render ===
function renderGalleryImages(images) {
    const imageGrid = document.getElementById('image-grid');
    imageGrid.innerHTML = images.map((src, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})" role="button" tabindex="0" aria-label="View image ${index + 1}">
            <img src="${src}" alt="Gallery image ${index + 1}" loading="lazy">
        </div>
    `).join('');
}

// === Lightbox ===
function setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', previousImage);
    nextBtn?.addEventListener('click', nextImage);

    modal?.addEventListener('click', e => {
        if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', e => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') previousImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

function openLightbox(index) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter');

    currentImageIndex = index;
    img.src = currentImages[index];
    img.alt = `Gallery image ${index + 1} of ${currentImages.length}`;
    counter.textContent = `${index + 1} / ${currentImages.length}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function previousImage() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

function nextImage() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter');
    img.src = currentImages[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
}

// Expose for debugging
window.Gallery = { openLightbox, closeLightbox, previousImage, nextImage };

window.MMS_selectGallery = function (category, subcategory) {
    const catCard = document.querySelector(`.category-card[data-category="${category}"][data-subcategory="${subcategory}"]`);
    if (catCard) catCard.click();
};
