import { useMapInstance } from './useMapInstance';

export function MapView() {
  const mapContainerRef = useMapInstance();

  return <div ref={mapContainerRef} className="map-view" aria-label="Interactive map" />;
}
