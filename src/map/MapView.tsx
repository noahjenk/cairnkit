import { useLayers } from '../layers';
import { useMapInstance } from './useMapInstance';

export function MapView() {
  const { isLayerVisible } = useLayers();
  const mapContainerRef = useMapInstance({
    showMockBuildingsDebugLayer: isLayerVisible('mock-buildings-debug')
  });

  return <div ref={mapContainerRef} className="map-view" aria-label="Interactive map" />;
}
