// Main application JavaScript for Cybersecurity Skills Galaxy - READ ONLY VERSION

// Global variables
window.skillsData = null;
window.galaxyCanvas = null;
window.galaxyContext = null;
window.skillNodes = [];
window.selectedSkill = null;
window.zoomLevel = 1;
window.panOffset = { x: 0, y: 0 };
window.isDragging = false;
window.lastMousePos = { x: 0, y: 0 };
window.animationFrameId = null;

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded, initializing application");
  
  // Initialize the UI
  initUI();
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize the galaxy visualization
  initGalaxy();
  
  // Update all progress indicators
  updateAllProgress();
  
  // Set the journey start date
  if (document.getElementById('journey-start-date')) {
    document.getElementById('journey-start-date').textContent = formatDate(window.skillsData.user.startDate);
  }
});

// Initialize the UI components
window.initUI = function() {
  console.log("Initializing UI components");
  
  // Set user name
  document.querySelectorAll('.user-name').forEach(el => {
    el.textContent = window.skillsData.user.name;
  });
  
  // Initialize navigation
  if (document.getElementById('dashboard-link')) {
    document.getElementById('dashboard-link').addEventListener('click', function(e) {
      e.preventDefault();
      showView('dashboard');
    });
  }
  
  if (document.getElementById('galaxy-link')) {
    document.getElementById('galaxy-link').addEventListener('click', function(e) {
      e.preventDefault();
      showView('galaxy');
    });
  }
  
  if (document.getElementById('progress-link')) {
    document.getElementById('progress-link').addEventListener('click', function(e) {
      e.preventDefault();
      showView('progress-tracker');
    });
  }
  
  // Initialize category cards
  initCategoryCards();
  
  // Initialize charts if on progress tracker view
  if (document.getElementById('progress-tracker') && document.getElementById('progress-tracker').classList.contains('active')) {
    initCharts();
  }
  
  // Hide all action buttons since this is read-only
  hideActionButtons();
};

// Hide all action buttons (mark complete/incomplete)
window.hideActionButtons = function() {
  // Hide mark complete/incomplete buttons in skill details panel
  const markCompleteBtn = document.getElementById('mark-complete');
  const markIncompleteBtn = document.getElementById('mark-incomplete');
  
  if (markCompleteBtn) markCompleteBtn.style.display = 'none';
  if (markIncompleteBtn) markIncompleteBtn.style.display = 'none';
  
  // Hide modal mark complete/incomplete buttons
  const modalMarkCompleteBtn = document.getElementById('modal-mark-complete');
  const modalMarkIncompleteBtn = document.getElementById('modal-mark-incomplete');
  
  if (modalMarkCompleteBtn) modalMarkCompleteBtn.style.display = 'none';
  if (modalMarkIncompleteBtn) modalMarkIncompleteBtn.style.display = 'none';
  
  // Hide remove buttons in completed skills list
  document.querySelectorAll('.skills-table .btn.secondary.small').forEach(btn => {
    btn.style.display = 'none';
  });
  
  // Add read-only notice to skill details panel
  const skillDetailsPanel = document.querySelector('.skill-details-panel .panel-content');
  if (skillDetailsPanel) {
    const readOnlyNotice = document.createElement('div');
    readOnlyNotice.className = 'read-only-notice';
    readOnlyNotice.innerHTML = '<p><strong>Read-Only Mode:</strong> Skills can only be updated by manually editing the data.js file.</p>';
    readOnlyNotice.style.marginTop = '20px';
    readOnlyNotice.style.padding = '10px';
    readOnlyNotice.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    readOnlyNotice.style.borderRadius = '5px';
    skillDetailsPanel.appendChild(readOnlyNotice);
  }
};

