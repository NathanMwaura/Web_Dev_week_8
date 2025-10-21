// ====================================
// PROJECTS PAGE - FILTERING & MODAL
// projects-filter.js
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // PROJECT DATA
    // ====================================
    
    const projectsData = {
        1: {
            icon: 'fas fa-shopping-cart',
            title: 'E-Commerce Platform',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            description: 'A comprehensive full-stack e-commerce solution featuring user authentication, product catalog, shopping cart functionality, secure payment processing with Stripe, and an admin dashboard for inventory management. Built with modern web technologies for optimal performance and user experience.',
            features: [
                'User authentication and authorization',
                'Product catalog with search and filtering',
                'Shopping cart with persistent storage',
                'Secure payment processing with Stripe',
                'Admin dashboard for product management',
                'Order tracking and history',
                'Responsive design for all devices',
                'Email notifications for orders'
            ],
            technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API', 'JWT', 'Tailwind CSS']
        },
        2: {
            icon: 'fas fa-chart-line',
            title: 'Analytics Dashboard',
            tags: ['Vue.js', 'D3.js', 'API', 'Charts'],
            description: 'An interactive real-time analytics dashboard that visualizes complex data sets with beautiful charts and graphs. Features customizable widgets, real-time data updates, and multiple visualization types. Perfect for business intelligence and data-driven decision making.',
            features: [
                'Real-time data visualization',
                'Interactive charts and graphs using D3.js',
                'Customizable dashboard widgets',
                'Multiple chart types (line, bar, pie, scatter)',
                'Data filtering and date range selection',
                'Export data to CSV/PDF',
                'Responsive layout for all screen sizes',
                'Dark mode support'
            ],
            technologies: ['Vue.js', 'D3.js', 'Vuex', 'Chart.js', 'Axios', 'Webpack', 'SCSS', 'REST API']
        },
        3: {
            icon: 'fas fa-dumbbell',
            title: 'Fitness Tracking App',
            tags: ['React Native', 'Firebase', 'Mobile'],
            description: 'A comprehensive mobile fitness application that helps users track workouts, monitor nutrition, and achieve their fitness goals. Features social components for community engagement, progress tracking with charts, and personalized workout recommendations.',
            features: [
                'Workout tracking with exercise database',
                'Nutrition logging with calorie counter',
                'Progress tracking with visual charts',
                'Customizable workout plans',
                'Social features and community challenges',
                'Goal setting and achievement tracking',
                'Integration with wearable devices',
                'Push notifications for reminders'
            ],
            technologies: ['React Native', 'Firebase', 'Redux', 'Expo', 'Native Base', 'AsyncStorage', 'Firebase Auth', 'Cloud Firestore']
        },
        4: {
            icon: 'fas fa-palette',
            title: 'Brand Identity System',
            tags: ['Figma', 'UI/UX', 'Design'],
            description: 'A complete brand identity system including logo design, color palette, typography guidelines, and comprehensive style guide. This project demonstrates strong visual design skills and understanding of brand consistency across multiple touchpoints.',
            features: [
                'Custom logo design with variations',
                'Comprehensive color palette system',
                'Typography hierarchy and guidelines',
                'Icon set and graphic elements',
                'Brand usage guidelines',
                'Marketing collateral templates',
                'Social media assets',
                'Print and digital specifications'
            ],
            technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'InDesign', 'Sketch', 'Principle', 'After Effects', 'InVision']
        },
        5: {
            icon: 'fas fa-blog',
            title: 'Personal Blog Platform',
            tags: ['Next.js', 'Tailwind', 'MDX', 'SEO'],
            description: 'A modern, blazing-fast blog platform built with Next.js featuring markdown support, code syntax highlighting, dark mode, and excellent SEO. Optimized for performance with static site generation and incremental static regeneration.',
            features: [
                'MDX support for rich content',
                'Syntax highlighting for code blocks',
                'Dark mode toggle with persistence',
                'SEO optimized with meta tags',
                'RSS feed generation',
                'Search functionality',
                'Reading time estimation',
                'Table of contents auto-generation',
                'Comment system integration',
                'Newsletter subscription'
            ],
            technologies: ['Next.js', 'React', 'Tailwind CSS', 'MDX', 'Prism.js', 'Gray Matter', 'Vercel', 'TypeScript']
        },
        6: {
            icon: 'fas fa-robot',
            title: 'AI Chatbot',
            tags: ['Python', 'AI/ML', 'NLP'],
            description: 'An intelligent conversational AI chatbot powered by natural language processing and machine learning. Designed for customer support automation with intent recognition, context awareness, and multi-language support.',
            features: [
                'Natural language understanding',
                'Intent classification and entity extraction',
                'Context-aware conversations',
                'Multi-language support',
                'Sentiment analysis',
                'Integration with helpdesk systems',
                'Analytics and conversation insights',
                'Continuous learning from interactions',
                'Custom training on business data'
            ],
            technologies: ['Python', 'TensorFlow', 'NLTK', 'spaCy', 'Flask', 'MongoDB', 'Docker', 'Redis']
        },
        7: {
            icon: 'fas fa-your-icon',
            title: 'Your Project Title',
            tags: ['React', 'Node.js', 'MongoDB'],
            description: 'Full project description...',
            features: [
                'Feature 1',
                'Feature 2',
                // ... more features
            ],
            technologies: ['React', 'Node.js', 'Express', 'MongoDB']
        }
    };
    
    // ====================================
    // FILTER FUNCTIONALITY
    // ====================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show card
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    }, 10);
                } else {
                    // Hide card
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
            
            // Check if no projects match filter
            setTimeout(() => {
                const visibleCards = Array.from(projectCards).filter(card => {
                    return card.style.display !== 'none';
                });
                
                if (visibleCards.length === 0) {
                    showEmptyState();
                } else {
                    hideEmptyState();
                }
            }, 600);
        });
    });
    
    // ====================================
    // EMPTY STATE
    // ====================================
    
    function showEmptyState() {
        const grid = document.getElementById('projectsGrid');
        const existingEmptyState = document.querySelector('.empty-state');
        
        if (!existingEmptyState) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-folder-open"></i>
                <h3>No Projects Found</h3>
                <p>No projects match the selected filter.</p>
            `;
            grid.appendChild(emptyState);
        }
    }
    
    function hideEmptyState() {
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
    }
    
    // ====================================
    // MODAL FUNCTIONALITY
    // ====================================
    
    const modal = document.getElementById('projectModal');
    
    // Open modal function (called from HTML)
    window.openModal = function(projectId) {
        const project = projectsData[projectId];
        
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }
        
        // Populate modal with project data
        document.getElementById('modalHeader').innerHTML = `<i class="${project.icon}"></i>`;
        document.getElementById('modalTitle').textContent = project.title;
        
        // Tags
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = project.tags.map(tag => 
            `<span class="project-tag">${tag}</span>`
        ).join('');
        
        // Description
        document.getElementById('modalDescription').textContent = project.description;
        
        // Features
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = project.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        // Technologies
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = project.technologies.map(tech => 
            `<div class="tech-item">${tech}</div>`
        ).join('');
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // Close modal function (called from HTML)
    window.closeModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // ====================================
    // SEARCH FUNCTIONALITY (OPTIONAL)
    // ====================================
    
    // You can add a search bar to filter projects by title or tags
    function searchProjects(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.project-tag'))
                .map(tag => tag.textContent.toLowerCase());
            const description = card.querySelector('p').textContent.toLowerCase();
            
            const matches = title.includes(term) || 
                          tags.some(tag => tag.includes(term)) ||
                          description.includes(term);
            
            if (matches) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 500);
            }
        });
    }
    
    // ====================================
    // HOVER EFFECTS ON PROJECT CARDS
    // ====================================
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ====================================
    // LOAD MORE FUNCTIONALITY (OPTIONAL)
    // ====================================
    
    // If you have many projects, you can implement pagination
    let currentPage = 1;
    const projectsPerPage = 6;
    
    function loadMoreProjects() {
        // This would load more projects from an API or display hidden cards
        currentPage++;
        console.log('Loading page:', currentPage);
        // Implementation depends on your data source
    }
    
    // ====================================
    // ANIMATION ON SCROLL
    // ====================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initial setup for cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    // ====================================
    // PROJECT SORTING (OPTIONAL)
    // ====================================
    
    function sortProjects(sortBy) {
        const grid = document.getElementById('projectsGrid');
        const cardsArray = Array.from(projectCards);
        
        cardsArray.sort((a, b) => {
            if (sortBy === 'title') {
                const titleA = a.querySelector('h3').textContent;
                const titleB = b.querySelector('h3').textContent;
                return titleA.localeCompare(titleB);
            } else if (sortBy === 'recent') {
                // Sort by data-date attribute (you'd need to add this)
                return 0; // Placeholder
            }
            return 0;
        });
        
        // Re-append cards in sorted order
        cardsArray.forEach(card => grid.appendChild(card));
    }
    
    // ====================================
    // UTILITY FUNCTIONS
    // ====================================
    
    // Get filtered count
    function getFilteredCount(filter) {
        if (filter === 'all') {
            return projectCards.length;
        }
        return Array.from(projectCards).filter(card => 
            card.getAttribute('data-category') === filter
        ).length;
    }
    
    // Update filter button counts (optional enhancement)
    function updateFilterCounts() {
        filterButtons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            const count = getFilteredCount(filter);
            const currentText = button.textContent.trim();
            
            // Only update if not already showing count
            if (!currentText.includes('(')) {
                button.innerHTML += ` <span style="opacity: 0.7;">(${count})</span>`;
            }
        });
    }
    
    // Uncomment to show counts on filter buttons
    // updateFilterCounts();
    
    // ====================================
    // PERFORMANCE OPTIMIZATION
    // ====================================
    
    // Debounce function for search (if implemented)
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ====================================
    // ACCESSIBILITY IMPROVEMENTS
    // ====================================
    
    // Trap focus in modal when open
    modal.addEventListener('keydown', function(e) {
        if (!this.classList.contains('active')) return;
        
        if (e.key === 'Tab') {
            const focusableElements = this.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    // Announce filter changes to screen readers
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.textContent.trim();
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = `Filtered to show ${filter} projects`;
            document.body.appendChild(announcement);
            
            setTimeout(() => announcement.remove(), 1000);
        });
    });
    
    console.log('Projects page initialized successfully! 🚀');
    console.log(`Total projects: ${projectCards.length}`);
});