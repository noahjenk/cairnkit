# Task 039: Add clear selected saved place action

## Goal

Let users clear the selected saved-place highlight.

## Why this matters

Saved places can now be selected from search and the workspace list. A clear action gives users an obvious way to return the map and list to a neutral state.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- adding a compact clear-selection action when a saved place is selected
- clearing selected marker, list, and search result highlight
- preserving current saved-place selection and pan behavior

This task should not include:

- deleting saved places
- editing saved places
- changing saved-place persistence

## Files likely involved

- `src/app/AppShell.tsx`
- `src/app/layout/FloatingSearchBox.tsx`
- `src/app/layout/WorkspacePanel.tsx`
- `src/savedPlaces/SavedPlacesPanel.tsx`
- `src/app/app.css`
- `docs/tasks/README.md`

## Implementation steps

1. Add a clear-selection handler near the selected saved-place state.
2. Expose the clear action in a compact place.
3. Clear all selected-state highlights without changing saved data.
4. Build the app.

## Acceptance criteria

- [ ] A selected saved place can be cleared.
- [ ] Clearing removes search, list, and marker highlights.
- [ ] Clearing does not delete or edit saved places.
- [ ] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then select a saved place and clear the selection.
