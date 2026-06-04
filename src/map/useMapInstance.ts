import { useEffect, useRef } from 'react';
import maplibregl, { type GeoJSONSource, type Map, type MapMouseEvent } from 'maplibre-gl';
import type { BuildingLoadStatus } from '../app/AppShell';
import { buildingFeatureType } from '../featureTypes';
import {
  getMapLibreLayerId,
  getMapLibreSourceId,
  mapFeaturesToGeoJson
} from '../layers';
import {
  overpassBuildingSource,
  type CoordinateBounds,
  type MapFeature
} from '../dataSources';
import type { SavedPlace, SavedPlaceCoordinates } from '../savedPlaces';
import type {
  AvoidZoneWorkerRequest,
  AvoidZoneWorkerResponse
} from '../tools/ruralAreaFinder/ruralAreaFinderAvoidZoneWorkerTypes';
import { createBoundsCacheKey, debounce } from '../utils';
import { cairnKitMapOptions } from './mapConfig';

const LOADED_BUILDINGS_DEBUG_LAYER_ID = 'loaded-buildings-debug';
const RURAL_AREA_FINDER_AVOID_ZONE_LAYER_ID = 'rural-area-finder-avoid-zone';
const TEMPORARY_PIN_LAYER_ID = 'temporary-pin';
const loadedBuildingsDebugMapLayerId = getMapLibreLayerId(LOADED_BUILDINGS_DEBUG_LAYER_ID);
const loadedBuildingsDebugMapSourceId = getMapLibreSourceId(LOADED_BUILDINGS_DEBUG_LAYER_ID);
const ruralAreaFinderAvoidZoneMapLayerId = getMapLibreLayerId(RURAL_AREA_FINDER_AVOID_ZONE_LAYER_ID);
const ruralAreaFinderAvoidZoneMapSourceId = getMapLibreSourceId(RURAL_AREA_FINDER_AVOID_ZONE_LAYER_ID);
const temporaryPinMapLayerId = getMapLibreLayerId(TEMPORARY_PIN_LAYER_ID);
const temporaryPinMapSourceId = getMapLibreSourceId(TEMPORARY_PIN_LAYER_ID);

type UseMapInstanceOptions = {
  buildingRefreshToken: number;
  onBuildingLoadStatusChange: (status: BuildingLoadStatus) => void;
  onMapClick: (coordinates: SavedPlaceCoordinates) => void;
  ruralAreaFinderRadiusMeters: number;
  savedPlaces: SavedPlace[];
  showLoadedBuildingsDebugLayer: boolean;
  showRuralAreaFinderAvoidZoneLayer: boolean;
  temporaryPinCoordinates: SavedPlaceCoordinates | null;
};

function getMapBounds(map: Map): CoordinateBounds {
  const bounds = map.getBounds();

  return {
    west: bounds.getWest(),
    south: bounds.getSouth(),
    east: bounds.getEast(),
    north: bounds.getNorth()
  };
}

function addLoadedBuildingsDebugLayer(map: Map, buildingFeatures: MapFeature[]) {
  const buildingFeaturesGeoJson = mapFeaturesToGeoJson(buildingFeatures);
  const existingSource = map.getSource(loadedBuildingsDebugMapSourceId);

  if (existingSource && 'setData' in existingSource) {
    (existingSource as GeoJSONSource).setData(buildingFeaturesGeoJson);
  }

  if (!existingSource) {
    map.addSource(loadedBuildingsDebugMapSourceId, {
      type: 'geojson',
      data: buildingFeaturesGeoJson
    });
  }

  if (!map.getLayer(loadedBuildingsDebugMapLayerId)) {
    map.addLayer({
      id: loadedBuildingsDebugMapLayerId,
      type: 'fill',
      source: loadedBuildingsDebugMapSourceId,
      paint: {
        'fill-color': '#d9480f',
        'fill-opacity': 0.34,
        'fill-outline-color': '#7c2d12'
      }
    });
  }
}

