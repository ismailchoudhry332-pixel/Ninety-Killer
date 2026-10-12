## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-11 - Sidebar Navigation Accessibility
**Learning:** The sidebar navigation menu lacked `aria-current="page"` for active states and `aria-hidden="true"` on purely decorative `svg` icons, as well as distinct keyboard focus rings (`focus-visible:ring-2`).
**Action:** When implementing sidebars or navigation lists, ensure active states use standard ARIA properties rather than just visual color changes, explicitly hide decorative icons to avoid repetitive announcements, and provide clear `focus-visible` styles for all links.
