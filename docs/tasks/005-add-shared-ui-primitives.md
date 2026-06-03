# Task 005: Add shared UI primitives

## Goal

Create simple reusable UI components for the app.

## Why this matters

This avoids every feature inventing its own buttons, panels, sliders, toggles, and inputs.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a basic button component
- a basic panel component
- a basic toggle component
- a basic slider component
- a basic text input component
- a basic text area component
- minimal styling

This task should not include:

- a full design system
- a component library
- Tailwind
- Rural Area Finder behaviour
- saved-place behaviour

## Files likely involved

- `src/ui/Button.tsx`
- `src/ui/Panel.tsx`
- `src/ui/Toggle.tsx`
- `src/ui/Slider.tsx`
- `src/ui/TextInput.tsx`
- `src/ui/TextArea.tsx`
- `src/ui/ui.css`

## Implementation steps

1. Create the shared UI component files.
2. Keep the components small and readable.
3. Add minimal CSS.
4. Use the components where it makes sense in the existing app shell.
5. Confirm the app still looks consistent.

## Acceptance criteria

- [ ] Shared UI components exist.
- [ ] Components are simple and beginner-readable.
- [ ] Existing app shell still works.
- [ ] No new feature behaviour has been added.
- [ ] No external component library has been added.

## Testing instructions

Run:

```bash
npm run dev
```

Check that the app shell still renders correctly.

## Notes for Copilot

Do not over-engineer this into a full design system.
