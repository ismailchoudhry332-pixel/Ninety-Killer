## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-28 - Empty States inside Tables

**Learning:** When using the `EmptyState` component to replace plain text fallbacks inside table bodies (`<tbody>`), it must be wrapped in a `<tr><td colSpan={X} className="p-4">...</td></tr>` to ensure valid HTML table structure.

**Action:** Before applying an `EmptyState` inside a list, check whether the list is rendered as a table. If it is, use the `colSpan` trick to maintain correct table layout instead of a plain empty string or invalid direct `<div>` insertion.
