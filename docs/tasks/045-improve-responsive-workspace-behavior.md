# Task 045: Improve responsive workspace behavior

## Goal

Make the workspace, search, and status indicator behave intentionally on narrow screens.

## Why this matters

The current narrow-screen layout is a patch on the desktop layout. A considered responsive pass will make CairnKit easier to use in small browser windows and on mobile-sized viewports.

## Relevant docs

- `docs/UI_OVERHAUL_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- defining a narrow-screen layout for search, workspace, and status
- preventing overlap at common mobile widths
- keeping key controls reachable
- preserving existing workflows

This task should not include:

- building a full mobile app experience
- redesigning map interactions
- adding new features

## Files likely involved

- `src/app/app.css`
- `src/app/layout/WorkspacePanel.tsx`
- `src/app/layout/FloatingSearchBox.tsx`
- `src/app/layout/StatusIndicator.tsx`
- `docs/tasks/README.md`

## Implementation steps

1. Review current media query behavior.
2. Define narrow-screen placement and max-height rules.
3. Test common narrow widths.
4. Build the app.

## Acceptance criteria

- [x] Search, workspace, and status do not overlap on narrow screens.
- [x] Workspace remains reachable and usable.
- [x] Status remains readable.
- [x] App still builds.

## Completion note

Completed. Narrow-screen layout now reserves explicit bottom space for the status indicator, keeps search and workspace in the primary region with the workspace scrolling in the remaining space, and tightens spacing/readability at very small widths. Existing workflows and component behavior are unchanged.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect the app around 360px, 480px, and 760px viewport widths.
