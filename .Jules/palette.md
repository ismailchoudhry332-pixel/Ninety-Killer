## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-18 - Added aria-hidden to decorative SVGs
**Learning:** Purely decorative `<svg>` icons (like those inside buttons or next to text) must be explicitly hidden from the accessibility tree to prevent screen readers from announcing redundant roles.
**Action:** Always add `aria-hidden="true"` to SVGs that do not convey unique information.
