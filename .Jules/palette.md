## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-18 - Form Wrapping in Modals for Accessibility
**Learning:** Converting plain `div` layouts into semantic `<form>` wrappers inside Modals allows native browser validation (`required` attributes) and supports 'Enter-to-submit' functionality, significantly enhancing the keyboard navigation experience without extra JS event listeners.
**Action:** When implementing or refactoring Modals that accept user input, always use a `<form onSubmit={...}>` wrapper. Ensure `type="button"` for cancellation actions and `type="submit"` for confirmation buttons to manage event propagation correctly.
