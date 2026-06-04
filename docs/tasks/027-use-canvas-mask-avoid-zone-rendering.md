# Task 027: Use canvas mask avoid-zone rendering

## Goal

Render Rural Area Finder avoid zones as a non-stacking canvas mask instead of polygon union output.

## Why this matters

Polygon union produced the expected merged shape but added complexity and performance risk. The actual visual requirement is simpler: overlapping radius areas should not become darker. A canvas mask can draw many overlapping circles as opaque pixels and let MapLibre apply one consistent raster opacity.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- replacing avoid-zone polygon union rendering with a canvas source
- drawing avoid-zone circles as an opaque mask
- displaying the mask through a raster layer with fixed opacity
- removing the avoid-zone worker path
- removing the polygon union dependency

This task should not include:

- changing Overpass loading
- changing saved places
- changing the loaded buildings debug layer
- adding backend GIS processing

## Files likely involved

- `src/tools/ruralAreaFinder/ruralAreaFinderAvoidZone.ts`
- `src/map/useMapInstance.ts`
- `package.json`
- `package-lock.json`
- `docs/tasks/README.md`

## Implementation steps

1. Add a canvas mask renderer for avoid-zone circles.
2. Replace the GeoJSON fill avoid-zone layer with a MapLibre canvas/raster source.
3. Remove worker and polygon union code.
4. Update docs to record the rendering decision.
5. Build the app.

## Acceptance criteria

- [x] Avoid-zone overlaps no longer become darker.
- [x] Avoid zones render for dense areas without polygon union.
- [x] No avoid-zone worker code remains.
- [x] The polygon union dependency has been removed.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then enable Rural Area Finder in a dense village area and confirm overlapping shaded radii stay visually consistent.

## Completion note

Replaced polygon union avoid-zone rendering with a georeferenced canvas mask displayed as a raster layer.
