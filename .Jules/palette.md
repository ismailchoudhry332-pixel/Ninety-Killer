## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2026-09-30 - Empty State Replacement in Tables
**Learning:** Replaced plain text fallbacks (e.g., 'No meetings found') inside `<tbody>` with the standardized `<EmptyState>` component wrapped in `<tr><td colSpan={X}>`. This pattern makes empty lists more actionable and visually consistent without breaking table structure.
**Action:** When implementing or reviewing list or table views, ensure that empty states utilize the `EmptyState` component and provide a clear call-to-action (like 'New Meeting') to improve user onboarding.
