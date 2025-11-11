/* =================================================================
   THEME-SWITCHER.JS — DYNAMIC HOUSE THEME MANAGEMENT
   Handles theme selection via the theme artifact, updates UI,
   and persists the chosen theme using sessionStorage.
   ================================================================= */

// =================================================================
// HOUSE DATA CONFIGURATION — Centralized Theme Properties
// =================================================================
/**
 * A constant object that holds all the data for each house theme.
 * This centralized approach makes it easy to update theme details
 * like names, mottos, and icon URLs in one place.
 *
 * Each key represents a theme name (e.g., 'slytherin') and corresponds
 * to a CSS class (`.theme-slytherin`).
 */
const houseData = {
    slytherin: {
        name: 'Slytherin',
        motto: 'cunning and ambition',
        iconUrl: 'https://img.icons8.com/?size=100&id=KHzbbdfBj3PC&format=png&color=C5A56B' // Gold Serpent Icon
    },
    gryffindor: {
        name: 'Gryffindor',
        motto: 'courage and bravery',
        iconUrl: 'https://img.icons8.com/?size=100&id=tFRiEf3LNBq1&format=png&color=C5A56B' // Gold Lion Icon
    },
    ravenclaw: {
        name: 'Ravenclaw',
        motto: 'wisdom and wit',
        iconUrl: 'https://img.icons8.com/?size=100&id=laHLFSZYAL7R&format=png&color=C5A56B' // Gold Eagle Icon
    },
    hufflepuff: {
        name: 'Hufflepuff',
        motto: 'loyalty and dedication',
        iconUrl: 'https://img.icons8.com/?size=100&id=P0cRkx5QSpbK&format=png&color=C5A56B' // Gold Badger Icon
    }
};

// =================================================================
// CORE THEME CHANGE FUNCTION
// =================================================================
/**
 * Applies a new theme to the website. This function is exposed globally
 * so it can be called directly from onclick attributes in the HTML.
 *
 * @param {string} theme - The name of the theme to apply (e.g., 'slytherin').
 */
window.changeTheme = function (theme) {
    // Get the house badge element from the DOM.
    const badge = document.getElementById('houseBadge');
    // Retrieve the corresponding house data, defaulting to Slytherin if the theme is invalid.
    const house = houseData[theme] || houseData['slytherin'];

    // --- 1. Update Body Class ---
    // Remove all possible theme classes to ensure a clean slate.
    document.body.classList.remove('theme-slytherin', 'theme-gryffindor', 'theme-ravenclaw', 'theme-hufflepuff');
    // Add the new theme class, which triggers all the theme-specific CSS variables.
    document.body.classList.add(`theme-${theme}`);

    // --- 2. Update House Badge UI ---
    // If the badge element exists, update its content with the new house info.
    if (badge) {
        badge.innerHTML = `
            <img src="${house.iconUrl}" alt="${house.name} crest" style="width: 20px; height: 20px; object-fit: contain;">
            <span>House ${house.name}</span>
        `;
    }

    // --- 3. Persist Theme Choice ---
    // Save the selected theme to sessionStorage. This choice will be remembered
    // for the duration of the browser tab session.
    sessionStorage.setItem('selectedTheme', theme);
}

// =================================================================
// INITIALIZATION ON PAGE LOAD
// =================================================================
/**
 * Sets up the theme and event listeners once the HTML document is fully loaded.
 * This ensures all elements are available before the script tries to interact with them.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Load Saved Theme ---
    // Check sessionStorage for a previously selected theme.
    // If none is found, default to 'slytherin'.
    const savedTheme = sessionStorage.getItem('selectedTheme') || 'slytherin';

    // Apply the loaded or default theme.
    changeTheme(savedTheme);

    // --- 2. Setup Artifact Panel Toggle ---
    // Get the toggle button and the panel itself.
    const toggle = document.getElementById('artifactToggle');
    const panel = document.getElementById('artifactPanel');

    // Add a click event listener to the toggle button to show/hide the theme selection panel.
    if (toggle && panel) {
        toggle.addEventListener('click', () => panel.classList.toggle('open'));
    }

    // --- 3. Setup Mobile Theme Toggle ---
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    if (mobileThemeToggle) {
        // Define the theme cycle order
        const themes = ['slytherin', 'gryffindor', 'ravenclaw', 'hufflepuff'];

        mobileThemeToggle.addEventListener('click', () => {
            // Get current theme
            const currentTheme = sessionStorage.getItem('selectedTheme') || 'slytherin';
            // Find current index
            const currentIndex = themes.indexOf(currentTheme);
            // Calculate next index (cycle back to 0 if at the end)
            const nextIndex = (currentIndex + 1) % themes.length;
            // Apply next theme
            changeTheme(themes[nextIndex]);

            // Add a brief animation feedback
            mobileThemeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                mobileThemeToggle.style.transform = '';
            }, 300);
        });
    }
});

/* =================================================================
   IMPLEMENTATION NOTES
   =================================================================
   
   1. GLOBAL FUNCTION:
      - `window.changeTheme` is intentionally made global to be accessible
        from the `onclick` attributes in `index.html`. This is a simple
        and direct way to handle clicks without needing more complex event delegation.

   2. THEME PERSISTENCE:
      - `sessionStorage` is used to remember the user's theme choice.
      - Unlike `localStorage`, `sessionStorage` is cleared when the browser
        tab is closed, providing a fresh "Slytherin" default for each new visit.

   3. DEFAULT THEME:
      - The site gracefully defaults to 'slytherin' if no theme is saved or
        an invalid theme name is somehow passed to `changeTheme`.

   4. UI SYNCHRONIZATION:
      - The script updates both the `<body>` class (which controls all styling)
        and the `houseBadge` UI element to keep the visual state consistent.
*/
