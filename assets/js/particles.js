/* =================================================================
   PARTICLES.JS — AMBIENT MAGICAL ATMOSPHERE
   Creates floating particles, parallax effects, and hero interactions
   Handles: Sidebar particles, section particles, parallax, rune effects
   ================================================================= */

// ============================================================
// SIDEBAR FLOATING AMBIENT PARTICLES
// Creates subtle floating particles inside the sidebar card
// Gold and emerald particles float upward with random timing
// ============================================================

function createSidebarParticles() {
    /* === GET SIDEBAR ELEMENT === */
    const sidebar = document.querySelector('.premium-sidebar-card');
    if (!sidebar) return; // Exit if sidebar doesn't exist

    /* === PARTICLE CONFIGURATION === */
    const particleCount = 5; // Total particles to create

    /* === CREATE PARTICLES === */
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');

        /* --- Base Styling --- */
        particle.style.position = 'absolute';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%'; // Perfect circle
        particle.style.pointerEvents = 'none'; // Don't block clicks
        particle.style.zIndex = '0'; // Behind sidebar content

        /* --- Color Randomization --- */
        // Alternate between gold and emerald for variety
        if (Math.random() > 0.5) {
            // Gold particle
            particle.style.background = 'radial-gradient(circle, rgba(197, 165, 107, 0.6) 0%, transparent 70%)';
            particle.style.boxShadow = '0 0 10px rgba(197, 165, 107, 0.4)';
        } else {
            // Emerald particle
            particle.style.background = 'radial-gradient(circle, rgba(126, 186, 148, 0.5) 0%, transparent 70%)';
            particle.style.boxShadow = '0 0 10px rgba(126, 186, 148, 0.3)';
        }

        /* --- Random Starting Position --- */
        // Positioned within sidebar bounds to stay visible
        const startX = 10 + Math.random() * 80; // 10-90% width
        const startY = 20 + Math.random() * 60; // 20-80% height

        particle.style.left = startX + '%';
        particle.style.top = startY + '%';

        /* --- Random Animation Timing --- */
        const duration = 6 + Math.random() * 4; // 6-10 seconds per cycle
        const delay = Math.random() * 3; // 0-3 second initial delay

        /* --- Floating Animation --- */
        // Creates organic upward movement with horizontal drift
        particle.animate([
            {
                transform: 'translateY(0px) translateX(0px)',
                opacity: 0 // Starts invisible
            },
            {
                transform: 'translateY(-20px) translateX(10px)',
                opacity: 0.6, // Fades in
                offset: 0.2 // 20% through animation
            },
            {
                transform: 'translateY(-40px) translateX(-5px)',
                opacity: 0.8, // Peak visibility
                offset: 0.5 // Midpoint
            },
            {
                transform: 'translateY(-70px) translateX(8px)',
                opacity: 0.6, // Fading out
                offset: 0.8 // 80% through
            },
            {
                transform: 'translateY(-100px) translateX(-10px)',
                opacity: 0 // Invisible at top
            }
        ], {
            duration: duration * 1000, // Convert to milliseconds
            delay: delay * 1000,
            iterations: Infinity, // Loop forever
            easing: 'ease-in-out' // Smooth acceleration/deceleration
        });

        /* --- Add to Sidebar --- */
        sidebar.appendChild(particle);
    }
}

/* === INITIALIZE SIDEBAR PARTICLES === */
// Delay ensures sidebar is fully loaded before adding particles
setTimeout(createSidebarParticles, 500);

// ============================================================
// SECTIONS ENHANCEMENTS — ULTIMATE COMBO
// Adds floating particles, parallax, and interactive effects
// to all major content sections
// ============================================================

// ───────────────────────────────────────────────────────────
// CREATE FLOATING PARTICLES FOR SECTIONS
// Spawns gold and house-colored particles that rise upward
// ───────────────────────────────────────────────────────────

function createSectionParticles(sectionSelector, particleCount = 25) {
    /* === GET SECTION ELEMENT === */
    const section = document.querySelector(sectionSelector);
    if (!section) return; // Exit if section doesn't exist

    /* === CREATE PARTICLES === */
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');

        /* --- Particle Type --- */
        // Randomly assign gold or house-colored particle
        particle.className = `hero-particle ${Math.random() > 0.5 ? 'gold' : 'house-colored'}`;

        /* --- Random Starting Position --- */
        const startX = Math.random() * 100; // 0-100% horizontal
        const startY = Math.random() * 100; // 0-100% vertical

        /* --- Random Movement Direction --- */
        // tx = horizontal drift (-100px to +100px)
        const tx = (Math.random() - 0.5) * 200;
        // ty = vertical movement (always upward, -100 to -200px)
        const ty = -100 - Math.random() * 100;

        /* --- Random Timing --- */
        const duration = 8 + Math.random() * 8; // 8-16 seconds
        const delay = Math.random() * 5; // 0-5 second delay

        /* --- Apply Position and Animation Variables --- */
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.setProperty('--delay', `${delay}s`);

        /* --- Add to Section --- */
        section.appendChild(particle);
    }
}

// ───────────────────────────────────────────────────────────
// CREATE PARTICLES FOR ALL SECTIONS
// Initializes floating particles with different densities
// ───────────────────────────────────────────────────────────

function createAllSectionParticles() {
    createSectionParticles('.hero', 70);           // Hero - most particles (focal point)
    createSectionParticles('.about-section', 70);  // About - high density
    createSectionParticles('.skills-section', 100); // Skills - maximum particles (busy section)
    createSectionParticles('.projects-section', 70); // Projects - high density
    createSectionParticles('.contact-section', 70); // Contact - high density
}

