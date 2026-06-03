# Task 014: Add saved-place types and service

## Goal

Add the core saved-place data types and a local service without adding map click UI yet.

## Why this matters

Saved places are the next MVP area after the Rural Area Finder proof layer. Defining the data shape and local persistence service first keeps map interactions and UI forms clean in later tasks.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a saved-place type
- a local saved-place service
- localStorage persistence through the service
- basic create, read, update, and delete helpers if still small
- stable IDs and timestamps

This task should not include:

- map click handling
- temporary pins
- save-place forms
- saved-place map rendering
- Overpass
- backend code

## Files likely involved

- `src/savedPlaces/savedPlaceTypes.ts`
- `src/savedPlaces/savedPlaceService.ts`
- `src/savedPlaces/index.ts`
- `src/storage/`
- `src/utils/ids.ts`

## Implementation steps

1. Define the saved-place data type.
2. Add local persistence helpers behind a saved-place service.
3. Add create, list, update, and delete helpers if the service remains small.
4. Export the saved-place APIs from a barrel file.
5. Confirm TypeScript builds.

## Acceptance criteria

- [x] Saved-place type exists.
- [x] Saved-place service exists.
- [x] Saved places persist locally through the service.
- [x] No map click UI has been added.
- [x] No saved-place map rendering has been added.
- [x] App still builds.

Completion note: accepted as a completed saved-place service task. Task 015 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

Optionally add a temporary local check that creates and lists saved places through the service, then remove the temporary check.

## Notes for Copilot

Keep this focused on saved-place data and service only. The next task should add map click temporary pin and save-place flow.
