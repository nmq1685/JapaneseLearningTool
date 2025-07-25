/**
 * Main JavaScript file for Japanese Learning Tool
 * Handles common functionality across all pages
 */

// Utility functions
const Utils = {
    /**
     * Load HTML content from a file and insert into target element
     * @param {string} url - URL of the HTML file to load
     * @param {string} targetId - ID of the target element
     */
    loadHTML: async function(url, targetId) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.innerHTML = data;
            }
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
        }
    },

    /**
     * Add smooth scrolling behavior to anchor links
     */
    initSmoothScrolling: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    /**
     * Initialize fade-in animations for elements
     */
    initAnimations: function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-on-scroll').forEach(el => {
            observer.observe(el);
        });
    },

    /**
     * Show loading spinner
     * @param {string} targetId - ID of the target element
     */
    showLoading: function(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = '<div class="flex justify-center items-center p-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>';
        }
    },

    /**
     * Hide loading spinner
     * @param {string} targetId - ID of the target element
     */
    hideLoading: function(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = '';
        }
    }
};

// Page initialization
const PageInit = {
    /**
     * Initialize common page elements
     */
    init: function() {
        this.loadHeaderFooter();
        this.initEventListeners();
        Utils.initSmoothScrolling();
        Utils.initAnimations();
    },

    /**
     * Load header and footer components
     */
    loadHeaderFooter: function() {
        // Determine the correct path based on current page location
        const isInSubfolder = window.location.pathname.includes('/pages/');
        const basePath = isInSubfolder ? '../' : '';
        
        Utils.loadHTML(`${basePath}assets/header.html`, 'header-placeholder');
        Utils.loadHTML(`${basePath}assets/footer.html`, 'footer-placeholder');
    },

    /**
     * Initialize event listeners
     */
    initEventListeners: function() {
        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Handle page visibility change
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    },

    /**
     * Handle window resize events
     */
    handleResize: function() {
        // Add any resize-specific logic here
        console.log('Window resized');
    },

    /**
     * Handle page visibility change
     */
    handleVisibilityChange: function() {
        if (document.hidden) {
            console.log('Page is now hidden');
        } else {
            console.log('Page is now visible');
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    PageInit.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, PageInit };
}