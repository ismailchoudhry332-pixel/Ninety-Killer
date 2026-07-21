## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Forms in Modals
**Learning:** Found that modals using plain `<div>` containers instead of `<form>` elements for data entry lack native HTML5 validation and "Enter-to-submit" behavior, which is frustrating for keyboard users.
**Action:** When building or refactoring forms inside modals, always wrap inputs in a `<form onSubmit={...}>`, use proper `htmlFor` label associations, and ensure action buttons explicitly define `type="button"` (for Cancel/Close) or `type="submit"`. Add visual required indicators (`*`) to mandatory fields.
