## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Empty State in Table Bodies
**Learning:** Found plain text fallbacks for empty arrays in `<tbody>` (e.g. `<tr><td colSpan={7}>No items</td></tr>`). Replacing these with the `EmptyState` component (`@/components/ui/empty-state`) with a helpful description and call-to-action button improves onboarding and immediate actionability.
**Action:** When implementing or replacing empty states in tables, wrap the `EmptyState` component inside a `<tr><td colSpan={N} className="p-4">...</td></tr>` (where N is the number of `<th>` columns) to ensure valid HTML structure while providing a delightful UX.
