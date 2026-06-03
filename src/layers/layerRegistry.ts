import type { LayerDefinition } from './layerTypes';

export const layerRegistry: LayerDefinition[] = [
  {
    id: 'loaded-buildings-debug',
    name: 'Loaded buildings',
    summary: 'Shows the currently loaded building polygons for the visible map area.'
  }
];
