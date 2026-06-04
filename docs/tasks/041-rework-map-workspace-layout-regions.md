# Task 041: Rework map workspace layout regions

## Goal

Replace ad hoc floating offsets with named layout regions for search, workspace, and status.

## Why this matters

Search, workspace, and status controls have grown independently and can overlap or feel disconnected. Named layout regions will make the map workspace more predictable and easier to extend.

## Relevant docs

- `docs/UI_OVERHAUL_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- defining stable placement rules for search, workspace, and status
- removing fragile top-offset dependencies where practical
- ensuring search and workspace cannot overlap
- keeping the map as the primary canvas

This task should not include:

- redesigning individual panel contents
- changing saved-place behavior
- changing Rural Area Finder behavior

## Files likely involved

- `src/app/AppShell.tsx`
- `src/app/app.css`
- `src/app/layout/FloatingSearchBox.tsx`
- `src/app/layout/WorkspacePanel.tsx`
- `src/app/layout/StatusIndicator.tsx`
- `docs/tasks/README.md`

## Implementation steps

1. Review current absolute positioning rules.
2. Add named wrapper regions or CSS conventions for the floating UI.
3. Move search, workspace, and status into non-overlapping regions.
4. Build the app.

## Acceptance criteria

- [x] Search and workspace cannot overlap.
- [x] Status stays clear of search and workspace.
- [x] Layout remains map-first.
- [x] App still builds.

## Completion note

Completed. Added named map UI regions for the primary left-side controls and page status controls. Search and workspace now share a single stacked region, with the workspace filling remaining height instead of relying on a fixed top offset. The status indicator now lives in its own region and moves to the bottom on narrow viewports.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect desktop and narrow viewport layouts.
