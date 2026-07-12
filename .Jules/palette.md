## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2026-07-12 - Sidebar Navigation Link Accessibility
**Learning:** The sidebar navigation lacked the 'aria-current="page"' attribute on the active link and clear focus-visible states for keyboard users. These are critical a11y enhancements for sidebars.
**Action:** Always add 'aria-current="page"' to active nav links and ensure all interactive elements (like the brand link and navigation items) have clear 'focus-visible' utility classes.
