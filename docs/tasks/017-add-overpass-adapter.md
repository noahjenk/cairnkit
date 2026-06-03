# Task 017: Add Overpass adapter

## Goal

Add an Overpass data-source adapter for building features without wiring live map loading yet.

## Why this matters

The app has proven the Rural Area Finder flow with mock building data. The next step is to add a real data-source adapter behind the existing data-source boundary before adding debounced map movement loading or cache behavior.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

## Scope

This task should include:

- an Overpass building source adapter
- a small Overpass query helper for building features in bounds
- conversion from Overpass elements to `MapFeature`
- registration of the adapter if appropriate
- basic error handling inside the adapter

This task should not include:

- automatic map movement loading
- debounce or throttling
- cache behavior
- UI switching between mock and Overpass
- saved-place changes

## Files likely involved

- `src/dataSources/overpass/overpassBuildingSource.ts`
- `src/dataSources/overpass/overpassClient.ts`
- `src/dataSources/overpass/overpassQueries.ts`
- `src/dataSources/dataSourceRegistry.ts`
- `src/dataSources/index.ts`

## Implementation steps

1. Add a small Overpass client helper.
2. Add a building query helper for bounds.
3. Convert supported Overpass building geometry to `MapFeature`.
4. Add an Overpass building data-source adapter.
5. Export and register the adapter if useful.
6. Confirm TypeScript builds.

## Acceptance criteria

- [x] Overpass building adapter exists.
- [x] Adapter uses the existing `DataSourceAdapter` type.
- [x] Building query is bounds-based.
- [x] No automatic map movement loading has been added.
- [x] No cache behavior has been added.
- [x] App still builds.

Completion note: accepted as a completed Overpass adapter task. Task 018 is the next implementation task.

## Testing instructions

Run:

```bash
npm run build
```

Optionally call the adapter manually in a temporary local check, then remove the temporary check.

## Notes for Copilot

Keep this focused on the adapter only. Debounced map movement loading and cache behavior come later.
