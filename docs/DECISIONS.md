# CairnKit Decision Log

## Decision 001: Start from a new repo

CairnKit will start in a new repo called `cairnkit` instead of continuing the Remote Finder prototype.

Reason: the previous prototype proved the idea but became too narrow and messy for long-term growth.

## Decision 002: Use React, Vite, TypeScript, and MapLibre GL JS

The app will use React, Vite, TypeScript, and MapLibre GL JS.

Reason: this stack gives a better foundation for a modular browser-based map app with dynamic layers and future growth.

## Decision 003: Use plain CSS or CSS modules first

The app should start with plain CSS or CSS modules instead of Tailwind or a component library.

Reason: this keeps the beginner setup simpler and avoids adding another system before the architecture is stable.

## Decision 004: Build frontend-only for MVP

The MVP will not include a backend.

Reason: the first goal is to prove the app structure, map tools, saved places, and adapter boundaries before adding backend complexity.

## Decision 005: Use mock data before Overpass

Rural Area Finder will use mock building data before Overpass.

Reason: this proves the adapter architecture before introducing network requests, rate limits, and real-world data complexity.

## Decision 006: Use localStorage behind an adapter

Saved places will use localStorage first, but UI components must not call localStorage directly.

Reason: this keeps the app local-first while allowing future IndexedDB or cloud sync adapters.

## Decision 007: Saved places come before Overpass

Saved places should be built after the tool and layer architecture exists, but before Overpass.

Reason: this proves CairnKit is more than just Rural Area Finder.

## Decision 008: Manual testing first

Manual testing is enough during the earliest MVP setup.

Reason: test tooling can be added later for services and adapters once the architecture has settled.

## Decision 009: Do not build accounts, tags, photos, or social features in MVP

These features are planned for later.

Reason: the MVP should stay focused on the map, modular architecture, Rural Area Finder, and basic saved places.

## Decision 010: Keep live task progress in the task ledger

The live completed-task summary and current next task belong in `docs/tasks/README.md`.

Reason: roadmap, workflow, architecture, and project-context docs were starting to repeat the same current-task data. A single live ledger reduces contradiction while keeping stable planning docs useful.

## Decision 011: Rural Area Finder output is controlled by the tool

The Rural Area Finder avoid-zone layer should appear when the Rural Area Finder tool is enabled. It should not be exposed as an ordinary Layers panel toggle.

Reason: the avoid zone is the tool's primary output, so tying it to the tool state makes the UI easier to understand and prevents duplicate controls for the same behavior.

## Decision 012: Render temporary pins as a MapLibre layer

The temporary clicked pin is rendered through a GeoJSON source and circle layer instead of a DOM marker.

Reason: this avoided the white-screen failure seen when placing pins and keeps temporary map output inside the MapLibre layer model.

## Decision 013: Keep Overpass behind a data-source adapter

Overpass building loading should stay behind `overpassBuildingSource` and the shared `DataSourceAdapter` interface.

Reason: Rural Area Finder and future tools should consume shared feature data without knowing Overpass query details, request formatting, or response conversion.

## Decision 014: Use a simple in-memory building cache first

Bounds-based building results are cached in memory using rounded map bounds keys.

Reason: this reduces repeated Overpass requests during early testing without adding persistence, invalidation policy, or a larger caching library before the data flow is proven.

## Decision 015: Use lightweight approximate avoid-zone geometry first

Avoid zones are currently generated as approximate grouped polygons around source buildings.

Reason: this gives visible radius-driven output and avoids stacked shading without implementing precise dissolved buffers or backend GIS processing too early. More accurate GIS geometry can come later as a focused refinement.

## Decision 016: Use polygon union for overlapping avoid-zone circles

Rural Area Finder uses `polygon-clipping` to union overlapping approximate avoid-zone circles.

Reason: convex hulls did not match the intended shape. A focused polygon union dependency produces combined shaded areas that follow the overlapping circle outlines while keeping the frontend-only MVP architecture.

## Decision 017: Guard expensive avoid-zone union work

Rural Area Finder skips avoid-zone output for very dense building sets or very large overlap groups.

Reason: polygon union runs in the browser during the frontend-only MVP. It is better for dense areas to show no avoid-zone output temporarily than to crash the app. A later task can move heavy geometry to a worker, add progressive processing, or narrow the loaded feature set.
