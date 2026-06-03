# Task 002: Add base folder structure

## Goal

Create the planned source folders before features are added.

## Why this matters

This gives future code a clear home and helps prevent the app becoming one large messy component.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- creating the planned source folders
- adding placeholder files only where useful
- keeping the app running

This task should not include:

- MapLibre setup
- app shell layout
- Rural Area Finder logic
- saved places logic
- Overpass
- backend code

## Files likely involved

- `src/app/`
- `src/map/`
- `src/tools/`
- `src/layers/`
- `src/dataSources/`
- `src/featureTypes/`
- `src/savedPlaces/`
- `src/storage/`
- `src/state/`
- `src/ui/`
- `src/utils/`

## Implementation steps

1. Read `docs/ARCHITECTURE.md`.
2. Create the planned source folders.
3. Add small placeholder files only where necessary.
4. Do not implement real features yet.
5. Confirm the app still runs.

## Acceptance criteria

- [ ] Folder structure matches the architecture direction.
- [ ] App still runs.
- [ ] No large feature code has been added.
- [ ] No out-of-scope libraries have been added.

## Testing instructions

Run:

```bash
npm run dev
```

Confirm the app still displays the CairnKit placeholder.

## Notes for Copilot

This is a structure task only. Do not skip ahead.
