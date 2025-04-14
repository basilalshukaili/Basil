// Main application JavaScript for Cybersecurity Skills Galaxy

// Global variables
let skillsData;
let galaxyCanvas;
let galaxyContext;
let skillNodes = [];
let selectedSkill = null;
let zoomLevel = 1;
let panOffset = { x: 0, y: 0 };
let isDragging = false;
let lastMousePos = { x: 0, y: 0 };
let animationFrameId;

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load the skills data
    skillsData = JSON.parse(localStorage.getItem('cyberskills_data'));
    
    // If no data in localStorage, use the default data and save it
    if (!skillsData) {
        skillsData = window.skillsData || {};
        saveData();
    }
    
    // Check if the user has completed the specified skill
    checkPreCybersecurityNetworkingOsiPhysicalLayer();
    
    // Initialize the UI
    initUI();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize the galaxy visualization if on galaxy page
    if (document.getElementById('galaxy-canvas')) {
        initGalaxy();
    }
    
    // Update all progress indicators
    updateAllProgress();
    
    // Set the journey start date if on tracker page
    const journeyStartDateElement = document.getElementById('journey-start-date');
    if (journeyStartDateElement) {
        journeyStartDateElement.textContent = formatDate(skillsData.user.startDate);
    }
    
    // Initialize charts if on progress tracker page
    if (document.getElementById('category-progress-chart')) {
        initCharts();
    }
});

// Check if the user has completed the Pre-Cybersecurity -> Networking -> OSI Model -> Physical Layer skill
function checkPreCybersecurityNetworkingOsiPhysicalLayer() {
    // If data is not yet loaded, return
    if (!skillsData || !skillsData.categories) return;
    
    // Find the skill and mark it as completed if not already
    const networkingCategory = skillsData.categories[0].subcategories.find(sub => sub.id === "1.1");
    if (networkingCategory) {
        const osiModel = networkingCategory.skills.find(skill => skill.id === "1.1.1");
        if (osiModel && osiModel.subskills) {
            const physicalLayer = osiModel.subskills.find(subskill => subskill.id === "1.1.1.1");
            if (physicalLayer && !physicalLayer.completed) {
                physicalLayer.completed = true;
                physicalLayer.completedOn = new Date().toISOString();
                
                // Add to user's completed skills
                if (!skillsData.user.completedSkills.some(s => s.id === physicalLayer.id)) {
                    skillsData.user.completedSkills.push({
                        id: physicalLayer.id,
                        name: physicalLayer.name,
                        category: "Pre-Cybersecurity Fundamentals > Networking > OSI Model",
                        completedOn: physicalLayer.completedOn
                    });
                }
                
                // Save the updated data
                saveData();
            }
        }
    }
}

// Initialize the UI components
function initUI() {
    // Set user name
    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = skillsData.user.name;
    });
    
    // Initialize category cards if they exist
    initCategoryCards();
}

// Set up event listeners
function setupEventListeners() {
    // Galaxy view event listeners
    const galaxyCanvas = document.getElementById('galaxy-canvas');
    if (galaxyCanvas) {
        galaxyCanvas.addEventListener('mousedown', handleCanvasMouseDown);
        galaxyCanvas.addEventListener('mousemove', handleCanvasMouseMove);
        galaxyCanvas.addEventListener('mouseup', handleCanvasMouseUp);
        galaxyCanvas.addEventListener('wheel', handleCanvasWheel);
        galaxyCanvas.addEventListener('click', handleCanvasClick);
        
        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', function() {
            zoomGalaxy(0.1);
        });
        
        document.getElementById('zoom-out').addEventListener('click', function() {
            zoomGalaxy(-0.1);
        });
        
        document.getElementById('reset-view').addEventListener('click', resetGalaxyView);
    }
    
    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterGalaxyByCategory(this.value);
        });
    }
    
    // Search bar
    const searchBar = document.querySelector('.search-bar input');
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            searchSkills(this.value);
        });
    }
    
    // Skill panel close button
    const closePanel = document.querySelector('.close-panel');
    if (closePanel) {
        closePanel.addEventListener('click', function() {
            document.querySelector('.skill-details-panel').classList.remove('active');
        });
    }
    
    // Mark complete/incomplete buttons
    const markCompleteBtn = document.getElementById('mark-complete');
    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', function() {
            if (selectedSkill) {
                markSkillComplete(selectedSkill.id);
            }
        });
    }
    
    const markIncompleteBtn = document.getElementById('mark-incomplete');
    if (markIncompleteBtn) {
        markIncompleteBtn.addEventListener('click', function() {
            if (selectedSkill) {
                markSkillIncomplete(selectedSkill.id);
            }
        });
    }
    
    // Modal close button
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('skill-modal').classList.remove('active');
        });
    }
    
    // Modal mark complete/incomplete buttons
    const modalMarkCompleteBtn = document.getElementById('modal-mark-complete');
    if (modalMarkCompleteBtn) {
        modalMarkCompleteBtn.addEventListener('click', function() {
            const skillId = document.getElementById('modal-skill-id').textContent;
            markSkillComplete(skillId);
            document.getElementById('skill-modal').classList.remove('active');
        });
    }
    
    const modalMarkIncompleteBtn = document.getElementById('modal-mark-incomplete');
    if (modalMarkIncompleteBtn) {
        modalMarkIncompleteBtn.addEventListener('click', function() {
            const skillId = document.getElementById('modal-skill-id').textContent;
            markSkillIncomplete(skillId);
            document.getElementById('skill-modal').classList.remove('active');
        });
    }
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            window.location.href = 'galaxy.html?category=' + categoryId;
        });
    });
    
    // Explore buttons
    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryId = this.getAttribute('data-category');
            window.location.href = 'galaxy.html?category=' + categoryId;
        });
    });
}

