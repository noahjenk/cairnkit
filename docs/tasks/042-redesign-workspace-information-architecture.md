# Task 042: Redesign workspace information architecture

## Goal

Make the workspace panel easier to scan by giving it a clearer information structure.

## Why this matters

The workspace currently mixes active tool controls, empty layer messaging, temporary pin flow, saved places, and selection state in one long panel. The panel should feel like a command surface for map workflows, not a pile of sections.

## Relevant docs

- `docs/UI_OVERHAUL_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- grouping workspace content into clearer high-level sections
- hiding empty low-value sections when they do not help the user
- keeping Rural Area Finder and saved-place workflows accessible
- preserving existing behavior

This task should not include:

- changing map rendering
- changing saved-place persistence
- changing Rural Area Finder data loading

## Files likely involved

- `src/app/layout/WorkspacePanel.tsx`
- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `src/savedPlaces/SavedPlacesPanel.tsx`
- `src/app/app.css`
- `docs/tasks/README.md`

## Implementation steps

1. Review current workspace sections.
2. Define a clearer section order and remove empty noise.
3. Update component markup and CSS.
4. Build the app.

## Acceptance criteria

- [x] Workspace sections are easier to scan.
- [x] Empty or non-useful sections are hidden or reduced.
- [x] Existing workflows still work.
- [x] App still builds.

## Completion note

Completed. Reorganized the workspace into clearer Tools, Places, and conditional Map Display sections. Rural Area Finder now reads as the primary tool inside the Tools group, the empty optional layers message is hidden when there are no layers, and the Places section carries saved-place count plus temporary pin state without changing persistence or map behavior.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect the workspace with Rural Area Finder on/off, with no saved places, with saved places, and with a temporary pin.
