// ====================================
// HAMBURGER MENU FUNCTIONALITY
// ====================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ====================================
// SCROLL EFFECTS
// ====================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    }
    
    if (scrollIndicator) {
        scrollIndicator.style.opacity = Math.max(1 - window.scrollY / 200, 0);
    }
});

// ====================================
// ACTIVE MENU LINK
// ====================================
function updateActiveLink() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        if (currentPath.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

updateActiveLink();

// ====================================
// SMOOTH SCROLLING
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        const element = document.querySelector(id);
        
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// ====================================
// MENU FILTERING
// ====================================
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.animation = 'fadeIn 0.5s ease';
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Set first button as active
    if (filterBtns[0]) {
        filterBtns[0].classList.add('active');
    }
}

// Add fade-in animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeIn 0.8s ease forwards !important;
    }
`;
document.head.appendChild(style);

// ====================================
// FORM HANDLING
// ====================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Simple validation
        let isValid = true;
        const requiredFields = this.querySelectorAll('input[required], textarea[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff6b6b';
            } else {
                field.style.borderColor = '#E8D7C3';
            }
        });
        
        if (!isValid) {
            alert('Per favore compila tutti i campi richiesti');
            return;
        }
        
        // Check email format
        const email = this.querySelector('input[type="email"]');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                alert('Per favore inserisci un indirizzo email valido');
                email.style.borderColor = '#ff6b6b';
                return;
            }
        }
        
        // Show success message
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Messaggio inviato!';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #D2691E, #CD853F)';
        }, 3000);
    });
    
    // Remove error style on input
    this.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('focus', () => {
            field.style.borderColor = '#E8D7C3';
        });
    });
}

// ====================================
// PARALLAX EFFECT (OPTIONAL)
// ====================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    if (heroBackground && window.scrollY < window.innerHeight) {
        heroBackground.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// ====================================
// PAGE LOAD ANIMATION
// ====================================
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// ====================================
// RESPONSIVE MOBILE MENU CLOSE
// ====================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// ====================================
// LAZY LOADING FOR IMAGES (if needed)
// ====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// SMOOTH LINK NAVIGATION
// ====================================
document.querySelectorAll('a[href^="HTML/"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow normal navigation
        link.style.cursor = 'pointer';
    });
});

console.log('Cascina Rossino website loaded successfully!');