// Initialize the galaxy visualization
function initGalaxy() {
    galaxyCanvas = document.getElementById('galaxy-canvas');
    if (!galaxyCanvas) return;
    
    galaxyContext = galaxyCanvas.getContext('2d');
    
    // Set canvas dimensions
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create skill nodes
    createSkillNodes();
    
    // Check for category filter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        filterGalaxyByCategory(categoryParam);
        
        // Update category filter dropdown if it exists
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = categoryParam;
        }
    }
    
    // Start animation loop
    animateGalaxy();
}

// Resize canvas to fit container
function resizeCanvas() {
    const container = galaxyCanvas.parentElement;
    galaxyCanvas.width = container.clientWidth;
    galaxyCanvas.height = container.clientHeight;
    
    // Redraw galaxy after resize
    drawGalaxy();
}

// Create skill nodes from data
function createSkillNodes() {
    skillNodes = [];
    
    if (!skillsData || !skillsData.categories) return;
    
    // Create nodes for each category
    skillsData.categories.forEach((category, categoryIndex) => {
        // Category node (planet)
        const categoryNode = {
            id: category.id.toString(),
            name: category.name,
            type: 'category',
            x: Math.cos(categoryIndex * (Math.PI * 2 / skillsData.categories.length)) * 300,
            y: Math.sin(categoryIndex * (Math.PI * 2 / skillsData.categories.length)) * 300,
            radius: 30,
            color: getCategoryColor(categoryIndex),
            progress: category.progress,
            orbitSpeed: 0.0001,
            orbitAngle: categoryIndex * (Math.PI * 2 / skillsData.categories.length)
        };
        skillNodes.push(categoryNode);
        
        // Subcategory nodes
        if (category.subcategories) {
            category.subcategories.forEach((subcategory, subIndex) => {
                const distance = 120;
                const angle = subIndex * (Math.PI * 2 / category.subcategories.length);
                
                const subcategoryNode = {
                    id: subcategory.id,
                    name: subcategory.name,
                    type: 'subcategory',
                    parentId: category.id.toString(),
                    x: categoryNode.x + Math.cos(angle) * distance,
                    y: categoryNode.y + Math.sin(angle) * distance,
                    radius: 15,
                    color: getCategoryColor(categoryIndex, 0.8),
                    progress: subcategory.progress,
                    orbitSpeed: 0.0005,
                    orbitAngle: angle,
                    orbitRadius: distance,
                    orbitCenter: { x: categoryNode.x, y: categoryNode.y }
                };
                skillNodes.push(subcategoryNode);
                
                // Skill nodes
                if (subcategory.skills) {
                    subcategory.skills.forEach((skill, skillIndex) => {
                        const skillDistance = 70;
                        const skillAngle = skillIndex * (Math.PI * 2 / subcategory.skills.length);
                        
                        const skillNode = {
                            id: skill.id,
                            name: skill.name,
                            type: 'skill',
                            parentId: subcategory.id,
                            description: skill.description,
                            x: subcategoryNode.x + Math.cos(skillAngle) * skillDistance,
                            y: subcategoryNode.y + Math.sin(skillAngle) * skillDistance,
                            radius: 8,
                            color: getSkillColor(skill),
                            completed: skill.completed,
                            progress: skill.progress,
                            orbitSpeed: 0.001,
                            orbitAngle: skillAngle,
                            orbitRadius: skillDistance,
                            orbitCenter: { x: subcategoryNode.x, y: subcategoryNode.y }
                        };
                        skillNodes.push(skillNode);
                        
                        // Subskill nodes
                        if (skill.subskills) {
                            skill.subskills.forEach((subskill, subskillIndex) => {
                                const subskillDistance = 40;
                                const subskillAngle = subskillIndex * (Math.PI * 2 / skill.subskills.length);
                                
                                const subskillNode = {
                                    id: subskill.id,
                                    name: subskill.name,
                                    type: 'subskill',
                                    parentId: skill.id,
                                    description: subskill.description,
                                    x: skillNode.x + Math.cos(subskillAngle) * subskillDistance,
                                    y: skillNode.y + Math.sin(subskillAngle) * subskillDistance,
                                    radius: 5,
                                    color: getSkillColor(subskill),
                                    completed: subskill.completed,
                                    orbitSpeed: 0.002,
                                    orbitAngle: subskillAngle,
                                    orbitRadius: subskillDistance,
                                    orbitCenter: { x: skillNode.x, y: skillNode.y }
                                };
                                skillNodes.push(subskillNode);
                            });
                        }
                    });
                }
            });
        }
    });
}

