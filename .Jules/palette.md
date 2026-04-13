## 2024-04-13 - [Custom Modal Accessibility]
**Learning:** React 18's `useId()` hook may fail during isolated Playwright component testing when standard framework contexts are missing.
**Action:** When creating unique IDs for modal components (e.g., connecting `role="dialog"` via `aria-labelledby` to a title ID), use a fallback strategy: `const id = useId(); const safeId = id || 'fallback-id';` to ensure robustness.
