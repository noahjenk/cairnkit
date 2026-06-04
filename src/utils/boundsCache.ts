import type { CoordinateBounds } from '../dataSources';

export const BOUNDS_CACHE_MAX_ENTRIES = 20;

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

export function setBoundedBoundsCacheEntry<T>(
  cache: Map<string, T>,
  key: string,
  value: T,
  maxEntries = BOUNDS_CACHE_MAX_ENTRIES
) {
  if (maxEntries < 1) {
    cache.clear();
    return;
  }

  if (cache.has(key)) {
    cache.delete(key);
  }

  cache.set(key, value);

  while (cache.size > maxEntries) {
    const oldestKey = cache.keys().next().value;

    if (oldestKey === undefined) {
      return;
    }

    cache.delete(oldestKey);
  }
}
