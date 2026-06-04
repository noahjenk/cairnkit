import type { MapFeature } from '../../dataSources';

export type AvoidZoneWorkerRequest = {
  buildingFeatures: MapFeature[];
  radiusMeters: number;
  requestId: number;
};

export type AvoidZoneWorkerResponse =
  | {
      features: MapFeature[];
      requestId: number;
      state: 'success';
    }
  | {
      message: string;
      requestId: number;
      state: 'error';
    };
