# Task 022: Improve avoid-zone geometry

## Goal

Improve the rough Rural Area Finder avoid-zone geometry without adding heavy geometry dependencies.

## Why this matters

The current avoid-zone output proves the flow, but it uses simple expanded rectangles. A modest geometry improvement will make the visual output more useful before broader documentation refinement.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a better approximate buffer shape around mock building features
- radius-sensitive output
- clear separation from precise geodesic or dissolved geometry
- no new geometry dependency unless clearly justified

This task should not include:

- Overpass query changes
- saved-place changes
- persistent cache storage
- full polygon dissolve or merge
- backend code

## Files likely involved

- `src/tools/ruralAreaFinder/ruralAreaFinderAvoidZone.ts`
- `src/map/useMapInstance.ts`

## Implementation steps

1. Review the current approximate avoid-zone helper.
2. Replace expanded rectangles with a better lightweight approximation.
3. Keep radius behavior intact.
4. Confirm TypeScript builds.

## Acceptance criteria

- [x] Avoid-zone output is visually less boxy than expanded rectangles.
- [x] Radius setting still affects output.
- [x] No heavy geometry dependency has been added without justification.
- [x] App still builds.

Completion note: accepted as a completed avoid-zone geometry refinement task. See `docs/tasks/README.md` for the current next task.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally, enable Rural Area Finder, adjust the radius, and visually inspect the avoid-zone output.

## Notes for Copilot

Keep this as a modest refinement. Full dissolve or precise geodesic buffering can come later.
