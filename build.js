// JavaScript file for interactive functionality
// This file handles typing animations and navigation between pages

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation if we're on the login page
    initializeTypingAnimation();
    
    // Add smooth scrolling for any anchor links
    addSmoothScrolling();
    
    // Initialize form validation
    initializeFormValidation();
});

/**
 * Function to navigate to the login page
 * Called when "New Build" or "Create a Build" buttons are clicked
 */
function navigateToLogin() {
    // Add a small delay for button animation to complete
    setTimeout(() => {
        // Navigate to the login page
        window.location.href = 'login.html';
    }, 200); // 200ms delay for smooth transition
}

/**
 * Initialize typing animation for the login page message
 * Creates a typewriter effect for the welcome message
 */
function initializeTypingAnimation() {
    // Get the typed message element
    const typedElement = document.getElementById('typed-text');
    
    // Only proceed if the element exists (we're on the login page)
    if (!typedElement) {
        return; // Exit if element not found
    }
    
    // Store the original message text
    const originalText = typedElement.textContent;
    
    // Clear the element to prepare for typing animation
    typedElement.textContent = '';
    
    // Make the element visible
    typedElement.style.opacity = '1';
    
    // Start the typing animation
    typeText(typedElement, originalText, 0);
}

/**
 * Recursive function to create typing effect
 * @param {Element} element - The element to type text into
 * @param {string} text - The full text to type
 * @param {number} index - Current character index
 */
function typeText(element, text, index) {
    // Base case: if we've typed all characters
    if (index >= text.length) {
        // Add a blinking cursor effect
        addBlinkingCursor(element);
        return; // Stop recursion
    }
    
    // Add the next character to the element
    element.textContent += text.charAt(index);
    
    // Calculate typing speed (random variation for natural effect)
    const baseSpeed = 50; // Base typing speed in milliseconds
    const variation = Math.random() * 30; // Random variation up to 30ms
    const typingSpeed = baseSpeed + variation;
    
    // Schedule the next character to be typed
    setTimeout(() => {
        typeText(element, text, index + 1);
    }, typingSpeed);
}

/**
 * Add a blinking cursor effect after typing is complete
 * @param {Element} element - The element to add cursor to
 */
function addBlinkingCursor(element) {
    // Create a cursor span element
    const cursor = document.createElement('span');
    cursor.textContent = '|'; // Pipe character as cursor
    cursor.style.animation = 'blink 1s infinite'; // CSS animation
    cursor.style.fontWeight = 'bold'; // Make cursor bold
    cursor.id = 'typing-cursor'; // Add ID for potential cleanup
    
    // Add cursor to the element
    element.appendChild(cursor);
    
    // Remove cursor after 3 seconds
    setTimeout(() => {
        if (cursor && cursor.parentNode) {
            cursor.remove(); // Clean up cursor
        }
    }, 3000);
}

/**
 * Add smooth scrolling behavior for anchor links
 * Improves user experience with smooth page navigation
 */
function addSmoothScrolling() {
    // Get all anchor links on the page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each anchor link
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent default jump behavior
            event.preventDefault();
            
            // Get the target element ID
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            // If target element exists, scroll to it smoothly
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Smooth scrolling animation
                    block: 'start' // Align to top of element
                });
            }
        });
    });
}

/**
 * Initialize form validation for the login form
 * Provides real-time feedback and validation
 */
function initializeFormValidation() {
    // Get the login form element
    const loginForm = document.querySelector('.login-form');
    
    // Only proceed if form exists (we're on login page)
    if (!loginForm) {
        return; // Exit if form not found
    }
    
    // Add form submission event listener
    loginForm.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Get form inputs
        const emailInput = this.querySelector('input[type="email"]');
        const passwordInput = this.querySelector('input[type="password"]');
        
        // Validate form inputs
        const isValid = validateForm(emailInput, passwordInput);
        
        // If form is valid, proceed with submission
        if (isValid) {
            handleFormSubmission(emailInput.value, passwordInput.value);
        }
    });
    
    // Add real-time validation for email input
    const emailInput = loginForm.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this); // Validate when user leaves field
        });
        
        emailInput.addEventListener('input', function() {
            clearValidationError(this); // Clear errors as user types
        });
    }
    
    // Add real-time validation for password input
    const passwordInput = loginForm.querySelector('input[type="password"]');
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            validatePassword(this); // Validate when user leaves field
        });
        
        passwordInput.addEventListener('input', function() {
            clearValidationError(this); // Clear errors as user types
        });
    }
}

/**
 * Validate the entire form
 * @param {Element} emailInput - Email input element
 * @param {Element} passwordInput - Password input element
 * @returns {boolean} - True if form is valid
 */
function validateForm(emailInput, passwordInput) {
    // Clear any existing errors
    clearValidationError(emailInput);
    clearValidationError(passwordInput);
    
    // Validate email and password
    const isEmailValid = validateEmail(emailInput);
    const isPasswordValid = validatePassword(passwordInput);
    
    // Return true only if both are valid
    return isEmailValid && isPasswordValid;
}

/**
 * Validate email input
 * @param {Element} emailInput - Email input element
 * @returns {boolean} - True if email is valid
 */
function validateEmail(emailInput) {
    const email = emailInput.value.trim();
    
    // Check if email is empty
    if (!email) {
        showValidationError(emailInput, 'Email is required');
        return false;
    }
    
    // Email regex pattern for validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if email matches pattern
    if (!emailPattern.test(email)) {
        showValidationError(emailInput, 'Please enter a valid email address');
        return false;
    }
    
    // Email is valid
    return true;
}

