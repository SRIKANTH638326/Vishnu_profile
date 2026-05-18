const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'styles', 'global.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Define the root variables
const rootVars = `:root {
    --bg: #F5F5F0;
    --text: #1A1A1A;
    --accent: #6366F1;
    --accent-hover: #4F46E5;
    --surface: #ffffff;
    --surface-alt: #E8E8E3;
    --text-muted: #555555;
    --text-light: #777777;
    --text-lighter: #999999;
    --border-light: rgba(0, 0, 0, 0.04);
    --border: rgba(0, 0, 0, 0.06);
    --border-dark: rgba(0, 0, 0, 0.08);
    --border-darker: rgba(0, 0, 0, 0.1);
    --bg-blur: rgba(245, 245, 240, 0.92);
}

[data-theme="dark"] {
    --bg: #0A0A0A;
    --text: #F5F5F0;
    --accent: #818cf8;
    --accent-hover: #6366F1;
    --surface: #171717;
    --surface-alt: #262626;
    --text-muted: #A3A3A3;
    --text-light: #737373;
    --text-lighter: #525252;
    --border-light: rgba(255, 255, 255, 0.04);
    --border: rgba(255, 255, 255, 0.06);
    --border-dark: rgba(255, 255, 255, 0.08);
    --border-darker: rgba(255, 255, 255, 0.1);
    --bg-blur: rgba(10, 10, 10, 0.92);
}

`;

// Perform replacements
css = css.replace(/#F5F5F0/gi, 'var(--bg)');
css = css.replace(/#1A1A1A/gi, 'var(--text)');
css = css.replace(/#6366F1/gi, 'var(--accent)');
css = css.replace(/#4F46E5/gi, 'var(--accent-hover)');

// careful with #fff / #ffffff as it might be used in explicit contexts (like button text)
// We'll replace mostly backgrounds that are white.
css = css.replace(/background:\s*#fff(?:fff)?/gi, 'background: var(--surface)');
css = css.replace(/background-color:\s*#fff(?:fff)?/gi, 'background-color: var(--surface)');

// replace specific grays
css = css.replace(/#e5e7eb/gi, 'var(--surface-alt)');
css = css.replace(/#E8E8E3/gi, 'var(--surface-alt)');
css = css.replace(/#555/gi, 'var(--text-muted)');
css = css.replace(/#777/gi, 'var(--text-light)');
css = css.replace(/#999/gi, 'var(--text-lighter)');

// borders and alphas
css = css.replace(/rgba\(0,\s*0,\s*0,\s*0\.04\)/g, 'var(--border-light)');
css = css.replace(/rgba\(0,\s*0,\s*0,\s*0\.06\)/g, 'var(--border)');
css = css.replace(/rgba\(0,\s*0,\s*0,\s*0\.08\)/g, 'var(--border-dark)');
css = css.replace(/rgba\(0,\s*0,\s*0,\s*0\.1\)/g, 'var(--border-darker)');
css = css.replace(/rgba\(245,\s*245,\s*240,\s*0\.92\)/g, 'var(--bg-blur)');

// specifically target `.btn-primary` color to stay white, because contrast is needed
// Actually, earlier we replaced `color: #fff` to `color: var(--surface)`. Wait, no, we only replaced backgrounds! So `color: #fff` is safe.

// specific fixes:
// "Available for work" pill needs to flip colors
css = css.replace(/\.available-pill {\s*[\s\S]*?background:\s*var\(--text\);\s*color:\s*var\(--bg\);/g, match => match);

// add the root vars right after the first comment
css = css.replace(/\/\* ===== DESIGN SYSTEM — Portavia-Inspired Light Theme ===== \*\//, '/* ===== DESIGN SYSTEM — Portavia-Inspired Light Theme ===== */\n\n' + rootVars);

fs.writeFileSync(cssPath, css);
console.log('CSS custom properties injected successfully!');
