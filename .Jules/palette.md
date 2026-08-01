## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2025-05-19 - Convert Div-Based Modals to Semantic Forms
**Learning:** Many modals in this app use generic `<div>` containers for forms. This breaks native HTML5 validation, screen reader form detection, and 'Enter-to-submit' behavior.
**Action:** When working on modals, always wrap inputs in a `<form onSubmit={...}>` to enable native validation and better accessibility, and ensure explicit button types (`type="button"` for cancel, `type="submit"` for confirm).
