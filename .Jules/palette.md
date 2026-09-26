## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2026-09-26 - Table Empty States with Call-to-Action
**Learning:** When displaying an empty state inside a table body (`<tbody>`), using a generic string like 'No items' inside a centered column is a missed UX opportunity. Instead, wrapping the `EmptyState` component within a `<tr><td colSpan={X}>` structure allows for injecting rich, actionable empty states (with buttons like 'Create') without breaking the table's HTML validity or layout.
**Action:** Whenever replacing plain text fallbacks in tables with `EmptyState`, always wrap the component in a full-width `<td colSpan={X}>` and include a direct call-to-action to help users seamlessly start using the feature.
