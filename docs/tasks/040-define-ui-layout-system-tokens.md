# Task 040: Define UI layout system tokens

## Goal

Introduce a small UI layout token system for CairnKit.

## Why this matters

The current UI uses repeated one-off spacing, colors, shadows, z-indexes, and panel sizes. Before moving major surfaces around, the app needs a small shared set of layout values so future UI work stays consistent and scalable.

## Relevant docs

- `docs/UI_OVERHAUL_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- adding CSS custom properties for core spacing, panel width, border color, shadow, text colors, and z-index layers
- applying tokens to the top bar, floating search, workspace panel, and status indicator where safe
- keeping current layout behavior mostly unchanged

This task should not include:

- moving major UI regions
- redesigning the workspace content
- changing app behavior

## Files likely involved

- `src/app/app.css`
- `src/ui/ui.css`
- `docs/tasks/README.md`

## Implementation steps

1. Add a small token block near the top of app CSS.
2. Replace repeated safe values with tokens.
3. Avoid broad visual changes in this task.
4. Build the app.

## Acceptance criteria

- [ ] Core layout tokens exist.
- [ ] Main shell surfaces use the tokens where practical.
- [ ] App layout still behaves like before.
- [ ] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect the app shell for unintended visual regressions.