// Set up event listeners
window.setupEventListeners = function() {
  console.log("Setting up event listeners");
  
  // Galaxy view event listeners
  const galaxyCanvas = document.getElementById('galaxy-canvas');
  if (galaxyCanvas) {
    galaxyCanvas.addEventListener('mousedown', handleCanvasMouseDown);
    galaxyCanvas.addEventListener('mousemove', handleCanvasMouseMove);
    galaxyCanvas.addEventListener('mouseup', handleCanvasMouseUp);
    galaxyCanvas.addEventListener('wheel', handleCanvasWheel);
    galaxyCanvas.addEventListener('click', handleCanvasClick);
    
    // Zoom controls
    if (document.getElementById('zoom-in')) {
      document.getElementById('zoom-in').addEventListener('click', function() {
        zoomGalaxy(0.1);
      });
    }
    
    if (document.getElementById('zoom-out')) {
      document.getElementById('zoom-out').addEventListener('click', function() {
        zoomGalaxy(-0.1);
      });
    }
    
    if (document.getElementById('reset-view')) {
      document.getElementById('reset-view').addEventListener('click', resetGalaxyView);
    }
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
  
  // Modal close button
  const closeModal = document.querySelector('.close-modal');
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      document.getElementById('skill-modal').classList.remove('active');
    });
  }
  
  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      const categoryId = this.getAttribute('data-category');
      showView('galaxy');
      filterGalaxyByCategory(categoryId);
    });
  });
  
  // Explore buttons
  document.querySelectorAll('.explore-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const categoryId = this.getAttribute('data-category');
      showView('galaxy');
      filterGalaxyByCategory(categoryId);
    });
  });
};

// Initialize the galaxy visualization
window.initGalaxy = function() {
  console.log("Initializing galaxy visualization");
  
  window.galaxyCanvas = document.getElementById('galaxy-canvas');
  if (!window.galaxyCanvas) {
    console.error("Galaxy canvas element not found");
    return;
  }
  
  window.galaxyContext = window.galaxyCanvas.getContext('2d');
  
  // Set canvas dimensions
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Create skill nodes
  createSkillNodes();
  
  // Start animation loop
  animateGalaxy();
};

// Resize canvas to fit container
window.resizeCanvas = function() {
  const container = window.galaxyCanvas.parentElement;
  window.galaxyCanvas.width = container.clientWidth;
  window.galaxyCanvas.height = container.clientHeight;
  
  // Redraw galaxy after resize
  drawGalaxy();
};

// Create skill nodes from data
window.createSkillNodes = function() {
  console.log("Creating skill nodes from data");
  
  window.skillNodes = [];
  if (!window.skillsData || !window.skillsData.categories) {
    console.error("Skills data not available");
    return;
  }
  
  // Create nodes for each category
  window.skillsData.categories.forEach((category, categoryIndex) => {
    // Category node (planet)
    const categoryNode = {
      id: category.id.toString(),
      name: category.name,
      type: 'category',
      x: Math.cos(categoryIndex * (Math.PI * 2 / window.skillsData.categories.length)) * 300,
      y: Math.sin(categoryIndex * (Math.PI * 2 / window.skillsData.categories.length)) * 300,
      radius: 30,
      color: getCategoryColor(categoryIndex),
      progress: category.progress,
      orbitSpeed: 0.0001,
      orbitAngle: categoryIndex * (Math.PI * 2 / window.skillsData.categories.length)
    };
    window.skillNodes.push(categoryNode);
    
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
        window.skillNodes.push(subcategoryNode);
        
        // Skill nodes
        if (subcategory.skills) {
          subcategory.skills.forEach((skill, skillIndex) => {
            const skillDistance = 60;
            const skillAngle = skillIndex * (Math.PI * 2 / subcategory.skills.length);
            
            const skillNode = {
              id: skill.id,
              name: skill.name,
              description: skill.description,
              type: 'skill',
              parentId: subcategory.id,
              x: subcategoryNode.x + Math.cos(skillAngle) * skillDistance,
              y: subcategoryNode.y + Math.sin(skillAngle) * skillDistance,
              radius: 8,
              color: getCategoryColor(categoryIndex, 0.6),
              completed: skill.completed,
              progress: skill.progress,
              orbitSpeed: 0.001,
              orbitAngle: skillAngle,
              orbitRadius: skillDistance,
              orbitCenter: { x: subcategoryNode.x, y: subcategoryNode.y }
            };
            window.skillNodes.push(skillNode);
            
            // Subskill nodes
            if (skill.subskills) {
              skill.subskills.forEach((subskill, subskillIndex) => {
                const subskillDistance = 30;
                const subskillAngle = subskillIndex * (Math.PI * 2 / skill.subskills.length);
                
                const subskillNode = {
                  id: subskill.id,
                  name: subskill.name,
                  description: subskill.description,
                  type: 'subskill',
                  parentId: skill.id,
                  x: skillNode.x + Math.cos(subskillAngle) * subskillDistance,
                  y: skillNode.y + Math.sin(subskillAngle) * subskillDistance,
                  radius: 4,
                  color: getCategoryColor(categoryIndex, 0.4),
                  completed: subskill.completed,
                  orbitSpeed: 0.002,
                  orbitAngle: subskillAngle,
                  orbitRadius: subskillDistance,
                  orbitCenter: { x: skillNode.x, y: skillNode.y }
                };
                window.skillNodes.push(subskillNode);
              });
            }
          });
        }
      });
    }
  });
};

