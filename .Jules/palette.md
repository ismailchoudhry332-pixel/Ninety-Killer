## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-06-20 - Semantic Forms in Modals
**Learning:** Replacing plain `<div>` wrappers with semantic `<form>` elements inside React `Modal` components unlocks native HTML5 validation and "Enter-to-submit" behavior without explicit keyboard event listeners. It also ensures proper accessibility associations between labels and input fields.
**Action:** Always wrap standard data-entry inputs inside modals with `<form onSubmit={...}>` and ensure buttons have appropriate `type="submit"` or `type="button"` attributes.
