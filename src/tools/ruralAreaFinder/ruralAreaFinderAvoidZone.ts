import type { CoordinateBounds, MapFeature } from '../../dataSources';

const METERS_PER_LATITUDE_DEGREE = 111_320;
const AVOID_ZONE_CANVAS_SIZE = 1024;

function getPolygonRings(feature: MapFeature) {
  if (feature.geometry.type !== 'Polygon') {
    return null;
  }

  return feature.geometry.coordinates;
}

function getMetersPerLongitudeDegree(latitude: number) {
  const latitudeRadians = (latitude * Math.PI) / 180;

  return METERS_PER_LATITUDE_DEGREE * Math.cos(latitudeRadians);
}

function getBoundsCenterLatitude(bounds: CoordinateBounds) {
  return (bounds.north + bounds.south) / 2;
}

function getBoundsWidthMeters(bounds: CoordinateBounds) {
  return (bounds.east - bounds.west) * getMetersPerLongitudeDegree(getBoundsCenterLatitude(bounds));
}

function getBoundsHeightMeters(bounds: CoordinateBounds) {
  return (bounds.north - bounds.south) * METERS_PER_LATITUDE_DEGREE;
}

function getMeterCoordinate([longitude, latitude]: [number, number], bounds: CoordinateBounds) {
  return {
    x: (longitude - bounds.west) * getMetersPerLongitudeDegree(getBoundsCenterLatitude(bounds)),
    y: (bounds.north - latitude) * METERS_PER_LATITUDE_DEGREE
  };
}

function tracePolygonRings(context: CanvasRenderingContext2D, rings: [number, number][][], bounds: CoordinateBounds) {
  rings.forEach((ring) => {
    ring.forEach((coordinate, index) => {
      const meterCoordinate = getMeterCoordinate(coordinate, bounds);

      if (index === 0) {
        context.moveTo(meterCoordinate.x, meterCoordinate.y);
        return;
      }

      context.lineTo(meterCoordinate.x, meterCoordinate.y);
    });

    context.closePath();
  });
}

function drawBuildingPerimeterAvoidZone(
  context: CanvasRenderingContext2D,
  buildingFeatures: MapFeature[],
  radiusMeters: number,
  bounds: CoordinateBounds
) {
  const boundsWidthMeters = getBoundsWidthMeters(bounds);
  const boundsHeightMeters = getBoundsHeightMeters(bounds);

  if (boundsWidthMeters <= 0 || boundsHeightMeters <= 0) {
    return;
  }

  context.save();
  context.scale(AVOID_ZONE_CANVAS_SIZE / boundsWidthMeters, AVOID_ZONE_CANVAS_SIZE / boundsHeightMeters);
  context.fillStyle = '#f08c00';
  context.strokeStyle = '#f08c00';
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = radiusMeters * 2;

  buildingFeatures.forEach((feature) => {
    const rings = getPolygonRings(feature);

    if (!rings) {
      return;
    }

    context.beginPath();
    tracePolygonRings(context, rings, bounds);
    context.fill('evenodd');
    context.stroke();
  });

  context.restore();
}

function drawFallbackPointAvoidZone(
  context: CanvasRenderingContext2D,
  buildingFeatures: MapFeature[],
  radiusMeters: number,
  bounds: CoordinateBounds
) {
  const boundsWidthMeters = getBoundsWidthMeters(bounds);
  const boundsHeightMeters = getBoundsHeightMeters(bounds);

  if (boundsWidthMeters <= 0 || boundsHeightMeters <= 0) {
    return;
  }

  context.save();
  context.scale(AVOID_ZONE_CANVAS_SIZE / boundsWidthMeters, AVOID_ZONE_CANVAS_SIZE / boundsHeightMeters);
  context.fillStyle = '#f08c00';

  buildingFeatures.forEach((feature) => {
    if (feature.geometry.type !== 'Point') {
      return;
    }

    const meterCoordinate = getMeterCoordinate(feature.geometry.coordinates, bounds);

    context.beginPath();
    context.arc(meterCoordinate.x, meterCoordinate.y, radiusMeters, 0, Math.PI * 2);
    context.fill();
  });

  context.restore();
}

function drawFallbackLineAvoidZone(
  context: CanvasRenderingContext2D,
  buildingFeatures: MapFeature[],
  radiusMeters: number,
  bounds: CoordinateBounds
) {
  const boundsWidthMeters = getBoundsWidthMeters(bounds);
  const boundsHeightMeters = getBoundsHeightMeters(bounds);

  if (boundsWidthMeters <= 0 || boundsHeightMeters <= 0) {
    return;
  }

  context.save();
  context.scale(AVOID_ZONE_CANVAS_SIZE / boundsWidthMeters, AVOID_ZONE_CANVAS_SIZE / boundsHeightMeters);
  context.strokeStyle = '#f08c00';
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = radiusMeters * 2;

  buildingFeatures.forEach((feature) => {
    if (feature.geometry.type !== 'LineString') {
      return;
    }

    context.beginPath();
    feature.geometry.coordinates.forEach((coordinate, index) => {
      const meterCoordinate = getMeterCoordinate(coordinate, bounds);

      if (index === 0) {
        context.moveTo(meterCoordinate.x, meterCoordinate.y);
        return;
      }

      context.lineTo(meterCoordinate.x, meterCoordinate.y);
    });
    context.stroke();
  });

  context.restore();
}

export function createAvoidZoneMaskCanvas(
  buildingFeatures: MapFeature[],
  radiusMeters: number,
  bounds: CoordinateBounds
) {
  const canvas = document.createElement('canvas');
  canvas.width = AVOID_ZONE_CANVAS_SIZE;
  canvas.height = AVOID_ZONE_CANVAS_SIZE;

  const context = canvas.getContext('2d');

  if (!context) {
    return canvas;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBuildingPerimeterAvoidZone(context, buildingFeatures, radiusMeters, bounds);
  drawFallbackLineAvoidZone(context, buildingFeatures, radiusMeters, bounds);
  drawFallbackPointAvoidZone(context, buildingFeatures, radiusMeters, bounds);

  return canvas;
}
