## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2026-05-22 - Action-oriented empty states
**Learning:** Replacing plain text fallbacks with action-oriented empty states improves user onboarding by giving them a clear path forward.
**Action:** Always use the `EmptyState` component with an `action` prop when a list is empty.
