## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-12 - EmptyState Action Discovery
**Learning:** Found that the existing `EmptyState` component supports an `action` prop that can render interactive elements like buttons. Using this for empty data views (like "No rocks") instead of plain text significantly improves user onboarding by placing the primary call-to-action directly in context.
**Action:** Always check for empty state edge cases in list views (e.g., `length === 0`). Replace plain text fallbacks with the `EmptyState` component and wire up the relevant creation action directly to the component.
