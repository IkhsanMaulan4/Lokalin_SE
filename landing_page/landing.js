// JavaScript for the landing page

// Countdown Timer Function
function startCountdown() {
    // Set the countdown for 24 hours
    let hours = 23;
    let minutes = 59;
    let seconds = 59;
    
    const countdownElement = document.getElementById('countdown');
    
    function updateCountdown() {
        // Format time values to ensure 2 digits
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        
        // Update the countdown display
        countdownElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        
        // Decrease the time
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // Reset the countdown when it reaches zero
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
            }
        }
    }
    
    // Initial call to display the countdown immediately
    updateCountdown();
    
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
}

// Slider Navigation
function initSlider() {
    const slider = document.querySelector('.deals-slider');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    
    // Calculate the scroll distance based on card width and gap
    const scrollDistance = 235; // Card width (220px) + gap (15px)
    
    if (leftArrow && rightArrow && slider) {
        // Scroll left
        leftArrow.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollDistance,
                behavior: 'smooth'
            });
        });
        
        // Scroll right
        rightArrow.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollDistance,
                behavior: 'smooth'
            });
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const categoriesBtn = document.querySelector('.categories-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    // Handle touch events for mobile
    if (categoriesBtn && dropdownContent) {
        categoriesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!categoriesBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.style.display = 'none';
            }
        });
    }
}

// Initialize all functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    initSlider();
    initMobileMenu();
    
    // Placeholder images handling - you can remove this in production
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'https://via.placeholder.com/400x300?text=Placeholder+Image';
        });
    });
});