## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Modals Lacking Native Form Semantics
**Learning:** Found that modals across the application often use generic `<div>` containers instead of `<form>` elements for data entry. This breaks native HTML5 validation (like `required`), prevents 'Enter-to-submit' behavior, and misses accessibility wins like proper `htmlFor` label associations.
**Action:** When building or refactoring forms inside modals, strictly wrap inputs in a `<form onSubmit={...}>` element. Ensure the submit handler accepts a `React.FormEvent` and calls `e.preventDefault()`, and guarantee action buttons explicitly define `type="button"` (for cancel/close) or `type="submit"`. Ensure required fields visually indicate importance with a red asterisk.