// Animate the galaxy
function animateGalaxy() {
    // Update node positions
    updateNodes();
    
    // Draw the galaxy
    drawGalaxy();
    
    // Continue animation loop
    animationFrameId = requestAnimationFrame(animateGalaxy);
}

// Update node positions
function updateNodes() {
    skillNodes.forEach(node => {
        if (node.type !== 'category' && node.orbitCenter) {
            // Update orbit angle
            node.orbitAngle += node.orbitSpeed;
            
            // Calculate new position
            node.x = node.orbitCenter.x + Math.cos(node.orbitAngle) * node.orbitRadius;
            node.y = node.orbitCenter.y + Math.sin(node.orbitAngle) * node.orbitRadius;
        }
    });
}

// Draw the galaxy
function drawGalaxy() {
    // Clear canvas
    galaxyContext.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
    
    // Set transform for zoom and pan
    galaxyContext.save();
    galaxyContext.translate(galaxyCanvas.width / 2 + panOffset.x, galaxyCanvas.height / 2 + panOffset.y);
    galaxyContext.scale(zoomLevel, zoomLevel);
    
    // Draw connections
    drawConnections();
    
    // Draw nodes
    drawNodes();
    
    // Restore transform
    galaxyContext.restore();
}

// Draw connections between nodes
function drawConnections() {
    // Draw orbits
    skillNodes.forEach(node => {
        if (node.type !== 'category' && node.orbitCenter) {
            galaxyContext.beginPath();
            galaxyContext.arc(node.orbitCenter.x, node.orbitCenter.y, node.orbitRadius, 0, Math.PI * 2);
            galaxyContext.strokeStyle = `rgba(255, 255, 255, 0.1)`;
            galaxyContext.stroke();
        }
    });
    
    // Draw connections between related nodes
    skillNodes.forEach(node => {
        if (node.parentId) {
            const parentNode = skillNodes.find(n => n.id === node.parentId);
            if (parentNode) {
                galaxyContext.beginPath();
                galaxyContext.moveTo(node.x, node.y);
                galaxyContext.lineTo(parentNode.x, parentNode.y);
                galaxyContext.strokeStyle = `rgba(255, 255, 255, 0.2)`;
                galaxyContext.stroke();
            }
        }
    });
}

// Draw all nodes
function drawNodes() {
    // Draw nodes in reverse order so larger nodes appear behind smaller ones
    for (let i = skillNodes.length - 1; i >= 0; i--) {
        const node = skillNodes[i];
        
        // Draw glow effect for completed nodes
        if (node.completed) {
            galaxyContext.beginPath();
            galaxyContext.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
            const gradient = galaxyContext.createRadialGradient(
                node.x, node.y, node.radius,
                node.x, node.y, node.radius * 1.5
            );
            gradient.addColorStop(0, `rgba(76, 175, 80, 0.8)`);
            gradient.addColorStop(1, `rgba(76, 175, 80, 0)`);
            galaxyContext.fillStyle = gradient;
            galaxyContext.fill();
        }
        
        // Draw node
        galaxyContext.beginPath();
        galaxyContext.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        // Fill with color
        if (node.type === 'category') {
            // Create gradient for category nodes
            const gradient = galaxyContext.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius
            );
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, adjustColorBrightness(node.color, -30));
            galaxyContext.fillStyle = gradient;
        } else {
            galaxyContext.fillStyle = node.color;
        }
        galaxyContext.fill();
        
        // Draw border
        galaxyContext.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        galaxyContext.lineWidth = 1;
        galaxyContext.stroke();
        
        // Draw progress indicator for category and subcategory nodes
        if ((node.type === 'category' || node.type === 'subcategory') && node.progress > 0) {
            galaxyContext.beginPath();
            galaxyContext.arc(node.x, node.y, node.radius, -Math.PI / 2, -Math.PI / 2 + (node.progress / 100) * (Math.PI * 2));
            galaxyContext.strokeStyle = 'rgba(76, 175, 80, 0.8)';
            galaxyContext.lineWidth = 3;
            galaxyContext.stroke();
        }
        
        // Draw label for category nodes
        if (node.type === 'category') {
            galaxyContext.fillStyle = 'rgba(255, 255, 255, 0.8)';
            galaxyContext.font = '12px Arial';
            galaxyContext.textAlign = 'center';
            galaxyContext.textBaseline = 'middle';
            
            // Position text below node
            const textY = node.y + node.radius + 15;
            galaxyContext.fillText(node.name, node.x, textY);
        }
    }
}

