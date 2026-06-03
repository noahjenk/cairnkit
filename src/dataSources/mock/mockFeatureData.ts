import { buildingFeatureType } from '../../featureTypes';
import type { MapFeature } from '../dataSourceTypes';

export const mockBuildingFeatures: MapFeature[] = [
  {
    id: 'mock-building-neasham-farmhouse',
    featureTypeId: buildingFeatureType.id,
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-1.51892, 54.50718],
          [-1.51857, 54.50718],
          [-1.51857, 54.50742],
          [-1.51892, 54.50742],
          [-1.51892, 54.50718]
        ]
      ]
    },
    properties: {
      name: 'Mock farmhouse',
      source: 'mock'
    }
  },
  {
    id: 'mock-building-neasham-barn',
    featureTypeId: buildingFeatureType.id,
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-1.52243, 54.50552],
          [-1.52192, 54.50552],
          [-1.52192, 54.50578],
          [-1.52243, 54.50578],
          [-1.52243, 54.50552]
        ]
      ]
    },
    properties: {
      name: 'Mock barn',
      source: 'mock'
    }
  },
  {
    id: 'mock-building-neasham-cottage-row',
    featureTypeId: buildingFeatureType.id,
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-1.51595, 54.50808],
          [-1.51524, 54.50808],
          [-1.51524, 54.50829],
          [-1.51595, 54.50829],
          [-1.51595, 54.50808]
        ]
      ]
    },
    properties: {
      name: 'Mock cottage row',
      source: 'mock'
    }
  },
  {
    id: 'mock-building-dinsdale-yard',
    featureTypeId: buildingFeatureType.id,
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-1.53284, 54.51108],
          [-1.53223, 54.51108],
          [-1.53223, 54.51141],
          [-1.53284, 54.51141],
          [-1.53284, 54.51108]
        ]
      ]
    },
    properties: {
      name: 'Mock yard building',
      source: 'mock'
    }
  },
  {
    id: 'mock-building-south-field-shed',
    featureTypeId: buildingFeatureType.id,
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-1.51066, 54.49944],
          [-1.51018, 54.49944],
          [-1.51018, 54.49967],
          [-1.51066, 54.49967],
          [-1.51066, 54.49944]
        ]
      ]
    },
    properties: {
      name: 'Mock field shed',
      source: 'mock'
    }
  }
];
