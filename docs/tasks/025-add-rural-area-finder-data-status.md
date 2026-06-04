# Task 025: Add Rural Area Finder data status

## Goal

Show a small Rural Area Finder status summary so users can tell what building data is feeding the avoid-zone output.

## Why this matters

Rural Area Finder now uses loaded building features from the current map bounds, but the panel does not explain whether data is loading, cached, refreshed, empty, or failed. A small status line will make the tool easier to trust while keeping the existing app-wide status indicator.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- passing a narrow building-data status into the Rural Area Finder panel
- showing source feature count when data is available
- showing loading, cached, refreshed, empty, and error states clearly
- keeping the existing app-wide status indicator

This task should not include:

- changing Overpass request behavior
- changing avoid-zone geometry
- adding search
- adding a backend or persistent cache

## Files likely involved

- `src/app/AppShell.tsx`
- `src/app/layout/WorkspacePanel.tsx`
- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `docs/tasks/README.md`

## Implementation steps

1. Review the existing building load status shape.
2. Pass only the needed status data into the workspace/tool panel path.
3. Add a compact status display to the Rural Area Finder panel.
4. Keep the app-wide status indicator behavior unchanged.
5. Confirm the panel text does not crowd the controls.

## Acceptance criteria

- [x] Rural Area Finder panel shows the loaded building feature count.
- [x] Loading, cached, refreshed, empty, and error states are understandable.
- [x] Existing app-wide status indicator still works.
- [x] No data loading or geometry behavior changes are introduced.

## Testing instructions

Run:

```bash
npm run build
```

Then manually check Rural Area Finder while the map loads, after a cached move, after refresh, and after any data-loading error.

## Notes for Copilot

Keep this as a UI/data-status task. Do not change the data source or avoid-zone generation in this task.

## Completion note

Added a compact building-data status line to the Rural Area Finder panel while keeping the existing app-wide status indicator unchanged.
