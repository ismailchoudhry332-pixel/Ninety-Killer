## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-06-30 - Empty States inside HTML Tables
**Learning:** When replacing plain text "no items found" fallbacks with styled `EmptyState` components inside table bodies (`<tbody>`), the component must be wrapped in `<tr><td colSpan={X}>...</td></tr>` where X is the total number of columns in the table header. Failing to do so breaks the HTML table structure and can cause rendering issues or accessibility failures for screen readers navigating the table.
**Action:** Always verify the column count (`colSpan`) when implementing empty states within tabular data and wrap the component correctly.
