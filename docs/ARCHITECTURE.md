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

## Planned source folder structure

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
    mapTypes.ts
    useMapInstance.ts
    useMapCameraState.ts
    mapEvents.ts

  tools/
    toolTypes.ts
    toolRegistry.ts
    ToolProvider.tsx
    useTools.ts

    ruralAreaFinder/
      RuralAreaFinderTool.tsx
      ruralAreaFinderTypes.ts
      ruralAreaFinderDefaults.ts
      ruralAreaFinderService.ts
      RuralAreaFinderPanel.tsx

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
    appState.ts
    mapState.ts
    toolState.ts

  ui/
    Button.tsx
    Panel.tsx
    Toggle.tsx
    Slider.tsx
    TextInput.tsx
    TextArea.tsx

  utils/
    coordinates.ts
    ids.ts
    geojson.ts
    debounce.ts
```

This structure does not need to be created all at once. It is the intended direction for the codebase.

## App shell

The app shell owns the screen layout.

It should know that CairnKit has:

- a top bar
- a map
- a left workspace panel
- a floating search box placeholder
- a status indicator

It should not know how Overpass works, how buffers are calculated, or how saved places are stored.

## Map module

The map module owns MapLibre setup, map lifecycle, map camera state, and map events.

React components should not randomly create MapLibre sources and layers directly. Map changes should go through clear map or layer helpers.

## Tool system

Tools are modular features that can be enabled, disabled, configured, and connected to output layers.

The first real tool is Rural Area Finder.

Future tools should be added through the tool registry rather than by rewriting the app shell.

## Layer system

Layers are map outputs that can be shown, hidden, and owned by tools.

Example layers:

- saved-place pins
- temporary clicked pin
- rural-area-finder-avoid-zone
- rural-area-finder-source-features-debug

Rural Area Finder should own its own layer outputs. It should not own the entire map.

## Data-source adapters

Data-source adapters hide where map feature data comes from.

Rural Area Finder should ask for features in a common format. It should not care whether those features came from mock data, Overpass, a backend cache, or uploaded GeoJSON.

The first data source should be mock building data. Overpass comes later.

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

Do not add tags, photos, accounts, sharing, or project grouping in the MVP.

## State approach

Use React state and context first.

Avoid adding Redux, Zustand, Jotai, or similar state libraries until the app genuinely needs one.
