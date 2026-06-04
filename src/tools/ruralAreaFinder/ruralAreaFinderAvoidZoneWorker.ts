import { createApproximateAvoidZoneFeatures } from './ruralAreaFinderAvoidZone';
import type { AvoidZoneWorkerRequest, AvoidZoneWorkerResponse } from './ruralAreaFinderAvoidZoneWorkerTypes';

self.addEventListener('message', (event: MessageEvent<AvoidZoneWorkerRequest>) => {
  const { buildingFeatures, radiusMeters, requestId } = event.data;

  try {
    const features = createApproximateAvoidZoneFeatures(buildingFeatures, radiusMeters);
    const response: AvoidZoneWorkerResponse = {
      features,
      requestId,
      state: 'success'
    };

    self.postMessage(response);
  } catch (error) {
    const response: AvoidZoneWorkerResponse = {
      message: error instanceof Error ? error.message : 'Unknown avoid-zone worker error.',
      requestId,
      state: 'error'
    };

    self.postMessage(response);
  }
});

export {};
