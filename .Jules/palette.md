## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Form Semantics in Modals and Empty States
**Learning:** Generic `<div>` containers within Modals for data entry lacked built-in enter-to-submit capabilities and proper `htmlFor` label associations, reducing accessibility. Plain text fallbacks for empty states (e.g., "No teams") missed an opportunity to guide user action and provide better onboarding context.
**Action:** Always wrap Modal input fields in `<form onSubmit={...}>` to leverage native HTML5 validation and keyboard submission (`Enter`). Ensure buttons use `type="button"` for cancellation and `type="submit"` for primary action. Utilize the design system's `EmptyState` component for zero-data views, providing clear descriptions and immediate call-to-actions to improve the onboarding flow.
