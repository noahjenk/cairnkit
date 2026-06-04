# Task 028: Add Rural Area Finder opacity control

## Goal

Add a small control for Rural Area Finder avoid-zone opacity.

## Why this matters

Avoid zones now render as a canvas mask with one consistent opacity. Letting users tune that opacity will make dense shaded areas easier to inspect against different map backgrounds.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- adding an avoid-zone opacity setting
- persisting the opacity locally
- applying the opacity to the avoid-zone raster layer
- keeping the existing radius input behavior

This task should not include:

- changing avoid-zone geometry
- changing Overpass loading
- adding backend processing

## Files likely involved

- `src/tools/ruralAreaFinder/`
- `src/map/useMapInstance.ts`
- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `docs/tasks/README.md`

## Implementation steps

1. Add opacity defaults and persistence.
2. Add an opacity control in the Rural Area Finder panel.
3. Pass opacity into the map rendering path.
4. Apply opacity to the raster avoid-zone layer.
5. Build the app.

## Acceptance criteria

- [x] Users can change avoid-zone opacity.
- [x] Opacity persists locally.
- [x] Avoid-zone raster opacity updates without changing radius.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then adjust opacity in Rural Area Finder and confirm the shaded layer updates.

## Completion note

Added a persisted opacity percentage setting and applied it to the Rural Area Finder avoid-zone raster layer.
