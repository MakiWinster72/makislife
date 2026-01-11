# AGENTS.md — Agent Operating Guidelines for reBlog VitePress Site

## Purpose
This file guides agentic coding assistants on how to work in this repository: build/lint/test commands, coding conventions, and project-specific guidelines for the Arch Linux documentation site built with VitePress.

## Project Overview
- **Technology**: VitePress static site generator with Vue.js
- **Content**: Chinese documentation for Arch Linux installation and usage
- **Structure**: Markdown content in `docs/`, custom theme in `.vitepress/theme/`
- **Build Output**: Production builds output to `../arch` directory with base path `/arch/`
- **Language**: Primary content in Chinese (Simplified), code comments in English

## Build / Lint / Test Commands

### Development Environment
```bash
# Install dependencies
npm ci

# Start development server
npm run docs:dev

# Build for production (outputs to ../arch)
npm run docs:build

# Preview production build
npm run docs:preview
```

### Code Quality (No specific linters configured)
Since this project doesn't have ESLint, Prettier, or TypeScript strict checking configured, follow these manual quality checks:

```bash
# Check for syntax errors in TypeScript/Vue files
npx tsc --noEmit --skipLibCheck .vitepress/theme/**/*.ts

# Check for unused dependencies
npx depcheck

# Validate markdown files (if available)
npx markdownlint docs/**/*.md
```

### Testing
This is primarily a documentation site with minimal testing. For theme components:

```bash
# No automated tests currently configured
# Manual testing: Run dev server and verify theme functionality
npm run docs:dev
```

## Code Style & Conventions

### General Guidelines
- **Language**: Use English for code comments, variable names, and technical documentation
- **Content**: Write user-facing content in Chinese (Simplified)
- **File Encoding**: UTF-8 with LF line endings
- **Line Length**: Keep lines under 100 characters where practical

### TypeScript/Vue (Theme Code)
- **Imports**: Group imports by type (Vue ecosystem → utilities → local)
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Types**: Use explicit types for function parameters and return values
- **Vue Components**: Follow Vue 3 Composition API patterns
- **Styling**: Use CSS custom properties for theme colors

Example component structure:
```typescript
// .vitepress/theme/components/Example.vue
<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
}

const props = defineProps<Props>()
const isVisible = ref(false)
</script>

<template>
  <div class="example-component">
    <h3>{{ props.title }}</h3>
  </div>
</template>

<style scoped>
.example-component {
  color: var(--vp-c-text-1);
}
</style>
```

### JavaScript (Client-side Scripts)
- **ES6+ Features**: Use modern JavaScript syntax
- **DOM Manipulation**: Prefer modern APIs over jQuery-style code
- **Event Handling**: Use addEventListener with proper cleanup
- **Performance**: Minimize DOM queries, use event delegation

### CSS/Styling
- **CSS Custom Properties**: Use VitePress theme variables
- **Responsive Design**: Mobile-first approach
- **Performance**: Minimize CSS, use efficient selectors
- **Comments**: Document color system and component purposes
- **Transitions**: Smooth theme switching and component animations

Example CSS structure:
```css
/* .vitepress/theme/css/component.css */

/* Component: Custom feature block */
.custom-feature {
  --border-color: var(--vp-c-brand-1);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .custom-feature {
    padding: 0.75rem;
  }
}
```

### Markdown Content
- **Structure**: Use ATX-style headers (# ## ###)
- **Code Blocks**: Specify language for syntax highlighting
- **Links**: Use relative links for internal navigation
- **Images**: Store in appropriate asset directories
- **Formatting**: Consistent use of bold, italic, and code formatting

Example markdown structure:
```markdown
# 页面标题

## 章节标题

### 小节标题

这是正文内容，包含`内联代码`和**强调文本**。

```bash
# 代码块示例
sudo pacman -S package-name
```

> 提示信息使用引用块

- 无序列表项
- 另一个列表项

1. 有序列表项
2. 第二个列表项
```

### File Organization
```
vitepress/
├── docs/                    # Markdown content
│   ├── index.md            # Homepage
│   ├── installation/       # Installation guides
│   └── guides/             # Usage guides
├── .vitepress/
│   ├── config.mts          # VitePress configuration
│   └── theme/              # Custom theme
│       ├── index.ts        # Theme entry point
│       ├── css/            # Stylesheets
│       └── js/             # Client scripts
```

### Error Handling
- **Build Errors**: Check TypeScript compilation and VitePress config
- **Runtime Errors**: Log meaningful error messages in console
- **User Input**: Validate and sanitize where applicable
- **Fallbacks**: Provide graceful degradation for missing features

### Security Considerations
- **External Links**: Verify URLs are legitimate
- **User Content**: No user-generated content in this doc site
- **Dependencies**: Keep packages updated, audit for vulnerabilities
- **Assets**: Ensure images and resources load from trusted sources

### Git Workflow
- **Commits**: Use descriptive commit messages in English
- **Branches**: feature/ for new features, fix/ for bug fixes
- **Pull Requests**: Include screenshots for UI changes
- **Documentation**: Update guides when adding new features

## Agent Behavior Rules

### Before Making Changes
1. **Read Context**: Understand the file's purpose and surrounding code
2. **Check Dependencies**: Verify any new packages are compatible
3. **Test Locally**: Run dev server to verify changes work
4. **Content Language**: Use Chinese for user-facing text, English for code

### Code Modification Guidelines
- **Minimal Changes**: Make focused, incremental modifications
- **Preserve Style**: Match existing code formatting and patterns
- **Vue Components**: Follow existing component structure
- **CSS**: Use established color variables and responsive patterns

### Content Creation
- **Technical Accuracy**: Verify Arch Linux commands and procedures
- **Clarity**: Write clear, step-by-step instructions
- **Accessibility**: Include alt text for images, semantic HTML
- **Consistency**: Match existing documentation style and terminology

### Quality Assurance
- **Build Verification**: Always run `npm run docs:build` before committing
- **Cross-browser Testing**: Verify in modern browsers
- **Mobile Responsiveness**: Test on mobile devices
- **Link Validation**: Ensure internal links work correctly

## Common Tasks

### Adding New Documentation
1. Create markdown file in appropriate `docs/` subdirectory
2. Update sidebar navigation in `.vitepress/config.mts`
3. Add frontmatter with proper title and layout
4. Test build and navigation

### Modifying Theme
1. Edit files in `.vitepress/theme/`
2. Run dev server to preview changes
3. Test across different pages and screen sizes
4. Update CSS variables if adding new colors

### Adding Images/Assets
1. Place images in `docs/assets/` or appropriate subdirectory
2. Use relative paths in markdown
3. Optimize image size and format
4. Add descriptive alt text

## Contact & Support
- **Issues**: Report bugs via GitHub issues
- **Discussions**: Use GitHub discussions for questions
- **Contributing**: Follow standard GitHub contribution workflow

---

*This AGENTS.md was created through codebase analysis. Last updated: January 2025*</content>
<parameter name="filePath">/home/maki/project/reBlog/AGENTS.md