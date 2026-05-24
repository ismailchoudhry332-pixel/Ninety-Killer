## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2026-05-24 - Use EmptyState component in list views
**Learning:** Replaced plain text fallbacks in empty tables with the standardized `EmptyState` component to improve UX and visual consistency, ensuring it's wrapped in `<tr><td>` to maintain valid HTML table structure.
**Action:** Always utilize the existing `EmptyState` component for empty lists, adding a clear title, description, and an action button where appropriate to guide users.