// Animate the galaxy visualization
window.animateGalaxy = function() {
  updateGalaxy();
  drawGalaxy();
  window.animationFrameId = requestAnimationFrame(animateGalaxy);
};

// Update galaxy node positions
window.updateGalaxy = function() {
  window.skillNodes.forEach(node => {
    if (node.type !== 'category') {
      // Update orbit angle
      node.orbitAngle += node.orbitSpeed;
      
      // Update position based on orbit
      node.x = node.orbitCenter.x + Math.cos(node.orbitAngle) * node.orbitRadius;
      node.y = node.orbitCenter.y + Math.sin(node.orbitAngle) * node.orbitRadius;
    }
  });
};

// Draw the galaxy visualization
window.drawGalaxy = function() {
  if (!window.galaxyContext) return;
  
  // Clear canvas
  window.galaxyContext.clearRect(0, 0, window.galaxyCanvas.width, window.galaxyCanvas.height);
  
  // Set canvas transform for zoom and pan
  window.galaxyContext.save();
  window.galaxyContext.translate(window.galaxyCanvas.width / 2, window.galaxyCanvas.height / 2);
  window.galaxyContext.scale(window.zoomLevel, window.zoomLevel);
  window.galaxyContext.translate(window.panOffset.x, window.panOffset.y);
  
  // Draw connections
  drawConnections();
  
  // Draw nodes
  window.skillNodes.forEach(node => {
    drawNode(node);
  });
  
  // Restore canvas transform
  window.galaxyContext.restore();
};

// Draw connections between nodes
window.drawConnections = function() {
  // Draw connections from subcategories to categories
  window.skillNodes.filter(node => node.type === 'subcategory').forEach(node => {
    const parent = window.skillNodes.find(n => n.id === node.parentId);
    if (parent) {
      drawConnection(parent, node, 0.2);
    }
  });
  
  // Draw connections from skills to subcategories
  window.skillNodes.filter(node => node.type === 'skill').forEach(node => {
    const parent = window.skillNodes.find(n => n.id === node.parentId);
    if (parent) {
      drawConnection(parent, node, 0.1);
    }
  });
  
  // Draw connections from subskills to skills
  window.skillNodes.filter(node => node.type === 'subskill').forEach(node => {
    const parent = window.skillNodes.find(n => n.id === node.parentId);
    if (parent) {
      drawConnection(parent, node, 0.05);
    }
  });
};

// Draw a connection between two nodes
window.drawConnection = function(node1, node2, width = 1) {
  window.galaxyContext.beginPath();
  window.galaxyContext.moveTo(node1.x, node1.y);
  window.galaxyContext.lineTo(node2.x, node2.y);
  window.galaxyContext.strokeStyle = `rgba(100, 149, 237, ${width})`;
  window.galaxyContext.lineWidth = width;
  window.galaxyContext.stroke();
};

