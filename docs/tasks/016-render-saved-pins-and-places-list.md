# Task 016: Render saved pins and places list

## Goal

Show saved places after they are created.

## Why this matters

Users can now save clicked map coordinates. The next step is to make saved places visible again through a small list and map pin output.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- loading saved places from the saved-place service
- showing a simple All Places list in the workspace
- rendering saved-place pins on the map
- refreshing the list and pins after saving a new place
- keeping styling minimal and consistent

This task should not include:

- editing saved places
- deleting saved places unless it stays very small
- tags, photos, accounts, or sharing
- Overpass
- backend code

## Files likely involved

- `src/savedPlaces/SavedPlacesPanel.tsx`
- `src/savedPlaces/index.ts`
- `src/map/useMapInstance.ts`
- `src/app/layout/WorkspacePanel.tsx`
- `src/app/AppShell.tsx`
- `src/app/app.css`

## Implementation steps

1. Load saved places through the saved-place service.
2. Show saved places in the workspace.
3. Render saved-place pins on the map.
4. Refresh saved places after a new save.
5. Confirm TypeScript builds.

## Acceptance criteria

- [x] Saved places appear in a workspace list.
- [x] Saved-place pins render on the map.
- [x] Saving a new place refreshes the list or pins.
- [x] No Overpass code has been added.
- [x] App still builds.

Completion note: accepted as a completed saved-place display task. The click flow now also keeps a visible temporary map pin without blanking the app. Task 017 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally, save a place, and confirm it appears in the list and on the map.

## Notes for Copilot

Keep this focused on showing saved places. Overpass remains a later task.
