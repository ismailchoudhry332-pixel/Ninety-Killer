## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-07-24 - Screen Reader Compatibility for Decorative SVG Icons
**Learning:** When using `<svg>` elements inside links as purely decorative icons alongside text, they are often redundantly announced by screen readers. Furthermore, adding `aria-hidden="true"` to them significantly improves the screen reader experience.
**Action:** Always verify if purely decorative `<svg>` icons within navigation links or buttons have `aria-hidden="true"` applied to prevent redundant announcements.

## 2024-07-24 - Navigation Link Accessibility Active State
**Learning:** Relying purely on color or styling classes (like `text-primary-700`) to indicate the active state of a navigation link is insufficient for screen readers.
**Action:** Use `aria-current="page"` (or conditionally `aria-current={isActive ? 'page' : undefined}`) on navigation components to explicitly broadcast the active context.
