// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.getElementById('backToTop');
const currentYear = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Form submission handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error sending your message. Please try again later.');
        }
    });
}

// Sticky header on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .about-content, .about-image, .contact-content, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Initial check on page load
window.addEventListener('load', animateOnScroll);

// Check on scroll
window.addEventListener('scroll', animateOnScroll);

// Add animation classes for services on scroll
const serviceCards = document.querySelectorAll('.service-card');
const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    servicesObserver.observe(card);
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class to all images
        img.classList.add('loading');
        
        // Remove loading class when image is loaded
        if (img.complete) {
            img.classList.remove('loading');
        } else {
            img.addEventListener('load', () => {
                img.classList.remove('loading');
            });
        }
    });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = `#${section.getAttribute('id')}`;
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        // Here you would typically send the email to your server
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            alert('There was an error subscribing to our newsletter. Please try again later.');
        }
    });
}
