
## 2025-03-30 - Modal Accessibility Boundaries
**Learning:** React 18's `useId()` is ideal for dynamically associating ARIA labels between modal titles and their containers without hardcoding IDs or tracking state. Icon-only buttons in custom modal implementations require explicit `focus-visible` states to support keyboard navigation correctly, alongside an explicit `aria-label`.
**Action:** When creating or modifying custom dialogs/modals, ensure strict ARIA boundaries (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and utilize `useId()` for labeling. Add focus rings (`focus-visible:ring-2`) to all interactive elements lacking text context.
