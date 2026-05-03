## 2024-03-21 - Modal Component Accessibility
**Learning:** React 18's `useId()` may fail when components are rendered in isolated static HTML environments (like Playwright visual verification). Relying strictly on it can cause crashes if framework context is missing.
**Action:** Use a safe fallback for `useId()` when applying `aria-labelledby` or similar ID-linked attributes (e.g., `const id = React.useId(); const safeId = id ? \`\${id}-label\` : 'fallback-id'`).
