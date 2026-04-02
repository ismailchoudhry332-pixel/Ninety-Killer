## 2024-12-14 - Modal Accessibility and React 18 `useId`

**Learning:** When generating IDs for ARIA attributes (like `aria-labelledby`) in Next.js/React 18 components, especially shared UI elements like Modals, strictly use `useId()`. Providing a fallback like `useId ? useId() : 'mock-id'` prevents crashes during testing (e.g., when esbuild bundles isolated components for Playwright testing via static HTML without the full React framework context). Additionally, custom modals must include explicit ARIA boundaries (`role="dialog"`, `aria-modal="true"`) and focus states for icon-only buttons to ensure they are accessible to screen readers and keyboard users.

**Action:** Always wrap standard modal components with `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` referencing a unique, dynamically generated title ID using `useId()`. Ensure all icon-only interactive elements (like the 'Close' button) receive an `aria-label` and visual focus states (`focus-visible`).
