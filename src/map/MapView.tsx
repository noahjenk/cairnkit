import { useEffect, useState } from 'react';
import { useLayers } from '../layers';
import {
  loadRuralAreaFinderRadius,
  RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT
} from '../tools/ruralAreaFinder';
import { ruralAreaFinderTool, useTools } from '../tools';
import type { SavedPlaceCoordinates } from '../savedPlaces';
import { useMapInstance } from './useMapInstance';

type MapViewProps = {
  onMapClick: (coordinates: SavedPlaceCoordinates) => void;
};

export function MapView({ onMapClick }: MapViewProps) {
  const { isLayerVisible } = useLayers();
  const { isToolEnabled } = useTools();
  const [ruralAreaFinderRadiusMeters, setRuralAreaFinderRadiusMeters] = useState(loadRuralAreaFinderRadius);

  useEffect(() => {
    function handleRadiusChanged(event: Event) {
      const radiusChangedEvent = event as CustomEvent<{ radiusMeters: number }>;
      setRuralAreaFinderRadiusMeters(radiusChangedEvent.detail.radiusMeters);
    }

    window.addEventListener(RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT, handleRadiusChanged);

    return () => {
      window.removeEventListener(RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT, handleRadiusChanged);
    };
  }, []);

  const mapContainerRef = useMapInstance({
    ruralAreaFinderRadiusMeters,
    onMapClick,
    showMockBuildingsDebugLayer: isLayerVisible('mock-buildings-debug'),
    showRuralAreaFinderAvoidZoneLayer: isToolEnabled(ruralAreaFinderTool.id)
  });

  return <div ref={mapContainerRef} className="map-view" aria-label="Interactive map" />;
}
