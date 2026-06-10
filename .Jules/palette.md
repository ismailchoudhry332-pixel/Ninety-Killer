## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-06-10 - Forms in Modals
**Learning:** Found that modals across the application often use generic `<div>` containers instead of `<form>` elements for data entry. This bypasses native HTML5 validation (like `required`), breaks "Enter-to-submit" keyboard accessibility, and makes it harder to properly associate labels (`htmlFor`) with inputs.
**Action:** When implementing or refactoring forms inside modals, always wrap inputs in a `<form onSubmit={...}>`, use explicit `htmlFor` and `id` attributes on label/input pairs, leverage native `required` attributes (with visual red asterisk indicators), and ensure action buttons explicitly define `type="button"` (for cancel) or `type="submit"`.
