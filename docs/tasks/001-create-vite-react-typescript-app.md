# Task 001: Create Vite React TypeScript app

## Goal

Set up the basic frontend app using Vite, React, and TypeScript.

## Why this matters

This creates the technical base for CairnKit while keeping the project clean and beginner-friendly.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- creating a Vite React TypeScript app
- removing unnecessary starter/demo content
- showing a simple CairnKit placeholder
- making sure the app runs locally

This task should not include:

- MapLibre
- Rural Area Finder
- saved places
- tool registry
- layer registry
- Overpass
- backend code

## Files likely involved

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`

## Implementation steps

1. Create the Vite React TypeScript app.
2. Remove default demo content.
3. Replace it with a simple CairnKit placeholder.
4. Confirm the app runs.
5. Do not add map functionality yet.

## Acceptance criteria

- [ ] `npm install` works.
- [ ] `npm run dev` works.
- [ ] Browser shows a simple CairnKit placeholder.
- [ ] No MapLibre or app features are added yet.
- [ ] The change stays inside the task scope.

## Testing instructions

Run:

```bash
npm install
npm run dev
```

Open the local development URL and confirm the page displays CairnKit.

## Notes for Copilot

Read the repo docs before implementing.

Do not skip ahead to MapLibre or Rural Area Finder.
