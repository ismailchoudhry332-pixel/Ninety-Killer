## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-18 - Empty States inside Tables
**Learning:** Found that empty lists inside tables were just rendering plain text fallbacks (e.g. "No rocks"), which is poor for UX and onboarding as it leaves users with a dead-end. The `EmptyState` component should be utilized to provide a title, description, and actionable CTA. When doing so inside `<tbody>`, it must be wrapped in a `<tr><td colSpan={X}>` to prevent breaking standard HTML table structure.
**Action:** Always replace plain text empty states with the `EmptyState` component. When updating table-based lists, explicitly verify the table column count using `grep` or by reviewing the file to apply the correct `colSpan` value.
