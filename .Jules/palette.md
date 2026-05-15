## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-19 - Empty States in List Views
**Learning:** Plain text empty states in data tables and list views (e.g., "No rocks") offer a poor user experience. Users need clear visual indicators that a list is empty and actionable next steps. Replacing these with a consistent, well-designed `EmptyState` component improves onboarding and overall application feel.
**Action:** Always use the `EmptyState` component (`@/components/ui/empty-state`) instead of plain text or raw HTML for empty lists, ensuring a title, descriptive text, and a primary action button are provided.
