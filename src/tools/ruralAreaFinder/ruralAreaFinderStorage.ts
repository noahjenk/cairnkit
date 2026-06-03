import {
  RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS,
  RURAL_AREA_FINDER_MAX_RADIUS_METERS,
  RURAL_AREA_FINDER_MIN_RADIUS_METERS
} from './ruralAreaFinderDefaults';

const RURAL_AREA_FINDER_RADIUS_STORAGE_KEY = 'cairnkit:rural-area-finder:radius-meters';
export const RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT = 'cairnkit:rural-area-finder:radius-changed';

function clampRadius(radiusMeters: number) {
  return Math.min(
    RURAL_AREA_FINDER_MAX_RADIUS_METERS,
    Math.max(RURAL_AREA_FINDER_MIN_RADIUS_METERS, radiusMeters)
  );
}

export function loadRuralAreaFinderRadius() {
  let storedRadius: string | null = null;

  try {
    storedRadius = window.localStorage.getItem(RURAL_AREA_FINDER_RADIUS_STORAGE_KEY);
  } catch {
    return RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS;
  }

  const parsedRadius = storedRadius ? Number(storedRadius) : RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS;

  if (!Number.isFinite(parsedRadius)) {
    return RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS;
  }

  return clampRadius(parsedRadius);
}

export function saveRuralAreaFinderRadius(radiusMeters: number) {
  const nextRadius = clampRadius(radiusMeters);

  try {
    window.localStorage.setItem(RURAL_AREA_FINDER_RADIUS_STORAGE_KEY, String(nextRadius));
  } catch {
    // Ignore storage failures so the slider remains usable in restricted browser modes.
  }

  window.dispatchEvent(
    new CustomEvent(RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT, {
      detail: { radiusMeters: nextRadius }
    })
  );

  return nextRadius;
}
