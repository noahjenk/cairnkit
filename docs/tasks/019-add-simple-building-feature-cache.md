# Task 019: Add simple building feature cache

## Goal

Avoid reloading building features for the same map area repeatedly.

## Why this matters

Debounced map movement loading now exists. A small cache reduces duplicate Overpass requests before adding manual refresh or more sophisticated request behavior.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a simple in-memory cache for loaded building features
- a stable cache key derived from approximate map bounds
- using cached features when returning to a recently loaded area
- preserving the existing debounced movement behavior

This task should not include:

- persistent cache storage
- manual refresh
- advanced request throttling
- cache invalidation UI
- saved-place changes

## Files likely involved

- `src/map/useMapInstance.ts`
- `src/utils/`
- `src/dataSources/`

## Implementation steps

1. Add a small cache key helper for map bounds.
2. Store loaded building features in memory by key.
3. Reuse cached features before calling Overpass again.
4. Keep status output understandable.
5. Confirm TypeScript builds.

## Acceptance criteria

- [x] Building feature loads are cached by approximate bounds.
- [x] Returning to the same approximate area uses cached data.
- [x] Debounced loading still works.
- [x] No persistent cache storage has been added.
- [x] App still builds.

Completion note: accepted as a completed simple in-memory cache task. Task 020 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally, move away and back to the same area, and confirm repeated loads are reduced.

## Notes for Copilot

Keep this as a small in-memory cache. Manual refresh and persistent cache strategy come later.
