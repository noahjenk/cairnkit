import { createContext, useMemo, useState, type ReactNode } from 'react';
import { layerRegistry } from './layerRegistry';
import type { LayerContextValue, LayerId } from './layerTypes';

export const LayerContext = createContext<LayerContextValue | null>(null);

type LayerProviderProps = {
  children: ReactNode;
};

export function LayerProvider({ children }: LayerProviderProps) {
  const [visibleLayerIds, setVisibleLayerIds] = useState<LayerId[]>([]);

  const value = useMemo<LayerContextValue>(() => {
    function isLayerVisible(layerId: LayerId) {
      return visibleLayerIds.includes(layerId);
    }

    function toggleLayerVisibility(layerId: LayerId) {
      setVisibleLayerIds((currentLayerIds) =>
        currentLayerIds.includes(layerId)
          ? currentLayerIds.filter((currentLayerId) => currentLayerId !== layerId)
          : [...currentLayerIds, layerId]
      );
    }

    return {
      layers: layerRegistry,
      visibleLayerIds,
      isLayerVisible,
      toggleLayerVisibility
    };
  }, [visibleLayerIds]);

  return <LayerContext.Provider value={value}>{children}</LayerContext.Provider>;
}
