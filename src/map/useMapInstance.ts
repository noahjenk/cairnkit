import { useEffect, useRef } from 'react';
import maplibregl, { type Map } from 'maplibre-gl';
import { cairnKitMapOptions } from './mapConfig';

export function useMapInstance() {
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

  return mapContainerRef;
}
