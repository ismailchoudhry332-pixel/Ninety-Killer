## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Reusable Empty State Pattern
**Learning:** Found that many list views (like Rocks, Meetings) fallback to plain text when empty. This provides poor user onboarding and unclear next steps.
**Action:** Replaced plain text fallbacks with the reusable `EmptyState` component inside table bodies (wrapped in a colSpan td). Always ensure empty states include a clear descriptive title, helpful subtext, and a primary call-to-action button to improve UX.
