// DOM Elements
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.menu a');
const skillLevels = document.querySelectorAll('.skill-level');
const sections = document.querySelectorAll('section');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    skillLevels.forEach(skill => {
        const skillPosition = skill.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillPosition < screenPosition) {
            skill.style.width = skill.style.width;
        } else {
            skill.style.width = '0';
        }
    });
}

// Scroll to section when clicking on nav links (for index.html)
if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Sticky header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
    
    // Animate skill bars on scroll
    animateSkillBars();
    
    // Highlight active section in navigation
    highlightActiveSection();
});

// Highlight active section in navigation
function highlightActiveSection() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .skill-category, .stat-item, .contact-item, .social-link, .placeholder-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Add animation class
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    setTimeout(() => {
        animateSkillBars();
        animateOnScroll();
        highlightActiveSection();
    }, 300);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .skill-category, .stat-item, .contact-item, .social-link, .placeholder-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        .sticky {
            padding: 10px 0;
            background-color: rgba(255, 255, 255, 0.98);
        }
    `;
    document.head.appendChild(style);
    
    // Add scroll event for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Typing effect for hero section (index.html only)
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        const heroText = document.querySelector('.hero-text h2');
        if (heroText) {
            const text = heroText.textContent;
            heroText.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
});

// Smooth scroll to top when clicking logo
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero, .learn-hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Add counter animation for stat numbers
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const animateCounter = (element, target) => {
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = duration / target;
        
        const counter = setInterval(() => {
            count++;
            element.textContent = count + '+';
            
            if (count >= target) {
                clearInterval(counter);
            }
        }, interval);
    };
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}
