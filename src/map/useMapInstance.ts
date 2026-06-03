import { useEffect, useRef } from 'react';
import maplibregl, { type GeoJSONSource, type Map, type MapMouseEvent } from 'maplibre-gl';
import { buildingFeatureType } from '../featureTypes';
import {
  getMapLibreLayerId,
  getMapLibreSourceId,
  mapFeaturesToGeoJson
} from '../layers';
import { mockBuildingSource } from '../dataSources';
import type { SavedPlaceCoordinates } from '../savedPlaces';
import { createApproximateAvoidZoneFeatures } from '../tools/ruralAreaFinder/ruralAreaFinderAvoidZone';
import { cairnKitMapOptions } from './mapConfig';

const MOCK_BUILDINGS_DEBUG_LAYER_ID = 'mock-buildings-debug';
const RURAL_AREA_FINDER_AVOID_ZONE_LAYER_ID = 'rural-area-finder-avoid-zone';
const mockBuildingsDebugMapLayerId = getMapLibreLayerId(MOCK_BUILDINGS_DEBUG_LAYER_ID);
const mockBuildingsDebugMapSourceId = getMapLibreSourceId(MOCK_BUILDINGS_DEBUG_LAYER_ID);
const ruralAreaFinderAvoidZoneMapLayerId = getMapLibreLayerId(RURAL_AREA_FINDER_AVOID_ZONE_LAYER_ID);
const ruralAreaFinderAvoidZoneMapSourceId = getMapLibreSourceId(RURAL_AREA_FINDER_AVOID_ZONE_LAYER_ID);

type UseMapInstanceOptions = {
  onMapClick: (coordinates: SavedPlaceCoordinates) => void;
  ruralAreaFinderRadiusMeters: number;
  showMockBuildingsDebugLayer: boolean;
  showRuralAreaFinderAvoidZoneLayer: boolean;
};

const developmentBounds = {
  west: -1.56,
  south: 54.48,
  east: -1.49,
  north: 54.53
};

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

export function useMapInstance({
  onMapClick,
  ruralAreaFinderRadiusMeters,
  showMockBuildingsDebugLayer,
  showRuralAreaFinderAvoidZoneLayer
}: UseMapInstanceOptions) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

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
