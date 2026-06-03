import type { MapFeature } from '../../dataSources';
import { buildingFeatureType } from '../../featureTypes';

const METERS_PER_LATITUDE_DEGREE = 111_320;

function getPolygonBounds(feature: MapFeature) {
  if (feature.geometry.type !== 'Polygon') {
    return null;
  }

  const coordinates = feature.geometry.coordinates.flat();
  const longitudes = coordinates.map(([longitude]) => longitude);
  const latitudes = coordinates.map(([, latitude]) => latitude);

  return {
    west: Math.min(...longitudes),
    south: Math.min(...latitudes),
    east: Math.max(...longitudes),
    north: Math.max(...latitudes)
  };
}

function getLongitudeOffsetDegrees(radiusMeters: number, latitude: number) {
  const latitudeRadians = (latitude * Math.PI) / 180;
  const metersPerLongitudeDegree = METERS_PER_LATITUDE_DEGREE * Math.cos(latitudeRadians);

  return radiusMeters / metersPerLongitudeDegree;
}

export function createApproximateAvoidZoneFeatures(buildingFeatures: MapFeature[], radiusMeters: number) {
  const latitudeOffset = radiusMeters / METERS_PER_LATITUDE_DEGREE;

  return buildingFeatures.flatMap<MapFeature>((feature) => {
    const bounds = getPolygonBounds(feature);

    if (!bounds) {
      return [];
    }

    const centerLatitude = (bounds.south + bounds.north) / 2;
    const longitudeOffset = getLongitudeOffsetDegrees(radiusMeters, centerLatitude);
    const west = bounds.west - longitudeOffset;
    const south = bounds.south - latitudeOffset;
    const east = bounds.east + longitudeOffset;
    const north = bounds.north + latitudeOffset;

    return [
      {
        id: `${feature.id}-approximate-avoid-zone`,
        featureTypeId: buildingFeatureType.id,
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [west, south],
              [east, south],
              [east, north],
              [west, north],
              [west, south]
            ]
          ]
        },
        properties: {
          sourceBuildingId: feature.id,
          radiusMeters,
          source: 'mock'
        }
      }
    ];
  });
}
