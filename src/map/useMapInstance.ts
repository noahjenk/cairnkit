import { useEffect, useRef } from 'react';
import maplibregl, { type GeoJSONSource, type Map, type MapMouseEvent } from 'maplibre-gl';
import type { AvoidZoneProcessingStatus, BuildingLoadStatus } from '../app/AppShell';
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
import { createAvoidZoneMaskCanvas } from '../tools/ruralAreaFinder/ruralAreaFinderAvoidZone';
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
  focusedSavedPlaceCoordinates: SavedPlaceCoordinates | null;
  onAvoidZoneProcessingStatusChange: (status: AvoidZoneProcessingStatus) => void;
  onBuildingLoadStatusChange: (status: BuildingLoadStatus) => void;
  onMapClick: (coordinates: SavedPlaceCoordinates) => void;
  ruralAreaFinderOpacity: number;
  ruralAreaFinderRadiusMeters: number;
  savedPlaces: SavedPlace[];
  shouldLoadBuildingFeatures: boolean;
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

function addRuralAreaFinderAvoidZoneLayer(
  map: Map,
  buildingFeatures: MapFeature[],
  opacity: number,
  radiusMeters: number,
  bounds: CoordinateBounds
) {
  const canvas = createAvoidZoneMaskCanvas(buildingFeatures, radiusMeters, bounds);

  removeRuralAreaFinderAvoidZoneLayer(map);

  map.addSource(ruralAreaFinderAvoidZoneMapSourceId, {
    type: 'canvas',
    canvas,
    animate: false,
    coordinates: [
      [bounds.west, bounds.north],
      [bounds.east, bounds.north],
      [bounds.east, bounds.south],
      [bounds.west, bounds.south]
    ]
  });

  if (!map.getLayer(ruralAreaFinderAvoidZoneMapLayerId)) {
    map.addLayer(
      {
        id: ruralAreaFinderAvoidZoneMapLayerId,
        type: 'raster',
        source: ruralAreaFinderAvoidZoneMapSourceId,
        paint: {
          'raster-opacity': opacity,
          'raster-fade-duration': 0
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
  focusedSavedPlaceCoordinates,
  onAvoidZoneProcessingStatusChange,
  onBuildingLoadStatusChange,
  onMapClick,
  ruralAreaFinderOpacity,
  ruralAreaFinderRadiusMeters,
  savedPlaces,
  shouldLoadBuildingFeatures,
  showLoadedBuildingsDebugLayer,
  showRuralAreaFinderAvoidZoneLayer,
  temporaryPinCoordinates
}: UseMapInstanceOptions) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const buildingFeatureCacheRef = useRef<globalThis.Map<string, MapFeature[]>>(new globalThis.Map());
  const buildingLoadRequestIdRef = useRef(0);
  const latestBuildingFeaturesRef = useRef<MapFeature[]>([]);
  const latestBuildingBoundsRef = useRef<CoordinateBounds | null>(null);
  const lastBuildingRefreshTokenRef = useRef(buildingRefreshToken);
  const ruralAreaFinderOpacityRef = useRef(ruralAreaFinderOpacity);
  const ruralAreaFinderRadiusMetersRef = useRef(ruralAreaFinderRadiusMeters);
  const shouldLoadBuildingFeaturesRef = useRef(shouldLoadBuildingFeatures);
  const showLoadedBuildingsDebugLayerRef = useRef(showLoadedBuildingsDebugLayer);
  const showRuralAreaFinderAvoidZoneLayerRef = useRef(showRuralAreaFinderAvoidZoneLayer);
  const savedPlaceMarkersRef = useRef<maplibregl.Marker[]>([]);

  function syncRuralAreaFinderAvoidZoneLayer(
    map: Map,
    buildingFeatures: MapFeature[],
    opacity: number,
    radiusMeters: number,
    bounds: CoordinateBounds | null,
    isVisible: boolean
  ) {
    if (!isVisible) {
      onAvoidZoneProcessingStatusChange({ state: 'idle' });
      removeRuralAreaFinderAvoidZoneLayer(map);
      return;
    }

    onAvoidZoneProcessingStatusChange({
      buildingCount: buildingFeatures.length,
      state: 'processing'
    });

    try {
      addRuralAreaFinderAvoidZoneLayer(map, buildingFeatures, opacity, radiusMeters, bounds ?? getMapBounds(map));
      onAvoidZoneProcessingStatusChange({
        buildingCount: buildingFeatures.length,
        featureCount: buildingFeatures.length === 0 ? 0 : 1,
        state: 'success'
      });
    } catch (error) {
      onAvoidZoneProcessingStatusChange({
        message: error instanceof Error ? error.message : 'Unknown avoid-zone canvas error.',
        state: 'error'
      });
      removeRuralAreaFinderAvoidZoneLayer(map);
    }
  }

  useEffect(() => {
    ruralAreaFinderOpacityRef.current = ruralAreaFinderOpacity;
    ruralAreaFinderRadiusMetersRef.current = ruralAreaFinderRadiusMeters;
    shouldLoadBuildingFeaturesRef.current = shouldLoadBuildingFeatures;
    showLoadedBuildingsDebugLayerRef.current = shouldLoadBuildingFeatures && showLoadedBuildingsDebugLayer;
    showRuralAreaFinderAvoidZoneLayerRef.current = showRuralAreaFinderAvoidZoneLayer;
  }, [
    ruralAreaFinderOpacity,
    ruralAreaFinderRadiusMeters,
    shouldLoadBuildingFeatures,
    showLoadedBuildingsDebugLayer,
    showRuralAreaFinderAvoidZoneLayer
  ]);

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

    if (!shouldLoadBuildingFeatures) {
      buildingLoadRequestIdRef.current += 1;
      onBuildingLoadStatusChange({ state: 'idle' });
      onAvoidZoneProcessingStatusChange({ state: 'idle' });
      removeLoadedBuildingsDebugLayer(map);
      removeRuralAreaFinderAvoidZoneLayer(map);
      return;
    }

    async function loadBuildingsForCurrentBounds(forceRefresh = false) {
      if (!mapRef.current || !shouldLoadBuildingFeaturesRef.current) {
        return;
      }

      const requestId = buildingLoadRequestIdRef.current + 1;
      const bounds = getMapBounds(mapRef.current);
      const cacheKey = createBoundsCacheKey(bounds);
      const cachedFeatures = buildingFeatureCacheRef.current.get(cacheKey);

      buildingLoadRequestIdRef.current = requestId;

      if (cachedFeatures && !forceRefresh) {
        latestBuildingBoundsRef.current = bounds;
        latestBuildingFeaturesRef.current = cachedFeatures;
        syncLoadedBuildingsDebugLayer(
          mapRef.current,
          cachedFeatures,
          shouldLoadBuildingFeaturesRef.current && showLoadedBuildingsDebugLayerRef.current
        );
        syncRuralAreaFinderAvoidZoneLayer(
          mapRef.current,
          cachedFeatures,
          ruralAreaFinderOpacityRef.current,
          ruralAreaFinderRadiusMetersRef.current,
          bounds,
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

        if (buildingLoadRequestIdRef.current === requestId && shouldLoadBuildingFeaturesRef.current) {
          buildingFeatureCacheRef.current.set(cacheKey, features);
          latestBuildingBoundsRef.current = bounds;
          latestBuildingFeaturesRef.current = features;
          syncLoadedBuildingsDebugLayer(
            mapRef.current,
            features,
            shouldLoadBuildingFeaturesRef.current && showLoadedBuildingsDebugLayerRef.current
          );
          syncRuralAreaFinderAvoidZoneLayer(
            mapRef.current,
            features,
            ruralAreaFinderOpacityRef.current,
            ruralAreaFinderRadiusMetersRef.current,
            bounds,
            showRuralAreaFinderAvoidZoneLayerRef.current
          );
          onBuildingLoadStatusChange({
            featureCount: features.length,
            source: 'network',
            state: 'success'
          });
        }
      } catch (error) {
        if (buildingLoadRequestIdRef.current === requestId && shouldLoadBuildingFeaturesRef.current) {
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
  }, [onAvoidZoneProcessingStatusChange, onBuildingLoadStatusChange, shouldLoadBuildingFeatures]);

  useEffect(() => {
    const map = mapRef.current;
    const isNewRefreshRequest = buildingRefreshToken !== lastBuildingRefreshTokenRef.current;

    if (isNewRefreshRequest) {
      lastBuildingRefreshTokenRef.current = buildingRefreshToken;
    }

    if (!map || buildingRefreshToken === 0 || !isNewRefreshRequest || !shouldLoadBuildingFeatures) {
      return;
    }

    const currentMap = map;

    function refreshBuildingsForCurrentBounds() {
      const requestId = buildingLoadRequestIdRef.current + 1;
      const bounds = getMapBounds(currentMap);
      const cacheKey = createBoundsCacheKey(bounds);

      if (!shouldLoadBuildingFeaturesRef.current) {
        return;
      }

      buildingLoadRequestIdRef.current = requestId;
      onBuildingLoadStatusChange({ state: 'loading' });

      void overpassBuildingSource
        .loadFeatures({
          bounds,
          featureTypeId: buildingFeatureType.id
        })
        .then((features) => {
          if (buildingLoadRequestIdRef.current === requestId && shouldLoadBuildingFeaturesRef.current) {
            buildingFeatureCacheRef.current.set(cacheKey, features);
            latestBuildingBoundsRef.current = bounds;
            latestBuildingFeaturesRef.current = features;
            syncLoadedBuildingsDebugLayer(
              currentMap,
              features,
              shouldLoadBuildingFeaturesRef.current && showLoadedBuildingsDebugLayerRef.current
            );
            syncRuralAreaFinderAvoidZoneLayer(
              currentMap,
              features,
              ruralAreaFinderOpacityRef.current,
              ruralAreaFinderRadiusMetersRef.current,
              bounds,
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
          if (buildingLoadRequestIdRef.current === requestId && shouldLoadBuildingFeaturesRef.current) {
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
  }, [
    buildingRefreshToken,
    onAvoidZoneProcessingStatusChange,
    onBuildingLoadStatusChange,
    shouldLoadBuildingFeatures
  ]);

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

    if (!map || !focusedSavedPlaceCoordinates) {
      return;
    }

    function focusSavedPlace() {
      if (!mapRef.current || !focusedSavedPlaceCoordinates) {
        return;
      }

      mapRef.current.easeTo({
        center: [focusedSavedPlaceCoordinates.longitude, focusedSavedPlaceCoordinates.latitude],
        duration: 700,
        zoom: Math.max(mapRef.current.getZoom(), 16)
      });
    }

    if (map.loaded()) {
      focusSavedPlace();
      return;
    }

    map.once('load', focusSavedPlace);

    return () => {
      map.off('load', focusSavedPlace);
    };
  }, [focusedSavedPlaceCoordinates]);

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
        shouldLoadBuildingFeatures && showLoadedBuildingsDebugLayer
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
  }, [shouldLoadBuildingFeatures, showLoadedBuildingsDebugLayer]);

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
        ruralAreaFinderOpacity,
        ruralAreaFinderRadiusMeters,
        latestBuildingBoundsRef.current,
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
  }, [ruralAreaFinderOpacity, ruralAreaFinderRadiusMeters, showRuralAreaFinderAvoidZoneLayer]);

  return mapContainerRef;
}