// Handle mouse down on canvas
function handleCanvasMouseDown(e) {
    isDragging = true;
    lastMousePos = {
        x: e.clientX,
        y: e.clientY
    };
    galaxyCanvas.style.cursor = 'grabbing';
}

// Handle mouse move on canvas
function handleCanvasMouseMove(e) {
    // Show tooltip on hover
    const rect = galaxyCanvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / zoomLevel - galaxyCanvas.width / (2 * zoomLevel) - panOffset.x / zoomLevel;
    const mouseY = (e.clientY - rect.top) / zoomLevel - galaxyCanvas.height / (2 * zoomLevel) - panOffset.y / zoomLevel;
    
    // Find node under cursor
    const hoveredNode = findNodeAtPosition(mouseX, mouseY);
    
    const tooltip = document.getElementById('skill-tooltip');
    if (hoveredNode && hoveredNode.type !== 'category') {
        tooltip.classList.remove('hidden');
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
        
        // Set tooltip content
        document.querySelector('.tooltip-title').textContent = hoveredNode.name;
        
        let categoryText = '';
        if (hoveredNode.type === 'subcategory') {
            const parentNode = skillNodes.find(n => n.id === hoveredNode.parentId);
            if (parentNode) {
                categoryText = parentNode.name;
            }
        } else if (hoveredNode.type === 'skill') {
            const parentNode = skillNodes.find(n => n.id === hoveredNode.parentId);
            if (parentNode) {
                const grandparentNode = skillNodes.find(n => n.id === parentNode.parentId);
                if (grandparentNode) {
                    categoryText = `${grandparentNode.name} > ${parentNode.name}`;
                }
            }
        } else if (hoveredNode.type === 'subskill') {
            const parentNode = skillNodes.find(n => n.id === hoveredNode.parentId);
            if (parentNode) {
                const grandparentNode = skillNodes.find(n => n.id === parentNode.parentId);
                if (grandparentNode) {
                    const greatGrandparentNode = skillNodes.find(n => n.id === grandparentNode.parentId);
                    if (greatGrandparentNode) {
                        categoryText = `${greatGrandparentNode.name} > ${grandparentNode.name} > ${parentNode.name}`;
                    }
                }
            }
        }
        
        document.querySelector('.tooltip-category').textContent = categoryText;
    } else {
        tooltip.classList.add('hidden');
    }
    
    // Pan the galaxy when dragging
    if (isDragging) {
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;
        
        panOffset.x += deltaX;
        panOffset.y += deltaY;
        
        lastMousePos = {
            x: e.clientX,
            y: e.clientY
        };
    }
}

// Handle mouse up on canvas
function handleCanvasMouseUp() {
    isDragging = false;
    galaxyCanvas.style.cursor = 'grab';
}

// Handle mouse wheel on canvas
function handleCanvasWheel(e) {
    e.preventDefault();
    
    // Determine zoom direction
    const zoomAmount = e.deltaY > 0 ? -0.1 : 0.1;
    
    zoomGalaxy(zoomAmount);
}

// Zoom the galaxy
function zoomGalaxy(amount) {
    // Calculate new zoom level
    const newZoomLevel = Math.max(0.5, Math.min(3, zoomLevel + amount));
    
    // Apply zoom
    zoomLevel = newZoomLevel;
}

// Reset galaxy view
function resetGalaxyView() {
    zoomLevel = 1;
    panOffset = { x: 0, y: 0 };
}

// Handle click on canvas
function handleCanvasClick(e) {
    const rect = galaxyCanvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / zoomLevel - galaxyCanvas.width / (2 * zoomLevel) - panOffset.x / zoomLevel;
    const mouseY = (e.clientY - rect.top) / zoomLevel - galaxyCanvas.height / (2 * zoomLevel) - panOffset.y / zoomLevel;
    
    // Find node under cursor
    const clickedNode = findNodeAtPosition(mouseX, mouseY);
    
    if (clickedNode) {
        if (clickedNode.type === 'skill' || clickedNode.type === 'subskill') {
            // Show skill details panel
            showSkillDetails(clickedNode);
        } else if (clickedNode.type === 'subcategory') {
            // Filter to show only skills in this subcategory
            filterGalaxyBySubcategory(clickedNode.id);
        } else if (clickedNode.type === 'category') {
            // Filter to show only skills in this category
            filterGalaxyByCategory(clickedNode.id);
        }
    }
}

