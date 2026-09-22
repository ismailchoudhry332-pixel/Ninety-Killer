## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Empty State Call-to-Actions in Tables
**Learning:** Plain text empty states inside data tables (e.g., "No rocks found") provide poor UX because they lack immediate guidance or a way to take action. Replacing them with the designed `EmptyState` component wrapped appropriately inside table cells (`<tr><td colSpan={X}>`) improves onboarding and keeps the UI engaging without breaking layout.
**Action:** Always replace plain text "No items" fallbacks in data tables with the reusable `EmptyState` component. Ensure it includes an interactive `action` prop (a button) and is wrapped correctly with matching `colSpan`.
