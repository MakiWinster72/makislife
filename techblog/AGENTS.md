# AGENTS.md - Development Guidelines for Maki's Tech Blog

This document provides comprehensive guidelines for development agents working on this static tech blog. Follow these conventions to maintain consistency and quality across the codebase.

## Build, Lint, and Test Commands

### Development Server
Since this is a static site, use Python's built-in HTTP server for local development:
```bash
# Python 3
python -m http.server 8000

# Or using npx if Node.js is available
npx serve .
```

### Code Quality Tools (Recommended Setup)
While not currently configured, consider adding these tools for better code quality:

**ESLint for JavaScript:**
```bash
npm init -y
npm install --save-dev eslint
npx eslint --init
npx eslint assets/js/script.js
```

**Prettier for code formatting:**
```bash
npm install --save-dev prettier
npx prettier --write assets/js/script.js assets/css/styles.css
```

**Stylelint for CSS:**
```bash
npm install --save-dev stylelint stylelint-config-standard
npx stylelint assets/css/styles.css
```

### Testing
Currently no test framework is configured. For JavaScript functionality testing, consider:
```bash
# Jest setup (if adding tests)
npm install --save-dev jest
npm test
```

## Code Style Guidelines

### JavaScript Conventions

**File Structure:**
- Use IIFE (Immediately Invoked Function Expressions) for module isolation
- Group related functionality into named functions or classes
- Place DOM manipulation code in event listeners
- Initialize features on `DOMContentLoaded`

**Example Structure:**
```javascript
// Feature initialization
(function initFeature() {
  // Feature logic here
})();

// Event handlers
document.addEventListener('DOMContentLoaded', () => {
  // Initialization code
});
```

**Naming Conventions:**
- Use `camelCase` for variables and functions: `currentArticle`, `loadArticle()`
- Use `PascalCase` for classes: `ArticleTree`, `ImageZoom`
- Use descriptive names: `sidebarToggle` instead of `btn`
- Prefix event handlers: `handleClick`, `onScroll`

**Code Organization:**
- Group related functions together
- Use consistent spacing and indentation (2 spaces)
- Add comments for complex logic blocks
- Keep functions focused on single responsibilities

**DOM Manipulation:**
- Use `document.getElementById()` for single elements
- Use `document.querySelector()` for complex selectors
- Cache DOM references when used multiple times
- Use `addEventListener()` for event binding

**Error Handling:**
- Use try-catch blocks for async operations
- Provide user-friendly error messages
- Log errors to console for debugging
- Gracefully handle missing elements

**Example:**
```javascript
async function loadArticle(article) {
  try {
    const response = await fetch(article.contentFile);
    if (!response.ok) throw new Error('Article not found');
    const content = await response.text();
    // Process content
  } catch (error) {
    console.error('Failed to load article:', error);
    showErrorMessage('Unable to load article content');
  }
}
```

### CSS Conventions

**CSS Custom Properties:**
- Define theme variables in `:root` and `[data-theme="dark"]`
- Use semantic naming: `--bg-primary`, `--text-secondary`
- Group related properties: colors, spacing, shadows

**Structure:**
- Use component-based organization with comments
- Follow BEM-like naming where appropriate
- Use CSS Grid and Flexbox for layouts
- Implement responsive design with media queries

**Example:**
```css
/* Component section */
.article-container {
  /* Styles */
}

.article-container__header {
  /* Sub-component styles */
}
```

**Performance:**
- Use CSS transitions with `will-change` for animations
- Minimize layout thrashing
- Use `transform` and `opacity` for animations
- Optimize font loading with `font-display: swap`

### HTML Structure

**Semantic HTML:**
- Use appropriate semantic elements: `<header>`, `<main>`, `<aside>`, `<article>`
- Maintain accessibility with ARIA labels
- Use proper heading hierarchy (h1-h6)

**Attributes:**
- Include `alt` text for images
- Use `data-*` attributes for custom data
- Add `aria-label` for screen readers

### Markdown Content

**Article Structure:**
- Use proper heading hierarchy starting with H1
- Include frontmatter-like metadata in articles-config.js
- Use standard markdown syntax
- Support for custom syntax like `==highlight==`

**Image Handling:**
- Store images in organized directories
- Use descriptive alt text
- Support for image zoom functionality

## Project Architecture

### File Organization
```
techblog/
├── index.html                 # Main HTML file
├── articles-config.js         # Content configuration
├── assets/
│   ├── css/styles.css        # Main stylesheet
│   └── js/script.js          # Main JavaScript
├── articles/                 # Markdown content
│   └── ...                   # Article files
└── assets/fonts/             # Font files
```

### Key Components

**ArticleTree Class:**
- Manages hierarchical content structure
- Handles navigation and rendering
- Provides search functionality

**Theme System:**
- CSS custom properties for light/dark themes
- Local storage persistence
- System preference detection

**Image Zoom:**
- Touch and mouse support
- Pinch-to-zoom functionality
- Drag and drop navigation

## Development Workflow

### Adding New Articles
1. Create markdown file in `articles/` directory
2. Add entry to `articles-config.js` with metadata
3. Test article loading and navigation
4. Verify responsive design

### Modifying Styles
1. Update CSS custom properties for theme consistency
2. Test in both light and dark modes
3. Verify responsive behavior
4. Check accessibility contrast ratios

### JavaScript Changes
1. Maintain existing code patterns
2. Test error handling paths
3. Verify mobile responsiveness
4. Check performance impact

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Progressive enhancement approach

## Performance Considerations

- Minimize DOM queries by caching references
- Use event delegation where appropriate
- Optimize images and fonts
- Lazy load non-critical resources
- Minimize CSS and JavaScript for fast loading

## Cursor Rules
No Cursor rules (.cursor/rules/ or .cursorrules) are currently configured for this project.

## Copilot Instructions
No Copilot rules (.github/copilot-instructions.md) are currently configured for this project.

## Security Guidelines

- Validate and sanitize user inputs
- Use HTTPS for external resources
- Avoid inline event handlers
- Implement Content Security Policy headers when deploying
- Regularly update CDN dependencies (marked.js, highlight.js)

## Deployment

This is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Ensure all relative paths work correctly when deployed to subdirectories.