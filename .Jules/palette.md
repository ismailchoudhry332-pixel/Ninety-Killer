## 2024-03-19 - Modal close button accessibility
**Learning:** Found an icon-only button in the generic `Modal` UI component that lacks an `aria-label`, making it difficult for screen readers to identify its purpose (closing the modal). Also, keyboard navigation via "focus-visible:ring-2 focus:outline-none focus:ring-primary-500 rounded" is missing for this button.
**Action:** Adding `aria-label="Close"` and appropriate focus styles to icon-only buttons across shared UI components to ensure accessibility.
