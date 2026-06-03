import type { MapFeature } from '../../dataSources';
import { buildingFeatureType } from '../../featureTypes';

const METERS_PER_LATITUDE_DEGREE = 111_320;
const AVOID_ZONE_SEGMENTS = 32;

type AvoidZoneCircle = {
  center: {
    longitude: number;
    latitude: number;
  };
  radiusMeters: number;
  ring: [number, number][];
  sourceBuildingId: string;
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
        ring: createApproximateCircleRing(center, totalRadiusMeters),
        sourceBuildingId: feature.id
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

function getCrossProduct(
  origin: [number, number],
  firstCoordinate: [number, number],
  secondCoordinate: [number, number]
) {
  return (
    (firstCoordinate[0] - origin[0]) * (secondCoordinate[1] - origin[1]) -
    (firstCoordinate[1] - origin[1]) * (secondCoordinate[0] - origin[0])
  );
}

function createConvexHullRing(coordinates: [number, number][]) {
  const uniqueCoordinates = Array.from(
    new Map(coordinates.map((coordinate) => [`${coordinate[0]},${coordinate[1]}`, coordinate])).values()
  ).sort((firstCoordinate, secondCoordinate) => {
    if (firstCoordinate[0] === secondCoordinate[0]) {
      return firstCoordinate[1] - secondCoordinate[1];
    }

    return firstCoordinate[0] - secondCoordinate[0];
  });

  if (uniqueCoordinates.length <= 3) {
    return [...uniqueCoordinates, uniqueCoordinates[0]];
  }

  const lowerHull: [number, number][] = [];
  uniqueCoordinates.forEach((coordinate) => {
    while (
      lowerHull.length >= 2 &&
      getCrossProduct(lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1], coordinate) <= 0
    ) {
      lowerHull.pop();
    }

    lowerHull.push(coordinate);
  });

  const upperHull: [number, number][] = [];
  [...uniqueCoordinates].reverse().forEach((coordinate) => {
    while (
      upperHull.length >= 2 &&
      getCrossProduct(upperHull[upperHull.length - 2], upperHull[upperHull.length - 1], coordinate) <= 0
    ) {
      upperHull.pop();
    }

    upperHull.push(coordinate);
  });

  const hull = [...lowerHull.slice(0, -1), ...upperHull.slice(0, -1)];

  return [...hull, hull[0]];
}

export function createApproximateAvoidZoneFeatures(buildingFeatures: MapFeature[], radiusMeters: number) {
  const circles = createAvoidZoneCircles(buildingFeatures, radiusMeters);
  const circleGroups = groupOverlappingCircles(circles);

  return circleGroups.map<MapFeature>((circleGroup, index) => {
    const ring =
      circleGroup.length === 1
        ? circleGroup[0].ring
        : createConvexHullRing(circleGroup.flatMap((circle) => circle.ring));

    return {
      id: `approximate-avoid-zone-cluster-${index + 1}`,
      featureTypeId: buildingFeatureType.id,
      geometry: {
        type: 'Polygon',
        coordinates: [ring]
      },
      properties: {
        buildingCount: circleGroup.length,
        radiusMeters,
        source: 'loaded-buildings'
      }
    };
  });
}