/**
 * Validate password input
 * @param {Element} passwordInput - Password input element
 * @returns {boolean} - True if password is valid
 */
function validatePassword(passwordInput) {
    const password = passwordInput.value;
    
    // Check if password is empty
    if (!password) {
        showValidationError(passwordInput, 'Password is required');
        return false;
    }
    
    // Check minimum password length
    if (password.length < 6) {
        showValidationError(passwordInput, 'Password must be at least 6 characters long');
        return false;
    }
    
    // Password is valid
    return true;
}

/**
 * Show validation error message
 * @param {Element} input - Input element with error
 * @param {string} message - Error message to display
 */
function showValidationError(input, message) {
    // Add error styling to input
    input.style.borderColor = '#ff4444'; // Red border for error
    input.style.backgroundColor = 'rgba(255, 68, 68, 0.1)'; // Light red background
    
    // Remove existing error message if any
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff4444'; // Red text
    errorElement.style.fontSize = '0.875rem'; // Smaller font
    errorElement.style.marginTop = '0.25rem'; // Small top margin
    errorElement.style.fontFamily = 'Roboto, sans-serif'; // Use body font
    
    // Insert error message after the input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

/**
 * Clear validation error styling and message
 * @param {Element} input - Input element to clear errors from
 */
function clearValidationError(input) {
    // Reset input styling
    input.style.borderColor = ''; // Remove custom border color
    input.style.backgroundColor = ''; // Remove custom background
    
    // Remove error message if it exists
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * Handle form submission after validation
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
function handleFormSubmission(email, password) {
    // Get the submit button
    const submitButton = document.querySelector('.signup-btn');
    
    // Show loading state
    if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Creating account...';
        submitButton.disabled = true; // Disable button during submission
        submitButton.style.opacity = '0.7'; // Visual feedback for disabled state
        
        // Simulate API call with timeout
        setTimeout(() => {
            // In a real application, you would make an API call here
            console.log('Creating account for:', email);
            
            // Show success message
            showSuccessMessage('Account created successfully!');
            
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            
            // Optionally redirect to dashboard or login page
            // window.location.href = 'index.html';
        }, 2000); // 2 second delay to simulate API call
    }
}

/**
 * Show success message to user
 * @param {string} message - Success message to display
 */
function showSuccessMessage(message) {
    // Create success notification element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // Style the success message
    successDiv.style.position = 'fixed';
    successDiv.style.top = '20px';
    successDiv.style.right = '20px';
    successDiv.style.backgroundColor = '#00ff88'; // Green background
    successDiv.style.color = 'white'; // White text
    successDiv.style.padding = '1rem 1.5rem';
    successDiv.style.borderRadius = '8px';
    successDiv.style.fontFamily = 'Roboto, sans-serif';
    successDiv.style.fontWeight = '500';
    successDiv.style.boxShadow = '0 4px 16px rgba(0, 255, 136, 0.3)';
    successDiv.style.zIndex = '1000'; // Ensure it's on top
    successDiv.style.transform = 'translateX(100%)'; // Start off-screen
    successDiv.style.transition = 'transform 0.3s ease';
    
    // Add to page
    document.body.appendChild(successDiv);
    
    // Animate in
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 300); // Wait for animation to complete
    }, 3000);
}

/**
 * Add keyboard navigation support for better accessibility
 */
function addKeyboardNavigation() {
    // Handle Enter key on buttons
    document.addEventListener('keydown', function(event) {
        // Check if Enter was pressed on a button
        if (event.key === 'Enter' && event.target.tagName === 'BUTTON') {
            event.target.click(); // Trigger click event
        }
        
        // Handle Escape key to close any open modals or notifications
        if (event.key === 'Escape') {
            // Close any success messages
            const successMessages = document.querySelectorAll('.success-message');
            successMessages.forEach(message => {
                if (message.parentNode) {
                    message.remove();
                }
            });
        }
    });
}

/**
 * Initialize accessibility features
 */
function initializeAccessibility() {
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Add ARIA labels for better screen reader support
    const newBuildBtn = document.querySelector('.new-build-btn');
    if (newBuildBtn) {
        newBuildBtn.setAttribute('aria-label', 'Create a new build project');
    }
    
    const createBuildBtn = document.querySelector('.create-build-btn');
    if (createBuildBtn) {
        createBuildBtn.setAttribute('aria-label', 'Start creating a new build');
    }
    
    // Add ARIA labels to form inputs
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.setAttribute('aria-label', 'Email address');
        emailInput.setAttribute('aria-required', 'true');
    }
    
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        passwordInput.setAttribute('aria-label', 'Password');
        passwordInput.setAttribute('aria-required', 'true');
    }
}

// Initialize accessibility features when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Add CSS animation for cursor blinking (defined in JavaScript for dynamic creation)
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Performance optimization: Preload the login page for faster navigation
function preloadLoginPage() {
    // Only preload if we're on the home page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Create a link element for preloading
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'prefetch'; // Prefetch the resource
        preloadLink.href = 'login.html'; // URL to prefetch
        
        // Add to document head
        document.head.appendChild(preloadLink);
    }
}

// Initialize preloading when DOM is ready
document.addEventListener('DOMContentLoaded', preloadLoginPage);

// Error handling for any uncaught errors
window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
    
    // In production, you might want to send this to an error reporting service
    // reportErrorToService(event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Prevent the default browser behavior of logging to console
    event.preventDefault();
});