// ───────────────────────────────────────────────────────────
// PARALLAX EFFECT ON SCROLL
// Creates depth by moving hero section slower than scroll speed
// ───────────────────────────────────────────────────────────

function handleHeroParallax() {
    /* === GET HERO ELEMENT === */
    const hero = document.querySelector('.hero');
    // Note: heroBackground variable declared but not used (CSS ::before handles background)
    const heroBackground = document.querySelector('.hero::before');

    if (!hero) return; // Exit if hero doesn't exist

    /* === SCROLL EVENT LISTENER === */
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset; // Current scroll position
        const heroHeight = hero.offsetHeight; // Hero section height

        /* --- Apply Parallax Only When Hero is Visible --- */
        // Prevents unnecessary transforms after scrolling past hero
        if (scrolled < heroHeight) {
            const parallaxSpeed = 0.5; // 50% of scroll speed (creates depth effect)
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ───────────────────────────────────────────────────────────
// ENHANCED HOVER EFFECT FOR HERO TITLE
// Spawns floating ancient runes when hovering over title
// ───────────────────────────────────────────────────────────

function enhanceHeroTitleHover() {
    /* === GET HERO TITLE ELEMENT === */
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return; // Exit if title doesn't exist

    /* === RUNIC CHARACTER SET === */
    // Array of actual Elder Futhark runes for authenticity
    const runes = ['ᛋ', 'ᚦ', 'ᚱ', 'ᛚ', 'ᚺ', 'ᛗ', 'ᚹ', 'ᛈ', 'ᚾ'];
    let runeInterval; // Stores interval ID for cleanup

    /* === MOUSE ENTER — Start Spawning Runes === */
    heroTitle.addEventListener('mouseenter', () => {
        runeInterval = setInterval(() => {
            /* --- Create Rune Element --- */
            const rune = document.createElement('div');
            rune.className = 'ancient-rune';
            rune.textContent = runes[Math.floor(Math.random() * runes.length)]; // Random rune

            /* --- Random Rotation --- */
            rune.style.setProperty('--rotation', `${(Math.random() - 0.5) * 90}deg`);

            /* --- Calculate Position Relative to Title --- */
            const rect = heroTitle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            /* --- Wide Spawn Area for Natural Distribution --- */
            // 2.5x width covers both left and right sides of title
            const offsetX = (Math.random() - 0.5) * rect.width * 2.5;
            const offsetY = (Math.random() - 0.5) * 120; // Vertical spread

            const x = centerX + offsetX;
            const y = centerY + offsetY;

            /* --- Position Rune --- */
            rune.style.left = `${x}px`;
            rune.style.top = `${y}px`;

            /* --- Add to DOM and Auto-Remove --- */
            document.body.appendChild(rune);
            setTimeout(() => rune.remove(), 2000); // Remove after animation completes
        }, 300); // Spawn new rune every 300ms
    });

    /* === MOUSE LEAVE — Stop Spawning Runes === */
    heroTitle.addEventListener('mouseleave', () => {
        clearInterval(runeInterval); // Stop spawning new runes
        // Note: Existing runes will complete their animations and auto-remove
    });
}

// ============================================================
// INITIALIZE ALL HERO ENHANCEMENTS
// Master initialization function called on page load
// ============================================================

function initHeroEnhancements() {
    createAllSectionParticles();  // Add particles to all sections
    handleHeroParallax();          // Enable parallax scrolling
    enhanceHeroTitleHover();       // Enable rune effects on title hover
}

/* === RUN ON PAGE LOAD === */
// Ensures all DOM elements are loaded before initialization
window.addEventListener('load', initHeroEnhancements);

/* =================================================================
   IMPLEMENTATION NOTES
   ================================================================= */

/* System Architecture:
   
   1. SIDEBAR PARTICLES
      - Created once on page load (500ms delay)
      - 5 particles per sidebar
      - Continuous infinite animation loop
      - No cleanup needed (persists throughout session)
   
   2. SECTION PARTICLES
      - Created once on page load via initHeroEnhancements()
      - Different densities per section (70-100 particles)
      - CSS handles animation via keyframes
      - Static DOM elements (no dynamic spawning)
   
   3. PARALLAX EFFECT
      - Scroll event listener transforms hero section
      - 50% parallax speed creates depth illusion
      - Only active when hero is in viewport
      - Performance: Minimal as it only affects one element
   
   4. RUNE SPAWNING
      - Only active during title hover
      - Interval creates new rune every 300ms
      - Each rune auto-removes after 2s
      - CRITICAL: clearInterval on mouseleave prevents memory leak
   
   5. PARTICLE STYLING
      - All particles styled via CSS classes
      - Gold vs house-colored determined at creation
      - CSS variables (--tx, --ty, --duration) control animation
      - Inline styles set position and timing
   
   6. PERFORMANCE CONSIDERATIONS
      - Fixed particle count prevents excessive DOM elements
      - setTimeout/setInterval for async initialization
      - Auto-cleanup of temporary elements (runes)
      - CSS animations offloaded to GPU
   
   7. TIMING STRATEGY
      - Sidebar: 500ms delay ensures sidebar loaded
      - Sections: load event ensures all elements ready
      - Runes: 300ms spawn rate balances effect vs performance
      - Animation durations: 6-16s prevents repetitive patterns
   
   8. RANDOMIZATION
      - Position: Ensures particles don't follow patterns
      - Timing: Prevents synchronized movement
      - Duration: Creates organic, natural feel
      - Direction: Adds visual complexity
*/