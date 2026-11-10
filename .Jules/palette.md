## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-11-10 - Empty State Onboarding UX
**Learning:** Found that empty list views in tables used plain text fallbacks which look unpolished and don't provide a next step for users. Using the EmptyState component improves onboarding.
**Action:** When implementing empty list views (e.g., no items to display), use the existing EmptyState component with a clear title, description, and an action prop (e.g., a Create button). Inside table bodies (tbody), wrap it in a tr with td colSpan matching column count and p-4 padding.
