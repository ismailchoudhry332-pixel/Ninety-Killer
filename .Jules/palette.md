## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Form Accessibility in Modals
**Learning:** Found that modals often use `<div>` containers instead of `<form>` elements for data entry. This prevents native HTML5 validation (like `required`), "Enter-to-submit" behavior, and proper `htmlFor` label associations.
**Action:** When refactoring or building forms in modals, wrap inputs in a `<form onSubmit={...}>`. Ensure the submit handler accepts an optional `React.FormEvent` (e.g., `e?: React.FormEvent`) and safely calls `e?.preventDefault()`. Ensure action buttons explicitly define `type="button"` (for Cancel/Close) or `type="submit"`, and remove `onClick` handlers from submit buttons. Appending `<span className="text-red-500">*</span>` to the label element visually indicates required fields for UX consistency.
