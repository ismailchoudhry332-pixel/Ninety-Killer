## 2024-03-17 - Modal Accessibility Enhancements
**Learning:** The default Modal component lacked essential screen reader support (role="dialog", aria-modal="true", aria-labelledby) and had an icon-only close button without an aria-label or visible focus states. This is a common pattern to watch out for in this app's components.
**Action:** Always verify that custom modals include correct ARIA dialog roles, accessible naming for the modal itself, and proper labels/focus rings for icon-only close buttons.
