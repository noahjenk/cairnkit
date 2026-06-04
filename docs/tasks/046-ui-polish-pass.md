# Task 046: UI polish pass

## Goal

Apply a final focused polish pass after the structural UI overhaul tasks.

## Why this matters

After layout, workspace, search, tool panel, and responsive improvements, a small polish pass can make the interface feel cohesive without changing behavior.

## Relevant docs

- `docs/UI_OVERHAUL_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- tightening typography and spacing
- checking focus states and hover states
- reducing inconsistent borders, shadows, and text sizes
- ensuring selected states are clear but restrained

This task should not include:

- changing app behavior
- introducing a new design library
- adding new workflows

## Files likely involved

- `src/app/app.css`
- `src/ui/ui.css`
- component files touched by previous overhaul tasks
- `docs/tasks/README.md`

## Implementation steps

1. Review the UI after Tasks 040 through 045.
2. Apply small visual consistency improvements.
3. Build the app.

## Acceptance criteria

- [x] UI spacing and typography feel consistent.
- [x] Focus and hover states are clear.
- [x] Selected states are readable and restrained.
- [x] App still builds.

## Completion note

Completed. Added a shared focus shadow token, consistent hover/focus transitions for workspace controls, search clear actions, saved-place options, buttons, inputs, and toggles. Selected saved-place rows now use a restrained inset accent while preserving visible keyboard focus.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect the main workflows in desktop and narrow viewports.
