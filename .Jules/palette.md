## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-13 - Actionable Empty States
**Learning:** Empty states that simply say "No data" represent a missed opportunity for user onboarding and guidance. When a user navigates to a section with no items, providing an explicit action (like a "Create" button) directly within the empty state significantly reduces friction and helps users understand the primary action for that page.
**Action:** When implementing list views or tables, always use the `EmptyState` component with a clear title, description, and an `action` button rather than plain text fallbacks.
