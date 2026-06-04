import { union, type MultiPolygon, type Polygon } from 'polygon-clipping';
import type { MapFeature } from '../../dataSources';
import { buildingFeatureType } from '../../featureTypes';

const METERS_PER_LATITUDE_DEGREE = 111_320;
const AVOID_ZONE_SEGMENTS = 20;
const MAX_AVOID_ZONE_SOURCE_FEATURES = 500;
const MAX_UNION_GROUP_CIRCLES = 120;

type AvoidZoneCircle = {
  center: {
    longitude: number;
    latitude: number;
  };
  radiusMeters: number;
  ring: [number, number][];
};

function getPolygonCoordinates(feature: MapFeature) {
  if (feature.geometry.type !== 'Polygon') {
    return null;
  }

  return feature.geometry.coordinates.flat();
}

function getPolygonCenter(coordinates: [number, number][]) {
  const longitudes = coordinates.map(([longitude]) => longitude);
  const latitudes = coordinates.map(([, latitude]) => latitude);

  return {
    longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
    latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2
  };
}

function getLongitudeOffsetDegrees(radiusMeters: number, latitude: number) {
  const latitudeRadians = (latitude * Math.PI) / 180;
  const metersPerLongitudeDegree = METERS_PER_LATITUDE_DEGREE * Math.cos(latitudeRadians);

  return radiusMeters / metersPerLongitudeDegree;
}

function getDistanceMeters(
  firstCoordinate: { longitude: number; latitude: number },
  secondCoordinate: { longitude: number; latitude: number }
) {
  const averageLatitude = (firstCoordinate.latitude + secondCoordinate.latitude) / 2;
  const latitudeMeters = (secondCoordinate.latitude - firstCoordinate.latitude) * METERS_PER_LATITUDE_DEGREE;
  const longitudeMeters =
    (secondCoordinate.longitude - firstCoordinate.longitude) *
    METERS_PER_LATITUDE_DEGREE *
    Math.cos((averageLatitude * Math.PI) / 180);

  return Math.sqrt(latitudeMeters ** 2 + longitudeMeters ** 2);
}

function getApproximateFootprintRadiusMeters(coordinates: [number, number][]) {
  const center = getPolygonCenter(coordinates);

  return coordinates.reduce((maxDistance, [longitude, latitude]) => {
    const latitudeMeters = (latitude - center.latitude) * METERS_PER_LATITUDE_DEGREE;
    const longitudeMeters =
      (longitude - center.longitude) *
      METERS_PER_LATITUDE_DEGREE *
      Math.cos((center.latitude * Math.PI) / 180);
    const distance = Math.sqrt(latitudeMeters ** 2 + longitudeMeters ** 2);

    return Math.max(maxDistance, distance);
  }, 0);
}

function createApproximateCircleRing(
  center: { longitude: number; latitude: number },
  radiusMeters: number
): [number, number][] {
  const latitudeOffset = radiusMeters / METERS_PER_LATITUDE_DEGREE;
  const longitudeOffset = getLongitudeOffsetDegrees(radiusMeters, center.latitude);
  const ring = Array.from({ length: AVOID_ZONE_SEGMENTS }, (_, index): [number, number] => {
    const angle = (index / AVOID_ZONE_SEGMENTS) * Math.PI * 2;

    return [
      center.longitude + Math.cos(angle) * longitudeOffset,
      center.latitude + Math.sin(angle) * latitudeOffset
    ];
  });

  return [...ring, ring[0]];
}

function createAvoidZoneCircles(buildingFeatures: MapFeature[], radiusMeters: number) {
  return buildingFeatures.flatMap<AvoidZoneCircle>((feature) => {
    const coordinates = getPolygonCoordinates(feature);

    if (!coordinates) {
      return [];
    }

    const center = getPolygonCenter(coordinates);
    const footprintRadiusMeters = getApproximateFootprintRadiusMeters(coordinates);
    const totalRadiusMeters = radiusMeters + footprintRadiusMeters;

    return [
      {
        center,
        radiusMeters: totalRadiusMeters,
        ring: createApproximateCircleRing(center, totalRadiusMeters)
      }
    ];
  });
}

function circlesOverlap(firstCircle: AvoidZoneCircle, secondCircle: AvoidZoneCircle) {
  return (
    getDistanceMeters(firstCircle.center, secondCircle.center) <=
    firstCircle.radiusMeters + secondCircle.radiusMeters
  );
}

function groupOverlappingCircles(circles: AvoidZoneCircle[]) {
  const groups: AvoidZoneCircle[][] = [];

  circles.forEach((circle) => {
    const matchingGroups = groups.filter((group) =>
      group.some((groupCircle) => circlesOverlap(circle, groupCircle))
    );

    if (matchingGroups.length === 0) {
      groups.push([circle]);
      return;
    }

    const mergedGroup = [circle, ...matchingGroups.flat()];

    matchingGroups.forEach((matchingGroup) => {
      const matchingGroupIndex = groups.indexOf(matchingGroup);

      if (matchingGroupIndex >= 0) {
        groups.splice(matchingGroupIndex, 1);
      }
    });

    groups.push(mergedGroup);
  });

  return groups;
}

function createCirclePolygon(circle: AvoidZoneCircle): Polygon {
  return [circle.ring];
}

function createUnionedPolygons(circleGroup: AvoidZoneCircle[]): MultiPolygon {
  if (circleGroup.length === 0) {
    return [];
  }

  if (circleGroup.length > MAX_UNION_GROUP_CIRCLES) {
    return [];
  }

  const [firstCircle, ...remainingCircles] = circleGroup;

  return union(createCirclePolygon(firstCircle), ...remainingCircles.map(createCirclePolygon));
}

export function createApproximateAvoidZoneFeatures(buildingFeatures: MapFeature[], radiusMeters: number) {
  if (buildingFeatures.length > MAX_AVOID_ZONE_SOURCE_FEATURES) {
    return [];
  }

  const circles = createAvoidZoneCircles(buildingFeatures, radiusMeters);
  const circleGroups = groupOverlappingCircles(circles);

  return circleGroups.flatMap<MapFeature>((circleGroup, groupIndex) => {
    try {
      return createUnionedPolygons(circleGroup).map((polygon, polygonIndex) => ({
        id: `approximate-avoid-zone-cluster-${groupIndex + 1}-${polygonIndex + 1}`,
        featureTypeId: buildingFeatureType.id,
        geometry: {
          type: 'Polygon',
          coordinates: polygon
        },
        properties: {
          buildingCount: circleGroup.length,
          radiusMeters,
          source: 'loaded-buildings'
        }
      }));
    } catch (error) {
      console.warn('Unable to merge avoid-zone group.', error);
      return [];
    }
  });
}
