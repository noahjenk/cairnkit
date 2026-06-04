# Task 037: Highlight selected saved place search result

## Goal

Make saved-place search selection feel clearer after the map pans to a result.

## Why this matters

Search can now find and focus saved places, but there is no explicit selected state beyond map movement. A lightweight highlight helps users confirm which saved place they selected.

## Relevant docs

- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- tracking the selected saved place from search
- highlighting the selected saved-place marker or list item
- keeping the highlight clear but subtle
- preserving the existing saved-place search and pan behavior

This task should not include:

- adding external geocoding
- changing saved-place persistence
- redesigning the workspace panel

## Files likely involved

- `src/app/AppShell.tsx`
- `src/map/MapView.tsx`
- `src/map/useMapInstance.ts`
- `src/savedPlaces/SavedPlacesPanel.tsx`
- `src/app/app.css`
- `docs/tasks/README.md`

## Implementation steps

1. Track the selected saved-place id.
2. Pass selection to the map and/or saved places list.
3. Add a subtle selected marker or list style.
4. Build the app.

## Acceptance criteria

- [ ] Selecting a search result creates a visible selected state.
- [ ] The map still pans to the selected saved place.
- [ ] The selected state remains subtle and readable.
- [ ] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then search for a saved place and verify the selected result is visibly indicated.
