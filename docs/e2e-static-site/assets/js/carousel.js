// Image Portfolio Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.portfolio-carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelector('.portfolio-slides');
        const items = carousel.querySelectorAll('.portfolio-item');
        const prevButton = carousel.querySelector('.carousel-arrow.prev');
        const nextButton = carousel.querySelector('.carousel-arrow.next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        if (!slides || items.length === 0) return;
        
        let currentIndex = 0;
        let autoScrollInterval = null;
        const autoScrollDelay = 4000; // 4 seconds
        
        function updateCarousel() {
            // Update slide position
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            // Arrows are always enabled for infinite loop
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(nextSlide, autoScrollDelay);
        }
        
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }
        
        // Event listeners
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                stopAutoScroll();
                startAutoScroll();
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                stopAutoScroll();
                startAutoScroll();
            });
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                stopAutoScroll();
                startAutoScroll();
            });
        });
        
        // Pause auto-scroll on hover
        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);
        
        // Initialize
        updateCarousel();
        startAutoScroll();
    });
});

