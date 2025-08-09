// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBlog();
});

function initializeBlog() {
    setupNewsletterForm();
    initializeReadMore();
    
    console.log('Blog functionality initialized');
}

function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSignup);
    }
}

function handleNewsletterSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!emailInput || !submitButton) return;
    
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!isValidEmail(email)) {
        showNewsletterMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Show success message
        showNewsletterMessage('Thank you for subscribing! You\'ll receive our latest photography tips and updates.', 'success');
        
        // Clear form
        emailInput.value = '';
        
        // Track subscription (for analytics if needed)
        console.log('Newsletter subscription:', email);
    }, 1500);
}

function showNewsletterMessage(message, type) {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    // Remove existing messages
    const existingMessage = newsletterForm.parentElement.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `newsletter-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 4px;
        text-align: center;
        font-weight: 500;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        ${type === 'success' 
            ? 'background: rgba(0, 255, 0, 0.1); color: #006400; border: 1px solid rgba(0, 255, 0, 0.3);' 
            : 'background: rgba(255, 0, 0, 0.1); color: #cc0000; border: 1px solid rgba(255, 0, 0, 0.3);'
        }
    `;
    
    // Add to DOM
    newsletterForm.parentElement.appendChild(messageElement);
    
    // Animate in
    setTimeout(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-10px)';
        setTimeout(() => messageElement.remove(), 300);
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initializeReadMore() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.onclick?.toString().match(/readMore\('([^']+)'\)/)?.[1];
            if (articleId) {
                handleReadMore(articleId);
            }
        });
    });
}

function readMore(articleId) {
    handleReadMore(articleId);
}

function handleReadMore(articleId) {
    // In a real implementation, this would navigate to a full article page
    // For now, we'll show a modal with extended content
    
    const articleContent = getArticleContent(articleId);
    
    if (articleContent) {
        showArticleModal(articleContent);
    } else {
        // Fallback - could navigate to a dedicated article page
        console.log('Navigate to article:', articleId);
    }
}

