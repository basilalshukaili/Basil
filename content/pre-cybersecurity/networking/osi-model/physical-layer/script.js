// Physical Layer Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    
    // Table responsiveness enhancement
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-container';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
    
    // Image modal functionality
    const contentImages = document.querySelectorAll('.content-image');
    contentImages.forEach(image => {
        image.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-modal';
            closeBtn.innerHTML = '&times;';
            
            modal.appendChild(closeBtn);
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Add modal styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .image-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1100;
                    padding: 20px;
                }
                .image-modal img {
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                }
                .close-modal {
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    color: white;
                    font-size: 40px;
                    font-weight: bold;
                    cursor: pointer;
                }
            `;
            document.head.appendChild(style);
            
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
        
        // Add cursor pointer to indicate clickable
        image.style.cursor = 'pointer';
    });
    
    // Add smooth scrolling to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add touch support for mobile devices
    addTouchSupport();
    
    // Functions
    function addTouchSupport() {
        // Add swipe detection for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 100;
            
            // Right swipe (open menu on mobile)
            if (touchEndX - touchStartX > swipeThreshold && window.innerWidth <= 992) {
                if (menu && !menu.classList.contains('active')) {
                    menu.classList.add('active');
                    if (hamburger) hamburger.classList.add('active');
                }
            }
            
            // Left swipe (close menu on mobile)
            if (touchStartX - touchEndX > swipeThreshold && window.innerWidth <= 992) {
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                }
            }
        }
    }
    
    // Add reading progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'reading-progress';
    document.body.appendChild(progressIndicator);
    
    // Add progress indicator styles
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 4px;
            background-color: #2563eb;
            z-index: 1001;
            transition: width 0.1s;
        }
    `;
    document.head.appendChild(progressStyle);
    
    // Update progress indicator on scroll
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressIndicator.style.width = progress + '%';
    });
});