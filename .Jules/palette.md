## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Empty State in Table Bodies
**Learning:** Plain text fallbacks for empty tables are easily missed and provide a poor user experience.
**Action:** When implementing or fixing empty states within table bodies (`<tbody>`), use the `EmptyState` component wrapped in a `<tr><td colSpan={X} className="p-4">` (where X is the number of table columns). Provide a clear description and an actionable button in the `action` prop to guide the user towards creating a new item.
