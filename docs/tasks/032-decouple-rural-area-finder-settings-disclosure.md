# Task 032: Decouple Rural Area Finder settings disclosure

## Goal

Let Rural Area Finder settings be expanded and adjusted independently of whether the tool is active.

## Why this matters

Users should be able to prepare radius, opacity, and related settings before turning Rural Area Finder on. The active toggle should control map behavior and data loading, while a separate collapse/expand interaction should control whether the settings are visible.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- keeping Rural Area Finder settings available while the tool is disabled
- adding a clear settings collapse/expand interaction
- separating settings disclosure state from the Rural Area Finder enabled state
- preserving existing radius, opacity, data-status, and loaded-buildings settings behavior

This task should not include:

- changing building data loading scope
- changing avoid-zone rendering
- moving generic workspace panel collapse behavior

## Files likely involved

- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `src/app/app.css`
- `docs/tasks/README.md`

## Implementation steps

1. Add local disclosure state for Rural Area Finder settings.
2. Keep the settings form mounted or reachable when the tool is disabled.
3. Make the tool active toggle affect only tool output, loading, and map rendering.
4. Add a collapse/expand affordance for the settings section.
5. Build the app.

## Acceptance criteria

- [x] Rural Area Finder settings can be expanded while the tool is disabled.
- [x] Radius and opacity can be adjusted before enabling the tool.
- [x] Turning the tool on or off does not automatically collapse or expand settings.
- [x] The settings collapse/expand control works independently of the active toggle.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then verify settings can be changed while Rural Area Finder is off, and that enabling the tool uses those settings.

## Completion note

Completed on 2026-06-04. `WorkspacePanel` now always renders the Rural Area Finder panel, and `RuralAreaFinderPanel` keeps the tool enabled toggle and settings in the same panel while giving the settings their own expand/collapse state independent of the tool toggle.
