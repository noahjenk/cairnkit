# CairnKit Roadmap

## Phase 0: Repo and documentation foundation

Goal: make the repo self-guiding before code grows.

Includes:

1. Empty repo setup.
2. README.
3. Product brief.
4. Architecture doc.
5. Roadmap.
6. Decision log.
7. Copilot workflow.
8. Copilot instructions.
9. Issue templates.
10. First task briefs.

No React, Vite, MapLibre, or src folder should be added during Phase 0.

Status details are tracked in `docs/tasks/README.md`.

## Phase 1: App shell and map foundation

Goal: open straight into a clean MapLibre map.

Includes:

1. Vite React TypeScript app.
2. Basic CSS.
3. MapLibre map.
4. CairnKit layout.
5. Test area near Neasham/Darlington.
6. Status indicator placeholder.

Status details are tracked in `docs/tasks/README.md`.

Durable status: implemented.

## Phase 2: Architecture foundations

Goal: create tool, layer, data, and storage boundaries before building features deeply.

Includes:

1. Tool registry.
2. Layer registry.
3. Data-source adapter types.
4. Feature-type registry.
5. Storage adapter types.
6. Basic shared types.

Status details and the current next task are tracked in `docs/tasks/README.md`.

Durable status: implemented at MVP depth. Keep expanding these boundaries only when a task needs them.

## Phase 3: Rural Area Finder MVP

Goal: prove the first modular tool works.

Includes:

1. Tool panel.
2. Radius setting.
3. Remembered radius.
4. Mock building features.
5. Approximate shaded avoid-zone layer.
6. Tool-owned avoid-zone visibility.
7. Status updates.

Durable status: implemented with loaded building features. The current output groups overlapping avoid circles into approximate hull polygons, not a precise dissolved GIS buffer.

## Phase 4: Saved places MVP

Goal: make CairnKit useful as a personal place catalogue.

Includes:

1. Click map to temporary pin.
2. Workspace save card.
3. Save form.
4. Local persistence.
5. Saved pins.
6. All Places list.

Durable status: implemented at local-first MVP depth.

## Phase 5: Real data source

Goal: add Overpass without rewriting Rural Area Finder.

Includes:

1. Overpass adapter.
2. Basic request throttling or debounce.
3. Bounds-based loading.
4. Loading and error states.
5. Simple cache.
6. Manual refresh.

Durable status: foundation implemented. Loaded and cached Overpass building features now feed Rural Area Finder avoid-zone rendering and the loaded-buildings debug layer.

## Phase 6: Refinement

Goal: improve UX, performance, and accuracy.

Includes:

1. Better avoid-zone rendering.
2. Cleaner merged or dissolved layer.
3. Better cache strategy.
4. Search placeholder becomes useful.
5. Mobile layout planning.
6. Docs updated from real implementation.

Durable status: underway. Current task progress and the next task are tracked only in `docs/tasks/README.md`.
