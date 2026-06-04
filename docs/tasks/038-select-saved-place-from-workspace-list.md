# Task 038: Select saved place from workspace list

## Goal

Let users select saved places directly from the workspace list.

## Why this matters

Search can now select and highlight saved places, but the saved-place list itself is still passive. Selecting from the list should use the same selected state and map pan behavior as search.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- making saved-place list items selectable
- using the existing selected saved-place state
- panning the map to the selected saved place
- keeping list styling compact and accessible

This task should not include:

- editing or deleting saved places
- changing saved-place persistence
- adding external geocoding

## Files likely involved

- `src/app/AppShell.tsx`
- `src/app/layout/WorkspacePanel.tsx`
- `src/savedPlaces/SavedPlacesPanel.tsx`
- `src/app/app.css`
- `docs/tasks/README.md`

## Implementation steps

1. Pass a saved-place selection handler into the workspace list.
2. Make saved-place list items clickable buttons or otherwise keyboard-selectable.
3. Reuse the existing selected saved-place id and map pan behavior.
4. Build the app.

## Acceptance criteria

- [x] Saved-place list items can be selected directly.
- [x] Selecting from the list pans the map to the saved place.
- [x] The selected list item remains visibly highlighted.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then select a saved place from the workspace list and verify the map pans and highlight updates.

## Completion note

Completed on 2026-06-04. Saved-place list items are now keyboard-accessible buttons that reuse the existing selected saved-place state and map pan behavior from search selection.
