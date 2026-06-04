# Task 026: Add Rural Area Finder processing status

## Goal

Show when Rural Area Finder is processing avoid-zone geometry.

## Why this matters

Building data loading now has a clear status, but avoid-zone rendering may take a moment in dense areas. Users should be able to tell when the tool is processing geometry rather than appearing idle.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- tracking avoid-zone worker processing state
- passing a narrow processing status into the Rural Area Finder panel
- showing processing, ready, and error states clearly

This task should not include:

- changing polygon union behavior
- changing Overpass loading
- adding backend processing
- changing saved places

## Files likely involved

- `src/app/AppShell.tsx`
- `src/map/MapView.tsx`
- `src/map/useMapInstance.ts`
- `src/app/layout/WorkspacePanel.tsx`
- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `docs/tasks/README.md`

## Implementation steps

1. Add a small avoid-zone processing status type.
2. Update `useMapInstance` to report worker start, success, and failure.
3. Pass the status through `MapView`, `AppShell`, and `WorkspacePanel`.
4. Render a compact processing line in the Rural Area Finder panel.
5. Build the app.

## Acceptance criteria

- [x] Rural Area Finder panel shows when avoid-zone geometry is processing.
- [x] Rural Area Finder panel shows when avoid-zone output is ready.
- [x] Worker errors are visible without crashing the app.
- [x] Existing building data status remains visible.

## Testing instructions

Run:

```bash
npm run build
```

Then enable Rural Area Finder in a dense area and confirm the panel communicates worker processing before shaded output appears.

## Notes for Copilot

Keep this as a status-display task. Do not change geometry generation unless needed to expose status.

## Completion note

Added avoid-zone processing status and displayed it alongside building data status in the Rural Area Finder panel.

## Superseded note

Task 027 removed the worker path, but the processing status remains useful for canvas mask generation.
