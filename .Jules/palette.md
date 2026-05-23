## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-23 - Decorative SVG Accessibility
**Learning:** Found multiple instances across the sidebar, empty states, and login page where decorative `<svg>` icons lacked the `aria-hidden="true"` attribute, which is necessary to prevent screen readers from announcing them redundantly.
**Action:** When adding icons that are purely visual or decorative (especially those accompanying text or used as background elements), always include `aria-hidden="true"` to improve accessibility.
