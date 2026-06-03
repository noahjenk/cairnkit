import type { CoordinateBounds } from '../dataSources';

function roundCoordinate(coordinate: number) {
  return coordinate.toFixed(3);
}

export function createBoundsCacheKey(bounds: CoordinateBounds) {
  return [
    roundCoordinate(bounds.west),
    roundCoordinate(bounds.south),
    roundCoordinate(bounds.east),
    roundCoordinate(bounds.north)
  ].join(':');
}
