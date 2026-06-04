# Task 029: Load buildings only when Rural Area Finder is enabled

## Goal

Only load building data while Rural Area Finder is enabled.

## Why this matters

Building data currently loads in the background even when Rural Area Finder is not being used. Overpass requests should be scoped to the active tool so the app does less work and avoids unnecessary network traffic.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- disabling initial and debounced building loading while Rural Area Finder is off
- loading current map bounds when Rural Area Finder turns on
- keeping manual refresh scoped to active Rural Area Finder use
- preserving the existing building cache

This task should not include:

- changing avoid-zone rendering
- moving loaded buildings into the tool panel
- adding a collapsible workspace panel

## Files likely involved

- `src/map/MapView.tsx`
- `src/map/useMapInstance.ts`
- `src/app/AppShell.tsx`
- `src/app/layout/StatusIndicator.tsx`
- `docs/tasks/README.md`

## Implementation steps

1. Pass Rural Area Finder enabled state into the map hook as a data-loading flag.
2. Skip initial and move-end building loads when the flag is off.
3. Trigger a current-bounds load when the flag turns on.
4. Disable or ignore manual refresh when the flag is off.
5. Build the app.

## Acceptance criteria

- [x] Building data does not load while Rural Area Finder is disabled.
- [x] Building data loads when Rural Area Finder is enabled.
- [x] Debounced movement loading works while Rural Area Finder is enabled.
- [x] Manual refresh does not request buildings while Rural Area Finder is disabled.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect network behavior with Rural Area Finder off and on.

## Notes for Copilot

Keep this focused on loading scope. Do not move layer controls in this task.

## Completion note

Completed on 2026-06-04. `MapView` now passes Rural Area Finder enabled state into the map hook, and `useMapInstance` scopes initial, debounced, manual-refresh, and stale in-flight building requests to that flag while preserving the existing bounds cache.
