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
  mockBuildingSource,
  overpassBuildingSource,
  type CoordinateBounds,
  type MapFeature
} from '../dataSources';
import type { SavedPlace, SavedPlaceCoordinates } from '../savedPlaces';
import { createApproximateAvoidZoneFeatures } from '../tools/ruralAreaFinder/ruralAreaFinderAvoidZone';
import { createBoundsCacheKey, debounce } from '../utils';
import { cairnKitMapOptions } from './mapConfig';

const MOCK_BUILDINGS_DEBUG_LAYER_ID = 'mock-buildings-debug';
const RURAL_AREA_FINDER_AVOID_ZONE_LAYER_ID = 'rural-area-finder-avoid-zone';
const TEMPORARY_PIN_LAYER_ID = 'temporary-pin';
const mockBuildingsDebugMapLayerId = getMapLibreLayerId(MOCK_BUILDINGS_DEBUG_LAYER_ID);
const mockBuildingsDebugMapSourceId = getMapLibreSourceId(MOCK_BUILDINGS_DEBUG_LAYER_ID);
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
  showMockBuildingsDebugLayer: boolean;
  showRuralAreaFinderAvoidZoneLayer: boolean;
  temporaryPinCoordinates: SavedPlaceCoordinates | null;
};

const developmentBounds = {
  west: -1.56,
  south: 54.48,
  east: -1.49,
  north: 54.53
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

async function loadDevelopmentMockBuildingFeatures() {
  return mockBuildingSource.loadFeatures({
    bounds: developmentBounds,
    featureTypeId: buildingFeatureType.id
  });
}

async function addMockBuildingsDebugLayer(map: Map) {
  const mockBuildingFeatures = await loadDevelopmentMockBuildingFeatures();

  if (!map.getSource(mockBuildingsDebugMapSourceId)) {
    map.addSource(mockBuildingsDebugMapSourceId, {
      type: 'geojson',
      data: mapFeaturesToGeoJson(mockBuildingFeatures)
    });
  }

  if (!map.getLayer(mockBuildingsDebugMapLayerId)) {
    map.addLayer({
      id: mockBuildingsDebugMapLayerId,
      type: 'fill',
      source: mockBuildingsDebugMapSourceId,
      paint: {
        'fill-color': '#d9480f',
        'fill-opacity': 0.34,
        'fill-outline-color': '#7c2d12'
      }
    });
  }
}

async function addRuralAreaFinderAvoidZoneLayer(map: Map, radiusMeters: number) {
  const mockBuildingFeatures = await loadDevelopmentMockBuildingFeatures();
  const avoidZoneFeatures = createApproximateAvoidZoneFeatures(mockBuildingFeatures, radiusMeters);
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
      map.getLayer(mockBuildingsDebugMapLayerId) ? mockBuildingsDebugMapLayerId : undefined
    );
  }
}

function removeRuralAreaFinderAvoidZoneLayer(map: Map) {
  if (map.getLayer(ruralAreaFinderAvoidZoneMapLayerId)) {
    map.removeLayer(ruralAreaFinderAvoidZoneMapLayerId);
  }

  if (map.getSource(ruralAreaFinderAvoidZoneMapSourceId)) {
    map.removeSource(ruralAreaFinderAvoidZoneMapSourceId);
  }
}

function removeMockBuildingsDebugLayer(map: Map) {
  if (map.getLayer(mockBuildingsDebugMapLayerId)) {
    map.removeLayer(mockBuildingsDebugMapLayerId);
  }

  if (map.getSource(mockBuildingsDebugMapSourceId)) {
    map.removeSource(mockBuildingsDebugMapSourceId);
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
  showMockBuildingsDebugLayer,
  showRuralAreaFinderAvoidZoneLayer,
  temporaryPinCoordinates
}: UseMapInstanceOptions) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const buildingFeatureCacheRef = useRef<globalThis.Map<string, MapFeature[]>>(new globalThis.Map());
  const buildingLoadRequestIdRef = useRef(0);
  const savedPlaceMarkersRef = useRef<maplibregl.Marker[]>([]);

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

    function syncMockBuildingsDebugLayer() {
      if (!mapRef.current) {
        return;
      }

      if (showMockBuildingsDebugLayer) {
        void addMockBuildingsDebugLayer(mapRef.current);
        return;
      }

      removeMockBuildingsDebugLayer(mapRef.current);
    }

    if (map.loaded()) {
      syncMockBuildingsDebugLayer();
      return;
    }

    map.once('load', syncMockBuildingsDebugLayer);

    return () => {
      map.off('load', syncMockBuildingsDebugLayer);
    };
  }, [showMockBuildingsDebugLayer]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    function syncRuralAreaFinderAvoidZoneLayer() {
      if (!mapRef.current) {
        return;
      }

      if (showRuralAreaFinderAvoidZoneLayer) {
        void addRuralAreaFinderAvoidZoneLayer(mapRef.current, ruralAreaFinderRadiusMeters);
        return;
      }

      removeRuralAreaFinderAvoidZoneLayer(mapRef.current);
    }

    if (map.loaded()) {
      syncRuralAreaFinderAvoidZoneLayer();
      return;
    }

    map.once('load', syncRuralAreaFinderAvoidZoneLayer);

    return () => {
      map.off('load', syncRuralAreaFinderAvoidZoneLayer);
    };
  }, [ruralAreaFinderRadiusMeters, showRuralAreaFinderAvoidZoneLayer]);

  return mapContainerRef;
}
