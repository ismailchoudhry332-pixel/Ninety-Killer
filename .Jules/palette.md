## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2026-08-14 - Sidebar Navigation Accessibility
**Learning:** Navigation links often miss 'aria-current' and 'focus-visible' utility classes, which degrades the experience for screen readers and keyboard users. Additionally, purely decorative SVG icons within these links need 'aria-hidden="true"' to prevent redundant screen reader announcements.
**Action:** Always include 'aria-current' for active navigation items, define 'focus-visible' for clear keyboard focus outlines, and explicitly hide decorative icons.
