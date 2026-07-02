## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-07-02 - Sidebar Navigation Accessibility
**Learning:** Found that the standard Sidebar navigation component lacked the `aria-current='page'` attribute for active links and focus states for keyboard navigation. Additionally, purely decorative SVG icons were not hidden from screen readers.
**Action:** When reviewing or implementing navigation, ensure `aria-current='page'` is set on active items, add `focus-visible` utility classes for clear keyboard focus indicators, and apply `aria-hidden='true'` to purely decorative icons.
