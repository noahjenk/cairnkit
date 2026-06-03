# Task 024: Connect loaded buildings to Rural Area Finder

## Goal

Use the currently loaded building features as the Rural Area Finder avoid-zone input.

## Why this matters

Overpass loading, debounce, cache, refresh, and status now exist, and the avoid-zone layer previously used development mock building features. Rural Area Finder should use the building data loaded for the current map bounds before deeper geometry refinement happens.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- storing the latest loaded building features in React or map state
- passing those features into the Rural Area Finder avoid-zone rendering path
- keeping mock building features available for the debug layer
- preserving the Rural Area Finder toggle as the avoid-zone visibility control
- keeping manual refresh and cache status behavior intact

This task should not include:

- dissolved or merged buffer geometry
- new GIS dependencies
- backend caching
- search implementation
- mobile layout work

## Files likely involved

- `src/app/AppShell.tsx`
- `src/map/MapView.tsx`
- `src/map/useMapInstance.ts`
- `src/tools/ruralAreaFinder/ruralAreaFinderAvoidZone.ts`
- `docs/tasks/README.md`

## Implementation steps

1. Review how building features are loaded and cached in `useMapInstance`.
2. Add a narrow way to retain the latest loaded building features.
3. Update the avoid-zone layer sync to use loaded building features when available.
4. Keep the mock buildings debug layer tied to the mock source.
5. Confirm the Rural Area Finder toggle and radius still update the avoid-zone layer.

## Acceptance criteria

- [x] Rural Area Finder avoid zones are generated from loaded building features for the current map bounds.
- [x] Mock building debug rendering still uses mock development features.
- [x] Manual refresh updates the avoid-zone input when new building data loads.
- [x] Cached building loads can update the avoid-zone input.
- [x] Rural Area Finder avoid-zone visibility remains controlled by the tool toggle.

## Testing instructions

Run:

```bash
npm run build
```

Then manually check:

1. Open the app.
2. Enable Rural Area Finder.
3. Move the map and wait for building loading to finish.
4. Confirm the avoid-zone output follows the loaded building data rather than the fixed mock development area.
5. Use Refresh and confirm the avoid-zone output remains stable or updates with the refreshed data.

## Notes for Copilot

Keep this as a data-flow task. Do not add merged buffers or a new geometry library here.

## Completion note

Rural Area Finder avoid-zone rendering now uses the latest loaded or cached building features. The mock buildings debug layer still uses the fixed development mock source.
