import type { MapOptions, StyleSpecification } from 'maplibre-gl';

export const cairnKitMapCenter: [number, number] = [-1.5204, 54.5061];

export const cairnKitMapStyle: StyleSpecification = {
  version: 8,
  sources: {
    'openstreetmap-raster': {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors'
    }
  },
  layers: [
    {
      id: 'openstreetmap-raster',
      type: 'raster',
      source: 'openstreetmap-raster'
    }
  ]
};

export const cairnKitMapOptions: Omit<MapOptions, 'container'> = {
  style: cairnKitMapStyle,
  center: cairnKitMapCenter,
  zoom: 12,
  minZoom: 3,
  maxZoom: 18,
  attributionControl: {
    compact: true
  }
};
