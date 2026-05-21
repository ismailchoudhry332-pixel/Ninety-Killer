## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-21 - EmptyState pattern
**Learning:** I found that across the app, there are instances where we render a generic text string such as `<tr><td>No open issues</td></tr>` to indicate empty states. This provides a poor user experience. Replacing this plain text with the existing `<EmptyState />` component provides a much more polished and consistent UI.
**Action:** When working on lists or tables, ensure `EmptyState` component is used instead of generic texts like 'No entries found'.
