document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Nav (Hamburger) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Hamburger Animation
        hamburger.classList.toggle('toggle');
    });
    
    // Close nav when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
                // Reset link animations
                links.forEach(link => link.style.animation = '');
            }
        });
    });

    // --- 2. Dark Mode Toggle ---
    const darkToggle = document.getElementById('darkToggle');
    const body = document.body;

    // Check for saved preference in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    darkToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        darkToggle.textContent = '☀️'; // Sun icon
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        darkToggle.textContent = '🌙'; // Moon icon
        localStorage.setItem('darkMode', 'disabled');
    }

    // --- 3. Scroll-Reveal Animations ---
    const sections = document.querySelectorAll('.hidden-section');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // We can unobserve it once it's visible if we don't want it to re-animate
                // revealObserver.unobserve(entry.target); 
            }
            // Optional: to make it fade out when scrolling up
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    }, {
        root: null, // relative to viewport
        threshold: 0.15 // 15% of the item must be visible
    });

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // --- 4. Project Filtering ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Show/Hide cards
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

});

// This CSS keyframe is needed for the nav links animation, 
// but it's hard to add to a .css file from JS, so I'm adding it dynamically.
const style = document.createElement('style');
style.innerHTML = `
@keyframes navLinkFade {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
}
`;
document.head.appendChild(style);