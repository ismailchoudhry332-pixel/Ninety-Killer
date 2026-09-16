## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-20 - Empty State Onboarding UX
**Learning:** Found that multiple core views (Rocks, Scorecard, Meetings, Issues, Todos) were using plain text fallbacks (e.g., "No rocks") for empty lists. This represents a missed opportunity for user onboarding and immediate action.
**Action:** Replaced plain text fallbacks with the reusable `EmptyState` component. When a list is empty, a visually distinct area with an icon, title, descriptive text, and a primary action button (where applicable) should be presented to guide the user on their next step. When used inside a `<tbody>`, the `EmptyState` should be wrapped in a `<tr><td colSpan={X} className="p-4">` to maintain valid HTML table structure.
