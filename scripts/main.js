// Global JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeScrollEffects();
    initializeIntersectionObserver();
    initializeSmoothScrolling();
    initializeSnowfall();

    
    console.log('Moment Maker Studios - Website Loaded');
});

// Book Shoot functionality
function bookShoot() {
    const phone = '27613191038';
    const message = encodeURIComponent('Hello! I would like to book a photoshoot with Moment Maker Studios. Could you please provide me with more information about your services and availability?');
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Track booking attempts (for analytics if needed)
    console.log('Booking attempt initiated');
}

// Scroll effects for navbar
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add specific animations based on element type
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                }
                
                if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.animationDelay = Math.random() * 0.2 + 's';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .testimonial-card, .contact-item, .article-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function for showing loading states
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="loader"></div><p>Loading...</p>';
        element.classList.add('loading-state');
    }
}

// Utility function for hiding loading states
function hideLoading(element) {
    if (element) {
        element.classList.remove('loading-state');
    }
}

// Error handling utility
function showError(message, element) {
    if (element) {
        element.innerHTML = `
            <div class="error-state">
                <p>❌ ${message}</p>
                <button onclick="location.reload()" class="cta-button secondary">Try Again</button>
            </div>
        `;
    }
}

// Performance optimization - Lazy load images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Handle form submissions globally
function handleFormSubmission(form, successMessage) {
    const formData = new FormData(form);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        if (successMessage) {
            const messageElement = document.createElement('div');
            messageElement.className = 'success-message show';
            messageElement.textContent = successMessage;
            form.appendChild(messageElement);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
        
        // Reset form
        form.reset();
    }, 1500);
}

// -------------------------------
// ❄️ Snowfall Effect
// -------------------------------
function initializeSnowfall() {
    const canvas = document.getElementById('snow');
    if (!canvas) return; // If there's no canvas, skip it

    const ctx = canvas.getContext('2d');
    let flakes = [], w, h, count;

    const rand = (min, max) => Math.random() * (max - min) + min;

    function size() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.width = Math.floor(canvas.clientWidth * dpr);
        h = canvas.height = Math.floor(canvas.clientHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        count = Math.floor((canvas.clientWidth * canvas.clientHeight) / 18000); // density
        if (flakes.length > count) flakes.length = count;
        while (flakes.length < count) {
            flakes.push({
                x: rand(0, canvas.clientWidth),
                y: rand(-canvas.clientHeight, 0),
                r: rand(0.6, 2.2),
                s: rand(0.15, 0.6),
                drift: rand(-0.3, 0.3),
                phase: rand(0, Math.PI * 2)
            });
        }
    }

    function tick() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        for (let f of flakes) {
            f.phase += 0.004;
            f.x += Math.sin(f.phase) * 0.4 + f.drift;
            f.y += f.s;
            if (f.y - f.r > canvas.clientHeight) {
                f.y = -10;
                f.x = rand(0, canvas.clientWidth);
            }
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fill();
        }
        requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    size();
    requestAnimationFrame(tick);
}

// Export functions for use in other files
window.MomentMaker = {
    bookShoot,
    showLoading,
    hideLoading,
    showError,
    handleFormSubmission
};