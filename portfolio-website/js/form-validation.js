// ====================================
// FORM VALIDATION - form-validation.js
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('.form-submit');
    const formMessage = document.getElementById('formMessage');
    
    // ====================================
    // VALIDATION FUNCTIONS
    // ====================================
    
    // Validate name (minimum 2 characters)
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    // Validate email using regex
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
    
    // Validate subject (minimum 3 characters)
    function validateSubject(subject) {
        return subject.trim().length >= 3;
    }
    
    // Validate message (minimum 10 characters)
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    // ====================================
    // UI FEEDBACK FUNCTIONS
    // ====================================
    
    function setError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.form-error');
        
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        
        if (errorDisplay && message) {
            errorDisplay.textContent = message;
        }
        
        // Add shake animation
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
    
    function setSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
    }
    
    function clearValidation(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.remove('success');
    }
    
    // ====================================
    // REAL-TIME VALIDATION
    // ====================================
    
    // Name validation
    nameInput.addEventListener('blur', function() {
        const name = this.value;
        if (name === '') {
            clearValidation(this);
        } else if (!validateName(name)) {
            setError(this, 'Name must be at least 2 characters');
        } else {
            setSuccess(this);
        }
    });
    
    nameInput.addEventListener('input', function() {
        if (this.parentElement.classList.contains('error')) {
            if (validateName(this.value)) {
                setSuccess(this);
            }
        }
    });
    
    // Email validation
    emailInput.addEventListener('blur', function() {
        const email = this.value;
        if (email === '') {
            clearValidation(this);
        } else if (!validateEmail(email)) {
            setError(this, 'Please enter a valid email address');
        } else {
            setSuccess(this);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.parentElement.classList.contains('error')) {
            if (validateEmail(this.value)) {
                setSuccess(this);
            }
        }
    });
    
    // Subject validation
    subjectInput.addEventListener('blur', function() {
        const subject = this.value;
        if (subject === '') {
            clearValidation(this);
        } else if (!validateSubject(subject)) {
            setError(this, 'Subject must be at least 3 characters');
        } else {
            setSuccess(this);
        }
    });
    
    subjectInput.addEventListener('input', function() {
        if (this.parentElement.classList.contains('error')) {
            if (validateSubject(this.value)) {
                setSuccess(this);
            }
        }
    });
    
    // Message validation
    messageInput.addEventListener('blur', function() {
        const message = this.value;
        if (message === '') {
            clearValidation(this);
        } else if (!validateMessage(message)) {
            setError(this, 'Message must be at least 10 characters');
        } else {
            setSuccess(this);
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (this.parentElement.classList.contains('error')) {
            if (validateMessage(this.value)) {
                setSuccess(this);
            }
        }
        
        // Character counter
        const charCount = this.value.length;
        const minChars = 10;
        if (charCount < minChars && charCount > 0) {
            const remaining = minChars - charCount;
            const errorDisplay = this.parentElement.querySelector('.form-error');
            if (errorDisplay) {
                errorDisplay.textContent = `${remaining} more characters required`;
                errorDisplay.style.display = 'block';
            }
        }
    });
    
    // ====================================
    // FORM SUBMISSION
    // ====================================
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
        
        // Get form values
        const name = nameInput.value;
        const email = emailInput.value;
        const subject = subjectInput.value;
        const message = messageInput.value;
        
        let isValid = true;
        
        // Validate all fields
        if (!validateName(name)) {
            setError(nameInput, 'Please enter your name');
            isValid = false;
        } else {
            setSuccess(nameInput);
        }
        
        if (!validateEmail(email)) {
            setError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            setSuccess(emailInput);
        }
        
        if (!validateSubject(subject)) {
            setError(subjectInput, 'Please enter a subject');
            isValid = false;
        } else {
            setSuccess(subjectInput);
        }
        
        if (!validateMessage(message)) {
            setError(messageInput, 'Please enter your message (minimum 10 characters)');
            isValid = false;
        } else {
            setSuccess(messageInput);
        }
        
        // If all validations pass
        if (isValid) {
            submitForm(name, email, subject, message);
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // ====================================
    // SUBMIT FORM DATA
    // ====================================
    
    function submitForm(name, email, subject, message) {
        // Disable submit button
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Simulate successful submission
            const success = true;
            
            if (success) {
                // Show success message
                formMessage.className = 'form-message success';
                formMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    Thank you, ${name}! Your message has been sent successfully. 
                    I'll get back to you soon.
                `;
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Clear all validation states
                [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                    clearValidation(input);
                });
                
                // Scroll to success message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
            } else {
                // Show error message
                formMessage.className = 'form-message error';
                formMessage.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    Oops! Something went wrong. Please try again later.
                `;
                formMessage.style.display = 'block';
            }
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            
        }, 2000); // Simulate network delay
    }
    
    // ====================================
    // PREVENT SPAM SUBMISSIONS
    // ====================================
    
    let lastSubmitTime = 0;
    const submitCooldown = 5000; // 5 seconds
    
    contactForm.addEventListener('submit', function(e) {
        const now = Date.now();
        if (now - lastSubmitTime < submitCooldown) {
            e.preventDefault();
            formMessage.className = 'form-message error';
            formMessage.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                Please wait a few seconds before submitting again.
            `;
            formMessage.style.display = 'block';
            return false;
        }
        lastSubmitTime = now;
    });
    
    // ====================================
    // AUTO-HIDE SUCCESS MESSAGE
    // ====================================
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('success')) {
                setTimeout(() => {
                    formMessage.style.transition = 'opacity 0.5s ease';
                    formMessage.style.opacity = '0';
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                        formMessage.style.opacity = '1';
                    }, 500);
                }, 5000); // Hide after 5 seconds
            }
        });
    });
    
    observer.observe(formMessage, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    console.log('Form validation initialized ✓');
});