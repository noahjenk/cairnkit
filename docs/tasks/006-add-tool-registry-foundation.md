# Task 006: Add tool registry foundation

## Goal

Create the basic architecture for modular tools.

## Why this matters

Rural Area Finder should be one tool inside CairnKit, not the entire app.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- basic tool types
- a tool registry
- state for enabled/disabled tools
- a placeholder tool shown in the Active Tools panel
- simple toggle behaviour

This task should not include:

- real Rural Area Finder logic
- map layer output
- data-source adapters
- saved places
- Overpass

## Files likely involved

- `src/tools/toolTypes.ts`
- `src/tools/toolRegistry.ts`
- `src/tools/ToolProvider.tsx`
- `src/tools/useTools.ts`
- `src/app/layout/WorkspacePanel.tsx`

## Implementation steps

1. Define basic tool types.
2. Create a tool registry.
3. Create simple tool enabled/disabled state.
4. Show registered tools in the Active Tools section.
5. Add placeholder toggle behaviour.
6. Confirm the app still runs.

## Acceptance criteria

- [ ] Tool types exist.
- [ ] Tool registry exists.
- [ ] Workspace panel shows Active Tools.
- [ ] A placeholder tool can be toggled.
- [ ] No Rural Area Finder logic has been added yet.

## Testing instructions

Run:

```bash
npm run dev
```

Open the app and toggle the placeholder tool.

## Notes for Copilot

Do not build Rural Area Finder yet. This task is only the foundation.
