## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-11 - Navigation Accessibility Pattern
**Learning:** The main application sidebar navigation lacked both `aria-current="page"` and explicit keyboard focus states, hindering screen reader orientation and keyboard-only navigation. Furthermore, the inline `<svg>` icons were announced redundantly to screen readers.
**Action:** When implementing or updating navigation links (e.g., `<Link>` components), always apply `aria-current={isActive ? 'page' : undefined}`, utilize Tailwind's focus-visible utilities (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600`), and mark decorative SVG icons with `aria-hidden="true"`.
