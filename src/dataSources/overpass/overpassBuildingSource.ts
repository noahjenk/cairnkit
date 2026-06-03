import { buildingFeatureType } from '../../featureTypes';
import type { DataSourceAdapter, MapFeature } from '../dataSourceTypes';
import { queryOverpass, type OverpassElement } from './overpassClient';
import { createBuildingQuery } from './overpassQueries';

function closeRing(coordinates: [number, number][]) {
  if (coordinates.length === 0) {
    return coordinates;
  }

  const firstCoordinate = coordinates[0];
  const lastCoordinate = coordinates[coordinates.length - 1];

  if (firstCoordinate[0] === lastCoordinate[0] && firstCoordinate[1] === lastCoordinate[1]) {
    return coordinates;
  }

  return [...coordinates, firstCoordinate];
}

function overpassElementToMapFeature(element: OverpassElement): MapFeature | null {
  if (!element.geometry || element.geometry.length < 3) {
    return null;
  }

  const coordinates = closeRing(element.geometry.map((node) => [node.lon, node.lat]));

  if (coordinates.length < 4) {
    return null;
  }

  return {
    id: `overpass-${element.type}-${element.id}`,
    featureTypeId: buildingFeatureType.id,
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates]
    },
    properties: {
      name: element.tags?.name ?? null,
      building: element.tags?.building ?? true,
      source: 'overpass'
    }
  };
}

export const overpassBuildingSource: DataSourceAdapter = {
  id: 'overpass-buildings',
  name: 'Overpass buildings',
  supportedFeatureTypeIds: [buildingFeatureType.id],
  async loadFeatures(request) {
    if (request.featureTypeId !== buildingFeatureType.id) {
      return [];
    }

    const query = createBuildingQuery(request.bounds);
    const response = await queryOverpass(query);

    return response.elements.flatMap((element) => {
      const feature = overpassElementToMapFeature(element);

      return feature ? [feature] : [];
    });
  }
};
