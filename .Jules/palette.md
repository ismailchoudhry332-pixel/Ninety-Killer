## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-18 - Empty State Component Pattern
**Learning:** Found that replacing plain text placeholders (e.g. "No rocks found") with the existing `<EmptyState>` component significantly improves the initial user experience by providing clear visual feedback and an actionable next step ("Add Rock"). This pattern ensures users are immediately guided to take action rather than seeing a dead end.
**Action:** Always prefer rendering the `<EmptyState>` component with a relevant action button for empty lists/tables instead of simple text fallbacks across all main views.
