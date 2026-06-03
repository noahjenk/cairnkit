# Task 003: Build map-first app shell

## Goal

Create the visual layout for CairnKit without adding MapLibre yet.

## Why this matters

CairnKit should open straight into a map-first interface, and the layout should exist before the real map is added.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`

## Scope

This task should include:

- creating the main app shell
- adding a top bar
- adding a left workspace panel
- adding a floating search placeholder
- adding a status indicator
- adding a placeholder map area

This task should not include:

- MapLibre
- real map rendering
- Rural Area Finder logic
- saved-place logic
- Overpass
- advanced styling systems

## Files likely involved

- `src/App.tsx`
- `src/app/AppShell.tsx`
- `src/app/app.css`
- `src/app/layout/TopBar.tsx`
- `src/app/layout/WorkspacePanel.tsx`
- `src/app/layout/FloatingSearchBox.tsx`
- `src/app/layout/StatusIndicator.tsx`

## Implementation steps

1. Create `AppShell`.
2. Add a top bar showing CairnKit.
3. Add a left workspace panel.
4. Add placeholder headings for Active Tools, Layers, and Saved Places.
5. Add a floating search box placeholder.
6. Add a status indicator placeholder.
7. Add a placeholder map area.
8. Use simple CSS only.

## Acceptance criteria

- [x] App opens to a full-screen map-style layout.
- [x] Top bar shows CairnKit.
- [x] Left panel has Active Tools, Layers, and Saved Places headings.
- [x] Floating search placeholder exists.
- [x] Status indicator placeholder exists.
- [x] No MapLibre has been added yet.

Completion note: accepted as a completed historical task. Later tasks intentionally replaced the placeholder map area with MapLibre.

## Testing instructions

Run:

```bash
npm run dev
```

Visually confirm the app shell appears correctly.

## Notes for Copilot

Use plain CSS or CSS modules first. Do not add Tailwind or a component library.
