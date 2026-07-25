## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-11 - Navigation Accessibility Enhancements
**Learning:** Adding `aria-current="page"` to navigation links helps screen readers announce the currently active item, improving context. Purely decorative SVGs inside links or buttons often clutter screen reader output unless explicitly hidden with `aria-hidden="true"`.
**Action:** When implementing or updating navigation menus, ensure the active link uses `aria-current="page"` and hide all decorative SVGs using `aria-hidden="true"`. Additionally, explicitly define `focus-visible` classes to aid keyboard navigation.
