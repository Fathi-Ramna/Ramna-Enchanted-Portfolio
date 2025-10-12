/* =================================================================
   FORM.JS — CONTACT FORM PREMIUM MAGICAL ENHANCEMENTS
   Handles form validation, auto-growing textarea, character counter,
   magical particle effects, flying owl animation, and success modal
   ================================================================= */

// ============================================================
// INITIALIZATION — Setup & Variable Declaration
// ============================================================
/* Get all form elements needed for validation and effects.
   Early return if form doesn't exist to prevent errors */

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageTextarea = document.getElementById('message');
const charCounter = document.getElementById('charCounter');
const submitButton = form?.querySelector('.submit-button');

/* Exit early if form doesn't exist on the page.
   This prevents errors on pages without the contact form */
if (!form) {
    // No form found - exit gracefully
    // This is normal for pages like portfolio items or blog posts
} else {
    /* Form exists - initialize all functionality */

    // ═══════════════════════════════════════════════════════════
    // AUTO-GROWING TEXTAREA — Dynamic Height Adjustment
    // ═══════════════════════════════════════════════════════════
    /* Textarea automatically expands as user types, up to 400px max.
       Prevents need for manual scrolling while composing message */

    function autoGrowTextarea(element) {
        /* Algorithm:
           1. Reset height to 'auto' to get true scrollHeight
           2. Compare scrollHeight against 400px maximum
           3. Set height to smaller value (respects max limit) */

        element.style.height = 'auto'; // Reset to calculate true height
        element.style.height = Math.min(element.scrollHeight, 400) + 'px';
    }

    /* Trigger auto-grow on every keystroke */
    messageTextarea.addEventListener('input', function () {
        autoGrowTextarea(this);
    });

    // ═══════════════════════════════════════════════════════════
    // CHARACTER COUNTER — Live Character Count Display
    // ═══════════════════════════════════════════════════════════
    /* Shows "X / 1000" below textarea with color warnings:
       - Default: Normal color (0-700 chars)
       - Warning: Yellow (700-900 chars) 
       - Danger: Red (900-1000 chars) */

    messageTextarea.addEventListener('input', function () {
        const count = this.value.length;
        const max = 1000;

        /* Update counter text */
        charCounter.textContent = `${count} / ${max}`;

        /* Remove previous warning classes */
        charCounter.classList.remove('warning', 'danger');

        /* Apply appropriate warning class based on usage */
        if (count > max * 0.9) {
            // Over 90% (900+ chars) — Red danger state
            charCounter.classList.add('danger');
        } else if (count > max * 0.7) {
            // Over 70% (700+ chars) — Yellow warning state
            charCounter.classList.add('warning');
        }
        // Below 70% — No class (default silver color)
    });

    // ═══════════════════════════════════════════════════════════
    // FORM VALIDATION — Real-Time Field Validation
    // ═══════════════════════════════════════════════════════════
    /* Validates input fields and provides visual feedback:
       - Valid: Shows green checkmark icon
       - Invalid: Shows red X icon
       - Empty: No icon (neutral state) */

    function validateField(input) {
        /* Get parent form-group for class manipulation */
        const formGroup = input.closest('.form-group');

        /* Check if field meets validation criteria:
           1. Browser's built-in validation (validity.valid)
           2. Field is not empty (trim removes whitespace) */

        if (input.validity.valid && input.value.trim() !== '') {
            /* ═══ VALID STATE ═══ */
            formGroup.classList.remove('invalid');
            formGroup.classList.add('valid'); // Shows checkmark icon
            return true;
        } else {
            /* ═══ INVALID STATE ═══ */
            formGroup.classList.remove('valid');

            /* Only show error icon if user has typed something.
               Prevents showing errors on untouched fields */
            if (input.value.trim() !== '') {
                formGroup.classList.add('invalid'); // Shows X icon
            }
            return false;
        }
    }

    /* ═══════════════════════════════════════════════════════════
       VALIDATION EVENT LISTENERS — When to Validate
       ═══════════════════════════════════════════════════════════
       Validates on TWO events for best UX:
       1. 'blur' — When user leaves the field (lost focus)
       2. 'input' — On every keystroke (live feedback) */

    // Name field validation
    nameInput.addEventListener('blur', () => validateField(nameInput));
    nameInput.addEventListener('input', () => validateField(nameInput));

    // Email field validation
    emailInput.addEventListener('blur', () => validateField(emailInput));
    emailInput.addEventListener('input', () => validateField(emailInput));

    // Message field validation
    messageTextarea.addEventListener('blur', () => validateField(messageTextarea));
    messageTextarea.addEventListener('input', () => validateField(messageTextarea));

    // ═══════════════════════════════════════════════════════════
    // MAGICAL PARTICLE EXPLOSION — Form Submit Effect
    // ═══════════════════════════════════════════════════════════
    /* Creates 30 particles that explode outward from submit button.
       Particles use house-colored gradients and spread in circular pattern */

    function createParticleExplosion(x, y) {
        const particleCount = 30;

        /* Create particles in perfect circle around click point */
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';

            /* ═══ CALCULATE TRAJECTORY ═══ */
            // Distribute particles evenly in 360° circle
            const angle = (Math.PI * 2 * i) / particleCount;

            // Random distance 100-200px from center
            const distance = 100 + Math.random() * 100;

            // Calculate X and Y coordinates using trigonometry
            const tx = Math.cos(angle) * distance; // Horizontal offset
            const ty = Math.sin(angle) * distance; // Vertical offset

            /* ═══ TIMING VARIATION ═══ */
            // Random duration 0.8-1.2s for organic feel
            const duration = 0.8 + Math.random() * 0.4;

            /* ═══ POSITION & ANIMATION ═══ */
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.setProperty('--duration', duration + 's');

            /* Add to DOM and schedule cleanup */
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), duration * 1000);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // SUBMIT SPARKLES — Rising Particles from Button
    // ═══════════════════════════════════════════════════════════
    /* Creates 15 sparkles that rise from submit button in sequence.
       Sparkles start from button center and float upward with drift */

    function createSubmitSparkles(button) {
        /* Get button center coordinates for spawn point */
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        /* Create 15 sparkles with staggered timing */
        for (let i = 0; i < 15; i++) {
            /* Stagger each sparkle by 50ms for cascading effect */
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'submit-sparkle';

                /* ═══ TRAJECTORY CALCULATION ═══ */
                // Start position: Random spread around button center
                const startX = (Math.random() - 0.5) * 100; // ±50px horizontal
                const startY = (Math.random() - 0.5) * 100; // ±50px vertical

                // End position: Float upward with horizontal drift
                const endX = (Math.random() - 0.5) * 200; // ±100px drift
                const endY = -100 - Math.random() * 100; // Rise 100-200px

                /* ═══ TIMING VARIATION ═══ */
                const duration = 0.8 + Math.random() * 0.4; // 0.8-1.2s

                /* ═══ APPLY STYLES ═══ */
                sparkle.style.left = centerX + 'px';
                sparkle.style.top = centerY + 'px';
                sparkle.style.setProperty('--start-x', startX + 'px');
                sparkle.style.setProperty('--start-y', startY + 'px');
                sparkle.style.setProperty('--end-x', endX + 'px');
                sparkle.style.setProperty('--end-y', endY + 'px');
                sparkle.style.setProperty('--duration', duration + 's');

                /* Add to DOM and schedule cleanup */
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), duration * 1000);
            }, i * 50); // 50ms stagger per sparkle
        }
    }

    // ═══════════════════════════════════════════════════════════
    // FLYING OWL ANIMATION — SINGLE BIRD ONLY
    // ═══════════════════════════════════════════════════════════
    /* Creates animated owl that flies across screen after form submit.
       CRITICAL: Removes any existing birds FIRST to prevent duplicates.
       This ensures only ONE bird animates at a time */

    function createFlyingBird(button) {
        /* ═══ CRITICAL: CLEANUP EXISTING BIRDS ═══ */
        // Remove ALL existing birds before creating new one
        // This prevents multiple birds if user clicks submit repeatedly
        const existingBirds = document.querySelectorAll('.bird-container');
        existingBirds.forEach(bird => bird.remove());

        /* ═══ CREATE FRESH BIRD CONTAINER ═══ */
        const birdContainer = document.createElement('div');
        birdContainer.className = 'bird-container';

        /* ═══ CREATE BIRD SPRITE ═══ */
        const bird = document.createElement('div');
        bird.className = 'bird';

        /* ═══ ASSEMBLE & ADD TO DOM ═══ */
        birdContainer.appendChild(bird);
        document.body.appendChild(birdContainer);

        /* ═══ AUTO-CLEANUP AFTER ANIMATION ═══ */
        // Animation duration: 8s
        // Buffer: 200ms to ensure animation completes
        // Total timeout: 8200ms
        setTimeout(() => {
            if (birdContainer && birdContainer.parentNode) {
                birdContainer.remove();
            }
        }, 8200);
    }

    // ═══════════════════════════════════════════════════════════
    // SUCCESS MESSAGE MODAL — Submission Confirmation
    // ═══════════════════════════════════════════════════════════
    /* Displays beautiful success modal with owl icon and confirmation text.
       Auto-dismisses after 3 seconds with reverse animation */

    function showSuccessMessage() {
        /* ═══ CREATE SUCCESS MODAL ═══ */
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';

        /* ═══ MODAL CONTENT ═══ */
        // Uses Icons8 owl icon with gold tinting
        successDiv.innerHTML = `
            <div class="success-message-icon">
                <img src="https://img.icons8.com/?size=100&id=8zsZ8J2bSUE3&format=png&color=C5A56B" 
                     alt="Owl" 
                     style="width: 80px; height: 80px; filter: drop-shadow(0 0 15px rgba(197, 165, 107, 0.6));" />
            </div>
            <div class="success-message-text">Owl is on the way!</div>
            <div class="success-message-subtext">Your message has been sent successfully</div>
        `;

        /* ═══ ADD TO DOM ═══ */
        document.body.appendChild(successDiv);

        /* ═══ AUTO-DISMISS AFTER 3 SECONDS ═══ */
        setTimeout(() => {
            // Reverse the pop animation
            successDiv.style.animation = 'success-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) reverse forwards';

            // Remove from DOM after reverse animation completes
            setTimeout(() => successDiv.remove(), 400);
        }, 3000);
    }

    // ═══════════════════════════════════════════════════════════
    // FORM SUBMIT HANDLER — Main Submission Logic
    // ═══════════════════════════════════════════════════════════
    /* Validates all fields, triggers magical effects sequence,
       submits to Formspree API, and resets form on success */

    form.addEventListener('submit', async (e) => {
        /* Prevent default form submission (we'll handle it with fetch) */
        e.preventDefault();

        /* ═══════════════════════════════════════════════════════
           STEP 1: VALIDATION — Check All Fields
           ═══════════════════════════════════════════════════════
           Validate all fields before proceeding.
           If ANY field invalid, stop and show error states */

        const isNameValid = validateField(nameInput);
        const isEmailValid = validateField(emailInput);
        const isMessageValid = validateField(messageTextarea);

        if (!isNameValid || !isEmailValid || !isMessageValid) {
            // Validation failed - exit without submitting
            return;
        }

        /* ═══════════════════════════════════════════════════════
           STEP 2: DISABLE SUBMIT BUTTON — Prevent Double Submit
           ═══════════════════════════════════════════════════════ */

        submitButton.disabled = true;
        const submitText = document.getElementById('submitText');
        submitText.textContent = 'Sending...'; // Visual feedback

        /* ═══════════════════════════════════════════════════════
           STEP 3: MAGICAL EFFECTS SEQUENCE — Visual Feedback
           ═══════════════════════════════════════════════════════
           Timeline:
           T+0ms: Sparkles begin rising from button
           T+1000ms: Owl starts flying + particles explode */

        // Get button center for effect spawn point
        const rect = submitButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Immediate: Submit sparkles begin rising
        createSubmitSparkles(submitButton);

        // After 1 second: Owl flies + particle explosion
        setTimeout(() => {
            createFlyingBird(submitButton);
            createParticleExplosion(centerX, centerY);
        }, 1000);

        /* ═══════════════════════════════════════════════════════
           STEP 4: FORMSPREE API SUBMISSION — Real Email Delivery
           ═══════════════════════════════════════════════════════
           Sends form data to Formspree endpoint via fetch API.
           Uses FormData to automatically format the submission.
           Waits 4 seconds to let animations complete before showing
           success message. */

        try {
            // Prepare form data for Formspree
            const formData = new FormData(form);
            
            // Submit to Formspree API
            const response = await fetch('https://formspree.io/f/meorryrj', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Request JSON response
                }
            });

            /* ═══ SUCCESS PATH ═══ */
            if (response.ok) {
                /* Wait 4 seconds for animations to complete
                   before showing success and resetting form */
                setTimeout(() => {
                    /* --- SUCCESS MODAL --- */
                    // Display owl delivery confirmation
                    showSuccessMessage();

                    /* --- RESET FORM --- */
                    // Clear all input fields
                    form.reset();

                    /* --- CLEAR VALIDATION STATES --- */
                    // Remove all validation classes (green checkmarks, red X's)
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('valid', 'invalid');
                    });

                    /* --- RESET CHARACTER COUNTER --- */
                    // Return counter to initial state
                    charCounter.textContent = '0 / 1000';
                    charCounter.classList.remove('warning', 'danger');

                    /* --- RESET TEXTAREA HEIGHT --- */
                    // Collapse textarea back to default size
                    messageTextarea.style.height = 'auto';

                    /* --- RE-ENABLE SUBMIT BUTTON --- */
                    // Allow form to be submitted again
                    submitButton.disabled = false;
                    submitText.textContent = 'Send an Owl';

                }, 4000); // 4 second delay for animation timing

            } else {
                /* ═══ ERROR PATH: API RESPONDED WITH ERROR ═══ */
                // Formspree returned non-200 status
                throw new Error('Form submission failed');
            }

        } catch (error) {
            /* ═══════════════════════════════════════════════════
               ERROR HANDLING — Network or Submission Failure
               ═══════════════════════════════════════════════════
               Handles both network errors and API failures.
               Shows user-friendly message with fallback email. */

            console.error('Formspree submission error:', error);
            
            /* Show user-friendly error message */
            alert(
                'Oops! The owl couldn\'t deliver your message. ' +
                'Please try again or email me directly at ramnarazeek@gmail.com'
            );
            
            /* --- RE-ENABLE SUBMIT BUTTON --- */
            // Allow user to retry submission
            submitButton.disabled = false;
            submitText.textContent = 'Send an Owl';
        }
    });
}

