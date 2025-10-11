/* =================================================================
   CURSOR.JS — WAND CURSOR LOGIC & SPELL EFFECTS
   Handles wand positioning, Lumos clicks, serpent trails, 
   ancient runes, and interactive hover states
   ================================================================= */

// ============================================================
// CRITICAL: CURSOR PIVOT POINT MATHEMATICS
// ============================================================
/* The wand cursor element rotates around its tip. This pivot point
   (transform-origin in CSS) MUST be perfectly synchronized with
   the JavaScript origin coordinates below.
   
   - The container is 80x80px (defined in cursor.css).
   - The WAND.png tip is at the top-center of the image.
   - Therefore, the pivot point is X=40 (half of 80), Y=0 (top).
   
   Changing these values without updating cursor.css
   will cause the wand to rotate incorrectly. */

document.addEventListener('DOMContentLoaded', () => {
    // ═══════════════════════════════════════════════════════════
    // INITIALIZATION — Setup & Variable Declaration
    // ═══════════════════════════════════════════════════════════

    const wand = document.querySelector('.custom-wand-cursor');
    if (!wand) return; // Exit if wand element not found

    /* Pivot point coordinates - MUST match CSS transform-origin (40px, 0px) */
    const wandOriginX = 40;
    const wandOriginY = 0;

    /* State tracking variables */
    let lastX = null; // Previous mouse X position
    let lastY = null; // Previous mouse Y position
    let isHoveringInteractive = false; // Whether cursor is over interactive element
    let hoverInterval = null; // Timer for wand-tip aura effect
    let runeInterval = null; // Timer for ancient rune spawning
    let currentMouseX = 0; // Current mouse X position
    let currentMouseY = 0; // Current mouse Y position

    // ═══════════════════════════════════════════════════════════
    // LUMOS SPELL — CLICK EVENT (Wand Lighting Burst)
    // ═══════════════════════════════════════════════════════════
    /* Creates dramatic light burst with radiating sparks and
       rising ambient particles when user clicks anywhere */

    document.addEventListener('mousedown', (e) => {
        // Skip on mobile devices
        if (window.innerWidth <= 768) return;

        /* === MAIN LUMOS BURST === */
        const burst = document.createElement('div');
        burst.className = 'lumos-burst';

        // Size and positioning
        const size = 100;
        burst.style.width = `${size}px`;
        burst.style.height = `${size}px`;
        burst.style.left = `${e.clientX - size / 2}px`; // Center on click
        burst.style.top = `${e.clientY - size / 2}px`;

        // Add to DOM and auto-remove after animation
        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 1200);

        /* === RADIATING SPARKS === */
        // Create 16 sparks in a perfect circle around click point
        for (let i = 0; i < 16; i++) {
            const spark = document.createElement('div');
            spark.className = 'lumos-spark';

            // Calculate angle for even distribution
            const angle = (i / 16) * Math.PI * 2;
            const distance = 80 + Math.random() * 40; // Random distance 80-120px

            // Set direction using CSS variables
            spark.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            spark.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);

            // Position at click point
            spark.style.left = `${e.clientX}px`;
            spark.style.top = `${e.clientY}px`;

            // Add to DOM and auto-remove
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 1000);
        }

        /* === AMBIENT RISING PARTICLES === */
        // Create 8 particles that float upward after click
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'ambient-magic';

                // Random horizontal drift
                particle.style.setProperty('--drift', `${(Math.random() - 0.5) * 40}px`);

                // Random position near click point
                particle.style.left = `${e.clientX + (Math.random() - 0.5) * 60}px`;
                particle.style.top = `${e.clientY + (Math.random() - 0.5) * 60}px`;

                // Add to DOM and auto-remove
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 3000);
            }, i * 100); // Staggered timing for cascading effect
        }
    });

    // ═══════════════════════════════════════════════════════════
    // CURSOR MOVEMENT — Positioning, Trails, and Hover Detection
    // ═══════════════════════════════════════════════════════════

    document.addEventListener('mousemove', (e) => {
        /* === TRACK CURRENT POSITION === */
        // Store for use in interval functions
        currentMouseX = e.clientX;
        currentMouseY = e.clientY;

        /* === POSITION WAND CURSOR === */
        // Offset by origin point so wand tip follows mouse
        wand.style.left = `${e.clientX - wandOriginX}px`;
        wand.style.top = `${e.clientY - wandOriginY}px`;

        /* === CALCULATE MOVEMENT DELTA === */
        // Used to detect if cursor is moving (unused in current version)
        const dx = lastX === null ? 0 : e.clientX - lastX;
        const dy = lastY === null ? 0 : e.clientY - lastY;

        /* ═══════════════════════════════════════════════════════
           INTERACTIVE ELEMENT HOVER DETECTION
           Detects when cursor enters/leaves clickable elements
           ═══════════════════════════════════════════════════════ */

        // Check if hovering over any interactive element
        const interactive = e.target.closest('a, button, .hero-cta, .skill-card, .project-card, .nav-button, .social-link, .project-link, .about-illuminated-card, .glow-word, .sidebar-handle');

        if (interactive) {
            /* === ENTERING INTERACTIVE ELEMENT === */
            if (!isHoveringInteractive) {
                isHoveringInteractive = true;
                wand.classList.add('hovering'); // Straightens wand

                /* --- WAND-TIP AURA EFFECT --- */
                // Creates pulsing glow at wand tip every 400ms
                hoverInterval = setInterval(() => {
                    const aura = document.createElement('div');
                    aura.className = 'wand-tip-aura';
                    aura.style.left = `${currentMouseX - 20}px`; // Center on cursor
                    aura.style.top = `${currentMouseY - 20}px`;
                    document.body.appendChild(aura);
                    setTimeout(() => aura.remove(), 1200);
                }, 400);

                /* --- ANCIENT RUNES EFFECT --- */
                // Spawns floating runic characters every 700ms
                const runes = ['ᛋ', 'ᚦ', 'ᚱ', 'ᛚ', 'ᚺ', 'ᛗ', 'ᚹ', 'ᛈ', 'ᚾ'];
                runeInterval = setInterval(() => {
                    if (!isHoveringInteractive) return; // Safety check

                    const rune = document.createElement('div');
                    rune.className = 'ancient-rune';
                    rune.textContent = runes[Math.floor(Math.random() * runes.length)];

                    // Random rotation
                    rune.style.setProperty('--rotation', `${(Math.random() - 0.5) * 90}deg`);

                    // WIDER SPAWN AREA: 120px horizontal, 80px vertical
                    // This spreads runes more naturally around cursor
                    rune.style.left = `${currentMouseX + (Math.random() - 0.5) * 120}px`;
                    rune.style.top = `${currentMouseY + 20 + (Math.random() - 0.5) * 80}px`;

                    document.body.appendChild(rune);
                    setTimeout(() => rune.remove(), 2000);
                }, 700);
            }
        } else {
            /* === LEAVING INTERACTIVE ELEMENT === */
            if (isHoveringInteractive) {
                isHoveringInteractive = false;
                wand.classList.remove('hovering'); // Return to angled position

                // Stop both interval effects
                clearInterval(hoverInterval);
                clearInterval(runeInterval); // CRITICAL: Must clear to prevent memory leak
                hoverInterval = null;
                runeInterval = null;
            }
        }

        /* ═══════════════════════════════════════════════════════
           MOVEMENT EFFECTS — Serpent Trails & Ambient Particles
           Only active on desktop (width > 768px)
           ═══════════════════════════════════════════════════════ */

        if (window.innerWidth > 768) {
            /* --- SERPENT TRAIL BUBBLES --- */
            // Creates glowing trail behind cursor (40% spawn rate)
            if (Math.random() > 0.4) {
                const trail = document.createElement('div');
                trail.className = 'serpent-trail';
                trail.style.left = `${e.clientX - 6}px`; // Center on cursor
                trail.style.top = `${e.clientY - 6}px`;
                document.body.appendChild(trail);
                setTimeout(() => trail.remove(), 800);
            }

            /* --- AMBIENT MAGIC PARTICLES --- */
            // Occasional sparkles during movement (30% spawn rate)
            if (Math.random() > 0.7) {
                const particle = document.createElement('div');
                particle.className = 'ambient-magic';

                // Random drift and position
                particle.style.setProperty('--drift', `${(Math.random() - 0.5) * 30}px`);
                particle.style.left = `${e.clientX + (Math.random() - 0.5) * 20}px`;
                particle.style.top = `${e.clientY + (Math.random() - 0.5) * 20}px`;

                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 3000);
            }
        }

        /* === UPDATE LAST POSITION === */
        lastX = e.clientX;
        lastY = e.clientY;
    });

    // ═══════════════════════════════════════════════════════════
    // TEXT INPUT DETECTION — Typing State
    // ═══════════════════════════════════════════════════════════
    /* Angles wand differently when user is typing in forms */

    document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(el => {
        el.addEventListener('focus', () => wand && wand.classList.add('typing'));
        el.addEventListener('blur', () => wand && wand.classList.remove('typing'));
    });
});

