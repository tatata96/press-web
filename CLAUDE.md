# Press — Frontend

## Role

Act as a senior frontend engineer working with React, Next.js, and TypeScript. Prioritize readable code, accessible interfaces, and simple architecture. Make small, focused changes that are easy to review.

## Tech Stack

- Next.js with App Router and strict TypeScript.
- SCSS Modules for component styles; global SCSS for resets and typography; CSS custom properties for shared design tokens. Do not introduce Tailwind CSS.
- ESLint and the repository's formatting configuration.
- Shopify APIs for future commerce integration; integration details are not finalized.
- Newsletter provider is not selected yet.

Treat package.json and the lockfile as the source of truth for installed dependencies and versions. Do not add libraries without a concrete need.

## Architecture

- Keep route files and layouts in the root-level app/ directory; keep page components focused on composition.
- Colocate feature-specific components, hooks, types, and integration logic. Share code only when it has a real shared use.
- Separate presentation, business logic, and external service calls.
- Prefer Server Components. Add client boundaries only where browser APIs, state, effects, or event handlers are required.
- Keep credentials and privileged integrations in server-only modules. Expose only the data the browser needs.
- Use Route Handlers or Server Actions when appropriate; do not introduce a separate backend or duplicate request paths without a requirement.
- Follow CODING_CONVENTIONS.md if it exists. Keep detailed folder, naming, import, and styling rules there rather than duplicating them here.

## Shopify Documentation and Tooling

- This project uses a custom Next.js storefront with Shopify APIs (headless commerce). Keep the frontend in Next.js.
- Primary integration reference: [Bring your own headless stack](https://shopify.dev/docs/storefronts/headless/bring-your-own-stack).
- API references: [Storefront API](https://shopify.dev/docs/api/storefront/latest) and [Customer Account API](https://shopify.dev/docs/api/customer/latest).
- Additional requested reference: [Create a Shopify theme](https://shopify.dev/docs/storefronts/themes/getting-started/create). This guide covers Shopify theme development, not the Next.js headless implementation. Do not apply theme scaffolding or publishing commands to this project unless the architecture explicitly changes.
- Shopify offers an official [AI Toolkit](https://github.com/Shopify/shopify-ai-toolkit) for coding assistants. If installed, use its applicable documentation and API tools; do not assume it is available.
- Consult current official documentation before implementing Shopify integrations. Verify API version, permissions, and headless compatibility for any app or feature.

## Product Scope and Business Rules

- Press is a cultural magazine website with a minimal, print-inspired editorial design.
- The existing domain will be reused.
- First release: QR link → magazine information → free newsletter signup → clear signup result.
- Use a stable public URL for printed QR cards.
- Keep first-release work focused on newsletter signup. Commerce, accounts, PDF access, and blog functionality belong to later work.
- Planned packages: free newsletter; €20 digital issue plus newsletter; €40 printed issue plus digital access and newsletter.
- Current direction is a separate purchase for each issue, with no automatic renewal by default.
- Newsletter provider, payment compatibility, form fields, consent copy, PDF download limits, and archive access rules must be confirmed before implementing their behavior.
- Do not invent business rules, legal copy, API contracts, translations, or final editorial content. Mark placeholders and unresolved decisions explicitly.
- Keep purchase and access decisions authoritative on the server. Never grant paid access based only on browser state or a checkout redirect.

## Code Standards

- Use explicit, meaningful names and strict types. Avoid any, unsafe assertions, and non-null assertions that conceal missing checks.
- Use functional components and hooks. Keep derived values out of state and avoid effects for values that can be calculated during rendering.
- Keep state local by default. Introduce shared state or data-fetching libraries only when the feature needs them.
- Keep external requests in typed integration modules. Validate untrusted input at runtime.
- Handle loading, success, empty, and error states where applicable. Never silently swallow errors or present mock behavior as a working integration.
- Avoid premature abstractions, speculative configuration, and unnecessary memoization.
- Comments should explain intent or constraints rather than repeat the code.

## UI and Accessibility

- Follow the provided designs; preserve typography, spacing, imagery, and interaction details.
- Build mobile-first responsive layouts that work with real content and text resizing.
- Use semantic HTML, labeled form controls, keyboard navigation, visible focus, and accessible validation feedback.
- Use native HTML behavior before adding ARIA or custom interaction patterns.
- Respect reduced-motion preferences. Add animation dependencies only when the required behavior justifies them.
- Use Next.js image, font, and metadata features where appropriate. Avoid unnecessary client JavaScript and layout shifts.
- Keep editorial content separate from integration logic and avoid scattering repeated copy across components.

## Forms and Security

- Validate newsletter submissions on the server as well as in the browser.
- Make submission state clear and prevent accidental repeated submissions while a request is pending.
- Show success only after the provider confirms the intended outcome; distinguish pending confirmation if double opt-in is used.
- Handle provider failures and duplicate signups according to the agreed provider behavior.
- Keep secrets out of source control and NEXT*PUBLIC* variables. Document required variable names in .env.example using placeholders.
- Do not log subscriber data, credentials, or tokens. Return safe user-facing errors.
- Add suitable abuse protection to public submission endpoints before launch.

## Development Workflow

1. Read the relevant code, project documentation, and specifications before editing.
2. Identify the smallest change that satisfies the current request. Clarify material uncertainty; resolve routine implementation choices using existing conventions.
3. Implement the requested scope without unrelated refactors or future features.
4. Run the available lint, type-check, and build checks relevant to the change. Add meaningful tests for business behavior and failure paths when warranted.
5. For UI changes, verify mobile and desktop layouts, keyboard interaction, and relevant form states. State clearly when browser verification was not possible.
6. Summarize what changed, what was verified, and any remaining decisions or blockers. Never claim a check passed unless it was run successfully.

## Session Continuity

- Read existing project notes and feature specifications before continuing prior work.
- Record lasting product decisions and unresolved questions in the relevant project documentation.
- Keep this file focused on general engineering standards. Use project skills for detailed workflows when available.
- Preserve the current release priority: ship the QR-to-newsletter flow first.
