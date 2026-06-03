import type { LayerId } from './layerTypes';

export function getMapLibreLayerId(layerId: LayerId) {
  return `cairnkit-${layerId}`;
}
