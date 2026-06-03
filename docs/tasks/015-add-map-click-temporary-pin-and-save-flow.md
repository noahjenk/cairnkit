# Task 015: Add map click temporary pin and save flow

## Goal

Let users click the map, review a temporary pin, and save it as a saved place.

## Why this matters

The saved-place service now exists. The next step is to connect it to the map with a small user flow before adding saved-place map rendering or more advanced lists.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- map click handling for a temporary pin
- a temporary pin card or simple save form
- saving name, notes, and clicked coordinates through the saved-place service
- clearing the temporary pin after save or cancel
- minimal styling that fits the existing app shell

This task should not include:

- saved-place map rendering
- an All Places list
- tags, photos, accounts, or sharing
- Overpass
- backend code

## Files likely involved

- `src/map/useMapInstance.ts`
- `src/savedPlaces/TemporaryPinCard.tsx`
- `src/savedPlaces/SavePlaceForm.tsx`
- `src/savedPlaces/index.ts`
- `src/app/layout/WorkspacePanel.tsx`
- `src/app/app.css`

## Implementation steps

1. Add map click handling that records clicked coordinates.
2. Show a temporary pin card or simple form in the workspace.
3. Save submitted places through the saved-place service.
4. Allow canceling the temporary pin.
5. Keep saved-place map rendering for a later task.
6. Confirm TypeScript builds.

## Acceptance criteria

- [x] Clicking the map creates temporary pin coordinates.
- [x] Temporary pin coordinates can be saved as a saved place.
- [x] Saved places use the saved-place service.
- [x] Temporary pin can be canceled.
- [x] No saved-place map rendering has been added.
- [x] App still builds.

Completion note: accepted as a completed temporary pin and save-flow task. Task 016 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally, click the map, save a place, refresh, and confirm the saved-place service keeps the data for later UI work.

## Notes for Copilot

Keep this focused on the temporary pin and save flow. The next task should render saved pins and/or add the All Places list.
