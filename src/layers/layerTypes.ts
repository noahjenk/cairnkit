export type LayerId = string;

export type LayerDefinition = {
  id: LayerId;
  name: string;
  summary: string;
};

export type LayerState = {
  visibleLayerIds: LayerId[];
};

export type LayerContextValue = {
  layers: LayerDefinition[];
  visibleLayerIds: LayerId[];
  isLayerVisible: (layerId: LayerId) => boolean;
  toggleLayerVisibility: (layerId: LayerId) => void;
};
