// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Initialize menu elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".sub-menu");

// Combined hamburger menu functionality
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking a link
document.querySelectorAll(".nav__link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove('menu-open');
}));

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove('menu-open');
    }
});

// Add resize handler to fix mobile menu issues
window.addEventListener('resize', function() {
    if (window.innerWidth > 450) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove('menu-open');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ScrollReveal Configuration with faster animations
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '30px',
    duration: 1000,  // Reduced from 2500
    delay: 200,      // Reduced from 400
    easing: 'ease',
    reset: false
});

// Apply animations to different sections with faster timing
sr.reveal('.main-left', {
    origin: 'left',
    distance: '50px',
    duration: 800
});

sr.reveal('.main-right, .right-chair', {
    origin: 'right',
    distance: '50px',
    duration: 800
});

// About section with quicker animations
sr.reveal('.about .left-side', {
    origin: 'left',
    duration: 800
});

sr.reveal('.about .right-side', {
    origin: 'right',
    duration: 800
});

// Collection items with faster stagger
sr.reveal('.collection-item', {
    interval: 100,  // Reduced from 200
    distance: '20px'
});

// Support section with quicker reveal
sr.reveal('.our-support-task', {
    interval: 100
});

// Testimonials with faster animations
sr.reveal('.testimonial-card', {
    interval: 100,
    distance: '20px'
});

// Brand section with quicker reveal
sr.reveal('.brand-img', {
    interval: 100
});

// Footer with faster animations
sr.reveal('.footer-col', {
    interval: 50,  // Reduced from 100
    distance: '20px'
});

// Category and Subcategory Handling
document.addEventListener('DOMContentLoaded', function() {
    // Category handling
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.collection-category');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and categories
            categoryBtns.forEach(b => b.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show selected category
            const selectedCategory = document.getElementById(btn.dataset.category);
            if (selectedCategory) {
                selectedCategory.classList.add('active');
                
                // Find and activate first subcategory
                const firstSubcategoryBtn = selectedCategory.querySelector('.subcategory-btn');
                const firstSubcategoryGrid = selectedCategory.querySelector('.collection-grid');
                
                if (firstSubcategoryBtn && firstSubcategoryGrid) {
                    firstSubcategoryBtn.classList.add('active');
                    firstSubcategoryGrid.classList.add('active');
                }
            }
        });
    });

    // Subcategory handling
    const subcategoryBtns = document.querySelectorAll('.subcategory-btn');
    
    subcategoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.closest('.collection-category');
            if (!category) return;

            // Remove active class from all buttons and grids in this category
            category.querySelectorAll('.subcategory-btn').forEach(b => b.classList.remove('active'));
            category.querySelectorAll('.collection-grid').forEach(grid => grid.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show selected grid
            const selectedGrid = category.querySelector(`.collection-grid[data-type="${btn.dataset.type}"]`);
            if (selectedGrid) {
                selectedGrid.classList.add('active');
                
                // Animate new items
                const items = selectedGrid.querySelectorAll('.collection-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
});

// Add hover effects for collection items
document.querySelectorAll('.collection-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    const modalCaption = document.querySelector('.modal-caption');
    let startY = 0;
    let scrolled = 0;

    // Open modal when clicking on collection images
    document.querySelectorAll('.collection-item img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalCaption.textContent = this.alt;
            document.body.classList.add('modal-open');
            setTimeout(() => modal.classList.add('active'), 10);
        });
    });

    // Close modal with close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle scroll to close
    modal.addEventListener('touchstart', function(e) {
        startY = e.touches[0].pageY;
        scrolled = 0;
    }, false);

    modal.addEventListener('touchmove', function(e) {
        let deltaY = e.touches[0].pageY - startY;
        scrolled = Math.abs(deltaY);
        
        if (scrolled > 100) { // Threshold for closing
            closeModal();
        }
    }, false);

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        }, 300);
    }
});

// Enhanced Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const collectionItems = document.querySelectorAll('.collection-item');
    const categories = document.querySelectorAll('.collection-category');
    
    // Create no results message element
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No matching furniture found';
    document.querySelector('.ourcollection').appendChild(noResults);

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        let hasResults = false;

        if (searchTerm === '') {
            // If search is empty, restore original view
            restoreOriginalView();
            return;
        }

        // Show all categories and items for searching
        categories.forEach(category => {
            category.style.display = 'block';
            const grids = category.querySelectorAll('.collection-grid');
            grids.forEach(grid => grid.style.display = 'grid');
        });

        // Search through items
        collectionItems.forEach(item => {
            const title = item.querySelector('h4')?.textContent.toLowerCase() || '';
            const description = item.querySelector('.item-name')?.textContent.toLowerCase() || '';
            const price = item.querySelector('.item-price')?.textContent.toLowerCase() || '';
            const category = item.closest('.collection-category')?.querySelector('h3')?.textContent.toLowerCase() || '';
            
            // Check if any text matches the search term
            if (title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                price.includes(searchTerm) ||
                category.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.opacity = '1';
                hasResults = true;
                
                // Show parent grid and category
                const grid = item.closest('.collection-grid');
                const category = item.closest('.collection-category');
                if (grid) grid.style.display = 'grid';
                if (category) category.style.display = 'block';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });

        // Hide empty categories and grids
        categories.forEach(category => {
            const visibleItems = category.querySelectorAll('.collection-item[style*="display: block"]');
            if (visibleItems.length === 0) {
                category.style.display = 'none';
            }
        });

        // Show/hide no results message
        noResults.style.display = hasResults ? 'none' : 'block';
    });

    function restoreOriginalView() {
        // Hide no results message
        noResults.style.display = 'none';

        // Restore original category and subcategory view
        categories.forEach(category => {
            category.style.display = category.classList.contains('active') ? 'block' : 'none';
            
            const grids = category.querySelectorAll('.collection-grid');
            grids.forEach(grid => {
                grid.style.display = grid.classList.contains('active') ? 'grid' : 'none';
            });

            const items = category.querySelectorAll('.collection-item');
            items.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '1';
            });
        });
    }

    // Clear search when changing categories
    document.querySelectorAll('.category-btn, .subcategory-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            searchInput.value = '';
            restoreOriginalView();
        });
    });
});

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const subMenu = document.querySelector('.sub-menu');
    const body = document.body;

    hamburger.addEventListener('click', function() {
        // Toggle active classes
        hamburger.classList.toggle('active');
        subMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.sub-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            subMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !subMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            subMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            subMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});