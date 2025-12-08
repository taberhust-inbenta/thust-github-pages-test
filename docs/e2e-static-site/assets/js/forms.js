// Form handling (for display purposes only - no actual submission)
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formValues = {};
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Check if all required fields are filled
            const requiredFields = form.querySelectorAll('[required]');
            let allFilled = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allFilled = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!allFilled) {
                // Show error message
                showFormMessage(form, 'Please fill in all required fields.', 'error');
                return;
            }
            
            // Show success message (form is just for show)
            showFormMessage(form, 'Thank you for your message! Our team will get back to you soon.', 'success');
            
            // Reset form after a delay
            setTimeout(() => {
                form.reset();
                const message = form.querySelector('.form-message');
                if (message) {
                    message.remove();
                }
            }, 5000);
        });
        
        // Remove error styling on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });
});

function showFormMessage(form, message, type) {
    // Remove existing message if any
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Insert before submit button
    const submitButton = form.querySelector('.form-submit');
    if (submitButton) {
        submitButton.parentNode.insertBefore(messageDiv, submitButton);
    } else {
        form.appendChild(messageDiv);
    }
}