// Draw a single node
window.drawNode = function(node) {
  window.galaxyContext.beginPath();
  window.galaxyContext.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
  
  // Fill style based on completion status
  if (node.completed) {
    window.galaxyContext.fillStyle = '#4CAF50'; // Green for completed
  } else if (node.type === 'skill' || node.type === 'subskill') {
    // Check if prerequisites are met
    const prereqsMet = checkPrerequisitesMet(node.id);
    window.galaxyContext.fillStyle = prereqsMet ? node.color : '#555'; // Dimmed if prerequisites not met
  } else {
    window.galaxyContext.fillStyle = node.color;
  }
  
  window.galaxyContext.fill();
  
  // Draw progress indicator for categories and subcategories
  if ((node.type === 'category' || node.type === 'subcategory') && node.progress > 0) {
    window.galaxyContext.beginPath();
    window.galaxyContext.moveTo(node.x, node.y);
    window.galaxyContext.arc(node.x, node.y, node.radius, -Math.PI / 2, -Math.PI / 2 + (node.progress / 100) * (Math.PI * 2));
    window.galaxyContext.lineTo(node.x, node.y);
    window.galaxyContext.fillStyle = '#4CAF50';
    window.galaxyContext.fill();
  }
  
  // Draw border
  window.galaxyContext.strokeStyle = '#fff';
  window.galaxyContext.lineWidth = 1;
  window.galaxyContext.stroke();
  
  // Draw node label for larger nodes
  if (node.radius >= 8) {
    window.galaxyContext.fillStyle = '#fff';
    window.galaxyContext.font = `${Math.max(8, node.radius / 2)}px Arial`;
    window.galaxyContext.textAlign = 'center';
    window.galaxyContext.textBaseline = 'middle';
    
    // Truncate text if too long
    const maxLength = node.radius * 2;
    let displayName = node.name;
    if (window.galaxyContext.measureText(displayName).width > maxLength) {
      displayName = displayName.substring(0, 8) + '...';
    }
    
    window.galaxyContext.fillText(displayName, node.x, node.y);
  }
};

// Handle mouse down on canvas
window.handleCanvasMouseDown = function(e) {
  window.isDragging = true;
  window.lastMousePos = {
    x: e.clientX,
    y: e.clientY
  };
};

// Handle mouse move on canvas
window.handleCanvasMouseMove = function(e) {
  // Show tooltip on hover
  const mousePos = getCanvasMousePosition(e);
  const hoveredNode = getNodeAtPosition(mousePos.x, mousePos.y);
  
  const tooltip = document.getElementById('skill-tooltip');
  if (hoveredNode && tooltip) {
    tooltip.querySelector('.tooltip-title').textContent = hoveredNode.name;
    tooltip.querySelector('.tooltip-category').textContent = getNodeCategory(hoveredNode);
    
    tooltip.style.left = `${e.clientX + 10}px`;
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.classList.remove('hidden');
  } else if (tooltip) {
    tooltip.classList.add('hidden');
  }
  
  // Pan the view when dragging
  if (window.isDragging) {
    const dx = e.clientX - window.lastMousePos.x;
    const dy = e.clientY - window.lastMousePos.y;
    
    window.panOffset.x += dx / window.zoomLevel;
    window.panOffset.y += dy / window.zoomLevel;
    
    window.lastMousePos = {
      x: e.clientX,
      y: e.clientY
    };
  }
};

// Handle mouse up on canvas
window.handleCanvasMouseUp = function() {
  window.isDragging = false;
};

// Handle mouse wheel on canvas
window.handleCanvasWheel = function(e) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  zoomGalaxy(delta);
};

// Handle click on canvas
window.handleCanvasClick = function(e) {
  const mousePos = getCanvasMousePosition(e);
  const clickedNode = getNodeAtPosition(mousePos.x, mousePos.y);
  
  if (clickedNode) {
    selectNode(clickedNode);
  }
};

// Get mouse position relative to canvas with zoom and pan
window.getCanvasMousePosition = function(e) {
  const rect = window.galaxyCanvas.getBoundingClientRect();
  const scaleX = window.galaxyCanvas.width / rect.width;
  const scaleY = window.galaxyCanvas.height / rect.height;
  
  const canvasX = (e.clientX - rect.left) * scaleX;
  const canvasY = (e.clientY - rect.top) * scaleY;
  
  // Adjust for zoom and pan
  const worldX = (canvasX - window.galaxyCanvas.width / 2) / window.zoomLevel - window.panOffset.x;
  const worldY = (canvasY - window.galaxyCanvas.height / 2) / window.zoomLevel - window.panOffset.y;
  
  return { x: worldX, y: worldY };
};

// Get node at position
window.getNodeAtPosition = function(x, y) {
  // Check in reverse order to select smaller nodes first (they're drawn on top)
  for (let i = window.skillNodes.length - 1; i >= 0; i--) {
    const node = window.skillNodes[i];
    const dx = node.x - x;
    const dy = node.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= node.radius) {
      return node;
    }
  }
  
  return null;
};

