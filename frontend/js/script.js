document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const loginSignupBtn = document.getElementById('login-signup-btn');
    const loginOption = document.getElementById('login-option');
    const signupOption = document.getElementById('signup-option');

    loginSignupBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
    });

    loginOption.addEventListener('click', () => {
        window.location.href = 'pages/login.html';
    });

    signupOption.addEventListener('click', () => {
        window.location.href = 'pages/signup.html';
    });

    // Close popup when clicking outside the popup content
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const loadingOverlay = document.getElementById('loading-overlay');

    submitBtn.addEventListener('click', () => {
        loadingOverlay.style.display = 'flex';
        setTimeout(() => {
            window.location.href = 'dashboard.html'; // Simulate return to dashboard
        }, 15000); // Return to dashboard after 15 seconds
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Login form submitted!');
            // Add AJAX call to submit login data here
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Signup form submitted!');
            // Add AJAX call to submit signup data here
        });
    }
});
