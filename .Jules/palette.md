
## 2024-04-12 - Explicit ARIA boundaries and static HTML Playwright isolation
**Learning:** Custom components like `<Modal>` need explicit ARIA bounding attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and unique IDs leveraging React 18's `useId()` for robust screen reader support. Because Next.js server/authentication states make live Playwright component-testing brittle, capturing screenshots using a static `test-modal.html` file that replicates the UI state in isolation proved highly reliable.
**Action:** When working on reusable UI components (modals, overlays), ensure `useId()` is used to bind interactive elements without causing SSR mismatch warnings. Verify complex or authenticated UI via static mock files loaded into Playwright rather than complex e2e setups.
