## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-15 - Sidebar Navigation Accessibility
**Learning:** Decorative SVG icons in navigation sidebars often cause redundant screen reader announcements if not explicitly hidden. Combining this with missing focus outlines and active page aria attributes severely diminishes keyboard and screen reader experiences.
**Action:** Always add `aria-hidden="true"` to purely decorative SVG icons within navigation links. Ensure `focus-visible` utility classes are applied for clear keyboard focus states, and use `aria-current="page"` to indicate the active navigation path dynamically.
