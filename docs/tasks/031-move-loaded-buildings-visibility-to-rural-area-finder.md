# Task 031: Move loaded buildings visibility to Rural Area Finder

## Goal

Move loaded-building visibility out of the general Layers section and into Rural Area Finder settings.

## Why this matters

Loaded buildings explain Rural Area Finder output. They are not a generic map layer in the MVP. The tool should show loaded buildings by default when enabled, while letting users hide them from the Rural Area Finder panel.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- removing loaded buildings from the general Layers list
- adding a loaded-buildings toggle to Rural Area Finder
- defaulting loaded buildings to visible when Rural Area Finder is enabled
- keeping loaded buildings hidden when Rural Area Finder is disabled

This task should not include:

- changing building data loading scope
- changing avoid-zone canvas rendering
- changing saved places

## Files likely involved

- `src/layers/layerRegistry.ts`
- `src/map/MapView.tsx`
- `src/map/useMapInstance.ts`
- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `docs/tasks/README.md`

## Implementation steps

1. Remove the loaded-buildings debug entry from the generic layer registry.
2. Add a Rural Area Finder setting for loaded-building visibility.
3. Wire that setting into `MapView` and `useMapInstance`.
4. Default loaded buildings to visible with the tool enabled.
5. Build the app.

## Acceptance criteria

- [x] Loaded buildings are no longer shown in the generic Layers section.
- [x] Rural Area Finder has a loaded-buildings visibility setting.
- [x] Loaded buildings are visible by default when Rural Area Finder is enabled.
- [x] Loaded buildings can be hidden from the Rural Area Finder panel.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then enable Rural Area Finder and toggle loaded-building visibility from the tool panel.

## Completion note

Completed on 2026-06-04. Loaded-building visibility now belongs to the Rural Area Finder panel, defaults to visible when the tool is active, persists as a tool setting, and is forced hidden while Rural Area Finder is disabled.