function addRuralAreaFinderAvoidZoneLayer(map: Map, avoidZoneFeatures: MapFeature[]) {
  const avoidZoneGeoJson = mapFeaturesToGeoJson(avoidZoneFeatures);
  const existingSource = map.getSource(ruralAreaFinderAvoidZoneMapSourceId);

  if (existingSource && 'setData' in existingSource) {
    (existingSource as GeoJSONSource).setData(avoidZoneGeoJson);
  }

  if (!existingSource) {
    map.addSource(ruralAreaFinderAvoidZoneMapSourceId, {
      type: 'geojson',
      data: avoidZoneGeoJson
    });
  }

  if (!map.getLayer(ruralAreaFinderAvoidZoneMapLayerId)) {
    map.addLayer(
      {
        id: ruralAreaFinderAvoidZoneMapLayerId,
        type: 'fill',
        source: ruralAreaFinderAvoidZoneMapSourceId,
        paint: {
          'fill-color': '#f08c00',
          'fill-opacity': 0.22,
          'fill-outline-color': '#e67700'
        }
      },
      map.getLayer(loadedBuildingsDebugMapLayerId) ? loadedBuildingsDebugMapLayerId : undefined
    );
  }
}

function syncLoadedBuildingsDebugLayer(map: Map, buildingFeatures: MapFeature[], isVisible: boolean) {
  if (isVisible) {
    addLoadedBuildingsDebugLayer(map, buildingFeatures);
    return;
  }

  removeLoadedBuildingsDebugLayer(map);
}

function removeRuralAreaFinderAvoidZoneLayer(map: Map) {
  if (map.getLayer(ruralAreaFinderAvoidZoneMapLayerId)) {
    map.removeLayer(ruralAreaFinderAvoidZoneMapLayerId);
  }

  if (map.getSource(ruralAreaFinderAvoidZoneMapSourceId)) {
    map.removeSource(ruralAreaFinderAvoidZoneMapSourceId);
  }
}

function removeLoadedBuildingsDebugLayer(map: Map) {
  if (map.getLayer(loadedBuildingsDebugMapLayerId)) {
    map.removeLayer(loadedBuildingsDebugMapLayerId);
  }

  if (map.getSource(loadedBuildingsDebugMapSourceId)) {
    map.removeSource(loadedBuildingsDebugMapSourceId);
  }
}

function getTemporaryPinGeoJson(coordinates: SavedPlaceCoordinates) {
  return {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [coordinates.longitude, coordinates.latitude]
        },
        properties: {}
      }
    ]
  };
}

function addTemporaryPinLayer(map: Map, coordinates: SavedPlaceCoordinates) {
  const temporaryPinGeoJson = getTemporaryPinGeoJson(coordinates);
  const existingSource = map.getSource(temporaryPinMapSourceId);

  if (existingSource && 'setData' in existingSource) {
    (existingSource as GeoJSONSource).setData(temporaryPinGeoJson);
  }

  if (!existingSource) {
    map.addSource(temporaryPinMapSourceId, {
      type: 'geojson',
      data: temporaryPinGeoJson
    });
  }

  if (!map.getLayer(temporaryPinMapLayerId)) {
    map.addLayer({
      id: temporaryPinMapLayerId,
      type: 'circle',
      source: temporaryPinMapSourceId,
      paint: {
        'circle-color': '#2f855a',
        'circle-radius': 8,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 3
      }
    });
  }
}

function removeTemporaryPinLayer(map: Map) {
  if (map.getLayer(temporaryPinMapLayerId)) {
    map.removeLayer(temporaryPinMapLayerId);
  }

  if (map.getSource(temporaryPinMapSourceId)) {
    map.removeSource(temporaryPinMapSourceId);
  }
}

