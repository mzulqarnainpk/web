/**
 * Muhammad Zulqarnain - Lead Generation & SDR Specialist Portfolio
 * Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       CONFIGURABLE CONTACT PLACEHOLDERS
       (Replace values here if needed)
       ========================================================================== */
    const CONFIG = {
        email: 'YOUR_EMAIL@example.com',
        whatsapp: 'YOUR_WHATSAPP_NUMBER',
        linkedin: 'YOUR_LINKEDIN_URL'
    };

    /* ==========================================================================
       1. STICKY HEADER & SCROLL DETECTOR
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking any navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       3. ACTIVE NAVIGATION HIGHLIGHTER ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-list a[href*="#${sectionId}"]`);

            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetNavLink.classList.add('active');
                } else {
                    targetNavLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    /* ==========================================================================
       4. PORTFOLIO JS FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ==========================================
// INFINITE RUNNING PROCESS TRACKER (JS)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.process-track');
    if (!track) return;

    // Clone all process items for seamless infinite looping
    const items = Array.from(track.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let scrollPos = 0;
    const speed = 1; // Adjust speed (higher number = faster running speed)
    let isPaused = false;

    // Pause running animation on hover
    track.parentElement.addEventListener('mouseenter', () => isPaused = true);
    track.parentElement.addEventListener('mouseleave', () => isPaused = false);

    function runProcessTrack() {
        if (!isPaused) {
            scrollPos += speed;

            // Reset position seamlessly when halfway point is reached
            if (scrollPos >= track.scrollWidth / 2) {
                scrollPos = 0;
            }
            track.scrollLeft = scrollPos;
        }
        requestAnimationFrame(runProcessTrack);
    }

    runProcessTrack();
});

    /* ==========================================================================
       5. AUTOMATIC FOOTER YEAR UPDATER
       ========================================================================== */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
       ========================================================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply inline subtle reveal setup & observe cards
    const animatedElements = document.querySelectorAll('.card, .process-step, .trust-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
    });
});


// Continuous Full Page Snow Animation Logic
(function() {
    const canvas = document.getElementById('snow-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, flakes;

    // Configuration Settings
    const config = {
        color: 'rgba(255, 255, 255, 0.8)', // Snow flake color & opacity
        count: 140,                         // Total number of snowflakes
        minSize: 1,                        // Minimum flake size in px
        maxSize: 3.5,                      // Maximum flake size in px
        minSpeed: 0.5,                      // Minimum fall speed
        maxSpeed: 2.0,                      // Maximum fall speed
        wind: 0.4                           // Horizontal drift sway factor
    };

    function setCanvasDimensions() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createSnowflake() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * (config.maxSize - config.minSize) + config.minSize,
            speed: Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed,
            angle: Math.random() * Math.PI * 2,
            spin: Math.random() * 0.02 - 0.01
        };
    }

    function initSnow() {
        setCanvasDimensions();
        flakes = Array.from({ length: config.count }, createSnowflake);
    }

    function updateSnow() {
        for (let i = 0; i < flakes.length; i++) {
            let flake = flakes[i];
            
            flake.y += flake.speed;
            flake.angle += flake.spin;
            flake.x += Math.sin(flake.angle) * config.wind;

            // Continuous loop reset logic
            if (flake.y > height) {
                flakes[i] = createSnowflake();
                flakes[i].y = -5; // Reset to just above the screen top
            }

            if (flake.x < -flake.size) flake.x = width;
            if (flake.x > width + flake.size) flake.x = 0;
        }
    }

    function renderSnow() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = config.color;
        ctx.beginPath();
        for (let i = 0; i < flakes.length; i++) {
            let flake = flakes[i];
            ctx.moveTo(flake.x, flake.y);
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        }
        ctx.fill();
    }

    function animateSnow() {
        updateSnow();
        renderSnow();
        requestAnimationFrame(animateSnow);
    }

    window.addEventListener('resize', setCanvasDimensions);
    initSnow();
    animateSnow();
})();


// Custom Cursor Movement and Interaction Logic
document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    if (!cursorDot || !cursorOutline) return;

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Instant position for the inner dot
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth trailing animation for the outer ring
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });

    // Expand cursor when hovering over links, buttons, and interactive tags
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, .btn, svg");

    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-active");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-active");
        });
    });
});

// Add to js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
});

// Add to js/script.js
const startCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 60; // Speed adjustment

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target + '+';
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });

        observer.observe(counter);
    });
};

document.addEventListener('DOMContentLoaded', startCounters);

// Add to js/script.js
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max tilt angle
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// Add to js/script.js
const words = ["SDR Specialist", "Cold Email Strategist", "B2B Sales Developer", "Pipeline Builder"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const targetEl = document.getElementById('typing-text');

function typeEffect() {
    if (!targetEl) return;
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
        targetEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        targetEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentWord.length) {
        speed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// ==========================================
// MULTI-COLOR SNOW ANIMATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('snow-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Color Palette for Snowdrops (Cyan, Indigo, Purple, Pink, Emerald, White)
    const snowColors = [
        '#38BDF8', // Neon Cyan
        '#818CF8', // Neon Indigo
        '#C084FC', // Purple
        '#F472B6', // Pink
        '#34D399', // Mint Emerald
        '#FFFFFF'  // White
    ];

    // Pick random color from palette
    function getRandomColor() {
        return snowColors[Math.floor(Math.random() * snowColors.length)];
    }

    // Create 120 snowflakes with individual colors
    const flakes = Array.from({ length: 120 }, function() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 1.5 + 0.5,
            angle: Math.random() * Math.PI * 2,
            spin: Math.random() * 0.02 - 0.01,
            color: getRandomColor()
        };
    });

    function updateSize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function renderSnow() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < flakes.length; i++) {
            let f = flakes[i];
            f.y += f.speed;
            f.angle += f.spin;
            f.x += Math.sin(f.angle) * 0.5;

            // Reset loop back to top with a new color
            if (f.y > height) {
                f.y = -5;
                f.x = Math.random() * width;
                f.color = getRandomColor();
            }
            if (f.x < 0) f.x = width;
            if (f.x > width) f.x = 0;

            // Draw colored snowflake
            ctx.fillStyle = f.color;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        requestAnimationFrame(renderSnow);
    }

    window.addEventListener('resize', updateSize);
    renderSnow();
});