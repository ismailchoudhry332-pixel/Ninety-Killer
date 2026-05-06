## 2024-03-20 - Adding standard accessibility features to Modal components
**Learning:** Using `useId` for dynamic `aria-labelledby` ensures unique accessibility labeling for modals across instances, avoiding potential ID collisions and hydration mismatches.
**Action:** Always add standard ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and proper focus rings/labels to dismiss buttons when creating or refactoring overlay components.
