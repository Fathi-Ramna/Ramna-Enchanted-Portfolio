/* =================================================================
   NAVIGATION.JS — UI BEHAVIORS & SCROLL LOGIC
   Handles sidebar toggling, smooth scrolling, intersection observer
   for animations, and dynamic positioning of UI elements.
   ================================================================= */

// =================================================================
// SIDEBAR SOCIAL LINKS — MAGICAL PARTICLE EFFECTS
// =================================================================
/**
 * Adds a magical particle burst effect when the user hovers over
 * the social media icons in the sidebar. This enhances interactivity
 * and provides visual feedback.
 */
const sidebarSocialLinks = document.querySelectorAll('.sidebar-drawer .social-link');

sidebarSocialLinks.forEach(link => {
    link.addEventListener('mouseenter', function (e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create 8 sparkle particles that explode outwards.
        for (let i = 0; i < 8; i++) {
            // Stagger the creation for a more organic effect.
            setTimeout(() => {
                const particle = document.createElement('div');
                // Basic particle styling (position, size, color).
                particle.style.position = 'fixed';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.borderRadius = '50%';
                particle.style.background = 'rgba(197, 165, 107, 0.9)'; // Gold
                particle.style.boxShadow = '0 0 8px rgba(197, 165, 107, 0.8)';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9998';

                // Calculate the particle's trajectory in a circular pattern.
                const angle = (i / 8) * Math.PI * 2;
                const distance = 30 + Math.random() * 20; // Fly out 30-50px
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                // Set initial position at the center of the icon.
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';

                document.body.appendChild(particle);

                // Animate the particle using the Web Animations API.
                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) scale(0.3)`, opacity: 0 }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                });

                // Clean up the particle from the DOM after the animation completes.
                setTimeout(() => particle.remove(), 800);
            }, i * 50); // 50ms delay between each particle
        }
    });
});


// =================================================================
// GLOBAL UTILITY FUNCTIONS — Sidebar & Scrolling
// =================================================================
/**
 * Toggles the visibility of the sidebar by adding/removing the 'open' class.
 * Exposed globally to be callable from `onclick` in the HTML.
 */
window.toggleSidebar = function () {
    document.getElementById('sidebarDrawer').classList.toggle('open');
}

/**
 * Scrolls the page smoothly to a specified section.
 * Exposed globally to be callable from `onclick` in the HTML.
 * @param {string} id - The ID of the target section element.
 */
window.scrollToSection = function (id) {
    // Special case for the hero section to scroll to the very top.
    if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const el = document.getElementById(id);
    if (!el) return; // Exit if the element doesn't exist.

    // Calculate the target position with an offset to account for the nav dock.
    const offset = 80;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
}


// =================================================================
// SCROLL-REVEAL ANIMATIONS — Intersection Observer
// =================================================================
/**
 * Uses the Intersection Observer API to add an 'active' class to sections
 * when they enter the viewport, triggering CSS fade-in animations.
 */
const reveals = document.querySelectorAll('.scroll-reveal');
const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible.

reveals.forEach(revealElement => intersectionObserver.observe(revealElement));


// =================================================================
// SCROLL INDICATOR — Hide on Scroll
// =================================================================
/**
 * Fades out the hero section's scroll-down indicator arrow
 * once the user has started scrolling.
 */
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    if (scrollIndicator) {
        scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    }
});


// =================================================================
// HOUSE BADGE POSITIONING — Stick Above Footer
// =================================================================
/**
 * Manages the position of the house badge so that it "sticks"
 * above the footer instead of overlapping it when the user
 * scrolls to the bottom of the page.
 */
function handleHouseBadgePosition() {
    const badge = document.getElementById('houseBadge');
    const footer = document.querySelector('.footer');

    if (!badge || !footer) return; // Exit if elements are not found.

    function updateBadgePosition() {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const badgeBottomMargin = 20; // Corresponds to 1.2rem

        // Check if the top of the footer is visible within the viewport.
        if (footerRect.top < viewportHeight) {
            // If so, calculate the badge's new 'bottom' style property
            // to keep it perfectly placed above the rising footer.
            const distanceFromBottom = viewportHeight - footerRect.top;
            badge.style.bottom = `${distanceFromBottom + badgeBottomMargin}px`;
        } else {
            // Otherwise, reset it to its default fixed position.
            badge.style.bottom = '1.2rem';
        }
    }

    // Run the check on every scroll event and on initial page load.
    window.addEventListener('scroll', updateBadgePosition);
    document.addEventListener('DOMContentLoaded', updateBadgePosition);
}

// Initialize the badge positioning logic.
handleHouseBadgePosition();

/* =================================================================
   IMPLEMENTATION NOTES
   =================================================================
   
   1. EVENT-DRIVEN UI:
      - The file primarily consists of event listeners (`mouseenter`, `scroll`,
        `DOMContentLoaded`) that trigger specific UI updates, making the
        page feel responsive and alive.

   2. PERFORMANCE:
      - The Intersection Observer is more performant than listening for scroll
        events to trigger animations, as it avoids constant calculations.
      - Scroll listeners for the indicator and badge are lightweight, only
        updating style properties on a few elements.

   3. GLOBAL SCOPE:
      - `toggleSidebar` and `scrollToSection` are attached to the `window` object
        to be easily called from HTML `onclick` attributes, simplifying the
        connection between markup and script for these core functions.

   4. DYNAMIC POSITIONING:
      - The `handleHouseBadgePosition` logic is a key detail for polishing
        the UI. It prevents element overlap and ensures a clean layout
        at all scroll depths, which is crucial for a professional look.
*/
