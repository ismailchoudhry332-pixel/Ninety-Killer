## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-13 - Empty States for Tables
**Learning:** Found that empty tables display a plain "No items" text within `<tbody>`, which feels abrupt and lacks clear next steps. The design system provides an `EmptyState` component (`@/components/ui/empty-state`), but it requires wrapping in a `<tr><td colSpan={X}>` to remain valid HTML when placed inside table bodies.
**Action:** Always replace plain text table fallbacks with the `EmptyState` component. Ensure it provides a descriptive title, helpful context, and an actionable call-to-action (e.g., an "Add [Item]" button), while strictly preserving HTML table structure with `colSpan` matching the table headers.
