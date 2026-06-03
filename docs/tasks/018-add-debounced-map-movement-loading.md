# Task 018: Add debounced map movement loading

## Goal

Load building features after map movement settles, using the existing data-source boundary.

## Why this matters

The Overpass adapter exists but is not used by map movement yet. Debounced loading is the next step before adding cache behavior or manual refresh.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- reading map bounds after movement
- debouncing map movement before loading
- using an existing data-source adapter to load building features
- basic loading/error state if still small
- keeping cache behavior for a later task

This task should not include:

- cache behavior
- manual refresh
- advanced request throttling
- saved-place changes
- backend code

## Files likely involved

- `src/map/useMapInstance.ts`
- `src/utils/debounce.ts`
- `src/dataSources/dataSourceRegistry.ts`
- `src/tools/ruralAreaFinder/`
- `src/app/layout/StatusIndicator.tsx`

## Implementation steps

1. Add a small debounce helper if needed.
2. Read map bounds after movement settles.
3. Load building features through a selected data-source adapter.
4. Avoid firing requests on every pan frame.
5. Surface basic loading/error state if small.
6. Confirm TypeScript builds.

## Acceptance criteria

- [x] Map movement can trigger debounced building loading.
- [x] Loading uses an existing data-source adapter.
- [x] Loading does not fire continuously during movement.
- [x] No cache behavior has been added.
- [x] App still builds.

Completion note: accepted as a completed debounced map movement loading task. Task 019 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally and move the map while watching request behavior or status output.

## Notes for Copilot

Keep this focused on debounced loading only. Cache behavior and manual refresh come later.
