// Wait for the entire HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Handler ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Search Form Handler ---
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            
            const serviceQuery = document.getElementById('search-input').value.toLowerCase().trim();
            const locationQuery = document.getElementById('location-input').value.toLowerCase().trim();
            const messageEl = document.getElementById('search-message');
            
            messageEl.textContent = ''; // Clear previous error messages

            const serviceMap = {
                'plumber': 'plumbers.html', 'plumbing': 'plumbers.html',
                'electrician': 'electricians.html', 'electrical': 'electricians.html',
                'painter': 'painters.html', 'painting': 'painters.html',
                'cleaner': 'cleaners.html', 'cleaning': 'cleaners.html',
                'web': 'web-developers.html', 'developer': 'web-developers.html',
                'design': 'graphic-designers.html', 'designer': 'graphic-designers.html',
                'photo': 'photographers.html', 'photographer': 'photographers.html',
                'mover': 'movers.html', 'moving': 'movers.html',
                'carpenter': 'carpenters.html', 'carpentry': 'carpenters.html',
                'gardener': 'gardeners.html', 'gardening': 'gardeners.html'
            };

            let pageFound = false;
            for (const keyword in serviceMap) {
                if (serviceQuery.includes(keyword)) {
                    let destinationUrl = serviceMap[keyword];
                    if (locationQuery) {
                        // Append the location as a URL parameter for the next page to use
                        destinationUrl += '?location=' + encodeURIComponent(locationQuery);
                    }
                    window.location.href = destinationUrl;
                    pageFound = true;
                    break;
                }
            }

            if (!pageFound && serviceQuery) {
                messageEl.textContent = "Sorry, we couldn't find services for '" + serviceQuery + "'.";
            } else if (!serviceQuery) {
                messageEl.textContent = "Please enter a service you are looking for.";
            }
        });
    }

    // --- Swiper Slider Initialization ---
    // This requires the Swiper.js library to be loaded
    if (typeof Swiper !== 'undefined') {
        new Swiper('.worker-swiper', { 
            loop: true, 
            slidesPerView: 1, 
            spaceBetween: 30, 
            pagination: { el: '.swiper-pagination', clickable: true }, 
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, 
            breakpoints: { 
                640: { slidesPerView: 2 }, 
                1024: { slidesPerView: 3 }, 
                1280: { slidesPerView: 4 } 
            } 
        });
    }
    
    // --- Scroll Animation Observer ---
    const observer = new IntersectionObserver((entries) => { 
        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        }); 
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-fade-in').forEach(section => {
        observer.observe(section);
    });
});
