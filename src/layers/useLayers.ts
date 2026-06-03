import { useContext } from 'react';
import { LayerContext } from './LayerProvider';

export function useLayers() {
  const context = useContext(LayerContext);

  if (!context) {
    throw new Error('useLayers must be used inside LayerProvider.');
  }

  return context;
}
