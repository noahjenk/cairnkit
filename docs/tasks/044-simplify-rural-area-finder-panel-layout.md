# Task 044: Simplify Rural Area Finder panel layout

## Goal

Make the Rural Area Finder panel feel like a polished, repeatable tool panel.

## Why this matters

Rural Area Finder is the first modular tool. Its panel should establish a clean pattern for future tools: clear enable state, compact settings, useful output controls, and minimal explanatory clutter.

## Relevant docs

- `docs/UI_OVERHAUL_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- improving hierarchy inside the Rural Area Finder panel
- aligning controls and setting labels
- reducing low-value explanatory text
- preserving all current settings and behavior

This task should not include:

- changing avoid-zone rendering
- changing building loading behavior
- adding new Rural Area Finder settings

## Files likely involved

- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `src/app/app.css`
- `src/ui`
- `docs/tasks/README.md`

## Implementation steps

1. Review current Rural Area Finder panel hierarchy.
2. Simplify markup and spacing.
3. Keep controls compact and future-tool friendly.
4. Build the app.

## Acceptance criteria

- [x] Rural Area Finder panel is easier to scan.
- [x] Settings and output controls remain available.
- [x] Behavior is unchanged.
- [x] App still builds.

## Completion note

Completed. Simplified the Rural Area Finder hierarchy with an enabled-state summary, compact settings summary, grouped distance and opacity controls, and a separate loaded-buildings output row. Removed repetitive explanatory text while preserving all settings, persistence, and enable behavior.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect Rural Area Finder settings with the tool enabled and disabled.
