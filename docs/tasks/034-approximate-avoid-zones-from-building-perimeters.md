# Task 034: Approximate avoid zones from building perimeters

## Goal

Make Rural Area Finder avoid zones approximate a fixed distance from each building perimeter instead of drawing circles around building centers.

## Why this matters

The current canvas mask makes dense building areas performant, but the geometry reads like each building has a center-based circle. Users expect the shaded area to represent the configured distance away from the building outline.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- changing the canvas mask drawing so each building polygon contributes an approximate perimeter buffer
- keeping the constant-opacity canvas mask approach
- keeping rendering bounded to the currently loaded building features
- preserving the existing radius and opacity settings

This task should not include:

- reintroducing polygon union processing
- changing Overpass loading behavior
- changing Rural Area Finder settings UI

## Files likely involved

- `src/tools/ruralAreaFinder/ruralAreaFinderAvoidZone.ts`
- `src/map/useMapInstance.ts`
- `docs/tasks/README.md`

## Implementation steps

1. Inspect the current canvas mask projection and drawing logic.
2. Draw filled building polygons and offset strokes around building perimeters using the configured radius.
3. Keep mask opacity constant through the existing raster opacity layer.
4. Build the app.

## Acceptance criteria

- [x] Avoid-zone shading follows building polygon perimeters more closely than center circles.
- [x] Dense areas still render without crashing.
- [x] Existing opacity and radius settings still affect output.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect Rural Area Finder avoid zones around several rectangular and irregular building footprints.

## Completion note

Completed on 2026-06-04. The avoid-zone canvas now traces building geometries in approximate meter coordinates, fills each footprint, and strokes polygon perimeters by the configured radius while keeping the constant-opacity raster mask approach.
