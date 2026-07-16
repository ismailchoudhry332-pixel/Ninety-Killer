## 2024-11-18 - Empty State Integration Pattern
**Learning:** Replacing plain text table fallbacks (`<tr><td colSpan={N}>No items</td></tr>`) with the `EmptyState` component requires maintaining the table row/cell structure to avoid invalid HTML, but placing the component inside a `td` cell provides a much cleaner, actionable UX for empty lists.
**Action:** Always wrap `EmptyState` in `<tr><td colSpan={N} className="p-4">...</td></tr>` when replacing empty states inside table bodies (`<tbody>`), ensuring the colSpan matches the table headers.
