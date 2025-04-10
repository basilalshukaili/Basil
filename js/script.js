// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar elements
    const categoryHeaders = document.querySelectorAll('.category-header');
    const subcategoryHeaders = document.querySelectorAll('.subcategory-header');
    const topicHeaders = document.querySelectorAll('.topic-header');
    const subtopicLinks = document.querySelectorAll('.subtopics a');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const startLearningBtn = document.getElementById('start-learning-btn');
    
    // Mobile sidebar toggle
    const sidebarToggle = document.createElement('div');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(sidebarToggle);
    
    // Content elements
    const contentSections = document.querySelectorAll('.content-section');
    const breadcrumbs = document.getElementById('breadcrumbs');
    
    // Menu elements
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const sidebar = document.querySelector('.sidebar');
    
    // Initialize sidebar state from localStorage if available
    initializeSidebarState();
    
    // Event Listeners
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Mobile sidebar toggle
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        
        // Change icon based on sidebar state
        if (sidebar.classList.contains('active')) {
            sidebarToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            // Check if click is outside sidebar and sidebar toggle
            if (!sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target) && 
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Category headers toggle
    categoryHeaders.forEach(header => {
        const toggleIcon = header.querySelector('.toggle-icon');
        const subcategories = header.nextElementSibling;
        
        header.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            toggleIcon.classList.toggle('active');
            subcategories.classList.toggle('active');
            
            // Save state to localStorage
            saveToggleState(header.parentElement);
        });
    });
    
    // Subcategory headers toggle
    subcategoryHeaders.forEach(header => {
        const toggleIcon = header.querySelector('.toggle-icon');
        const topics = header.nextElementSibling;
        
        header.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            toggleIcon.classList.toggle('active');
            topics.classList.toggle('active');
            
            // Save state to localStorage
            saveToggleState(header.parentElement);
        });
    });
    
    // Topic headers toggle
    topicHeaders.forEach(header => {
        const toggleIcon = header.querySelector('.toggle-icon');
        const subtopics = header.nextElementSibling;
        
        header.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            toggleIcon.classList.toggle('active');
            subtopics.classList.toggle('active');
            
            // Save state to localStorage
            saveToggleState(header.parentElement);
        });
    });
    
    // Subtopic links click
    subtopicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            
            // Remove active class from all links
            subtopicLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get content ID
            const contentId = this.getAttribute('data-content');
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected content section
            const selectedContent = document.getElementById(contentId);
            if (selectedContent) {
                selectedContent.classList.add('active');
                
                // Update breadcrumbs
                updateBreadcrumbs(this);
                
                // Save last viewed content to localStorage
                localStorage.setItem('lastViewedContent', contentId);
            } else {
                // If content doesn't exist, show template with appropriate ID
                const templateContent = document.getElementById('content-template').cloneNode(true);
                templateContent.id = contentId;
                templateContent.classList.add('active');
                templateContent.classList.remove('template');
                
                // Set title based on link text
                const title = this.textContent;
                templateContent.querySelector('h1').textContent = title;
                
                // Append to content container
                document.getElementById('content-container').appendChild(templateContent);
                
                // Update breadcrumbs
                updateBreadcrumbs(this);
                
                // Save last viewed content to localStorage
                localStorage.setItem('lastViewedContent', contentId);
            }
            
            // On mobile, close sidebar after selection
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
                sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Scroll to top of content
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Start Learning button click
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            // Expand Pre-Cybersecurity category
            const preCyberHeader = document.querySelector('.main-categories > li:first-child > .category-header');
            const preCyberToggle = preCyberHeader.querySelector('.toggle-icon');
            const preCyberSubcategories = preCyberHeader.nextElementSibling;
            
            preCyberToggle.classList.add('active');
            preCyberSubcategories.classList.add('active');
            
            // Expand Networking subcategory
            const networkingHeader = preCyberSubcategories.querySelector('li:first-child > .subcategory-header');
            const networkingToggle = networkingHeader.querySelector('.toggle-icon');
            const networkingTopics = networkingHeader.nextElementSibling;
            
            networkingToggle.classList.add('active');
            networkingTopics.classList.add('active');
            
            // Expand OSI Model topic
            const osiHeader = networkingTopics.querySelector('li:first-child > .topic-header');
            const osiToggle = osiHeader.querySelector('.toggle-icon');
            const osiSubtopics = osiHeader.nextElementSibling;
            
            osiToggle.classList.add('active');
            osiSubtopics.classList.add('active');
            
            // Click on Physical Layer
            const physicalLayerLink = osiSubtopics.querySelector('li:first-child > a');
            physicalLayerLink.click();
            
            // Save states to localStorage
            saveToggleState(preCyberHeader.parentElement);
            saveToggleState(networkingHeader.parentElement);
            saveToggleState(osiHeader.parentElement);
            
            // On mobile, ensure sidebar is visible
            if (window.innerWidth <= 992) {
                sidebar.classList.add('active');
                sidebarToggle.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Load last viewed content if available
    loadLastViewedContent();
    
    // Add touch event listeners for better mobile experience
    addTouchSupport();
    
    // Functions
    
    // Update breadcrumbs based on selected link
    function updateBreadcrumbs(link) {
        const topic = findParentWithClass(link, 'topics').previousElementSibling.querySelector('.topic-name').textContent;
        const subcategory = findParentWithClass(link, 'subcategories').previousElementSibling.querySelector('.subcategory-name').textContent;
        const category = findParentWithClass(link, 'main-categories').querySelector('.category-name').textContent;
        
        breadcrumbs.innerHTML = `
            <span class="breadcrumb-item">Home</span>
            <span class="breadcrumb-item">${category}</span>
            <span class="breadcrumb-item">${subcategory}</span>
            <span class="breadcrumb-item">${topic}</span>
            <span class="breadcrumb-item">${link.textContent}</span>
        `;
    }
    
    // Find parent element with specific class
    function findParentWithClass(element, className) {
        let parent = element.parentElement;
        while (parent && !parent.classList.contains(className)) {
            parent = parent.parentElement;
        }
        return parent;
    }
    
    // Perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            alert('Please enter at least 2 characters to search');
            return;
        }
        
        // Clear previous search highlights
        const previousHighlights = document.querySelectorAll('.search-highlight');
        previousHighlights.forEach(el => {
            el.classList.remove('search-highlight');
        });
        
        // Search in subtopic links
        let results = [];
        subtopicLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                results.push(link);
                link.classList.add('search-highlight');
            }
        });
        
        if (results.length > 0) {
            // Expand all parent categories of search results
            results.forEach(result => {
                const subtopics = findParentWithClass(result, 'subtopics');
                const topic = findParentWithClass(result, 'topics');
                const subcategory = findParentWithClass(result, 'subcategories');
                
                subtopics.classList.add('active');
                subtopics.previousElementSibling.querySelector('.toggle-icon').classList.add('active');
                
                topic.classList.add('active');
                topic.previousElementSibling.querySelector('.toggle-icon').classList.add('active');
                
                subcategory.classList.add('active');
                subcategory.previousElementSibling.querySelector('.toggle-icon').classList.add('active');
            });
            
            // On mobile, ensure sidebar is visible
            if (window.innerWidth <= 992) {
                sidebar.classList.add('active');
                sidebarToggle.innerHTML = '<i class="fas fa-times"></i>';
            }
            
            // Scroll to first result
            results[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add search results count to search input placeholder
            searchInput.placeholder = `Found ${results.length} results`;
            
            // Highlight first result more prominently
            results[0].style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
            
            // Auto-click first result after a short delay
            setTimeout(() => {
                results[0].click();
            }, 800);
        } else {
            searchInput.placeholder = 'No results found';
        }
        
        // Reset placeholder after 3 seconds
        setTimeout(() => {
            searchInput.placeholder = 'Search topics...';
        }, 3000);
    }
    
    // Save toggle state to localStorage
    function saveToggleState(element) {
        const id = element.id || generateId(element);
        element.id = id;
        
        const isActive = element.querySelector('ul').classList.contains('active');
        localStorage.setItem(`toggle_${id}`, isActive);
    }
    
    // Generate unique ID for element
    function generateId(element) {
        const path = getElementPath(element);
        return 'elem_' + btoa(path).replace(/=/g, '');
    }
    
    // Get element path for ID generation
    function getElementPath(element) {
        let path = '';
        let current = element;
        
        while (current && current !== document.body) {
            let index = 0;
            let sibling = current;
            
            while (sibling) {
                if (sibling.nodeName === current.nodeName) {
                    index++;
                }
                sibling = sibling.previousElementSibling;
            }
            
            path = `${current.nodeName}:${index}/${path}`;
            current = current.parentElement;
        }
        
        return path;
    }
    
    // Initialize sidebar state from localStorage
    function initializeSidebarState() {
        // First assign IDs to all toggle elements
        document.querySelectorAll('.main-categories li').forEach(li => {
            if (!li.id) {
                li.id = generateId(li);
            }
        });
        
        // Then restore states
        document.querySelectorAll('.main-categories li').forEach(li => {
            const storedState = localStorage.getItem(`toggle_${li.id}`);
            
            if (storedState === 'true') {
                const toggleList = li.querySelector('ul');
                const toggleIcon = li.querySelector('.toggle-icon');
                
                if (toggleList && toggleIcon) {
                    toggleList.classList.add('active');
                    toggleIcon.classList.add('active');
                }
            }
        });
    }
    
    // Load last viewed content
    function loadLastViewedContent() {
        const lastContentId = localStorage.getItem('lastViewedContent');
        
        if (lastContentId) {
            const contentLink = document.querySelector(`a[data-content="${lastContentId}"]`);
            
            if (contentLink) {
                // Expand all parent categories
                const subtopics = findParentWithClass(contentLink, 'subtopics');
                const topic = findParentWithClass(contentLink, 'topics');
                const subcategory = findParentWithClass(contentLink, 'subcategories');
                
                subtopics.classList.add('active');
                subtopics.previousElementSibling.querySelector('.toggle-icon').classList.add('active');
                
                topic.classList.add('active');
                topic.previousElementSibling.querySelector('.toggle-icon').classList.add('active');
                
                subcategory.classList.add('active');
                subcategory.previousElementSibling.querySelector('.toggle-icon').classList.add('active');
                
                // Click the content link
                contentLink.click();
            }
        }
    }
    
    // Add touch support for better mobile experience
    function addTouchSupport() {
        // Add touch feedback
        const touchElements = document.querySelectorAll('.category-header, .subcategory-header, .topic-header, .subtopics a, .btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            });
            
            element.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
            
            element.addEventListener('touchcancel', function() {
                this.style.opacity = '1';
            });
        });
        
        // Improve scrolling in sidebar
        sidebar.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: true });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu and sidebar when resizing to desktop
        if (window.innerWidth > 992) {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
    
    // Add swipe gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 100; // Minimum distance for swipe
        
        // Right swipe (open sidebar)
        if (touchEndX - touchStartX > swipeThreshold && window.innerWidth <= 992) {
            sidebar.classList.add('active');
            sidebarToggle.innerHTML = '<i class="fas fa-times"></i>';
        }
        
        // Left swipe (close sidebar)
        if (touchStartX - touchEndX > swipeThreshold && window.innerWidth <= 992) {
            sidebar.classList.remove('active');
            sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});