function createMarkerElement(className: string, label: string) {
  const markerElement = document.createElement('div');
  markerElement.className = className;
  markerElement.setAttribute('aria-label', label);
  markerElement.setAttribute('role', 'img');

  return markerElement;
}

export function useMapInstance({
  buildingRefreshToken,
  onBuildingLoadStatusChange,
  onMapClick,
  ruralAreaFinderRadiusMeters,
  savedPlaces,
  showLoadedBuildingsDebugLayer,
  showRuralAreaFinderAvoidZoneLayer,
  temporaryPinCoordinates
}: UseMapInstanceOptions) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const buildingFeatureCacheRef = useRef<globalThis.Map<string, MapFeature[]>>(new globalThis.Map());
  const buildingLoadRequestIdRef = useRef(0);
  const latestBuildingFeaturesRef = useRef<MapFeature[]>([]);
  const avoidZoneRequestIdRef = useRef(0);
  const avoidZoneWorkerRef = useRef<Worker | null>(null);
  const ruralAreaFinderRadiusMetersRef = useRef(ruralAreaFinderRadiusMeters);
  const showLoadedBuildingsDebugLayerRef = useRef(showLoadedBuildingsDebugLayer);
  const showRuralAreaFinderAvoidZoneLayerRef = useRef(showRuralAreaFinderAvoidZoneLayer);
  const savedPlaceMarkersRef = useRef<maplibregl.Marker[]>([]);

  function syncRuralAreaFinderAvoidZoneLayer(
    map: Map,
    buildingFeatures: MapFeature[],
    radiusMeters: number,
    isVisible: boolean
  ) {
    avoidZoneRequestIdRef.current += 1;
    const requestId = avoidZoneRequestIdRef.current;

    avoidZoneWorkerRef.current?.terminate();
    avoidZoneWorkerRef.current = null;

    if (!isVisible) {
      removeRuralAreaFinderAvoidZoneLayer(map);
      return;
    }

    const worker = new Worker(
      new URL('../tools/ruralAreaFinder/ruralAreaFinderAvoidZoneWorker.ts', import.meta.url),
      { type: 'module' }
    );
    avoidZoneWorkerRef.current = worker;

    worker.addEventListener('message', (event: MessageEvent<AvoidZoneWorkerResponse>) => {
      if (event.data.requestId !== avoidZoneRequestIdRef.current || avoidZoneWorkerRef.current !== worker) {
        worker.terminate();
        return;
      }

      avoidZoneWorkerRef.current = null;
      worker.terminate();

      if (!showRuralAreaFinderAvoidZoneLayerRef.current || mapRef.current !== map) {
        return;
      }

      if (event.data.state === 'error') {
        console.warn('Unable to build Rural Area Finder avoid zone.', event.data.message);
        addRuralAreaFinderAvoidZoneLayer(map, []);
        return;
      }

      addRuralAreaFinderAvoidZoneLayer(map, event.data.features);
    });

    worker.addEventListener('error', (event) => {
      if (avoidZoneWorkerRef.current === worker) {
        avoidZoneWorkerRef.current = null;
      }

      worker.terminate();
      console.warn('Rural Area Finder avoid-zone worker failed.', event.message);

      if (showRuralAreaFinderAvoidZoneLayerRef.current && mapRef.current === map) {
        addRuralAreaFinderAvoidZoneLayer(map, []);
      }
    });

    const request: AvoidZoneWorkerRequest = {
      buildingFeatures,
      radiusMeters,
      requestId
    };

    worker.postMessage(request);
  }

  useEffect(() => {
    ruralAreaFinderRadiusMetersRef.current = ruralAreaFinderRadiusMeters;
    showLoadedBuildingsDebugLayerRef.current = showLoadedBuildingsDebugLayer;
    showRuralAreaFinderAvoidZoneLayerRef.current = showRuralAreaFinderAvoidZoneLayer;
  }, [ruralAreaFinderRadiusMeters, showLoadedBuildingsDebugLayer, showRuralAreaFinderAvoidZoneLayer]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      ...cairnKitMapOptions,
      container: mapContainerRef.current
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
    mapRef.current = map;

    return () => {
      avoidZoneWorkerRef.current?.terminate();
      avoidZoneWorkerRef.current = null;
      savedPlaceMarkersRef.current.forEach((marker) => marker.remove());
      savedPlaceMarkersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    function handleMapClick(event: MapMouseEvent) {
      onMapClick({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat
      });
    }

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [onMapClick]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    async function loadBuildingsForCurrentBounds(forceRefresh = false) {
      if (!mapRef.current) {
        return;
      }

      const requestId = buildingLoadRequestIdRef.current + 1;
      const bounds = getMapBounds(mapRef.current);
      const cacheKey = createBoundsCacheKey(bounds);
      const cachedFeatures = buildingFeatureCacheRef.current.get(cacheKey);

      buildingLoadRequestIdRef.current = requestId;

      if (cachedFeatures && !forceRefresh) {
        latestBuildingFeaturesRef.current = cachedFeatures;
        syncLoadedBuildingsDebugLayer(
          mapRef.current,
          cachedFeatures,
          showLoadedBuildingsDebugLayerRef.current
        );
        syncRuralAreaFinderAvoidZoneLayer(
          mapRef.current,
          cachedFeatures,
          ruralAreaFinderRadiusMetersRef.current,
          showRuralAreaFinderAvoidZoneLayerRef.current
        );
        onBuildingLoadStatusChange({
          featureCount: cachedFeatures.length,
          source: 'cache',
          state: 'success'
        });
        return;
      }

      onBuildingLoadStatusChange({ state: 'loading' });

      try {
        const features = await overpassBuildingSource.loadFeatures({
          bounds,
          featureTypeId: buildingFeatureType.id
        });

        if (buildingLoadRequestIdRef.current === requestId) {
          buildingFeatureCacheRef.current.set(cacheKey, features);
          latestBuildingFeaturesRef.current = features;
          syncLoadedBuildingsDebugLayer(
            mapRef.current,
            features,
            showLoadedBuildingsDebugLayerRef.current
          );
          syncRuralAreaFinderAvoidZoneLayer(
            mapRef.current,
            features,
            ruralAreaFinderRadiusMetersRef.current,
            showRuralAreaFinderAvoidZoneLayerRef.current
          );
          onBuildingLoadStatusChange({
            featureCount: features.length,
            source: 'network',
            state: 'success'
          });
        }
      } catch (error) {
        if (buildingLoadRequestIdRef.current === requestId) {
          onBuildingLoadStatusChange({
            message: error instanceof Error ? error.message : 'Unknown building load error.',
            state: 'error'
          });
        }
      }
    }

    const debouncedLoadBuildings = debounce(loadBuildingsForCurrentBounds, 800);

    function handleMoveEnd() {
      debouncedLoadBuildings(false);
    }

    function handleInitialLoad() {
      debouncedLoadBuildings(false);
    }

    map.on('moveend', handleMoveEnd);

    if (map.loaded()) {
      handleInitialLoad();
    } else {
      map.once('load', handleInitialLoad);
    }

    return () => {
      debouncedLoadBuildings.cancel();
      map.off('moveend', handleMoveEnd);
      map.off('load', handleInitialLoad);
    };
  }, [onBuildingLoadStatusChange]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || buildingRefreshToken === 0) {
      return;
    }

    const currentMap = map;

    function refreshBuildingsForCurrentBounds() {
      const requestId = buildingLoadRequestIdRef.current + 1;
      const bounds = getMapBounds(currentMap);
      const cacheKey = createBoundsCacheKey(bounds);

      buildingLoadRequestIdRef.current = requestId;
      onBuildingLoadStatusChange({ state: 'loading' });

      void overpassBuildingSource
        .loadFeatures({
          bounds,
          featureTypeId: buildingFeatureType.id
        })
        .then((features) => {
          if (buildingLoadRequestIdRef.current === requestId) {
            buildingFeatureCacheRef.current.set(cacheKey, features);
            latestBuildingFeaturesRef.current = features;
            syncLoadedBuildingsDebugLayer(
              currentMap,
              features,
              showLoadedBuildingsDebugLayerRef.current
            );
            syncRuralAreaFinderAvoidZoneLayer(
              currentMap,
              features,
              ruralAreaFinderRadiusMetersRef.current,
              showRuralAreaFinderAvoidZoneLayerRef.current
            );
            onBuildingLoadStatusChange({
              featureCount: features.length,
              source: 'refresh',
              state: 'success'
            });
          }
        })
        .catch((error) => {
          if (buildingLoadRequestIdRef.current === requestId) {
            onBuildingLoadStatusChange({
              message: error instanceof Error ? error.message : 'Unknown building refresh error.',
              state: 'error'
            });
          }
        });
    }

    if (currentMap.loaded()) {
      refreshBuildingsForCurrentBounds();
      return;
    }

    currentMap.once('load', refreshBuildingsForCurrentBounds);

    return () => {
      currentMap.off('load', refreshBuildingsForCurrentBounds);
    };
  }, [buildingRefreshToken, onBuildingLoadStatusChange]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    if (!temporaryPinCoordinates) {
      removeTemporaryPinLayer(map);
      return;
    }

    function syncTemporaryPinLayer() {
      if (mapRef.current && temporaryPinCoordinates) {
        addTemporaryPinLayer(mapRef.current, temporaryPinCoordinates);
      }
    }

    if (map.loaded()) {
      syncTemporaryPinLayer();
      return;
    }

    map.once('load', syncTemporaryPinLayer);

    return () => {
      map.off('load', syncTemporaryPinLayer);
    };
  }, [temporaryPinCoordinates]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    savedPlaceMarkersRef.current.forEach((marker) => marker.remove());
    savedPlaceMarkersRef.current = savedPlaces.map((savedPlace) =>
      new maplibregl.Marker({
        element: createMarkerElement('map-marker map-marker--saved', savedPlace.name)
      })
        .setLngLat([savedPlace.coordinates.longitude, savedPlace.coordinates.latitude])
        .addTo(map)
    );
  }, [savedPlaces]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    function syncLoadedBuildingsDebugLayerForCurrentState() {
      if (!mapRef.current) {
        return;
      }

      syncLoadedBuildingsDebugLayer(
        mapRef.current,
        latestBuildingFeaturesRef.current,
        showLoadedBuildingsDebugLayer
      );
    }

    if (map.loaded()) {
      syncLoadedBuildingsDebugLayerForCurrentState();
      return;
    }

    map.once('load', syncLoadedBuildingsDebugLayerForCurrentState);

    return () => {
      map.off('load', syncLoadedBuildingsDebugLayerForCurrentState);
    };
  }, [showLoadedBuildingsDebugLayer]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    function syncRuralAreaFinderAvoidZoneLayerForCurrentState() {
      if (!mapRef.current) {
        return;
      }

      syncRuralAreaFinderAvoidZoneLayer(
        mapRef.current,
        latestBuildingFeaturesRef.current,
        ruralAreaFinderRadiusMeters,
        showRuralAreaFinderAvoidZoneLayer
      );
    }

    if (map.loaded()) {
      syncRuralAreaFinderAvoidZoneLayerForCurrentState();
      return;
    }

    map.once('load', syncRuralAreaFinderAvoidZoneLayerForCurrentState);

    return () => {
      map.off('load', syncRuralAreaFinderAvoidZoneLayerForCurrentState);
    };
  }, [ruralAreaFinderRadiusMeters, showRuralAreaFinderAvoidZoneLayer]);

  return mapContainerRef;
}
