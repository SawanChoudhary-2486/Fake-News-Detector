/* ========================================
   Truth Dao Chronicles - JavaScript
   Interactive Features & Animations
   ======================================== */

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const contactForm = document.getElementById('contact-form');
const detectionForm = document.getElementById('detection-form');
const resultContainer = document.getElementById('result-container');
const statusValue = document.getElementById('status-value');
const statusLabel = document.getElementById('status-label');
const accuracyValue = document.getElementById('accuracy-value');

// ========================================
// Theme Management
// ========================================

// Initialize theme from localStorage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;

    // Set the theme attribute on the document element
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);

    // Set initial navbar background based on theme
    if (theme === 'light') {
        navbar.style.background = 'rgba(248, 250, 252, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    }

    // Force a reflow to ensure the theme is applied
    document.documentElement.offsetHeight;
}

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Toggle theme between light and dark
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    console.log('Switching theme from', currentTheme, 'to', newTheme);

    // Set the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Update navbar background based on scroll position and new theme
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        if (newTheme === 'light') {
            navbar.style.background = 'rgba(248, 250, 252, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        }
    } else {
        if (newTheme === 'light') {
            navbar.style.background = 'rgba(248, 250, 252, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        }
    }

    // Add transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);

    // Force a reflow to ensure the theme is applied
    document.documentElement.offsetHeight;
}

// ========================================
// Navigation Management
// ========================================

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = '';
            bar.style.opacity = '';
        }
    });
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');

    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.transform = '';
        bar.style.opacity = '';
    });
}

// Smooth scroll to sections
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ========================================
// Scroll Animations
// ========================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in animation to elements
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.text-block, .feature-card, .info-block, .section-header');

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    const scrollY = window.scrollY;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

    if (scrollY > 100) {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(248, 250, 252, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        }
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(248, 250, 252, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        }
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// ========================================
// Button Hover Effects
// ========================================

// Enhanced button hover effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('mousedown', function () {
            this.style.transform = 'translateY(0) scale(0.98)';
        });

        button.addEventListener('mouseup', function () {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
}

// ========================================
// Feature Card Interactions
// ========================================

// Add interactive effects to feature cards
function addFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });

        // Add click effect
        card.addEventListener('click', function () {
            this.style.transform = 'translateY(-5px) scale(1.01)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
}

// ========================================
// Form Handling
// ========================================

// Handle fake news detection form submission
function handleDetectionForm(e) {
    e.preventDefault();

    const urlInput = document.getElementById('url-input');
    const url = urlInput.value.trim();

    if (!url) {
        showNotification('Please enter a valid URL', 'error');
        return;
    }

    // Show loading state
    const submitButton = detectionForm.querySelector('button[type="submit"]');
    const originalText = submitButton.querySelector('span').textContent;
    submitButton.querySelector('span').textContent = 'Analyzing...';
    submitButton.disabled = true;

    // Hide previous results
    resultContainer.style.display = 'none';

    // API Call
    fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    })
        .then(res => res.json())
        .then(response => {
            if (!response.success) {
                throw new Error("Analysis failed");
            }

            displayDetectionResult({
                status: response.data.status,
                accuracy: response.data.accuracy
            });
        })
        .catch(err => {
            showNotification("Failed to analyze news", "error");
            console.error(err);
        })
        .finally(() => {
            submitButton.querySelector('span').textContent = originalText;
            submitButton.disabled = false;
        });

}


// Display detection results
function displayDetectionResult(result) {
    statusLabel.textContent = 'Status';
    statusValue.textContent = result.status;
    statusValue.className = 'status-value ' + result.status.toLowerCase();
    accuracyValue.textContent = result.accuracy;

    // Show result container with animation
    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    showNotification(`Analysis complete! Result: ${result.status}`, 'success');
}

// Handle contact form submission
function handleFormSubmission(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simulate form submission with animation
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Submitting to Shadows...';
    submitButton.disabled = true;

    // Add loading animation
    submitButton.style.background = 'linear-gradient(135deg, #6366f1, #3b82f6)';
    submitButton.style.animation = 'pulse 1s ease-in-out infinite';

    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.animation = '';

        // Show success message
        showNotification('Your destiny has been submitted to the shadows!', 'success');

        // Reset form
        contactForm.reset();
    }, 2000);
}

// ========================================
// Notification System
// ========================================

// Show notification messages
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    let bgColor = 'var(--shadow-purple)';
    if (type === 'success') {
        bgColor = 'var(--emerald)';
    } else if (type === 'error') {
        bgColor = 'var(--crimson)';
    }

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================================
// Particle Effects
// ========================================

// Create floating particles effect
function createParticleEffect() {
    const heroSection = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;

    heroSection.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--shadow-purple);
        border-radius: 50%;
        opacity: 0.6;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;

    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';

    container.appendChild(particle);
}

// ========================================
// Keyboard Navigation
// ========================================

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }

    // Space/Enter on theme toggle
    if ((e.key === ' ' || e.key === 'Enter') && e.target === themeToggle) {
        e.preventDefault();
        toggleTheme();
    }
}

// ========================================
// Performance Optimizations
// ========================================

// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// Event Listeners
// ========================================

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme
    initializeTheme();

    // Set navbar background based on initial scroll position
    handleNavbarScroll();

    // Add scroll animations
    addScrollAnimations();

    // Add button effects
    addButtonEffects();

    // Add feature card effects
    addFeatureCardEffects();

    // Create particle effects
    createParticleEffect();

    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollTo(targetId);
            closeMobileMenu();
        });
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }

    // Detection form submission
    if (detectionForm) {
        detectionForm.addEventListener('submit', handleDetectionForm);
    }

    // Scroll events
    window.addEventListener('scroll', throttle(handleNavbarScroll, 16));

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        .notification {
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
            }
            to {
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('🌑 Truth Dao Chronicles initialized successfully!');
});

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add loading state to buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    button.style.opacity = '0.7';

    return () => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    };
}

// Export functions for potential external use
window.ShadowRealm = {
    toggleTheme,
    showNotification,
    smoothScrollTo,
    addLoadingState
};
