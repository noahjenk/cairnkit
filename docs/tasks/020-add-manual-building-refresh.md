# Task 020: Add manual building refresh

## Goal

Let users manually refresh building feature loading for the current map area.

## Why this matters

Debounced loading and simple in-memory cache now exist. Manual refresh gives users control when data looks stale before richer cache strategy or status handling is added.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a manual refresh control
- reloading building features for the current map bounds
- bypassing or updating the in-memory cache for that refresh
- preserving debounced map movement loading

This task should not include:

- persistent cache storage
- advanced cache strategy
- richer error-state UI beyond what already exists
- saved-place changes
- backend code

## Files likely involved

- `src/app/layout/StatusIndicator.tsx`
- `src/app/AppShell.tsx`
- `src/map/MapView.tsx`
- `src/map/useMapInstance.ts`
- `src/ui/Button.tsx`

## Implementation steps

1. Add a manual refresh control near the current status indicator.
2. Trigger building loading for current bounds on demand.
3. Bypass or update the in-memory cache for manual refresh.
4. Keep debounced movement loading intact.
5. Confirm TypeScript builds.

## Acceptance criteria

- [x] Manual refresh control exists.
- [x] Manual refresh loads building features for current bounds.
- [x] Manual refresh can update cached data.
- [x] Debounced movement loading still works.
- [x] App still builds.

Completion note: accepted as a completed manual building refresh task. Task 021 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally, move the map, and use manual refresh while watching status output.

## Notes for Copilot

Keep this focused on manual refresh only. Richer loading and error states can come later.
