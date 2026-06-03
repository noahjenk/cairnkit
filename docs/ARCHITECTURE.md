# CairnKit Architecture

## Architecture goal

CairnKit should be designed so new tools, layers, data sources, and storage methods can be added without rewriting the app.

The app should avoid becoming a prototype where unrelated features are tacked onto one large component.

## Main boundaries

CairnKit is organised around these boundaries:

1. App shell
2. Map module
3. Tool system
4. Layer system
5. Data-source adapters
6. Feature types
7. Storage adapters
8. Saved places
9. Shared UI

## Current source folder structure

```txt
src/
  main.tsx
  App.tsx

  app/
    AppShell.tsx
    app.css
    layout/
      TopBar.tsx
      WorkspacePanel.tsx
      FloatingSearchBox.tsx
      StatusIndicator.tsx

  map/
    MapView.tsx
    mapConfig.ts
    useMapInstance.ts

  tools/
    toolTypes.ts
    toolRegistry.ts
    ToolProvider.tsx
    useTools.ts

    ruralAreaFinder/
      ruralAreaFinderDefaults.ts
      ruralAreaFinderStorage.ts
      RuralAreaFinderPanel.tsx
      ruralAreaFinderTool.ts
      ruralAreaFinderAvoidZone.ts

  layers/
    layerTypes.ts
    layerRegistry.ts
    LayerProvider.tsx
    useLayers.ts
    mapLibreLayerHelpers.ts

  dataSources/
    dataSourceTypes.ts
    dataSourceRegistry.ts

    mock/
      mockBuildingSource.ts
      mockFeatureData.ts

    overpass/
      overpassBuildingSource.ts
      overpassClient.ts
      overpassQueries.ts

  featureTypes/
    featureTypeTypes.ts
    buildingFeatureType.ts
    featureTypeRegistry.ts

  savedPlaces/
    savedPlaceTypes.ts
    savedPlaceService.ts
    SavedPlacesPanel.tsx
    SavePlaceForm.tsx
    TemporaryPinCard.tsx

  storage/
    storageTypes.ts
    localStorageAdapter.ts
    storageKeys.ts

  state/
    README.md

  ui/
    Button.tsx
    Panel.tsx
    Slider.tsx
    TextInput.tsx
    TextArea.tsx

  utils/
    ids.ts
    debounce.ts
    boundsCache.ts
```

This structure should continue to evolve in small tasks. Add files when a real boundary needs them, not just because they appear in an earlier plan.

## App shell

The app shell owns the screen layout.

It should know that CairnKit has:

- a top bar
- a map
- a left workspace panel
- a floating search box placeholder
- a status indicator
- saved-place state
- current temporary pin state
- building loading status

It should not know how Overpass works, how buffers are calculated, or how saved places are stored.

## Map module

The map module owns MapLibre setup, map lifecycle, map camera state, and map events.

React components should not randomly create MapLibre sources and layers directly. Map changes should go through clear map or layer helpers.

`useMapInstance` currently owns:

- MapLibre setup and teardown.
- map click handling for temporary saved-place pins.
- saved-place marker rendering.
- the loaded buildings debug layer.
- the Rural Area Finder avoid-zone layer.
- debounced bounds-based Overpass building loading.
- the simple in-memory building feature cache.
- manual refresh handling.

This is acceptable for the MVP, but future map work should look for small opportunities to move repeated source/layer sync code behind helpers.

## Tool system

Tools are modular features that can be enabled, disabled, configured, and connected to output layers.

The first real tool is Rural Area Finder.

Future tools should be added through the tool registry rather than by rewriting the app shell.

Rural Area Finder currently has an enabled state, radius setting, persisted radius value, panel UI, and an approximate merged avoid-zone output. Its avoid-zone visibility is controlled by the Rural Area Finder toggle and radius, not by the generic layer list.

## Layer system

Layers are map outputs that can be shown, hidden, and owned by tools.

Example map outputs:

- saved-place pins
- temporary clicked pin
- rural-area-finder-avoid-zone
- loaded-buildings-debug

Rural Area Finder should own its own layer outputs. It should not own the entire map.

The loaded buildings debug layer is a layer-list item because it is an inspection aid. Rural Area Finder avoid zones are tool-owned output and should stay tied to the tool controls.

## Data-source adapters

Data-source adapters hide where map feature data comes from.

Rural Area Finder should ask for features in a common format. It should not care whether those features came from mock data, Overpass, a backend cache, or uploaded GeoJSON.

The first data source is mock building data.

The Overpass building adapter is also present. It converts Overpass building geometry into the shared `MapFeature` shape, loads by map bounds, and is called through debounced map movement plus manual refresh. The current avoid-zone layer uses the latest loaded or cached building features for the map bounds.

## Feature types

Feature types describe categories of map features that tools may use.

The first feature type is **All buildings**.

Future feature types may include roads, tracks, farmyards, campsites, car parks, railways, and power infrastructure.

Feature types should be represented as configuration, not hard-coded text spread across UI files.

## Storage adapters

Storage adapters hide where user data is stored.

The first adapter uses localStorage.

Future adapters may use IndexedDB, a backend API, or cloud sync.

UI components should not call localStorage directly.

## Saved places

Saved places are private by default and stored locally in the MVP.

A saved place contains:

- id
- name
- notes
- coordinates
- createdAt
- updatedAt

Saved places are shown as pins on the map and listed in the All Places panel.

Clicking the map creates a temporary pin. The user can save that pin through the workspace panel, after which it becomes a saved place and the temporary pin is cleared.

Do not add tags, photos, accounts, sharing, or project grouping in the MVP.

## State approach

Use React state and context first.

Avoid adding Redux, Zustand, Jotai, or similar state libraries until the app genuinely needs one.

Current app state is intentionally simple:

- tool and layer registries use React context
- saved places use localStorage through a service and storage adapter
- Rural Area Finder radius uses localStorage through a dedicated storage helper
- building features use an in-memory bounds cache inside the map hook
