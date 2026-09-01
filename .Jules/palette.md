## 2024-05-11 - Modal Accessibility Pattern
**Learning:** Found that the standard Modal component in the design system lacked critical ARIA attributes (role='dialog', aria-modal, aria-labelledby) and keyboard focus indicators for the close button. Adding these is crucial for screen reader users and keyboard navigators.
**Action:** When implementing or reviewing future modal or overlay components, ensure they map title IDs correctly using `useId()`, define the dialog role, and explicitly hide decorative icons from screen readers while providing focus states for all interactive elements.
## 2026-09-01 - Modal Data Entry Pattern
**Learning:** Discovered that data entry within modals often incorrectly utilizes raw `<div>` containers and isolated inputs with `onClick` handlers, which prevents native HTML5 validation (`required`), 'Enter-to-submit' behavior, and correct `htmlFor` label associations.
**Action:** When refactoring or building forms in modals, wrap inputs in a `<form onSubmit={...}>` element, use native HTML5 validation, and explicitly define button types (`type="button"` for Cancel, `type="submit"` for Action) to enable standard form accessibility and behavior.