// Find node at position
function findNodeAtPosition(x, y) {
    // Check in reverse order to prioritize smaller nodes that are drawn on top
    for (let i = 0; i < skillNodes.length; i++) {
        const node = skillNodes[i];
        const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
        
        if (distance <= node.radius) {
            return node;
        }
    }
    
    return null;
}

// Show skill details in panel
function showSkillDetails(node) {
    selectedSkill = node;
    
    // Set skill details
    document.getElementById('skill-name').textContent = node.name;
    document.getElementById('skill-id').textContent = node.id;
    document.getElementById('skill-description').textContent = node.description || 'No description available.';
    
    // Set skill status
    const statusElement = document.getElementById('skill-status');
    statusElement.textContent = node.completed ? 'Completed' : 'Not Started';
    statusElement.className = 'status-value' + (node.completed ? ' completed' : '');
    
    // Set prerequisites
    const prerequisitesList = document.getElementById('prerequisites-list');
    prerequisitesList.innerHTML = '';
    
    // Find skill data to get prerequisites
    let skillData;
    if (node.type === 'skill') {
        // Find the subcategory
        const subcategory = skillsData.categories
            .flatMap(cat => cat.subcategories)
            .find(sub => sub.id === node.parentId);
        
        if (subcategory) {
            // Find the skill
            skillData = subcategory.skills.find(skill => skill.id === node.id);
        }
    } else if (node.type === 'subskill') {
        // Find the parent skill
        const parentSkillNode = skillNodes.find(n => n.id === node.parentId);
        if (parentSkillNode) {
            // Find the subcategory
            const subcategory = skillsData.categories
                .flatMap(cat => cat.subcategories)
                .find(sub => sub.id === parentSkillNode.parentId);
            
            if (subcategory) {
                // Find the skill
                const parentSkill = subcategory.skills.find(skill => skill.id === parentSkillNode.id);
                if (parentSkill && parentSkill.subskills) {
                    // Find the subskill
                    skillData = parentSkill.subskills.find(subskill => subskill.id === node.id);
                }
            }
        }
    }
    
    // Display prerequisites
    if (skillData && skillData.prerequisites && skillData.prerequisites.length > 0) {
        skillData.prerequisites.forEach(prereqId => {
            const prereqNode = skillNodes.find(n => n.id === prereqId);
            if (prereqNode) {
                const li = document.createElement('li');
                li.textContent = prereqNode.name;
                if (prereqNode.completed) {
                    li.classList.add('completed');
                }
                prerequisitesList.appendChild(li);
            }
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No prerequisites';
        li.classList.add('empty-state');
        prerequisitesList.appendChild(li);
    }
    
    // Show/hide buttons based on completion status
    document.getElementById('mark-complete').style.display = node.completed ? 'none' : 'block';
    document.getElementById('mark-incomplete').style.display = node.completed ? 'block' : 'none';
    
    // Show the panel
    document.querySelector('.skill-details-panel').classList.add('active');
}

// Filter galaxy by category
function filterGalaxyByCategory(categoryId) {
    // Reset view
    resetGalaxyView();
    
    // If 'all', show all nodes
    if (categoryId === 'all') {
        skillNodes.forEach(node => {
            node.filtered = false;
        });
        return;
    }
    
    // Filter nodes
    skillNodes.forEach(node => {
        if (node.type === 'category') {
            // Show only the selected category
            node.filtered = node.id !== categoryId;
        } else if (node.type === 'subcategory') {
            // Show subcategories of the selected category
            const parentNode = skillNodes.find(n => n.id === node.parentId);
            node.filtered = !parentNode || parentNode.id !== categoryId;
        } else if (node.type === 'skill') {
            // Show skills of subcategories of the selected category
            const parentNode = skillNodes.find(n => n.id === node.parentId);
            if (parentNode) {
                const grandparentNode = skillNodes.find(n => n.id === parentNode.parentId);
                node.filtered = !grandparentNode || grandparentNode.id !== categoryId;
            } else {
                node.filtered = true;
            }
        } else if (node.type === 'subskill') {
            // Show subskills of skills of subcategories of the selected category
            const parentNode = skillNodes.find(n => n.id === node.parentId);
            if (parentNode) {
                const grandparentNode = skillNodes.find(n => n.id === parentNode.parentId);
                if (grandparentNode) {
                    const greatGrandparentNode = skillNodes.find(n => n.id === grandparentNode.parentId);
                    node.filtered = !greatGrandparentNode || greatGrandparentNode.id !== categoryId;
                } else {
                    node.filtered = true;
                }
            } else {
                node.filtered = true;
            }
        }
    });
}

// Filter galaxy by subcategory
function filterGalaxyBySubcategory(subcategoryId) {
    // Reset view
    resetGalaxyView();
    
    // Filter nodes
    skillNodes.forEach(node => {
        if (node.type === 'category') {
            // Show all categories
            node.filtered = false;
        } else if (node.type === 'subcategory') {
            // Show only the selected subcategory
            node.filtered = node.id !== subcategoryId;
        } else if (node.type === 'skill') {
            // Show skills of the selected subcategory
            node.filtered = node.parentId !== subcategoryId;
        } else if (node.type === 'subskill') {
            // Show subskills of skills of the selected subcategory
            const parentNode = skillNodes.find(n => n.id === node.parentId);
            node.filtered = !parentNode || parentNode.parentId !== subcategoryId;
        }
    });
}

// Search skills
function searchSkills(query) {
    if (!query) {
        // If query is empty, show all nodes
        skillNodes.forEach(node => {
            node.filtered = false;
        });
        return;
    }
    
    // Convert query to lowercase for case-insensitive search
    query = query.toLowerCase();
    
    // Filter nodes
    skillNodes.forEach(node => {
        // Check if node name contains the query
        const nameMatch = node.name.toLowerCase().includes(query);
        
        // Check if node description contains the query
        const descriptionMatch = node.description && node.description.toLowerCase().includes(query);
        
        // Node is filtered if neither name nor description matches
        node.filtered = !(nameMatch || descriptionMatch);
    });
}

// Mark skill as complete
function markSkillComplete(skillId) {
    // Find the node
    const node = skillNodes.find(n => n.id === skillId);
    if (!node) return;
    
    // Update node
    node.completed = true;
    node.completedOn = new Date().toISOString();
    
    // Update skill data
    updateSkillData(skillId, true);
    
    // Update UI
    if (selectedSkill && selectedSkill.id === skillId) {
        document.getElementById('skill-status').textContent = 'Completed';
        document.getElementById('skill-status').className = 'status-value completed';
        document.getElementById('mark-complete').style.display = 'none';
        document.getElementById('mark-incomplete').style.display = 'block';
    }
    
    // Update progress
    updateAllProgress();
}

// Mark skill as incomplete
function markSkillIncomplete(skillId) {
    // Find the node
    const node = skillNodes.find(n => n.id === skillId);
    if (!node) return;
    
    // Update node
    node.completed = false;
    node.completedOn = null;
    
    // Update skill data
    updateSkillData(skillId, false);
    
    // Update UI
    if (selectedSkill && selectedSkill.id === skillId) {
        document.getElementById('skill-status').textContent = 'Not Started';
        document.getElementById('skill-status').className = 'status-value';
        document.getElementById('mark-complete').style.display = 'block';
        document.getElementById('mark-incomplete').style.display = 'none';
    }
    
    // Update progress
    updateAllProgress();
}

// Update skill data
function updateSkillData(skillId, completed) {
    // If data is not yet loaded, return
    if (!skillsData || !skillsData.categories) return;
    
    // Find and update the skill in the data
    let skillFound = false;
    
    // Check if it's a subskill
    if (skillId.split('.').length > 3) {
        // It's a subskill
        for (const category of skillsData.categories) {
            for (const subcategory of category.subcategories) {
                for (const skill of subcategory.skills) {
                    if (skill.subskills) {
                        const subskill = skill.subskills.find(s => s.id === skillId);
                        if (subskill) {
                            subskill.completed = completed;
                            subskill.completedOn = completed ? new Date().toISOString() : null;
                            
                            // Update user's completed skills
                            if (completed) {
                                if (!skillsData.user.completedSkills.some(s => s.id === skillId)) {
                                    skillsData.user.completedSkills.push({
                                        id: skillId,
                                        name: subskill.name,
                                        category: `${category.name} > ${subcategory.name} > ${skill.name}`,
                                        completedOn: subskill.completedOn
                                    });
                                }
                            } else {
                                skillsData.user.completedSkills = skillsData.user.completedSkills.filter(s => s.id !== skillId);
                            }
                            
                            skillFound = true;
                            break;
                        }
                    }
                }
                if (skillFound) break;
            }
            if (skillFound) break;
        }
    } else {
        // It's a regular skill
        for (const category of skillsData.categories) {
            for (const subcategory of category.subcategories) {
                const skill = subcategory.skills.find(s => s.id === skillId);
                if (skill) {
                    skill.completed = completed;
                    skill.completedOn = completed ? new Date().toISOString() : null;
                    
                    // Update user's completed skills
                    if (completed) {
                        if (!skillsData.user.completedSkills.some(s => s.id === skillId)) {
                            skillsData.user.completedSkills.push({
                                id: skillId,
                                name: skill.name,
                                category: `${category.name} > ${subcategory.name}`,
                                completedOn: skill.completedOn
                            });
                        }
                    } else {
                        skillsData.user.completedSkills = skillsData.user.completedSkills.filter(s => s.id !== skillId);
                    }
                    
                    skillFound = true;
                    break;
                }
            }
            if (skillFound) break;
        }
    }
    
    // Save the updated data
    saveData();
}

// Update all progress indicators
function updateAllProgress() {
    // If data is not yet loaded, return
    if (!skillsData || !skillsData.categories) return;
    
    // Calculate overall progress
    const totalSkills = countTotalSkills();
    const completedSkills = skillsData.user.completedSkills.length;
    const overallProgress = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;
    
    // Update user's overall progress
    skillsData.user.overallProgress = overallProgress;
    
    // Update progress circles
    document.querySelectorAll('.progress-circle').forEach(circle => {
        circle.style.background = `conic-gradient(var(--space-accent) ${overallProgress}%, var(--space-dark-blue) 0%)`;
        const textElement = circle.querySelector('.progress-text');
        if (textElement) {
            textElement.textContent = `${overallProgress}%`;
        }
    });
    
    // Update stats
    const statValueElements = document.querySelectorAll('.stat-value');
    if (statValueElements.length > 1) {
        statValueElements[1].textContent = completedSkills;
    }
    
    // Update completed skills count
    const summaryValueElements = document.querySelectorAll('.summary-value');
    if (summaryValueElements.length > 0) {
        summaryValueElements[0].textContent = `${completedSkills}/${totalSkills}+`;
    }
    
    // Update category progress
    updateCategoryProgress();
    
    // Update completed skills table
    updateCompletedSkillsTable();
    
    // Save the updated data
    saveData();
}

// Count total skills
function countTotalSkills() {
    let count = 0;
    
    for (const category of skillsData.categories) {
        for (const subcategory of category.subcategories) {
            count += subcategory.skills.length;
            
            for (const skill of subcategory.skills) {
                if (skill.subskills) {
                    count += skill.subskills.length;
                }
            }
        }
    }
    
    return count;
}

// Update category progress
function updateCategoryProgress() {
    for (const category of skillsData.categories) {
        let totalSkills = 0;
        let completedSkills = 0;
        
        for (const subcategory of category.subcategories) {
            let subcategoryTotalSkills = 0;
            let subcategoryCompletedSkills = 0;
            
            for (const skill of subcategory.skills) {
                if (skill.subskills) {
                    subcategoryTotalSkills += skill.subskills.length;
                    subcategoryCompletedSkills += skill.subskills.filter(s => s.completed).length;
                } else {
                    subcategoryTotalSkills++;
                    if (skill.completed) {
                        subcategoryCompletedSkills++;
                    }
                }
            }
            
            totalSkills += subcategoryTotalSkills;
            completedSkills += subcategoryCompletedSkills;
            
            // Update subcategory progress
            subcategory.progress = subcategoryTotalSkills > 0 ? Math.round((subcategoryCompletedSkills / subcategoryTotalSkills) * 100) : 0;
        }
        
        // Update category progress
        category.progress = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;
        
        // Update category card progress bar
        const categoryCard = document.querySelector(`.category-card[data-category="${category.id}"]`);
        if (categoryCard) {
            const progressFill = categoryCard.querySelector('.progress-fill');
            const progressText = categoryCard.querySelector('.progress-text');
            
            if (progressFill) {
                progressFill.style.width = `${category.progress}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${category.progress}%`;
            }
        }
    }
}

// Update completed skills table
function updateCompletedSkillsTable() {
    const tableBody = document.getElementById('completed-skills-list');
    if (!tableBody) return;
    
    // Clear table
    tableBody.innerHTML = '';
    
    // If no completed skills, show empty state
    if (skillsData.user.completedSkills.length === 0) {
        const row = document.createElement('tr');
        row.className = 'empty-state';
        
        const cell = document.createElement('td');
        cell.colSpan = 5;
        cell.textContent = 'No skills completed yet';
        
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }
    
    // Sort completed skills by completion date (newest first)
    const sortedSkills = [...skillsData.user.completedSkills].sort((a, b) => {
        return new Date(b.completedOn) - new Date(a.completedOn);
    });
    
    // Add rows for each completed skill
    sortedSkills.forEach(skill => {
        const row = document.createElement('tr');
        
        // Skill ID
        const idCell = document.createElement('td');
        idCell.textContent = skill.id;
        row.appendChild(idCell);
        
        // Skill Name
        const nameCell = document.createElement('td');
        nameCell.textContent = skill.name;
        row.appendChild(nameCell);
        
        // Category
        const categoryCell = document.createElement('td');
        categoryCell.textContent = skill.category;
        row.appendChild(categoryCell);
        
        // Completed On
        const dateCell = document.createElement('td');
        dateCell.textContent = formatDate(skill.completedOn);
        row.appendChild(dateCell);
        
        // Actions
        const actionsCell = document.createElement('td');
        
        const markIncompleteButton = document.createElement('button');
        markIncompleteButton.className = 'action-btn';
        markIncompleteButton.textContent = 'Mark as Incomplete';
        markIncompleteButton.addEventListener('click', function() {
            markSkillIncomplete(skill.id);
        });
        
        actionsCell.appendChild(markIncompleteButton);
        row.appendChild(actionsCell);
        
        tableBody.appendChild(row);
    });
}

// Initialize category cards
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length === 0) return;
    
    // Set category icons and progress
    skillsData.categories.forEach(category => {
        const card = document.querySelector(`.category-card[data-category="${category.id}"]`);
        if (card) {
            // Set icon
            const iconElement = card.querySelector('.category-icon i');
            if (iconElement && category.icon) {
                iconElement.className = `fas fa-${category.icon}`;
            }
            
            // Set progress
            const progressFill = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.progress-text');
            
            if (progressFill) {
                progressFill.style.width = `${category.progress}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${category.progress}%`;
            }
        }
    });
}

