# Coding Conventions

Detailed rules referenced from CLAUDE.md. Add to this file as conventions are agreed.

## File and folder naming

- Next.js special files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`) keep their required lowercase names.
- Route folders in `app/` are lowercase; they become the URL (`app/about` → `/about`).
- Component folders are lowercase or kebab-case: `components/header/`, `components/site-footer/`.
- A file that exports a React component uses PascalCase and matches the component name: `Header.tsx` exports `Header`.
- Non-component files are lowercase: SCSS modules (`header.module.scss`), hooks, utilities, types.

## Component structure

Colocate a component with its styles in one folder:

```
app/components/header/
  Header.tsx
  header.module.scss
```
