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

- [ ] Search and workspace cannot overlap.
- [ ] Status stays clear of search and workspace.
- [ ] Layout remains map-first.
- [ ] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect desktop and narrow viewport layouts.