// Initialize charts
function initCharts() {
    // Category Progress Chart
    const categoryProgressChart = document.getElementById('category-progress-chart');
    if (categoryProgressChart) {
        const ctx = categoryProgressChart.getContext('2d');
        
        // Prepare data
        const labels = skillsData.categories.map(cat => cat.name);
        const data = skillsData.categories.map(cat => cat.progress);
        const colors = skillsData.categories.map((cat, index) => getCategoryColor(index));
        
        // Create chart
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Progress (%)',
                    data: data,
                    backgroundColor: colors,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Timeline Chart
    const timelineChart = document.getElementById('timeline-chart');
    if (timelineChart) {
        const ctx = timelineChart.getContext('2d');
        
        // Prepare data
        const completedSkills = skillsData.user.completedSkills;
        
        // Group skills by date
        const skillsByDate = {};
        completedSkills.forEach(skill => {
            const date = skill.completedOn.split('T')[0]; // Get date part only
            if (!skillsByDate[date]) {
                skillsByDate[date] = 0;
            }
            skillsByDate[date]++;
        });
        
        // Sort dates
        const sortedDates = Object.keys(skillsByDate).sort();
        
        // Create cumulative data
        let cumulativeCount = 0;
        const cumulativeData = [];
        
        sortedDates.forEach(date => {
            cumulativeCount += skillsByDate[date];
            cumulativeData.push({
                x: date,
                y: cumulativeCount
            });
        });
        
        // Create chart
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Cumulative Skills Completed',
                    data: cumulativeData,
                    backgroundColor: 'rgba(82, 113, 255, 0.2)',
                    borderColor: 'rgba(82, 113, 255, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('cyberskills_data', JSON.stringify(skillsData));
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Get category color
function getCategoryColor(index, alpha = 1) {
    const colors = [
        `rgba(255, 94, 94, ${alpha})`,   // Red
        `rgba(94, 255, 184, ${alpha})`,  // Green
        `rgba(255, 207, 94, ${alpha})`,  // Yellow
        `rgba(94, 159, 255, ${alpha})`,  // Blue
        `rgba(196, 94, 255, ${alpha})`,  // Purple
        `rgba(255, 94, 180, ${alpha})`,  // Pink
        `rgba(94, 255, 255, ${alpha})`,  // Cyan
        `rgba(255, 128, 0, ${alpha})`,   // Orange
        `rgba(0, 204, 102, ${alpha})`    // Emerald
    ];
    
    return colors[index % colors.length];
}

// Get skill color
function getSkillColor(skill) {
    if (skill.completed) {
        return 'rgba(76, 175, 80, 0.8)'; // Completed
    } else {
        return 'rgba(255, 255, 255, 0.6)'; // Not started
    }
}

// Adjust color brightness
function adjustColorBrightness(color, percent) {
    // Extract RGB values
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (!rgbMatch) return color;
    
    let r = parseInt(rgbMatch[1]);
    let g = parseInt(rgbMatch[2]);
    let b = parseInt(rgbMatch[3]);
    
    // Adjust brightness
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));
    
    // Return adjusted color
    return `rgba(${r}, ${g}, ${b}, ${color.includes('rgba') ? rgbMatch[4] || 1 : 1})`;
}
