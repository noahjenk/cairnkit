# Task 021: Improve building loading status

## Goal

Make building loading and error states clearer without changing data loading behavior.

## Why this matters

The app can load building features through debounced movement and manual refresh. Users need clearer feedback when loading succeeds, uses cached data, or fails.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- clearer success, loading, cached, and error messages
- disabled refresh behavior while a load is active if useful
- concise error detail somewhere visible
- no change to data-source behavior

This task should not include:

- avoid-zone geometry refinement
- persistent cache storage
- saved-place changes
- Overpass query changes
- backend code

## Files likely involved

- `src/app/AppShell.tsx`
- `src/app/layout/StatusIndicator.tsx`
- `src/map/useMapInstance.ts`
- `src/app/app.css`

## Implementation steps

1. Refine building loading status data if needed.
2. Show clearer loading, success, cached, and error states.
3. Keep manual refresh and debounced movement behavior intact.
4. Confirm TypeScript builds.

## Acceptance criteria

- [x] Loading state is clear.
- [x] Cached-load state is clear.
- [x] Error state is visible and understandable.
- [x] Refresh behavior remains available.
- [x] App still builds.

Completion note: accepted as a completed building loading status task. Task 022 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally and observe status output for initial load, cached movement, manual refresh, and a failed request.

## Notes for Copilot

Keep this focused on status feedback only. Avoid-zone geometry refinement comes later.
