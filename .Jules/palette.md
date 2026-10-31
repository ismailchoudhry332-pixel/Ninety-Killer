## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-10-31 - Sidebar Accessibility Enhancement
**Learning:** Found that the main Sidebar component lacked `aria-current="page"` for active state indication to screen readers, `aria-hidden="true"` on decorative icons, and keyboard focus states. These are fundamental for an accessible navigation experience.
**Action:** When creating or reviewing navigation menus, always ensure the active link is marked with `aria-current="page"`, decorative `<svg>` icons have `aria-hidden="true"`, and `focus-visible` styles are correctly applied so keyboard users can navigate clearly.
