## 2024-05-18 - Modal Accessibility
**Learning:** Added essential accessibility roles, aria-labels, and safe IDs using `useId` from `react` to the generic modal component (`src/components/ui/modal.tsx`).
**Action:** Always ensure modals have `role="dialog"`, `aria-modal="true"`, and are labeled by their title using `aria-labelledby`. Ensure icon-only close buttons have `aria-label` and `aria-hidden` attributes for proper screen reader support.
