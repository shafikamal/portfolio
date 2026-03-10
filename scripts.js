// ========================================
// SCROLL NAVBAR EFFECT
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// FORM SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showAlert('Please fill out all fields', 'warning');
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'warning');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;

        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';

        // Simulate API call (in production, this would send to a backend)
        setTimeout(() => {
            showAlert('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }, 1500);
    });
}

// ========================================
// EMAIL VALIDATION
// ========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// ALERT NOTIFICATION
// ========================================

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Add to document
    const container = document.querySelector('.container');
    if (container) {
        container.insertAdjacentElement('beforebegin', alertDiv);
    } else {
        document.body.insertAdjacentElement('afterbegin', alertDiv);
    }

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
    }, 5000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (for future implementation)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Implement search functionality here
    }
});

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================

function updateFooterYear() {
    const yearElements = document.querySelectorAll('[data-year]');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateFooterYear);

// ========================================
// MOBILE MENU CLOSE ON LINK CLICK
// ========================================

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// ========================================
// LAZY LOADING IMAGES (FUTURE USE)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
