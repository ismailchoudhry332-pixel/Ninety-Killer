## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-14 - Empty States on Empty Tables
**Learning:** Generic "No items" text rows inside `<tbody>` elements offer a poor onboarding experience and look disconnected from the overall UI. The application has a dedicated `EmptyState` component (`@/components/ui/empty-state`) that includes a visual icon, title, description, and an action button, providing a much richer experience.
**Action:** When rendering empty tables, always replace the plain text fallback with the `EmptyState` component. Crucially, wrap it inside a `<tr><td colSpan={X}>` where X is the number of table columns, to ensure valid HTML semantics and preserve the table layout structure.
