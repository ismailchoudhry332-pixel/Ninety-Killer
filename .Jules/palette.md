## 2026-03-14 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Found that shared UI components (like the Modal close button) are missing essential ARIA labels and focus states, which impacts screen reader users and keyboard navigability across the entire app.
**Action:** Always verify that icon-only buttons include an `aria-label` describing their action, `aria-hidden="true"` on the SVGs, and proper `focus-visible` states for keyboard users.
