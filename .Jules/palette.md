## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-18 - Actionable Empty States in Tables
**Learning:** Found that using standard empty states inside table bodies requires specific HTML structure. Just returning a `div` inside a `tbody` breaks the table rendering and causes accessibility/layout issues. Plain text "No items" fallbacks are common but miss an opportunity for user onboarding.
**Action:** When replacing plain text empty state fallbacks in table bodies with the `EmptyState` component, always wrap the `EmptyState` in `<tr><td colSpan={X} className="p-4">...</td></tr>` (where X matches the number of table columns). Include an action button (e.g., "Create") to help users take the next logical step directly from the empty state.
