# Palette Journal

## 2025-02-20 - Modal Accessibility Boundaries
**Learning:** Custom modals in this project (`src/components/ui/modal.tsx`) lack explicit ARIA boundaries (`role="dialog"`, `aria-modal="true"`, and `aria-labelledby`) out-of-the-box. Without these, screen readers treat the modal content as standard document flow, confusing users about their context. React 18's `useId()` is an effective way to dynamically link the title ID to `aria-labelledby` without collisions, and icon-only close buttons require explicit `aria-label`s.
**Action:** When creating or modifying generic wrapper components (like Modal, Popover, or SlideOver), always ensure structural semantic roles and focus management properties (`focus-visible`) are included at the container level. Use `useId()` for semantic linking.
