## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-12 - Focus Indicators for Navigation
**Learning:** Found that the navigation links in the Sidebar component lacked focus-visible styles, which are crucial for keyboard navigation. Adding `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600` ensures a consistent, accessible experience for users navigating via keyboard.
**Action:** When implementing or reviewing future navigation components, ensure that all interactive elements, including links and logo links, have distinct focus states.
