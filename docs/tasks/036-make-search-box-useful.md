# Task 036: Make search box useful

## Goal

Turn the current placeholder search box into a useful map workflow entry point.

## Why this matters

Search is visible in the first viewport, but it currently does not help users navigate or filter anything. A small useful search behavior will make the map-first shell feel more purposeful.

## Relevant docs

- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- deciding the smallest useful search behavior for the current local-first app
- wiring the search box to that behavior
- keeping the floating search layout compact
- handling empty and no-result states clearly

This task should not include:

- adding paid geocoding services
- changing saved-place persistence format
- redesigning the workspace panel

## Files likely involved

- `src/app/layout/FloatingSearchBox.tsx`
- `src/app/AppShell.tsx`
- `src/savedPlaces`
- `src/app/app.css`
- `docs/tasks/README.md`

## Implementation steps

1. Inspect current saved-place and map APIs.
2. Choose a small search behavior that can work with existing local data.
3. Implement search interaction and result handling.
4. Build the app.

## Acceptance criteria

- [x] Search performs a useful action with existing app data.
- [x] Empty input is handled cleanly.
- [x] No-result state is clear.
- [x] Layout remains compact on desktop and narrow screens.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then try searching with no saved places, with a saved-place name, and with a term that has no match.

## Completion note

Completed on 2026-06-04. The floating search now filters saved places by name and notes, shows empty and no-result states, and pans the map to a selected saved place.
