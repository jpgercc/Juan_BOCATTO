// ============================
// GLOBAL VARIABLES
// ============================
let currentSlide = 0;
let currentCategory = 'todos';

// ============================
// MOBILE MENU TOGGLE - DEFINA ESTA PRIMEIRO!
// ============================
window.toggleMenu = function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
};

// ============================
// CAROUSEL FUNCTIONALITY
// ============================
function initCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    window.goToSlide = function(index) {
        showSlide(index);
    };

    showSlide(0);
    setInterval(nextSlide, 5000);
}

// ============================
// NAVBAR SCROLL EFFECT
// ============================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================
// PRODUCTS FILTERING
// ============================
function initProductsFilters() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) return;

    window.filterByCategory = function(category) {
        currentCategory = category;
        
        document.querySelectorAll('.produtos-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-filter="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        filterProducts();
    };

    window.filterProducts = function() {
        const searchTerm = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.produtos-card');
        let visibleCount = 0;

        products.forEach(product => {
            const category = product.getAttribute('data-category');
            const name = product.getAttribute('data-name').toLowerCase();
            
            const categoryMatch = currentCategory === 'todos' || category === currentCategory;
            const searchMatch = name.includes(searchTerm);
            
            if (categoryMatch && searchMatch) {
                product.style.display = 'block';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    };
}

// ============================
// INITIALIZATION
// ============================
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initNavbar();
    initProductsFilters();
});