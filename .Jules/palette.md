## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-06-02 - Modal Form Enter-to-Submit and Native Validation
**Learning:** Many modals in this design system default to using `<div>` wrappers instead of `<form>` elements for holding inputs. This breaks the native HTML5 "Enter-to-submit" behavior and prevents the use of native form validation (e.g., the `required` attribute).
**Action:** When working on modals containing form inputs, wrap the inputs in a `<form onSubmit={...}>` rather than a generic `<div className="space-y-4">`. Explicitly assign `type="button"` to Cancel buttons and `type="submit"` to the primary action button to enable Enter-to-submit without full page reloads (using `e.preventDefault()`). This is a huge accessibility and UX win for power users.
