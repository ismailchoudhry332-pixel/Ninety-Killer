## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-18 - Modal Form Semantics
**Learning:** Using `<div>` instead of `<form>` inside modals breaks native HTML validation and prevents enter-to-submit behavior, which degrades keyboard accessibility and usability.
**Action:** Always wrap inputs in a `<form onSubmit={...}>` within modals, add `htmlFor` and `id` to fields, use `required` attributes, and ensure buttons have explicit `type="button"` or `type="submit"`.
