## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-11 - Modal Form Accessibility & Usability
**Learning:** Found that modals using div containers for data entry lack native form behaviors, meaning users cannot use 'Enter' to submit, missing required attribute validation, and labels lacking htmlFor mappings for screen readers.
**Action:** When refactoring or building forms in modals, always wrap inputs in a form to enable native HTML5 validation ('required'), 'Enter-to-submit' behavior, and proper htmlFor associations. Ensure submit handlers call e.preventDefault() and action buttons use proper type attributes (type="button" or type="submit").
