## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-10-27 - Actionable Empty States
**Learning:** Replaced plain text table empty states with an actionable `EmptyState` component. Providing immediate guidance and a clear call-to-action (e.g., 'Add Rock') directly within the empty view significantly improves user onboarding compared to a passive 'No rocks' message.
**Action:** When implementing empty list or table views, use the `EmptyState` component with a clear title, description, and an `action` prop (like a creation button) rather than plain text fallbacks. Wrap it in a `<tr><td colSpan={N} className="p-4">\...\</td></tr>` structure for tables.
