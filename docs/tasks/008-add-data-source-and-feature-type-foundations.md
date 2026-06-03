# Task 008: Add data-source and feature-type foundations

## Goal

Create the adapter types for future map feature loading.

## Why this matters

Rural Area Finder must not be hard-coded to Overpass.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- a common feature request type
- a common data-source adapter interface
- a feature type interface
- an All buildings feature type
- a data-source registry placeholder

This task should not include:

- Overpass code
- mock building data
- Rural Area Finder UI
- map rendering
- avoid-zone calculation

## Files likely involved

- `src/dataSources/dataSourceTypes.ts`
- `src/dataSources/dataSourceRegistry.ts`
- `src/featureTypes/featureTypeTypes.ts`
- `src/featureTypes/buildingFeatureType.ts`
- `src/featureTypes/featureTypeRegistry.ts`

## Implementation steps

1. Define a shared feature request type.
2. Define a shared data-source adapter interface.
3. Define a feature type interface.
4. Add the All buildings feature type.
5. Add a data-source registry placeholder.
6. Confirm TypeScript builds.

## Acceptance criteria

- [x] Data-source adapter type exists.
- [x] Feature type type exists.
- [x] All buildings is registered as the first feature type.
- [x] No Overpass code has been added.
- [x] No map rendering has been added.

Completion note: accepted as a completed historical task.

## Testing instructions

Run:

```bash
npm run dev
```

If a build script exists, also run:

```bash
npm run build
```

## Notes for Copilot

This is architecture-only. Do not add Overpass yet.
