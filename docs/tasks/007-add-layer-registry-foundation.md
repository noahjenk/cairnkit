# Task 007: Add layer registry foundation

## Goal

Create the basic architecture for map layers.

## Why this matters

Tools should output layers that can be controlled separately.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- basic layer types
- a layer registry
- visibility state for layers
- placeholder layers shown in the Layers panel
- simple layer toggle behaviour

This task should not include:

- real MapLibre source/layer rendering
- Rural Area Finder layer output
- saved-place pins
- Overpass
- complex layer styling

## Files likely involved

- `src/layers/layerTypes.ts`
- `src/layers/layerRegistry.ts`
- `src/layers/LayerProvider.tsx`
- `src/layers/useLayers.ts`
- `src/layers/mapLibreLayerHelpers.ts`
- `src/app/layout/WorkspacePanel.tsx`

## Implementation steps

1. Define basic layer types.
2. Create a layer registry.
3. Create visible/hidden layer state.
4. Show registered layers in the Layers section.
5. Add placeholder toggle behaviour.
6. Confirm the app still runs.

## Acceptance criteria

- [ ] Layer types exist.
- [ ] Layer registry exists.
- [ ] Workspace panel shows Layers.
- [ ] Layer visibility can be toggled.
- [ ] No real map layer rendering is required yet.

## Testing instructions

Run:

```bash
npm run dev
```

Open the app and toggle placeholder layers.

## Notes for Copilot

Do not couple layers directly to Rural Area Finder yet.
