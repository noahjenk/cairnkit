# Task 012: Render mock buildings debug layer

## Goal

Render the mock building features on the map as a simple debug layer.

## Why this matters

The app now has mock building data and a Rural Area Finder radius setting. Before calculating avoid zones, the project should prove that tool-owned feature data can be displayed through the layer system.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a registered debug layer for mock buildings
- loading mock building features for the current development area
- rendering those features as a simple MapLibre layer
- tying the debug layer visibility to the existing layer controls
- keeping styling intentionally simple

This task should not include:

- avoid-zone calculations
- radius-based filtering
- saved places
- Overpass
- network requests
- production-grade layer styling

## Files likely involved

- `src/layers/layerRegistry.ts`
- `src/layers/mapLibreLayerHelpers.ts`
- `src/map/MapView.tsx`
- `src/map/useMapInstance.ts`
- `src/dataSources/mock/mockBuildingSource.ts`
- `src/tools/ruralAreaFinder/`

## Implementation steps

1. Register a mock buildings debug layer.
2. Add a small helper for converting mock features to GeoJSON if needed.
3. Render mock building polygons in MapLibre when the debug layer is visible.
4. Keep the layer toggle behavior working from the workspace.
5. Confirm TypeScript builds.

## Acceptance criteria

- [x] Development fixture building layer appears in the Layers list.
- [x] Layer visibility can be toggled.
- [x] Mock building polygons render on the map when visible.
- [x] No avoid-zone logic has been added.
- [x] No Overpass code has been added.
- [x] App still builds.

Completion note: accepted as a completed debug-layer task. Task 013 is the next implementation task.

Superseded note: Task 024.5 replaced this fixed mock debug output with a loaded-buildings debug layer.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally, toggle the mock buildings debug layer, and visually confirm the mock polygons appear and disappear.

## Notes for Copilot

Keep this focused on rendering mock building features only. The next task after this should add the approximate avoid-zone layer from mock buildings.
