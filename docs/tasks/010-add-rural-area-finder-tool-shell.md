# Task 010: Add Rural Area Finder tool shell

## Goal

Add the first real tool shell for Rural Area Finder without implementing its data processing or map output yet.

## Why this matters

The mock building data source is now available. The next step is to introduce Rural Area Finder as a modular tool inside the existing tool system before adding radius persistence, debug layers, or avoid-zone rendering.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a Rural Area Finder tool definition
- a small Rural Area Finder folder under `src/tools`
- a placeholder panel or summary shown when the tool is enabled
- wiring through the existing tool registry and workspace panel
- no-op placeholder copy that makes clear the tool shell exists

This task should not include:

- radius persistence
- mock feature loading
- debug layer rendering
- avoid-zone calculations
- saved places
- Overpass
- network requests

## Files likely involved

- `src/tools/ruralAreaFinder/RuralAreaFinderPanel.tsx`
- `src/tools/ruralAreaFinder/ruralAreaFinderTool.ts`
- `src/tools/ruralAreaFinder/index.ts`
- `src/tools/toolTypes.ts`
- `src/tools/toolRegistry.ts`
- `src/app/layout/WorkspacePanel.tsx`

## Implementation steps

1. Add a Rural Area Finder tool definition.
2. Register it in `toolRegistry`.
3. Add a small placeholder panel for the enabled tool state.
4. Show the panel from the workspace when Rural Area Finder is enabled.
5. Keep the placeholder tool only if it remains useful for testing.
6. Confirm TypeScript builds.

## Acceptance criteria

- [ ] Rural Area Finder appears as a registered tool.
- [ ] Rural Area Finder can be enabled and disabled through the workspace.
- [ ] Enabling the tool shows a small placeholder panel.
- [ ] No mock feature loading has been added to the tool yet.
- [ ] No map layer rendering or avoid-zone logic has been added.
- [ ] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then run the app locally and toggle Rural Area Finder in the workspace.

## Notes for Copilot

Keep this focused on the tool shell only. The next task after this should persist the Rural Area Finder radius setting.
