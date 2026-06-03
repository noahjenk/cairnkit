# Task 013: Add approximate avoid-zone layer

## Goal

Add a simple approximate avoid-zone layer from mock building features and the Rural Area Finder radius setting.

## Why this matters

The app can now show mock building features. The next step is to prove Rural Area Finder can produce its first map output without introducing Overpass, advanced geometry, or saved places.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a registered approximate avoid-zone layer
- simple approximate geometry around mock building features
- use of the current Rural Area Finder radius setting
- layer visibility controlled through the existing Layers panel
- deliberately rough visual styling

This task should not include:

- precise geodesic buffering
- dissolved or merged polygons
- saved places
- Overpass
- network requests
- production-grade geometry accuracy

## Files likely involved

- `src/layers/layerRegistry.ts`
- `src/layers/mapLibreLayerHelpers.ts`
- `src/map/useMapInstance.ts`
- `src/tools/ruralAreaFinder/`
- `src/dataSources/mock/`

## Implementation steps

1. Register an approximate avoid-zone layer.
2. Add a small helper for creating rough buffer polygons from mock buildings.
3. Render the avoid-zone layer when visible.
4. Use the persisted Rural Area Finder radius setting.
5. Keep the mock buildings debug layer separate.
6. Confirm TypeScript builds.

## Acceptance criteria

- [ ] Approximate avoid-zone layer appears in the Layers list.
- [ ] Layer visibility can be toggled.
- [ ] Avoid-zone output renders from mock buildings.
- [ ] Radius setting affects the approximate output.
- [ ] No Overpass code has been added.
- [ ] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally, change the Rural Area Finder radius, toggle the avoid-zone layer, and visually confirm the output changes.

## Notes for Copilot

Keep this deliberately approximate. Better geometry can come in a later refinement task.
