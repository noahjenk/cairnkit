# Task 047: Add bounded building feature cache

## Goal

Keep the in-memory building feature cache useful without allowing it to grow forever during long map sessions.

## Why this matters

The current Overpass building cache is a simple unbounded `Map` keyed by approximate bounds. That was enough for the MVP, but repeated map movement can keep adding feature arrays for every visited area. A small bounded cache is the next lightweight cache-strategy improvement from the refinement roadmap.

## Relevant docs

- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- adding a small maximum-entry limit for the in-memory building feature cache
- pruning the oldest cached bounds entries when the limit is exceeded
- preserving existing cached-load and manual-refresh behavior
- keeping cache storage in memory only

This task should not include:

- persistent cache storage
- IndexedDB
- cache settings UI
- changing Overpass request behavior
- changing Rural Area Finder rendering

## Files likely involved

- `src/utils/boundsCache.ts`
- `src/map/useMapInstance.ts`
- `docs/tasks/README.md`

## Implementation steps

1. Review current building feature cache reads and writes.
2. Add a small helper for setting cache entries with a maximum size.
3. Use the helper for network loads and manual refreshes.
4. Build the app.

## Acceptance criteria

- [x] Building feature cache has a clear maximum entry count.
- [x] Oldest cache entries are pruned when the maximum is exceeded.
- [x] Returning to a cached area still uses cached building data when present.
- [x] Manual refresh still updates the cache for the current bounds.
- [x] App still builds.

## Completion note

Completed. Added a 20-entry in-memory bounds cache limit with oldest-entry pruning. Normal Overpass loads and manual refreshes now write through the bounded cache helper, preserving existing cached-load behavior while preventing unbounded cache growth.

## Testing instructions

Run:

```bash
npm run build
```

Then manually test Rural Area Finder by moving between several map areas, returning to a recent area, and using manual refresh.
