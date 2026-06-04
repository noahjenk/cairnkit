# Task 033: Simplify Rural Area Finder setting labels

## Goal

Reduce duplicated labels, tune input limits, and move Rural Area Finder status messages out of the settings body.

## Why this matters

The current panel repeats the same setting names in both section headers and input labels. The controls should be quieter and more direct so users can scan and adjust values quickly.

The building-data and avoid-zone messages describe page-wide map output, not settings. They should appear in the page-wide status indicator rather than as panels inside Rural Area Finder settings.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- removing the separate `Search radius` header because it duplicates `Distance from buildings`
- removing the lower limit from `Distance from buildings`
- removing the separate `Overlay opacity` header because it duplicates the opacity setting
- renaming `Avoid-zone opacity` to `Overlay opacity`
- setting `Overlay opacity` to default to `25` with input limits from `0` to `100`
- moving `Waiting for building data` and `Avoid-zone output is idle` style messages into the page-wide status indicator
- ensuring loaded buildings visibility defaults on and is respected only while Rural Area Finder is enabled

This task should not include:

- changing avoid-zone rendering
- changing setting persistence
- changing Rural Area Finder active-state behavior
- adding new data-loading behavior

## Files likely involved

- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `src/app/AppShell.tsx`
- `src/app/layout/StatusIndicator.tsx`
- `src/map/MapView.tsx`
- `src/map/useMapInstance.ts`
- `src/tools/ruralAreaFinder/ruralAreaFinderDefaults.ts`
- `src/tools/ruralAreaFinder/ruralAreaFinderStorage.ts`
- `docs/tasks/README.md`

## Implementation steps

1. Remove duplicated setting headers from the panel.
2. Adjust `Distance from buildings` input limits.
3. Rename the opacity input to `Overlay opacity`.
4. Adjust opacity default, input limits, and related clamping.
5. Move Rural Area Finder building-data and avoid-zone status text to the page-wide status indicator.
6. Verify loaded buildings are hidden when Rural Area Finder is disabled.
7. Build the app.

## Acceptance criteria

- [x] `Search radius` no longer appears as a separate header.
- [x] `Distance from buildings` no longer has a lower input limit.
- [x] `Overlay opacity` no longer appears as a duplicated header above the opacity input.
- [x] The opacity input is labelled `Overlay opacity`.
- [x] The opacity input defaults to `25` and is limited from `0` to `100`.
- [x] Rural Area Finder building-data status is no longer shown as a panel inside settings.
- [x] Rural Area Finder avoid-zone status is no longer shown as a panel inside settings.
- [x] The page-wide status indicator includes the relevant building-data and avoid-zone status.
- [x] Loaded buildings visibility defaults on and is respected only while Rural Area Finder is enabled.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect the Rural Area Finder settings panel and page-wide status indicator.

## Completion note

Completed on 2026-06-04. Rural Area Finder settings now use direct labels without duplicate section headers, overlay opacity defaults to 25 with a 0-100 range, building and avoid-zone status moved to the page-wide status indicator, and loaded buildings remain controlled by their setting while map display is gated by the Rural Area Finder enabled state.
