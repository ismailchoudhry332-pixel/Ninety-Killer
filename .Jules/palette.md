## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-12 - Empty State UI Pattern
**Learning:** Generic text-based empty states (like `<td colSpan={6}>No data</td>`) inside table bodies and list views provide a poor user experience, lacking visual weight and actionable next steps. Users benefit significantly from visual empty states that guide them to the primary action.
**Action:** When creating or refactoring list/table views, always replace generic plain-text empty states with the existing `EmptyState` component. When used inside a table `<tbody>`, ensure it is wrapped correctly in `<tr><td colSpan={X} className="p-4">` to maintain semantic structure while offering clear descriptions and a primary action button.
