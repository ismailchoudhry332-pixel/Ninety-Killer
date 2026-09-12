## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Form Wrapping in Modals
**Learning:** Found that many data entry modals across the application use `<div>` containers instead of `<form>` elements. This prevents native HTML5 validation (like the `required` attribute), breaks "Enter-to-submit" keyboard accessibility, and often lacks proper `htmlFor` label associations.
**Action:** When refactoring or building data entry modals, always wrap inputs in a `<form onSubmit={...}>`, enable native validation, ensure labels use `htmlFor`, and provide explicit `type="button"` and `type="submit"` attributes to action buttons.
