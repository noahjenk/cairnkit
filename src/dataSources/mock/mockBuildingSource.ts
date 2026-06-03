import { buildingFeatureType } from '../../featureTypes';
import type { CoordinateBounds, DataSourceAdapter, MapFeature } from '../dataSourceTypes';
import { mockBuildingFeatures } from './mockFeatureData';

function featureIntersectsBounds(feature: MapFeature, bounds: CoordinateBounds) {
  if (feature.geometry.type !== 'Polygon') {
    return false;
  }

  const coordinates = feature.geometry.coordinates.flat();
  const longitudes = coordinates.map(([longitude]) => longitude);
  const latitudes = coordinates.map(([, latitude]) => latitude);

  const featureBounds = {
    west: Math.min(...longitudes),
    south: Math.min(...latitudes),
    east: Math.max(...longitudes),
    north: Math.max(...latitudes)
  };

  return (
    featureBounds.east >= bounds.west &&
    featureBounds.west <= bounds.east &&
    featureBounds.north >= bounds.south &&
    featureBounds.south <= bounds.north
  );
}

export const mockBuildingSource: DataSourceAdapter = {
  id: 'mock-buildings',
  name: 'Mock buildings',
  supportedFeatureTypeIds: [buildingFeatureType.id],
  async loadFeatures(request) {
    if (request.featureTypeId !== buildingFeatureType.id) {
      return [];
    }

    return mockBuildingFeatures.filter((feature) => featureIntersectsBounds(feature, request.bounds));
  }
};