/* =================================================================
   IMPLEMENTATION NOTES
   ================================================================= */

/* System Architecture:
   
   1. INITIALIZATION
      - Early return if form doesn't exist prevents errors
      - All event listeners only attached if form present
      - Safe for pages without contact form
   
   2. AUTO-GROWING TEXTAREA
      - Recalculates height on every keystroke
      - 400px max prevents excessive growth
      - Smooth user experience for long messages
   
   3. CHARACTER COUNTER
      - Real-time feedback on message length
      - Color warnings at 70% (yellow) and 90% (red)
      - 1000 char limit enforced by maxlength attribute
   
   4. VALIDATION SYSTEM
      - Visual feedback via CSS classes (valid/invalid)
      - Icons shown/hidden automatically
      - Validates on blur AND input for best UX
      - Empty fields don't show errors (neutral state)
   
   5. MAGICAL EFFECTS SEQUENCE
      Timeline:
      T+0ms:    Form submit
      T+0ms:    Submit sparkles begin rising
      T+1000ms: Owl animation starts
      T+1000ms: Particle explosion
      T+4000ms: Success modal appears (if submission successful)
      T+7000ms: Success modal auto-dismisses
      
   6. SINGLE OWL CONSTRAINT
      - CRITICAL: createFlyingBird() removes existing birds FIRST
      - Prevents multiple owls if user spam-clicks submit
      - Only one owl can exist at a time
   
   7. EFFECT CLEANUP
      - All effects auto-remove via setTimeout
      - Timings match CSS animation durations
      - No manual cleanup needed
      - Prevents memory leaks
   
   8. BUTTON STATE MANAGEMENT
      - Disabled during submission prevents double-submit
      - Text changes to "Sending..." for feedback
      - Re-enabled after completion or error
      - Remains disabled during 4-second animation window
   
   9. FORM RESET
      - Clears all fields
      - Removes validation states
      - Resets counter and textarea height
      - Returns UI to pristine state
   
   10. FORMSPREE INTEGRATION (PRODUCTION READY)
       - Uses async/await for clean error handling
       - FormData automatically formats submission
       - Proper error handling with user feedback
       - Fallback email provided on failure
       - No page reload required (single-page experience)
       - Server-side validation handled by Formspree
   
   11. ERROR HANDLING STRATEGY
       - Network errors caught by try/catch
       - API errors caught via response.ok check
       - User sees friendly error message
       - Console logs technical details for debugging
       - Form remains functional after errors
*/