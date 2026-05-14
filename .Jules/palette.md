## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2024-05-14 - Empty States for Onboarding
**Learning:** Empty states with actionable buttons are critical for initial user onboarding. Plain text fallbacks (like an empty grid or "No items found") provide a poor UX, whereas a clear call to action guides the user on their next steps.
**Action:** Always check if a list component has an empty state handling logic and consider using a dedicated `EmptyState` component with a clear title, description, and action button.
