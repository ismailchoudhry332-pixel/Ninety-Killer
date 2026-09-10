## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-24 - Sidebar Navigation Accessibility
**Learning:** Found that the sidebar navigation component was missing `aria-current="page"` semantics for the active link and clear focus indicators (`focus-visible`) for keyboard navigation. This impacts screen reader users who need to know which page is active and keyboard users navigating the app.
**Action:** Always include `aria-current="page"` on the currently active link in navigation sidebars and menus. Ensure that interactive navigation elements like links have distinct focus rings using `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600` (or similar depending on context) instead of relying solely on default browser outlines or hover states.
