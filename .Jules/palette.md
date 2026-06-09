## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-18 - Decorative Icon Accessibility
**Learning:** Shared components like `EmptyState` frequently use large decorative SVG icons. Without `aria-hidden="true"`, screen readers may attempt to announce them confusingly. Adding this attribute to purely decorative icons improves the overall experience without modifying visual design.
**Action:** Always verify that SVG icons used solely for visual styling (e.g., in empty states, sidebars) have `aria-hidden="true"` applied to prevent redundant screen reader announcements.
