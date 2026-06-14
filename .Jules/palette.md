## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-06-14 - Native Form Validation in Modals
**Learning:** Discovered that data-entry modals were using simple `<div>` wrappers and button `onClick` handlers, which bypasses native HTML5 validation (like `required`) and removes "Enter-to-submit" keyboard accessibility, causing suboptimal UX for frequent form submissions.
**Action:** Always wrap modal inputs in a `<form onSubmit={...}>` element, ensure buttons use `type="submit"` and `type="button"` appropriately, use explicit `id`/`htmlFor` associations for labels, and visually indicate required fields to provide clear user feedback and support standard browser behaviors.
