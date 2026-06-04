import {
  RURAL_AREA_FINDER_DEFAULT_SHOW_LOADED_BUILDINGS,
  RURAL_AREA_FINDER_DEFAULT_OPACITY_PERCENT,
  RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS,
  RURAL_AREA_FINDER_MAX_OPACITY_PERCENT,
  RURAL_AREA_FINDER_MAX_RADIUS_METERS,
  RURAL_AREA_FINDER_MIN_OPACITY_PERCENT,
  RURAL_AREA_FINDER_MIN_RADIUS_METERS
} from './ruralAreaFinderDefaults';

const RURAL_AREA_FINDER_LOADED_BUILDINGS_VISIBILITY_STORAGE_KEY =
  'cairnkit:rural-area-finder:show-loaded-buildings';
const RURAL_AREA_FINDER_OPACITY_STORAGE_KEY = 'cairnkit:rural-area-finder:opacity-percent';
const RURAL_AREA_FINDER_RADIUS_STORAGE_KEY = 'cairnkit:rural-area-finder:radius-meters';
export const RURAL_AREA_FINDER_LOADED_BUILDINGS_VISIBILITY_CHANGED_EVENT =
  'cairnkit:rural-area-finder:loaded-buildings-visibility-changed';
export const RURAL_AREA_FINDER_OPACITY_CHANGED_EVENT = 'cairnkit:rural-area-finder:opacity-changed';
export const RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT = 'cairnkit:rural-area-finder:radius-changed';

function clampRadius(radiusMeters: number) {
  return Math.min(
    RURAL_AREA_FINDER_MAX_RADIUS_METERS,
    Math.max(RURAL_AREA_FINDER_MIN_RADIUS_METERS, radiusMeters)
  );
}

function clampOpacity(opacityPercent: number) {
  return Math.min(
    RURAL_AREA_FINDER_MAX_OPACITY_PERCENT,
    Math.max(RURAL_AREA_FINDER_MIN_OPACITY_PERCENT, opacityPercent)
  );
}

export function loadRuralAreaFinderOpacity() {
  let storedOpacity: string | null = null;

  try {
    storedOpacity = window.localStorage.getItem(RURAL_AREA_FINDER_OPACITY_STORAGE_KEY);
  } catch {
    return RURAL_AREA_FINDER_DEFAULT_OPACITY_PERCENT;
  }

  const parsedOpacity = storedOpacity ? Number(storedOpacity) : RURAL_AREA_FINDER_DEFAULT_OPACITY_PERCENT;

  if (!Number.isFinite(parsedOpacity)) {
    return RURAL_AREA_FINDER_DEFAULT_OPACITY_PERCENT;
  }

  return clampOpacity(parsedOpacity);
}

export function loadRuralAreaFinderShowLoadedBuildings() {
  let storedVisibility: string | null = null;

  try {
    storedVisibility = window.localStorage.getItem(RURAL_AREA_FINDER_LOADED_BUILDINGS_VISIBILITY_STORAGE_KEY);
  } catch {
    return RURAL_AREA_FINDER_DEFAULT_SHOW_LOADED_BUILDINGS;
  }

  if (storedVisibility === 'true') {
    return true;
  }

  if (storedVisibility === 'false') {
    return false;
  }

  return RURAL_AREA_FINDER_DEFAULT_SHOW_LOADED_BUILDINGS;
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

export function saveRuralAreaFinderShowLoadedBuildings(isVisible: boolean) {
  try {
    window.localStorage.setItem(RURAL_AREA_FINDER_LOADED_BUILDINGS_VISIBILITY_STORAGE_KEY, String(isVisible));
  } catch {
    // Ignore storage failures so the control remains usable in restricted browser modes.
  }

  window.dispatchEvent(
    new CustomEvent(RURAL_AREA_FINDER_LOADED_BUILDINGS_VISIBILITY_CHANGED_EVENT, {
      detail: { isVisible }
    })
  );

  return isVisible;
}

export function saveRuralAreaFinderOpacity(opacityPercent: number) {
  const nextOpacityPercent = clampOpacity(opacityPercent);

  try {
    window.localStorage.setItem(RURAL_AREA_FINDER_OPACITY_STORAGE_KEY, String(nextOpacityPercent));
  } catch {
    // Ignore storage failures so the control remains usable in restricted browser modes.
  }

  window.dispatchEvent(
    new CustomEvent(RURAL_AREA_FINDER_OPACITY_CHANGED_EVENT, {
      detail: { opacityPercent: nextOpacityPercent }
    })
  );

  return nextOpacityPercent;
}

export function saveRuralAreaFinderRadius(radiusMeters: number) {
  const nextRadius = clampRadius(radiusMeters);

  try {
    window.localStorage.setItem(RURAL_AREA_FINDER_RADIUS_STORAGE_KEY, String(nextRadius));
  } catch {
    // Ignore storage failures so the control remains usable in restricted browser modes.
  }

  window.dispatchEvent(
    new CustomEvent(RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT, {
      detail: { radiusMeters: nextRadius }
    })
  );

  return nextRadius;
}
