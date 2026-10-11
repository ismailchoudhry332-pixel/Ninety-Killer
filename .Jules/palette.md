## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.

## 2024-05-13 - Empty States Formatting in Tables
**Learning:** When displaying `EmptyState` component inside `table` tags, it needs to be wrapped properly with `<tr>` and `<td colSpan={N}>` elements instead of direct generic blocks, otherwise it breaks table formatting, causing layout to squash or text to break. Setting `className="p-4"` on the wrapper cell ensures the EmptyState sits nicely padded inside the table.
**Action:** When adding an EmptyState fallback to a table, wrap it inside `<tr><td colSpan={total_columns} className="p-4"><EmptyState ... /></td></tr>`.