/* =================================================================
   IMPLEMENTATION NOTES
   ================================================================= */

/* System Architecture:
   
   1. INITIALIZATION
      - DOMContentLoaded ensures HTML is ready
      - Early return if wand element missing
      - All state variables initialized
   
   2. PIVOT POINT SYNCHRONIZATION
      - The wandOriginX and wandOriginY variables MUST match the
        transform-origin property in assets/css/cursor.css.
      - This ensures the wand's tip (not its center) follows
        the mouse pointer accurately.
   
   3. CLICK HANDLING (Lumos)
      - mousedown creates burst + sparks + particles
      - All elements auto-remove via setTimeout
   
   4. MOVEMENT TRACKING
      - mousemove updates wand position every frame
      - Position is offset by the origin point for correct tip alignment.
   
   5. HOVER STATE MANAGEMENT
      - Detects interactive elements via closest()
      - Sets intervals for continuous effects on hover
      - CRITICAL: Must clear intervals on exit to prevent memory leaks
   
   6. EFFECT SPAWNING
      - All effects created as DOM elements
      - CSS handles animation via keyframes
      - Auto-cleanup via setTimeout matches animation duration
   
   7. PERFORMANCE CONSIDERATIONS
      - Probability checks (Math.random()) limit particle spawn rate
      - Mobile detection (width <= 768) skips effects
      - Intervals are limited for smooth performance
   
   8. MEMORY MANAGEMENT
      - Elements are removed after animations complete
      - Intervals are cleared when exiting hover state
      - No lingering references or event listeners
*/
