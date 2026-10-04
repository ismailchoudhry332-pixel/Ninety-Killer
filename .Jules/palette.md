## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-13 - Empty States in Tables
**Learning:** Found that pages displaying lists of data (like Issues) often fall back to a simple text row (e.g., `<tr><td colSpan={5}>No open issues</td></tr>`) when there is no data. This provides a poor onboarding experience and doesn't clearly guide the user on what to do next.
**Action:** Replace plain text empty states within tables with the dedicated `EmptyState` component. When doing so, the component must be wrapped inside a `<tr><td colSpan={X} className="p-4">...</td></tr>` (matching the table columns) to maintain valid HTML table structure, and should include a helpful CTA button.
