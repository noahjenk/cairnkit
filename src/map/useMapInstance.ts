import { useEffect, useRef } from 'react';
import maplibregl, { type Map } from 'maplibre-gl';
import { buildingFeatureType } from '../featureTypes';
import {
  getMapLibreLayerId,
  getMapLibreSourceId,
  mapFeaturesToGeoJson
} from '../layers';
import { mockBuildingSource } from '../dataSources';
import { cairnKitMapOptions } from './mapConfig';

const MOCK_BUILDINGS_DEBUG_LAYER_ID = 'mock-buildings-debug';
const mockBuildingsDebugMapLayerId = getMapLibreLayerId(MOCK_BUILDINGS_DEBUG_LAYER_ID);
const mockBuildingsDebugMapSourceId = getMapLibreSourceId(MOCK_BUILDINGS_DEBUG_LAYER_ID);

type UseMapInstanceOptions = {
  showMockBuildingsDebugLayer: boolean;
};

const developmentBounds = {
  west: -1.56,
  south: 54.48,
  east: -1.49,
  north: 54.53
};

async function addMockBuildingsDebugLayer(map: Map) {
  const mockBuildingFeatures = await mockBuildingSource.loadFeatures({
    bounds: developmentBounds,
    featureTypeId: buildingFeatureType.id
  });

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

function removeMockBuildingsDebugLayer(map: Map) {
  if (map.getLayer(mockBuildingsDebugMapLayerId)) {
    map.removeLayer(mockBuildingsDebugMapLayerId);
  }

  if (map.getSource(mockBuildingsDebugMapSourceId)) {
    map.removeSource(mockBuildingsDebugMapSourceId);
  }
}

export function useMapInstance({ showMockBuildingsDebugLayer }: UseMapInstanceOptions) {
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

  return mapContainerRef;
}
