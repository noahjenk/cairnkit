# Task 004: Add MapLibre map view

## Goal

Replace the placeholder map area with a real MapLibre map.

## Why this matters

The map is the main interface of CairnKit.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`

## Scope

This task should include:

- installing MapLibre GL JS
- creating a `MapView` component
- initialising the map safely
- centring the map near the test area around Neasham/Darlington
- cleaning up the map on unmount
- importing required MapLibre CSS

This task should not include:

- Rural Area Finder
- tool registry
- layer registry
- saved places
- Overpass
- custom map tools

## Files likely involved

- `package.json`
- `src/map/MapView.tsx`
- `src/map/mapConfig.ts`
- `src/map/useMapInstance.ts`
- `src/app/AppShell.tsx`
- `src/main.tsx` or another CSS entry point

## Implementation steps

1. Install MapLibre GL JS.
2. Create a map configuration file.
3. Create `MapView`.
4. Add the MapLibre map to the app shell.
5. Centre the map near Neasham/Darlington for development.
6. Ensure the map is cleaned up properly on unmount.
7. Confirm there are no repeated initialisation errors.

## Acceptance criteria

- [x] App opens directly into a MapLibre map.
- [x] Map is centred near the test area.
- [x] Map can pan and zoom.
- [x] App shell controls still appear around or over the map.
- [x] No console errors from repeated map initialisation.
- [x] No tools or saved-place features have been added yet.

Completion note: accepted as a completed historical task. Later tasks intentionally added tool and layer foundations.

## Testing instructions

Run:

```bash
npm run dev
```

Then:

1. Open the app.
2. Pan the map.
3. Zoom in and out.
4. Refresh the page.
5. Check the browser console for errors.

## Notes for Copilot

Keep this focused on the map view only.
