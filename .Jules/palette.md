## 2024-05-18 - Modal Component Accessibility
**Learning:** Verified standard pattern for dialog elements locally within Next.js sandbox: adding `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and explicitly adding focus rings `focus-visible:ring-2` to close buttons improves keyboard navigation. Using `useId()` correctly maps the ARIA label.
**Action:** Consistently apply these attributes to all future interactive overlays or dialog wrappers in the project, ensuring `useId` is preferred over manual ID generation for robust server-side rendering compatibility.
