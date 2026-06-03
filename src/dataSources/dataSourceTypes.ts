import type { FeatureTypeId } from '../featureTypes';

export type CoordinateBounds = {
  west: number;
  south: number;
  east: number;
  north: number;
};

export type FeatureRequest = {
  bounds: CoordinateBounds;
  featureTypeId: FeatureTypeId;
};

export type MapFeatureGeometry =
  | {
      type: 'Point';
      coordinates: [number, number];
    }
  | {
      type: 'LineString';
      coordinates: [number, number][];
    }
  | {
      type: 'Polygon';
      coordinates: [number, number][][];
    };

export type MapFeature = {
  id: string;
  featureTypeId: FeatureTypeId;
  geometry: MapFeatureGeometry;
  properties: Record<string, string | number | boolean | null>;
};

export type DataSourceAdapter = {
  id: string;
  name: string;
  supportedFeatureTypeIds: FeatureTypeId[];
  loadFeatures: (request: FeatureRequest) => Promise<MapFeature[]>;
};
