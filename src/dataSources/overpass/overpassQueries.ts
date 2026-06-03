import type { CoordinateBounds } from '../dataSourceTypes';

function formatBounds(bounds: CoordinateBounds) {
  return `${bounds.south},${bounds.west},${bounds.north},${bounds.east}`;
}

export function createBuildingQuery(bounds: CoordinateBounds) {
  const formattedBounds = formatBounds(bounds);

  return `
[out:json][timeout:25];
(
  way["building"](${formattedBounds});
  relation["building"](${formattedBounds});
);
out geom;
`.trim();
}