// Select a node
window.selectNode = function(node) {
  window.selectedSkill = node;
  
  // Update skill details panel
  const panel = document.querySelector('.skill-details-panel');
  if (panel) {
    document.getElementById('skill-name').textContent = node.name;
    document.getElementById('skill-id').textContent = node.id;
    document.getElementById('skill-description').textContent = node.description || 'No description available.';
    
    // Update status
    const statusElement = document.getElementById('skill-status');
    if (node.completed) {
      statusElement.textContent = 'Completed';
      statusElement.className = 'status-value completed';
    } else {
      const prereqsMet = checkPrerequisitesMet(node.id);
      statusElement.textContent = prereqsMet ? 'Ready to Learn' : 'Prerequisites Not Met';
      statusElement.className = `status-value ${prereqsMet ? 'ready' : 'locked'}`;
    }
    
    // Update prerequisites list
    const prerequisitesList = document.getElementById('prerequisites-list');
    prerequisitesList.innerHTML = '';
    
    const prerequisites = getPrerequisites(node.id);
    if (prerequisites.length > 0) {
      prerequisites.forEach(prereq => {
        const li = document.createElement('li');
        li.textContent = prereq.name;
        li.className = prereq.completed ? 'completed' : 'incomplete';
        prerequisitesList.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'No prerequisites';
      li.className = 'empty-state';
      prerequisitesList.appendChild(li);
    }
    
    // Show the panel
    panel.classList.add('active');
  }
};

// Zoom the galaxy view
window.zoomGalaxy = function(delta) {
  const newZoom = window.zoomLevel + delta;
  
  // Limit zoom level
  if (newZoom >= 0.2 && newZoom <= 3) {
    window.zoomLevel = newZoom;
  }
};

// Reset the galaxy view
window.resetGalaxyView = function() {
  window.zoomLevel = 1;
  window.panOffset = { x: 0, y: 0 };
};

// Filter galaxy by category
window.filterGalaxyByCategory = function(categoryId) {
  // Reset view
  resetGalaxyView();
  
  // If "all" is selected, show all nodes
  if (categoryId === 'all') {
    window.skillNodes.forEach(node => {
      node.visible = true;
    });
    return;
  }
  
  // Otherwise, show only nodes in the selected category
  window.skillNodes.forEach(node => {
    if (node.type === 'category') {
      node.visible = node.id === categoryId;
    } else if (node.type === 'subcategory') {
      node.visible = node.parentId === categoryId;
    } else if (node.type === 'skill') {
      const parent = window.skillNodes.find(n => n.id === node.parentId);
      node.visible = parent && parent.parentId === categoryId;
    } else if (node.type === 'subskill') {
      const parent = window.skillNodes.find(n => n.id === node.parentId);
      const grandparent = parent && window.skillNodes.find(n => n.id === parent.parentId);
      node.visible = grandparent && grandparent.parentId === categoryId;
    }
  });
  
  // Center view on selected category
  const categoryNode = window.skillNodes.find(node => node.id === categoryId);
  if (categoryNode) {
    window.panOffset.x = -categoryNode.x;
    window.panOffset.y = -categoryNode.y;
  }
};

// Search for skills
window.searchSkills = function(query) {
  if (!query) {
    // If query is empty, show all nodes
    window.skillNodes.forEach(node => {
      node.visible = true;
    });
    return;
  }
  
  // Convert query to lowercase for case-insensitive search
  query = query.toLowerCase();
  
  // Show only nodes that match the query
  window.skillNodes.forEach(node => {
    node.visible = node.name.toLowerCase().includes(query) || 
                  (node.description && node.description.toLowerCase().includes(query));
  });
};

// Get category color
window.getCategoryColor = function(index, alpha = 1) {
  const colors = [
    `rgba(65, 105, 225, ${alpha})`,  // Royal Blue
    `rgba(46, 139, 87, ${alpha})`,   // Sea Green
    `rgba(220, 20, 60, ${alpha})`,   // Crimson
    `rgba(255, 140, 0, ${alpha})`,   // Dark Orange
    `rgba(138, 43, 226, ${alpha})`,  // Blue Violet
    `rgba(0, 139, 139, ${alpha})`,   // Dark Cyan
    `rgba(184, 134, 11, ${alpha})`,  // Dark Goldenrod
    `rgba(178, 34, 34, ${alpha})`,   // Firebrick
    `rgba(85, 107, 47, ${alpha})`    // Dark Olive Green
  ];
  
  return colors[index % colors.length];
};

// Get node category
window.getNodeCategory = function(node) {
  if (node.type === 'category') {
    return node.name;
  } else if (node.type === 'subcategory') {
    const parent = window.skillNodes.find(n => n.id === node.parentId);
    return parent ? `${parent.name} > ${node.name}` : node.name;
  } else if (node.type === 'skill') {
    const parent = window.skillNodes.find(n => n.id === node.parentId);
    const grandparent = parent && window.skillNodes.find(n => n.id === parent.parentId);
    return grandparent ? `${grandparent.name} > ${parent.name} > ${node.name}` : node.name;
  } else if (node.type === 'subskill') {
    const parent = window.skillNodes.find(n => n.id === node.parentId);
    const grandparent = parent && window.skillNodes.find(n => n.id === parent.parentId);
    const greatGrandparent = grandparent && window.skillNodes.find(n => n.id === grandparent.parentId);
    return greatGrandparent ? `${greatGrandparent.name} > ${grandparent.name} > ${parent.name} > ${node.name}` : node.name;
  }
  
  return node.name;
};

// Get prerequisites for a skill
window.getPrerequisites = function(skillId) {
  // Find the skill in the data
  let skill = null;
  let prerequisites = [];
  
  // Check if it's a subskill
  for (const category of window.skillsData.categories) {
    for (const subcategory of category.subcategories || []) {
      for (const s of subcategory.skills || []) {
        if (s.subskills) {
          const subskill = s.subskills.find(ss => ss.id === skillId);
          if (subskill) {
            skill = subskill;
            break;
          }
        }
        if (s.id === skillId) {
          skill = s;
          break;
        }
      }
      if (skill) break;
      
      if (subcategory.id === skillId) {
        skill = subcategory;
        break;
      }
    }
    if (skill) break;
  }
  
  if (!skill || !skill.prerequisites) return [];
  
  // Find prerequisite skills
  for (const prereqId of skill.prerequisites) {
    // Look for the prerequisite in all skills
    for (const category of window.skillsData.categories) {
      for (const subcategory of category.subcategories || []) {
        for (const s of subcategory.skills || []) {
          if (s.subskills) {
            const subskill = s.subskills.find(ss => ss.id === prereqId);
            if (subskill) {
              prerequisites.push(subskill);
              break;
            }
          }
          if (s.id === prereqId) {
            prerequisites.push(s);
            break;
          }
        }
        if (subcategory.id === prereqId) {
          prerequisites.push(subcategory);
          break;
        }
      }
    }
  }
  
  return prerequisites;
};

// Check if prerequisites are met for a skill
window.checkPrerequisitesMet = function(skillId) {
  const prerequisites = getPrerequisites(skillId);
  
  if (prerequisites.length === 0) return true;
  
  return prerequisites.every(prereq => prereq.completed);
};

// Update all progress indicators
window.updateAllProgress = function() {
  console.log("Updating all progress indicators");
  
  // Update progress indicators in UI
  document.querySelectorAll('.progress-text').forEach(el => {
    el.textContent = `${window.skillsData.user.overallProgress}%`;
  });
  
  // Update skills completed count
  document.querySelectorAll('.skills-completed').forEach(el => {
    el.textContent = window.skillsData.user.completedSkills.length;
  });
  
  // Update category progress
  for (const category of window.skillsData.categories) {
    const categoryCard = document.querySelector(`.category-card[data-category="${category.id}"]`);
    if (categoryCard) {
      const progressBar = categoryCard.querySelector('.progress-fill');
      const progressText = categoryCard.querySelector('.progress-text');
      
      if (progressBar) progressBar.style.width = `${category.progress}%`;
      if (progressText) progressText.textContent = `${category.progress}%`;
    }
  }
  
  // Update completed skills list
  updateCompletedSkillsList();
  
  // Update charts
  updateCharts();
};

// Update completed skills list
window.updateCompletedSkillsList = function() {
  const completedSkillsList = document.getElementById('completed-skills-list');
  if (!completedSkillsList) return;
  
  completedSkillsList.innerHTML = '';
  
  if (window.skillsData.user.completedSkills.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'empty-state';
    emptyRow.innerHTML = '<td colspan="5">No skills completed yet</td>';
    completedSkillsList.appendChild(emptyRow);
    return;
  }
  
  // Sort by completion date (newest first)
  const sortedSkills = [...window.skillsData.user.completedSkills].sort((a, b) => {
    return new Date(b.completedOn) - new Date(a.completedOn);
  });
  
  for (const skill of sortedSkills) {
    const row = document.createElement('tr');
    
    const idCell = document.createElement('td');
    idCell.textContent = skill.id;
    row.appendChild(idCell);
    
    const nameCell = document.createElement('td');
    nameCell.textContent = skill.name;
    row.appendChild(nameCell);
    
    const categoryCell = document.createElement('td');
    categoryCell.textContent = skill.category;
    row.appendChild(categoryCell);
    
    const dateCell = document.createElement('td');
    dateCell.textContent = formatDate(skill.completedOn);
    row.appendChild(dateCell);
    
    const actionsCell = document.createElement('td');
    actionsCell.textContent = "Read-only mode";
    actionsCell.style.color = "#999";
    actionsCell.style.fontStyle = "italic";
    row.appendChild(actionsCell);
    
    completedSkillsList.appendChild(row);
  }
};

// Initialize category cards
window.initCategoryCards = function() {
  // Update category progress
  for (const category of window.skillsData.categories) {
    const categoryCard = document.querySelector(`.category-card[data-category="${category.id}"]`);
    if (categoryCard) {
      const progressBar = categoryCard.querySelector('.progress-fill');
      const progressText = categoryCard.querySelector('.progress-text');
      
      if (progressBar) progressBar.style.width = `${category.progress}%`;
      if (progressText) progressText.textContent = `${category.progress}%`;
    }
  }
};

// Initialize charts
window.initCharts = function() {
  // Category progress chart
  const categoryProgressChart = document.getElementById('category-progress-chart');
  if (categoryProgressChart) {
    const categoryNames = window.skillsData.categories.map(c => c.name);
    const categoryProgress = window.skillsData.categories.map(c => c.progress);
    
    new Chart(categoryProgressChart, {
      type: 'bar',
      data: {
        labels: categoryNames,
        datasets: [{
          label: 'Progress (%)',
          data: categoryProgress,
          backgroundColor: 'rgba(65, 105, 225, 0.7)',
          borderColor: 'rgba(65, 105, 225, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
  
  // Timeline chart
  const timelineChart = document.getElementById('timeline-chart');
  if (timelineChart && window.skillsData.user.completedSkills.length > 0) {
    // Group skills by month
    const skillsByMonth = {};
    
    for (const skill of window.skillsData.user.completedSkills) {
      const date = new Date(skill.completedOn);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!skillsByMonth[monthKey]) {
        skillsByMonth[monthKey] = 0;
      }
      
      skillsByMonth[monthKey]++;
    }
    
    // Sort months
    const sortedMonths = Object.keys(skillsByMonth).sort();
    
    // Format month labels
    const monthLabels = sortedMonths.map(month => {
      const [year, monthNum] = month.split('-');
      return `${getMonthName(parseInt(monthNum) - 1)} ${year}`;
    });
    
    // Get skill counts
    const skillCounts = sortedMonths.map(month => skillsByMonth[month]);
    
    new Chart(timelineChart, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Skills Completed',
          data: skillCounts,
          backgroundColor: 'rgba(65, 105, 225, 0.2)',
          borderColor: 'rgba(65, 105, 225, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
};

// Update charts
window.updateCharts = function() {
  // Destroy existing charts
  if (typeof Chart !== 'undefined' && Chart.helpers) {
    Chart.helpers.each(Chart.instances, function(instance) {
      instance.destroy();
    });
  }
  
  // Reinitialize charts
  initCharts();
};

// Show a specific view
window.showView = function(viewId) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  
  // Show selected view
  document.getElementById(viewId).classList.add('active');
  
  // Update navigation
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });
  
  document.getElementById(`${viewId}-link`).classList.add('active');
  
  // Initialize charts if showing progress tracker
  if (viewId === 'progress-tracker') {
    initCharts();
  }
};

// Format date
window.formatDate = function(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get month name
window.getMonthName = function(monthIndex) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return months[monthIndex];
};
