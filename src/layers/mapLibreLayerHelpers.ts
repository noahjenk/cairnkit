import type { LayerId } from './layerTypes';
import type { MapFeature } from '../dataSources';

export function getMapLibreLayerId(layerId: LayerId) {
  return `cairnkit-${layerId}`;
}

export function getMapLibreSourceId(layerId: LayerId) {
  return `${getMapLibreLayerId(layerId)}-source`;
}

export function mapFeaturesToGeoJson(features: MapFeature[]) {
  return {
    type: 'FeatureCollection' as const,
    features: features.map((feature) => ({
      type: 'Feature' as const,
      id: feature.id,
      geometry: feature.geometry,
      properties: feature.properties
    }))
  };
}
