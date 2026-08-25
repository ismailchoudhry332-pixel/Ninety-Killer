## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Modal Form Pattern
**Learning:** Found that modals across the application were using `<div>` containers with independent `onClick` buttons for form-like data entry, which bypasses native HTML5 validation (like `required`) and prevents the default "Enter-to-submit" keyboard accessibility behavior.
**Action:** When refactoring or building forms in modals, wrap inputs in a `<form onSubmit={...}>` to enable native browser validation and proper `htmlFor` label associations. Ensure action buttons explicitly define `type="button"` (for Cancel) and `type="submit"`, and remove `onClick` handlers from submit buttons when relying on `onSubmit`.
