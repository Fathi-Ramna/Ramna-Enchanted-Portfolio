# Harry Potter-Inspired Data Science Portfolio

A dark, magical portfolio showcase combining the enchanting world of Harry Potter with modern web technologies. Built entirely from scratch with HTML, CSS, and JavaScript, featuring dynamic house themes, interactive wand cursor, and numerous magical particle effects.

## Portfolio Theme Previews

Explore all four Hogwarts house themes with full-page screenshots:

### Slytherin Theme (Default)
![Slytherin Theme](./assets/images/screenshots/slytherin-theme.png)

### Gryffindor Theme
![Gryffindor Theme](./assets/images/screenshots/gryffindor-theme.png)

### Ravenclaw Theme
![Ravenclaw Theme](./assets/images/screenshots/ravenclaw-theme.png)

### Hufflepuff Theme
![Hufflepuff Theme](./assets/images/screenshots/hufflepuff-theme.png)

## Live Demo

**[View Live Portfolio](https://fathi-ramna.github.io/Ramna-Enchanted-Portfolio/)** | **[View Documentation](https://github.com/Fathi-Ramna/Ramna-Enchanted-Portfolio)**

---

## Recent Updates

**Latest improvements to the portfolio:**

- **`responsive.css`**: Added critical stylesheet to address scaling issues on laptop screens (1366x768). Since the portfolio was originally designed on a desktop (1920x1080), content appeared oversized on smaller displays. This breakpoint ensures optimal viewing experience across all screen sizes.
- **Favicon Complete**: Populated `assets/images/favicon/` folder with full set of generated icons (apple-touch-icon, multiple sizes, webmanifest)
- **Profile Image**: Added compressed profile picture (`ramna.jpg`) to `assets/images/` for optimized loading
- **Social Preview**: Added `social-preview.jpg` for enhanced social media sharing and link previews
- **Better Organization**: Moved `wand1.png` and `wand2.png` from root directory into `assets/images/` for improved project structure

---

## Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [File Breakdown](#file-breakdown)
- [Customization Guide](#customization-guide)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## About The Project

This project is a personal Data Science portfolio that merges a dark, magical aesthetic inspired by Harry Potter with modern web development practices. Every element has been carefully crafted to create an immersive, memorable user experience while showcasing professional skills and projects.

### Key Highlights

- **100% Custom Built**: No templates or frameworks - every line of code written from scratch
- **Theme Persistence**: User preferences saved across sessions
- **Performance Optimized**: Pure vanilla JavaScript for fast load times
- **Accessibility Focused**: Semantic HTML and keyboard navigation support
- **Mobile Responsive**: Seamless experience across all devices

---

## Features

### Interactive Wand Cursor
The default cursor is replaced by a magical wand that emits sparks, trails, and ancient runes on hover and click, creating an immersive magical experience.

### Dynamic House Themes
Switch between four distinct Hogwarts house themes (Slytherin, Gryffindor, Ravenclaw, Hufflepuff), each featuring:
- Unique color palettes
- Custom background imagery
- House-specific atmospheric effects
- Theme persistence via sessionStorage

### Animated & Interactive UI
- Floating magical particles with parallax effects
- "Potion vial" skill meters with bubbling animations
- Flying owl animation on form submission
- Smooth scroll navigation
- Glitch effects and hover interactions

### Professional Features
- Custom-designed favicon set for all devices
- Fully responsive layout with optimized breakpoints scaling from desktop (1920x1080) to laptop (1366x768), tablet, and mobile
- Well-documented, maintainable codebase
- Form validation with character counters
- Downloadable resume integration
- Social media preview image for link sharing

---

## Built With

- **HTML5** - Semantic structure and content
- **CSS3** - Advanced styling with Flexbox, Grid, and animations
- **Vanilla JavaScript (ES6+)** - All interactivity without external libraries
- **Google Fonts** - Typography
- **Font Awesome** - Icons
- **Icons8** - Additional icon resources

---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)
  - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code
  - Python: `python -m http.server 8000`
  - Node.js: `npx serve`

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Fathi-Ramna/Ramna-Enchanted-Portfolio.git
   ```

2. Navigate to the project directory
   ```bash
   cd Ramna-Enchanted-Portfolio
   ```

3. Open with a local server
   - **Using VS Code Live Server**: Right-click on `index.html` and select "Open with Live Server"
   - **Using Python**: Run `python -m http.server 8000` and visit `http://localhost:8000`
   - **Direct file access**: Open `index.html` directly in your browser (some features may be limited)

---

## Usage

### Navigating the Portfolio

- Use the top navigation dock to jump between sections
- Click the gold door handle icon for the slide-out sidebar on mobile
- Hover over elements to reveal magical cursor effects
- Click the Hogwarts building icon to change between house themes

### Customizing for Your Own Use

1. **Personal Information**: Update content in `index.html`
   - Hero section: Name, title, description
   - About section: Bio and profile image
   - Skills section: Technologies and proficiency levels
   - Projects section: Portfolio pieces with links
   - Contact section: Email and social links

2. **Resume**: Replace `assets/files/Fathima_Ramna_Resume.pdf` with your own PDF

3. **Images**: Add your own images to `assets/images/`
   - Profile photo
   - Project screenshots
   - Custom backgrounds (optional)

4. **Favicon**: Replace favicon files in `assets/images/favicon/` if you want a custom one

5. **Theme Colors**: Modify house theme files in `assets/css/themes/` to match your preferences

---

## Project Structure

```
/Enchanted-Portfolio
├── assets/
│   ├── css/
│   │   ├── themes/
│   │   │   ├── slytherin.css
│   │   │   ├── gryffindor.css
│   │   │   ├── ravenclaw.css
│   │   │   └── hufflepuff.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── sections.css
│   │   ├── animations.css
│   │   ├── cursor.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── cursor.js
│   │   ├── theme-switcher.js
│   │   ├── navigation.js
│   │   ├── particles.js
│   │   └── form.js
│   ├── images/
│   │   ├── background/
│   │   ├── favicon/
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── favicon-16x16.png
│   │   │   ├── favicon-32x32.png
│   │   │   ├── favicon.ico
│   │   │   └── site.webmanifest
│   │   ├── projects/
│   │   │   ├── project-1.png
│   │   │   ├── project-2.png
│   │   │   └── project-3.png
│   │   ├── screenshots/
│   │   │   ├── slytherin-theme.png
│   │   │   ├── gryffindor-theme.png
│   │   │   ├── ravenclaw-theme.png
│   │   │   └── hufflepuff-theme.png
│   │   ├── ramna.jpg
│   │   ├── social-preview.jpg
│   │   ├── wand1.png
│   │   └── wand2.png
│   ├── fonts/
│   │   ├── HarryPotter.ttf
│   │   └── OFL.txt
│   └── files/
│       └── Fathima_Ramna_Resume.pdf
├── index.html
├── LICENSE
└── README.md
```

---

## File Breakdown

### Core Structure

**`index.html`**
- The backbone of the entire site
- Contains all content, text, images, and structural elements
- Includes sections: Hero, About, Skills, Projects, Contact, Footer
- Links to all CSS and JavaScript modules

### Styling (CSS)

**`assets/css/base.css`**
- Foundation styles: fonts, colors, CSS variables
- Default dark theme background
- Universal color variables (`--gold`, `--silver`, etc.)
- Custom scrollbar styling

**`assets/css/layout.css`**
- Navigation dock structure
- Sidebar slide-out menu
- Theme switcher artifact positioning
- Responsive grid layouts

**`assets/css/sections.css`**
- Section-specific styling
- Hero, About, Skills, Projects, Contact, Footer
- Component spacing and alignment

**`assets/css/themes/`**
- Individual house theme stylesheets
- Color palette definitions per house
- Background images and overlays
- House-specific atmospheric effects

**`assets/css/animations.css`**
- All `@keyframes` animations
- Hero title glitch effect
- Potion vial bubbles
- Particle floating animations
- Hover transitions

**`assets/css/cursor.css`**
- Custom wand cursor styling
- Magical effect overlays (Lumos, sparks, runes)
- Serpent trail animations
- Click and hover states

**`assets/css/responsive.css`**
- Responsive design breakpoints for optimal viewing across devices
- Critical laptop breakpoint (1366x768) to scale down content designed for desktop (1920x1080)
- Adjusts layout, typography, and spacing to prevent oversized elements on smaller screens
- Ensures consistent visual experience across desktop, laptop, tablet, and mobile devices

### Interactivity (JavaScript)

**`assets/js/cursor.js`**
- Mouse position tracking
- Custom wand cursor replacement
- Magical effects on click and hover
- Particle emission system
- Rune generation

**`assets/js/theme-switcher.js`**
- House theme selection logic
- CSS variable application
- sessionStorage persistence
- Theme artifact interactions

**`assets/js/navigation.js`**
- Smooth scroll functionality
- Navigation button click handlers
- Sidebar open/close controls
- Active section highlighting

**`assets/js/particles.js`**
- Ambient particle generation
- Canvas-based animation
- Parallax scrolling effects
- Performance optimization

**`assets/js/form.js`**
- Contact form validation
- Real-time error checking
- Character counter
- Flying owl submission animation
- Form reset functionality

---

## Customization Guide

### Adding a New Section

1. Add HTML structure in `index.html`
2. Create corresponding styles in `sections.css`
3. Add navigation link in the nav dock
4. Update smooth scroll functionality in `navigation.js`

### Creating a New Theme

1. Duplicate an existing theme file in `assets/css/themes/`
2. Rename and modify color variables
3. Update background images
4. Add theme option in `theme-switcher.js`
5. Update theme switcher UI in `index.html`

### Modifying Animations

1. Locate animation in `animations.css`
2. Adjust `@keyframes` timing and properties
3. Update animation duration/delay in respective CSS files
4. Test across different browsers for consistency

### Adding Interactive Elements

1. Create HTML structure
2. Style in appropriate CSS file
3. Add JavaScript functionality in new or existing JS module
4. Link script in `index.html` if creating new module

---

## Roadmap

- [ ] Add dark/light mode toggle
- [ ] Implement blog section with markdown support
- [ ] Create project detail pages
- [ ] Add accessibility improvements (ARIA labels, focus indicators)
- [ ] Integrate contact form backend (EmailJS or similar)
- [ ] Add loading screen animation
- [ ] Create printable resume view
- [ ] Add language switcher (i18n support)
- [ ] Implement analytics tracking
- [ ] Add unit tests for JavaScript modules

See the [open issues](https://github.com/Fathi-Ramna/Ramna-Enchanted-Portfolio/issues) for a full list of proposed features and known issues.

---

## Contributing

Contributions are welcome! If you have suggestions for improvements:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate comments.

---

## License

Distributed under the MIT License. See `LICENSE` file for more information.

**Note on Harry Potter Assets**: This project uses themes inspired by Harry Potter for educational and portfolio purposes. Harry Potter and all related marks are trademarks of Warner Bros. Entertainment Inc.

---

## Contact

**Fathima Ramna** - [ramnarazeek@gmail.com](mailto:ramnarazeek@gmail.com)

**Project Link**: [https://github.com/Fathi-Ramna/Ramna-Enchanted-Portfolio](https://github.com/Fathi-Ramna/Ramna-Enchanted-Portfolio)

**Portfolio**: [https://fathi-ramna.github.io/Ramna-Enchanted-Portfolio/](https://fathi-ramna.github.io/Ramna-Enchanted-Portfolio/)

### Connect With Me

- LinkedIn: [linkedin.com/in/fathima-ramna-643785355](https://www.linkedin.com/in/fathima-ramna-643785355/)
- GitHub: [github.com/Fathi-Ramna](https://github.com/Fathi-Ramna)
- X (Twitter): [@fathi_ramna](https://x.com/fathi_ramna)
- Portfolio: [fathi-ramna.github.io/Ramna-Enchanted-Portfolio](https://fathi-ramna.github.io/Ramna-Enchanted-Portfolio/)

---

## Acknowledgments

### Resources & Inspiration

- **Fonts**
  - Google Fonts for body and heading typography
  - "Harry P" font by Phoenix Phonts & GeM (licensed for free personal use)

- **Icons & Graphics**
  - [Icons8](https://icons8.com/) for icon resources
  - [Font Awesome](https://fontawesome.com/) for additional icons

- **Inspiration**
  - The magical world of Harry Potter by J.K. Rowling
  - Various portfolio designs on Dribbble and Behance
  - Modern web design trends and best practices

- **Learning Resources**
  - [MDN Web Docs](https://developer.mozilla.org/) for web development reference
  - [CSS-Tricks](https://css-tricks.com/) for advanced CSS techniques
  - [JavaScript.info](https://javascript.info/) for modern JavaScript

### Special Thanks

- Thanks to [Vathsaran](https://github.com/Varo-Saran) for testing the portfolio across different devices, providing valuable UI/UX feedback, and helping troubleshoot the wand cursor logic and responsive design challenges.

---

**Crafted with precision and a touch of magic** ✨

---

<sub>This project is not affiliated with or endorsed by Warner Bros. Entertainment Inc. or J.K. Rowling.</sub>
