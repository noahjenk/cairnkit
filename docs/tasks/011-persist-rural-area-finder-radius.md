# Task 011: Persist Rural Area Finder radius

## Goal

Add a radius setting to the Rural Area Finder shell and persist it locally.

## Why this matters

Rural Area Finder needs a user-controlled radius before it can create debug layers or avoid-zone output. Persisting the setting now makes the tool feel stable while keeping map rendering for later tasks.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a radius value for Rural Area Finder
- a simple radius control in the Rural Area Finder panel
- local persistence for the radius setting
- a small default radius constant
- basic validation or clamping if useful and still small

This task should not include:

- mock feature loading
- debug layer rendering
- avoid-zone calculations
- saved places
- Overpass
- network requests

## Files likely involved

- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `src/tools/ruralAreaFinder/ruralAreaFinderDefaults.ts`
- `src/tools/ruralAreaFinder/ruralAreaFinderStorage.ts`
- `src/tools/ruralAreaFinder/index.ts`
- `src/ui/Slider.tsx`

## Implementation steps

1. Add Rural Area Finder radius defaults.
2. Add local persistence helpers for the radius setting.
3. Add radius state to the Rural Area Finder panel.
4. Render a simple radius control.
5. Save radius changes locally.
6. Confirm TypeScript builds.

## Acceptance criteria

- [x] Rural Area Finder panel shows a radius control.
- [x] Radius has a sensible default.
- [x] Radius changes are persisted locally.
- [x] Reloading the app restores the saved radius.
- [x] No mock feature loading has been added to the tool yet.
- [x] No map layer rendering or avoid-zone logic has been added.
- [x] App still builds.

Completion note: accepted as a completed radius persistence task. Task 012 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally, enable Rural Area Finder, change the radius, refresh, and confirm the value is restored.

## Notes for Copilot

Keep this focused on the radius setting only. The next task after this should render mock building features as a debug layer.
