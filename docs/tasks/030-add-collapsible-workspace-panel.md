# Task 030: Add collapsible workspace panel

## Goal

Make the left workspace panel collapsible.

## Why this matters

The map is the main workspace. A collapse control gives users more room to inspect map output without permanently hiding the tool panel.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- adding a collapse/expand control to the workspace panel
- preserving the current panel contents
- keeping the floating search and status indicator clear of the panel
- ensuring the collapsed state works on desktop and mobile widths

This task should not include:

- moving loaded buildings settings
- changing Rural Area Finder data loading
- changing saved places behavior

## Files likely involved

- `src/app/AppShell.tsx`
- `src/app/layout/WorkspacePanel.tsx`
- `src/app/app.css`
- `docs/tasks/README.md`

## Implementation steps

1. Add panel collapsed state.
2. Add a clear collapse/expand button.
3. Hide panel body content when collapsed.
4. Keep the collapsed affordance reachable.
5. Build the app.

## Acceptance criteria

- [x] Workspace panel can collapse.
- [x] Workspace panel can expand again.
- [x] Collapsed panel does not cover too much map area.
- [x] Existing panel workflows still work when expanded.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then manually collapse and expand the workspace on desktop and a narrow viewport.

## Completion note

Completed on 2026-06-04. `WorkspacePanel` now has a local collapse/expand control that hides the panel body while leaving a compact affordance available on desktop and narrow viewports.
