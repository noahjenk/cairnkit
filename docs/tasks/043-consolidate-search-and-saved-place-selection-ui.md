# Task 043: Consolidate search and saved-place selection UI

## Goal

Make search results and saved-place selection feel like one coherent workflow.

## Why this matters

Search, saved-place list items, selected markers, and clear-selection behavior are currently spread across multiple surfaces. They should feel connected without duplicating too much UI.

## Relevant docs

- `docs/UI_OVERHAUL_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- aligning the visual pattern for search results and saved-place list items
- making selected-place feedback consistent across search, list, and map
- ensuring the clear-selection action is easy to find
- keeping the search layout compact

This task should not include:

- adding external geocoding
- changing saved-place storage
- adding edit/delete flows

## Files likely involved

- `src/app/layout/FloatingSearchBox.tsx`
- `src/savedPlaces/SavedPlacesPanel.tsx`
- `src/app/AppShell.tsx`
- `src/app/app.css`
- `docs/tasks/README.md`

## Implementation steps

1. Review search and saved-place selected-state UI.
2. Align markup and styles where useful.
3. Ensure selected and clear states are easy to understand.
4. Build the app.

## Acceptance criteria

- [ ] Search results and saved-place list items feel related.
- [ ] Selected saved-place state is clear across surfaces.
- [ ] Clear-selection action remains discoverable.
- [ ] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then search, select, select from list, and clear selection.
