## 2024-10-31 - Modal Accessibility Standard
**Learning:** When adding `aria-labelledby` to modals to meet accessibility standards, using `Math.random()` or `Date.now()` to generate unique IDs causes React hydration mismatch errors.
**Action:** Always use React 18's `useId()` hook to generate stable, unique IDs for accessibility attributes like `aria-labelledby` linking the dialog container to its title, and ensure a fallback is provided if rendering outside a React framework context.
