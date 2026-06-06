## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-06-06 - Modal Form Accessibility & Validation
**Learning:** Modals with data entry across the application were using plain `<div>` containers with manual `onClick` handlers. This bypassed native HTML5 form validation (`required`) and prevented standard behaviors like "Enter-to-submit".
**Action:** When implementing forms inside modals, always wrap the inputs in a `<form onSubmit={...}>`, use standard `type="submit"` buttons, and explicitly link labels using `htmlFor` and `id` for accessibility and better UX. Add `<span className="text-red-500">*</span>` for visual requirement indicators.
