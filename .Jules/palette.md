## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Modal Form Accessibility & Semantic Structure
**Learning:** Found that data entry components within modals often use generic `<div>` containers instead of semantic `<form>` elements. This prevents native HTML5 validation, breaks "Enter-to-submit" accessibility for keyboard users, and fails to establish programmatic association between labels and inputs.
**Action:** When refactoring or building forms in modals, wrap inputs in a `<form onSubmit={...}>`, add `id` and `htmlFor` attributes to inputs and labels, use native `required` attributes (with a visual red asterisk), and ensure buttons define explicit types (`type="button"` vs `type="submit"`).
