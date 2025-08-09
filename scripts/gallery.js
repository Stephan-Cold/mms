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
            'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1620843/pexels-photo-1620843.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1167021/pexels-photo-1167021.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1620766/pexels-photo-1620766.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1620773/pexels-photo-1620773.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        'adult-birthdays': [
            'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1729932/pexels-photo-1729932.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1405963/pexels-photo-1405963.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1729933/pexels-photo-1729933.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/2072453/pexels-photo-2072453.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1405461/pexels-photo-1405461.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        'maternity': [
            'https://images.pexels.com/photos/1556592/pexels-photo-1556592.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1556598/pexels-photo-1556598.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1556674/pexels-photo-1556674.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1556701/pexels-photo-1556701.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        'casual': [
            'https://images.pexels.com/photos/1043458/pexels-photo-1043458.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=600'
        ]
    },
    outdoor: {
        'weddings': [
            'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        'matric-dance': [
            'https://images.pexels.com/photos/1043458/pexels-photo-1043458.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        'traditional': [
            'https://images.pexels.com/photos/1043458/pexels-photo-1043458.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        'outdoor-birthdays': [
            'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1620843/pexels-photo-1620843.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1167021/pexels-photo-1167021.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1405963/pexels-photo-1405963.jpeg?auto=compress&cs=tinysrgb&w=600'
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