## 2026-04-20 - Modal Component Accessibility
**Learning:** React 18's `useId()` hook is ideal for generating stable unique IDs to link dynamic `aria-labelledby` attributes to dialog titles in shared components like `Modal`, while keeping pure SVG icons hidden with `aria-hidden='true'` avoids redundant screen reader noise on interactive elements.
**Action:** Consistently use `useId` with `aria-labelledby` in custom dialog wrappers, and pair visual-only SVGs with `aria-hidden='true'` inside actionable buttons.
