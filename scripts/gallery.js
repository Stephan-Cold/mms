// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    handleURLParameters();
});

function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');
    
    if (category && subcategory) {
        // Wait a moment for the gallery to initialize
        setTimeout(() => {
            // Click the appropriate category button
            const categoryBtn = document.querySelector(`[data-category="${category}"]`);
            if (categoryBtn) {
                categoryBtn.click();
                
                // Wait for category to load, then click subcategory
                setTimeout(() => {
                    const subcategoryBtn = document.querySelector(`[data-subcategory="${subcategory}"]`);
                    if (subcategoryBtn) {
                        subcategoryBtn.click();
                    }
                }, 300);
            }
        }, 100);
    }
}

// Gallery data structure
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
            'images/m/beautiful-pregnancy-photos-newcastle.jpg',
            'images/m/expecting-mother-photoshoot-newcastle.jpg',
            'images/m/maternity-photoshoot-newcastle-kwazulu-natal.jpg',
            'images/m/maternity-portrait-session-newcastle.jpg',
            'images/m/photography-pregnancy-newcastle.jpg',
            'images/m/pregnancy-photography-newcastle-studio.jpg'
        ],
        'casual': [
            'images/c/candid-casual-shoot-newcastle-06.jpg',
            'images/c/casual-photo-session-newcastle-04.jpg',
            'images/c/casual-photography-newcastle-02.jpg',
            'images/c/casual-photoshoot-newcastle-kzn-01.jpg',
            'images/c/lifestyle-photography-newcastle-kzn-05.jpg',
            'images/c/relaxed-photoshoot-newcastle-03.jpg'
            
        ]
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
    }
};

let currentImages = [];
let currentImageIndex = 0;

function initializeGallery() {
    setupCategoryButtons();
    setupSubcategoryButtons();
    setupLightbox();
    
    // Load initial category
    loadGalleryImages('studio', 'kids-birthdays');
}

function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide subcategory sections
            document.querySelectorAll('.subcategory-section').forEach(section => {
                section.classList.add('hidden');
            });
            
            const targetSection = document.getElementById(`${category}-subcategories`);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                
                // Reset subcategory buttons
                const subcategoryBtns = targetSection.querySelectorAll('.subcategory-btn');
                subcategoryBtns.forEach(btn => btn.classList.remove('active'));
                if (subcategoryBtns.length > 0) {
                    subcategoryBtns[0].classList.add('active');
                    const firstSubcategory = subcategoryBtns[0].dataset.subcategory;
                    loadGalleryImages(category, firstSubcategory);
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
            const activeCategory = document.querySelector('.category-btn.active').dataset.category;
            
            // Update active button
            this.parentElement.querySelectorAll('.subcategory-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            loadGalleryImages(activeCategory, subcategory);
        });
    });
}

function loadGalleryImages(category, subcategory) {
    const imageGrid = document.getElementById('image-grid');
    const loadingState = document.getElementById('loading-state');
    
    if (!imageGrid || !loadingState) return;
    
    // Show loading state
    loadingState.style.display = 'block';
    imageGrid.innerHTML = '';
    
    // Get images for the selected category and subcategory
    const images = galleryData[category] && galleryData[category][subcategory] 
        ? galleryData[category][subcategory] 
        : [];
    
    if (images.length === 0) {
        setTimeout(() => {
            loadingState.style.display = 'none';
            imageGrid.innerHTML = '<p class="no-images">No images available for this category.</p>';
        }, 500);
        return;
    }
    
    currentImages = images;
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        loadingState.style.display = 'none';
        renderGalleryImages(images);
        imageGrid.classList.add('category-transition');
    }, 800);
}

function renderGalleryImages(images) {
    const imageGrid = document.getElementById('image-grid');
    
    imageGrid.innerHTML = images.map((imageSrc, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})" role="button" tabindex="0" aria-label="View image ${index + 1}">
            <img src="${imageSrc}" alt="Gallery image ${index + 1}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-overlay-text">View Full Size</div>
            </div>
        </div>
    `).join('');
    
    // Add keyboard event listeners for gallery items
    const galleryItems = imageGrid.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });
}

function setupLightbox() {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    if (!lightboxModal) return;
    
    // Close lightbox
    lightboxClose?.addEventListener('click', closeLightbox);
    
    // Navigation
    lightboxPrev?.addEventListener('click', previousImage);
    lightboxNext?.addEventListener('click', nextImage);
    
    // Close on background click
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

function openLightbox(index) {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    if (!lightboxModal || !lightboxImage) return;
    
    currentImageIndex = index;
    lightboxImage.src = currentImages[index];
    lightboxImage.alt = `Gallery image ${index + 1} of ${currentImages.length}`;
    
    if (lightboxCounter) {
        lightboxCounter.textContent = `${index + 1} / ${currentImages.length}`;
    }
    
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    lightboxImage.focus();
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightbox-modal');
    
    if (lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
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
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    if (lightboxImage && currentImages[currentImageIndex]) {
        lightboxImage.src = currentImages[currentImageIndex];
        lightboxImage.alt = `Gallery image ${currentImageIndex + 1} of ${currentImages.length}`;
    }
    
    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    }
}

// Export gallery functions
window.Gallery = {
    openLightbox,
    closeLightbox,
    previousImage,
    nextImage
};
