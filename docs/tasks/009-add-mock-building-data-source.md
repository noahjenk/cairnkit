# Task 009: Add mock building data source

## Goal

Add a small mock data-source adapter that returns building features near the development map area.

## Why this matters

Rural Area Finder needs building-like input data before it can prove tool logic, debug layers, or avoid-zone rendering. Mock data keeps the next step local, deterministic, and independent of Overpass.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a mock building feature dataset
- a mock building data-source adapter
- registration of the adapter in the data-source registry
- TypeScript-friendly feature shapes using the existing shared types
- simple bounds filtering if useful and still small

This task should not include:

- Rural Area Finder UI
- avoid-zone calculations
- MapLibre layer rendering
- saved places
- Overpass
- network requests

## Files likely involved

- `src/dataSources/mock/mockFeatureData.ts`
- `src/dataSources/mock/mockBuildingSource.ts`
- `src/dataSources/dataSourceRegistry.ts`
- `src/dataSources/index.ts`

## Implementation steps

1. Create a `mock` folder under `src/dataSources`.
2. Add a small set of mock building polygon features near Neasham/Darlington.
3. Create a `mockBuildingSource` adapter that supports the `all-buildings` feature type.
4. Register the adapter in `dataSourceRegistry`.
5. Export the mock source through the data-source barrel if useful.
6. Confirm TypeScript builds.

## Acceptance criteria

- [x] Mock building data exists.
- [x] Mock building data uses the existing `MapFeature` type.
- [x] A mock building data-source adapter exists.
- [x] The adapter is registered in `dataSourceRegistry`.
- [x] No Overpass code has been added.
- [x] No Rural Area Finder UI or avoid-zone rendering has been added.

Completion note: accepted as a completed data-source task. Task 010 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

If implementing manually, optionally add a temporary local check that calls the adapter for the development bounds and confirms it returns building features.

## Notes for Copilot

Keep this focused on data only. The next task after this should add the Rural Area Finder tool shell.
