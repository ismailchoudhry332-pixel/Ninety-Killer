## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-12 - Form Accessibility in Modals
**Learning:** Found that modals were using simple `<div>` elements instead of proper `<form>` elements for form fields, causing missing "Enter-to-submit" behavior and lack of native form validation (like `required`).
**Action:** When implementing data entry within modals, wrap inputs in a `<form onSubmit={...}>`, explicitly use `type="submit"` and `type="button"` on action buttons, and tie labels to inputs using `htmlFor` and `id` to improve screen reader accessibility. Visually denote required fields with a red asterisk.
