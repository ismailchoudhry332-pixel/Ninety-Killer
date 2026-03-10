# Palette's Journal
## 2024-03-24 - Accessible Modal Dialog
**Learning:** The custom Modal component lacked essential ARIA attributes and visible focus states for the close button, making it difficult for keyboard and screen reader users to navigate and close the modal.
**Action:** When creating or modifying modals in this app, ensure `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` are used. Icon-only buttons must have `aria-label` and visible focus states using `focus-visible` utility classes.
