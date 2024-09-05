document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Login form submitted!');
            // Add AJAX call to submit login data here
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signup-form');
    const popup = document.getElementById('popup');
    const proceedLoginBtn = document.getElementById('proceed-login-btn');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (popup) {
                popup.style.display = 'flex';
            }
        });
    }

    if (proceedLoginBtn) {
        proceedLoginBtn.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redirect to login page
        });
    }

    // Handle popup functionality if present
    if (popup) {
        const loginSignupBtn = document.getElementById('login-signup-btn');
        const loginOption = document.getElementById('login-option');
        const signupOption = document.getElementById('signup-option');

        if (loginSignupBtn) {
            loginSignupBtn.addEventListener('click', () => {
                popup.style.display = 'flex';
            });
        }

        if (loginOption) {
            loginOption.addEventListener('click', () => {
                window.location.href = 'pages/login.html';
            });
        }

        if (signupOption) {
            signupOption.addEventListener('click', () => {
                window.location.href = 'pages/signup.html';
            });
        }

        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    // Handle loading overlay functionality if present
    const submitBtn = document.getElementById('submit-btn');
    const loadingOverlay = document.getElementById('loading-overlay');
    if (submitBtn && loadingOverlay) {
        submitBtn.addEventListener('click', () => {
            loadingOverlay.style.display = 'flex';
            setTimeout(() => {
                window.location.href = 'dashboard.html'; // Simulate return to dashboard
            }, 15000); // Return to dashboard after 15 seconds
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Simulate login action
            window.location.href = 'home.html'; // Redirect to home page
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signup-form');
    const popup = document.getElementById('popup');
    const proceedLoginBtn = document.getElementById('proceed-login-btn');

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            popup.style.display = 'flex';
        });
    }

    if (proceedLoginBtn) {
        proceedLoginBtn.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redirect to login page
        });
    }

    // Handle popup functionality if present
    if (popup) {
        const loginSignupBtn = document.getElementById('login-signup-btn');
        const loginOption = document.getElementById('login-option');
        const signupOption = document.getElementById('signup-option');

        if (loginSignupBtn) {
            loginSignupBtn.addEventListener('click', () => {
                popup.style.display = 'flex';
            });
        }

        if (loginOption) {
            loginOption.addEventListener('click', () => {
                window.location.href = 'pages/login.html';
            });
        }

        if (signupOption) {
            signupOption.addEventListener('click', () => {
                window.location.href = 'pages/signup.html';
            });
        }

        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    // Handle loading overlay functionality if present
    const submitBtn = document.getElementById('submit-btn');
    const loadingOverlay = document.getElementById('loading-overlay');

    if (submitBtn && loadingOverlay) {
        submitBtn.addEventListener('click', () => {
            loadingOverlay.style.display = 'flex';
            setTimeout(() => {
                window.location.href = 'dashboard.html'; // Simulate return to dashboard
            }, 15000); // Return to dashboard after 15 seconds
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            window.location.href = 'home.html'; // Redirect to home page
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signup-form');
    const popup = document.getElementById('popup');
    const proceedLoginBtn = document.getElementById('proceed-login-btn');

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            popup.style.display = 'flex';
        });
    }

    proceedLoginBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to login page
    });

    // Close popup when clicking outside the popup content
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Handle loading overlay and submit button for code check
    const submitBtn = document.getElementById('submit-btn');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');

    if (submitBtn && loadingOverlay) {
        submitBtn.addEventListener('click', () => {
            loadingOverlay.style.display = 'flex';
            let step = 0;

            const messages = [
                'Checking our resources...',
                'Confirming Information...',
                'Results are in...'
            ];

            const interval = setInterval(() => {
                if (step < messages.length) {
                    loadingText.textContent = messages[step++];
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                        const result = Math.floor(Math.random() * 2);
                        const resultMessage = result === 0 ? 'Plagiarism Check Failed!!' : 'Plagiarism Check Passed!!';
                        alert(resultMessage);
                    }, 500); // Short delay before showing result
                }
            }, 5000); // Update message every 5 seconds
        });
    }
});
