## 2024-05-24 - Accessible Modals
**Learning:** The default custom modal implementation lacked crucial ARIA linking (`aria-labelledby` with a `useId` hook), role marking (`role="dialog"`, `aria-modal="true"`), and basic keyboard focus styling on icon-only close buttons. This is a common pattern that makes interactive overlays invisible or difficult to navigate for screen reader and keyboard users.
**Action:** When creating or reviewing custom overlays, always check for semantic boundaries (`role="dialog"`), accessible names (`aria-labelledby`), and visible focus indicators (`focus-visible`).
