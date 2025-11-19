// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Update active link
            updateActiveNavLink(this);
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isNavClick = navbar.contains(event.target);
        
        if (!isNavClick && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Update active navigation link based on scroll position
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        initializeScrollSpy();
    }
    
    // Handle navigation for different pages
    updateNavigationForCurrentPage();
}

function updateActiveNavLink(clickedLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    clickedLink.classList.add('active');
}

function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0) return;
    
    const observerOptions = {
        rootMargin: '-100px 0px -66%',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
                
                if (correspondingLink && correspondingLink.classList.contains('nav-link')) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function updateNavigationForCurrentPage() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        
        // Check if current page matches the link
        if (
            (currentPage === '/' && href === 'index.html') ||
            (currentPage.includes('index.html') && href === 'index.html') ||
            (currentPage.includes('gallery.html') && href === 'gallery.html') ||
            (currentPage.includes('blog.html') && href === 'blog.html')
        ) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll enhancement for navigation
function enhancedSmoothScroll(targetId, offset = 80) {
    const target = document.getElementById(targetId);
    
    if (target) {
        const targetPosition = target.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 1000); // Max 1 second
        
        let start = null;
        
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const progressRatio = Math.min(progress / duration, 1);
            
            // Easing function
            const ease = 0.5 * (1 - Math.cos(progressRatio * Math.PI));
            
            window.scrollTo(0, startPosition + (distance * ease));
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
}

// Export navigation functions
window.Navigation = {
    updateActiveNavLink,
    enhancedSmoothScroll
};