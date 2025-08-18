document.addEventListener('DOMContentLoaded', function() {
    // Common functionality for both login and register pages
    
    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Register page specific functionality
    if (document.getElementById('registerForm')) {
        const registerForm = document.getElementById('registerForm');
        const passwordInput = document.getElementById('registerPassword');
        const confirmPasswordInput = document.getElementById('registerConfirmPassword');
        const strengthBar = document.querySelector('.password-strength .progress-bar');
        const strengthText = document.getElementById('strengthText');
        
        // Password strength indicator
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength += 1;
            if (password.length >= 12) strength += 1;
            
            // Character type checks
            if (/[A-Z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // Update UI
            const width = strength * 20;
            strengthBar.style.width = `${width}%`;
            
            // Update color and text
            if (strength <= 1) {
                strengthBar.className = 'progress-bar bg-danger';
                strengthText.textContent = 'Weak';
            } else if (strength <= 3) {
                strengthBar.className = 'progress-bar bg-warning';
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.className = 'progress-bar bg-success';
                strengthText.textContent = 'Strong';
            }
        });
        
        // Confirm password validation
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== passwordInput.value) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
        
        // Form submission
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Special password confirmation check
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.classList.add('is-invalid');
                isValid = false;
            }
            
            // Terms agreement check
            if (!document.getElementById('acceptTerms').checked) {
                document.getElementById('acceptTerms').classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would send the data to your backend
                const formData = {
                    email: document.getElementById('registerEmail').value,
                    username: document.getElementById('registerUsername').value,
                    password: passwordInput.value
                };
                
                console.log('Registration data:', formData);
                
                postData('/register',formData);
            }
        });
    }
    
    // Login page specific functionality
    if (document.getElementById('loginForm')) {
        const loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Here you would send the data to your backend
                const formData = {
                    email: document.getElementById('loginEmail').value,
                    password: document.getElementById('loginPassword').value,
                    rememberMe: document.getElementById('rememberMe').checked
                };
                
                console.log('Login data:', formData);
                
                postData('/login',formData);
            }
        });
    }
    
    // Social login buttons
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.textContent.trim().toLowerCase();
            alert(`Redirecting to ${provider} authentication...`);
            // In a real app, this would redirect to your OAuth endpoint
        });
    });
    async function postData(url, fordata) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(fordata),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          console.log(result);
          // Simulate successful login
          alert('Login successful! Redirecting to dashboard...');
          window.location.href = '/';
        } catch (error) {
          console.error('Error posting data:', error);
        }
      }
});