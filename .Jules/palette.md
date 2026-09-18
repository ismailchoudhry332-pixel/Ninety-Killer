## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Empty State in Tables
**Learning:** When adding EmptyState components inside a `<table>`, they break the HTML structure if placed directly in `<tbody>`. They must be wrapped in a `<tr><td colSpan={X}>` to remain semantically valid.
**Action:** Always wrap EmptyState in a full-width table cell (`<tr><td colSpan={columnCount}>`) when replacing table fallback text.