function getArticleContent(articleId) {
    const articles = {
        'child-photoshoot-tips': {
            title: 'Tips to Ensure Your Child Has a Comfortable Photoshoot',
            content: `
                <h3>Creating the Perfect Environment for Your Child's Photoshoot</h3>
                
                <p>At Moment Maker Studios, we understand that photographing children requires a special approach. Our experience has taught us that a comfortable child creates the most authentic and beautiful portraits.</p>
                
                <h4>Before the Shoot:</h4>
                <ul>
                    <li><strong>Choose the Right Time:</strong> Schedule sessions during your child's happiest times - usually mid-morning or early afternoon when they're well-rested.</li>
                    <li><strong>Bring Comfort Items:</strong> Favorite toys, blankets, or snacks can help keep children calm and engaged.</li>
                    <li><strong>Dress Comfortably:</strong> Choose outfits that allow for movement and reflect your child's personality.</li>
                </ul>
                
                <h4>During the Session:</h4>
                <ul>
                    <li><strong>Take Breaks:</strong> We always allow time for snacks, bathroom breaks, and just letting kids be kids.</li>
                    <li><strong>Play and Interact:</strong> Our photographers are skilled at engaging children through games and conversation.</li>
                    <li><strong>Stay Relaxed:</strong> Children pick up on parent energy - staying calm helps everyone enjoy the experience.</li>
                </ul>
                
                <h4>Our Studio Approach:</h4>
                <p>We've designed our studio space with children in mind. From colorful props to child-friendly lighting, every detail is considered. Our photographers specialize in working with children and know how to capture those genuine smiles and expressions that make each child unique.</p>
                
                <p>Remember, the goal is to capture your child's personality and spirit. The best photos often come from moments of natural interaction and play.</p>
                
                <div class="article-cta">
                    <h4>Ready to Book Your Child's Photoshoot?</h4>
                    <p>Contact us today to schedule a consultation and create beautiful memories of your little one.</p>
                </div>
            `,
            image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        'wedding-photographer-guide': {
            title: 'How to Choose a Photographer for Your Wedding',
            content: `
                <h3>Your Complete Guide to Selecting the Perfect Wedding Photographer</h3>
                
                <p>Your wedding day is one of the most important days of your life, and choosing the right photographer is crucial for preserving those precious memories forever.</p>
                
                <h4>1. Define Your Photography Style:</h4>
                <ul>
                    <li><strong>Traditional:</strong> Classic, formal poses and compositions</li>
                    <li><strong>Photojournalistic:</strong> Candid, documentary-style photography</li>
                    <li><strong>Fine Art:</strong> Creative, artistic interpretations</li>
                    <li><strong>Contemporary:</strong> Modern techniques with creative editing</li>
                </ul>
                
                <h4>2. Essential Questions to Ask:</h4>
                <ul>
                    <li>Can we see full wedding galleries, not just highlights?</li>
                    <li>What's included in your wedding packages?</li>
                    <li>Do you have backup equipment and contingency plans?</li>
                    <li>How many weddings do you shoot per year?</li>
                    <li>What's your editing timeline and delivery method?</li>
                </ul>
                
                <h4>3. Budget Considerations:</h4>
                <p>Wedding photography typically represents 8-12% of your total wedding budget. Remember, you're not just paying for the day itself, but for:</p>
                <ul>
                    <li>Pre-wedding consultations and planning</li>
                    <li>Professional equipment and expertise</li>
                    <li>Hours of post-processing and editing</li>
                    <li>Professional delivery and storage systems</li>
                </ul>
                
                <h4>4. The Moment Maker Studios Difference:</h4>
                <p>At Moment Maker Studios, we believe every couple deserves photography that reflects their unique love story. Our approach combines:</p>
                <ul>
                    <li>Comprehensive consultation to understand your vision</li>
                    <li>Flexible shooting styles to match your preferences</li>
                    <li>Professional backup systems and contingency planning</li>
                    <li>Fast turnaround with high-quality editing</li>
                    <li>Ongoing support and communication throughout the process</li>
                </ul>
                
                <h4>Red Flags to Avoid:</h4>
                <ul>
                    <li>Photographers who won't show complete galleries</li>
                    <li>Prices that seem too good to be true</li>
                    <li>Poor communication or unprofessional behavior</li>
                    <li>No backup plans or insurance</li>
                    <li>Unclear contracts or hidden fees</li>
                </ul>
                
                <div class="article-cta">
                    <h4>Ready to Discuss Your Wedding Photography?</h4>
                    <p>Schedule a consultation with Moment Maker Studios to explore how we can capture your perfect day.</p>
                </div>
            `,
            image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
    };
    
    return articles[articleId] || null;
}

function showArticleModal(article) {
    // Create modal HTML
    const modalHTML = `
        <div class="article-modal" id="article-modal">
            <div class="article-modal-content">
                <button class="modal-close" onclick="closeArticleModal()" aria-label="Close article">&times;</button>
                <div class="article-modal-header">
                    <img src="${article.image}" alt="${article.title}" class="article-modal-image">
                    <h2>${article.title}</h2>
                </div>
                <div class="article-modal-body">
                    ${article.content}
                </div>
                <div class="article-modal-footer">
                    <button class="cta-button primary" onclick="bookShoot(); closeArticleModal();">Book Your Shoot</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style id="article-modal-styles">
            .article-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .article-modal-content {
                background: #fff;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                border-radius: 8px;
                position: relative;
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal-close {
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                z-index: 2001;
                color: #666;
            }
            
            .article-modal-header {
                position: relative;
                margin-bottom: 2rem;
            }
            
            .article-modal-image {
                width: 100%;
                height: 300px;
                object-fit: cover;
            }
            
            .article-modal-header h2 {
                position: absolute;
                bottom: 20px;
                left: 30px;
                right: 30px;
                color: #fff;
                background: rgba(0, 0, 0, 0.7);
                padding: 1rem;
                margin: 0;
                border-radius: 4px;
            }
            
            .article-modal-body {
                padding: 0 30px 20px;
                line-height: 1.6;
            }
            
            .article-modal-body h3, .article-modal-body h4 {
                color: #000;
                margin-top: 2rem;
                margin-bottom: 1rem;
            }
            
            .article-modal-body ul {
                margin: 1rem 0;
                padding-left: 2rem;
            }
            
            .article-modal-body li {
                margin-bottom: 0.5rem;
            }
            
            .article-cta {
                background: #f9f9f9;
                padding: 2rem;
                border-radius: 8px;
                text-align: center;
                margin-top: 2rem;
            }
            
            .article-modal-footer {
                padding: 20px 30px 30px;
                text-align: center;
                border-top: 1px solid #eee;
            }
            
            @media (max-width: 768px) {
                .article-modal {
                    padding: 10px;
                }
                
                .article-modal-content {
                    max-height: 95vh;
                }
                
                .article-modal-body {
                    padding: 0 20px 20px;
                }
                
                .article-modal-header h2 {
                    font-size: 1.5rem;
                    left: 20px;
                    right: 20px;
                }
            }
        </style>
    `;
    
    // Add to DOM
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const modal = document.getElementById('article-modal');
    modal.focus();
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeArticleModal();
        }
    });
    
    // Keyboard support
    const closeOnEscape = function(e) {
        if (e.key === 'Escape') {
            closeArticleModal();
        }
    };
    
    document.addEventListener('keydown', closeOnEscape);
    modal.closeOnEscape = closeOnEscape; // Store reference for cleanup
}

function closeArticleModal() {
    const modal = document.getElementById('article-modal');
    const styles = document.getElementById('article-modal-styles');
    
    if (modal) {
        // Remove event listener
        if (modal.closeOnEscape) {
            document.removeEventListener('keydown', modal.closeOnEscape);
        }
        
        modal.remove();
        document.body.style.overflow = '';
    }
    
    if (styles) {
        styles.remove();
    }
}

// Export blog functions
window.Blog = {
    readMore,
    handleNewsletterSignup,
    closeArticleModal
};