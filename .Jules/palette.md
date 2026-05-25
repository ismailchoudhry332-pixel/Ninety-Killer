## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-25 - Modal Form Accessibility
**Learning:** Discovered that input elements grouped within modals often use generic `<div>` wrappers with a separate `onClick` button instead of semantic `<form>` structures. This breaks native HTML5 validation and prevents standard 'Enter-to-submit' functionality, degrading the keyboard user experience.
**Action:** When implementing or refactoring modals with inputs, always wrap them in a semantic `<form onSubmit={...}>` element, explicitly type action buttons (`type="button"` and `type="submit"`), and use `htmlFor` on labels to ensure form controls are properly associated and accessible.
