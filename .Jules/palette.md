## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-06-12 - Sidebar Accessibility
**Learning:** Decorative SVG icons inside Links and Buttons need `aria-hidden="true"` to prevent redundant/confusing announcements by screen readers, particularly when the text content is already sufficient. Additionally, `aria-current="page"` is the standard for navigation lists to denote the active page.
**Action:** When creating or modifying navigation links or icon-buttons, explicitly mark decorative SVGs with `aria-hidden="true"` and use `aria-current="page"` for active links.
