## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-11-12 - Modal Form Semantics
**Learning:** Found that modals across the application often use `<div>` containers instead of `<form>` elements for data entry. This breaks native HTML5 validation, prevents 'Enter-to-submit' behavior, and lacks proper `htmlFor` label associations.
**Action:** When refactoring or building forms in modals, wrap inputs in a `<form onSubmit={...}>`, map `htmlFor` to labels, ensure required fields have `required` attributes and `<span className="text-red-500">*</span>` indicators, and update action buttons to use appropriate `type` attributes (e.g., `type="submit"` for primary actions).
