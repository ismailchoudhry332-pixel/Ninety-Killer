## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2026-09-19 - Empty States in Tables
**Learning:** Found that using standard empty state components inside table bodies (`<tbody>`) breaks HTML validity if not wrapped correctly. Also, plain text fallbacks provide a poor onboarding experience compared to actionable empty states.
**Action:** Always wrap empty state components inside a `<tr><td colSpan={X} className="p-4">...</td></tr>` when replacing plain text in tables, and ensure the `action` prop provides a clear path for the user to create the first item.
