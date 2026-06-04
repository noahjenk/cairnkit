# Task 048: Add building load viewport guard

## Goal

Avoid loading building data when the map view is too broad to be useful for Rural Area Finder.

## Why this matters

Rural Area Finder currently loads buildings whenever the tool is enabled and the map moves. At low zoom levels or very large bounds, Overpass requests can become slow, noisy, or too expensive for an interactive MVP. A small viewport guard keeps data loading focused on practical scouting views.

## Relevant docs

- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- defining a simple minimum zoom or maximum bounds-size rule before building loads
- showing a clear idle/status message when the view is too broad
- preserving manual refresh behavior within allowed views
- keeping existing cache and Rural Area Finder rendering behavior unchanged

This task should not include:

- new Overpass query features
- persistent cache storage
- backend processing
- changing avoid-zone geometry
- adding new UI settings

## Files likely involved

- `src/map/useMapInstance.ts`
- `src/app/AppShell.tsx`
- `docs/tasks/README.md`

## Implementation steps

1. Review current building load trigger points.
2. Add a small helper that decides whether the current map view can load buildings.
3. Use the helper before initial, move-end, and manual-refresh loads.
4. Surface a readable status when the current view is too broad.
5. Build the app.

## Acceptance criteria

- [ ] Building data does not load when the map view is too broad.
- [ ] The user sees a clear status message explaining why data is not loading.
- [ ] Building data still loads at allowed zoom/bounds sizes.
- [ ] Manual refresh still works at allowed zoom/bounds sizes.
- [ ] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then manually test Rural Area Finder at broad and closer map views, including manual refresh.
