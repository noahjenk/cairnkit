import { useEffect, useState } from 'react';
import {
  loadRuralAreaFinderShowLoadedBuildings,
  loadRuralAreaFinderOpacity,
  loadRuralAreaFinderRadius,
  RURAL_AREA_FINDER_LOADED_BUILDINGS_VISIBILITY_CHANGED_EVENT,
  RURAL_AREA_FINDER_OPACITY_CHANGED_EVENT,
  RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT
} from '../tools/ruralAreaFinder';
import { ruralAreaFinderTool, useTools } from '../tools';
import type { AvoidZoneProcessingStatus, BuildingLoadStatus } from '../app/AppShell';
import type { SavedPlace, SavedPlaceCoordinates } from '../savedPlaces';
import { useMapInstance } from './useMapInstance';

type MapViewProps = {
  buildingRefreshToken: number;
  focusedSavedPlaceCoordinates: SavedPlaceCoordinates | null;
  onAvoidZoneProcessingStatusChange: (status: AvoidZoneProcessingStatus) => void;
  onBuildingLoadStatusChange: (status: BuildingLoadStatus) => void;
  onMapClick: (coordinates: SavedPlaceCoordinates) => void;
  savedPlaces: SavedPlace[];
  temporaryPinCoordinates: SavedPlaceCoordinates | null;
};

export function MapView({
  buildingRefreshToken,
  focusedSavedPlaceCoordinates,
  onAvoidZoneProcessingStatusChange,
  onBuildingLoadStatusChange,
  onMapClick,
  savedPlaces,
  temporaryPinCoordinates
}: MapViewProps) {
  const { isToolEnabled } = useTools();
  const [showLoadedBuildings, setShowLoadedBuildings] = useState(loadRuralAreaFinderShowLoadedBuildings);
  const [ruralAreaFinderOpacityPercent, setRuralAreaFinderOpacityPercent] = useState(loadRuralAreaFinderOpacity);
  const [ruralAreaFinderRadiusMeters, setRuralAreaFinderRadiusMeters] = useState(loadRuralAreaFinderRadius);
  const isRuralAreaFinderEnabled = isToolEnabled(ruralAreaFinderTool.id);
  const ruralAreaFinderOpacity = Math.min(1, Math.max(0, ruralAreaFinderOpacityPercent / 100));

  useEffect(() => {
    function handleLoadedBuildingsVisibilityChanged(event: Event) {
      const visibilityChangedEvent = event as CustomEvent<{ isVisible: boolean }>;
      setShowLoadedBuildings(visibilityChangedEvent.detail.isVisible);
    }

    function handleOpacityChanged(event: Event) {
      const opacityChangedEvent = event as CustomEvent<{ opacityPercent: number }>;
      setRuralAreaFinderOpacityPercent(opacityChangedEvent.detail.opacityPercent);
    }

    function handleRadiusChanged(event: Event) {
      const radiusChangedEvent = event as CustomEvent<{ radiusMeters: number }>;
      setRuralAreaFinderRadiusMeters(radiusChangedEvent.detail.radiusMeters);
    }

    window.addEventListener(
      RURAL_AREA_FINDER_LOADED_BUILDINGS_VISIBILITY_CHANGED_EVENT,
      handleLoadedBuildingsVisibilityChanged
    );
    window.addEventListener(RURAL_AREA_FINDER_OPACITY_CHANGED_EVENT, handleOpacityChanged);
    window.addEventListener(RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT, handleRadiusChanged);

    return () => {
      window.removeEventListener(
        RURAL_AREA_FINDER_LOADED_BUILDINGS_VISIBILITY_CHANGED_EVENT,
        handleLoadedBuildingsVisibilityChanged
      );
      window.removeEventListener(RURAL_AREA_FINDER_OPACITY_CHANGED_EVENT, handleOpacityChanged);
      window.removeEventListener(RURAL_AREA_FINDER_RADIUS_CHANGED_EVENT, handleRadiusChanged);
    };
  }, []);

  const mapContainerRef = useMapInstance({
    buildingRefreshToken,
    ruralAreaFinderOpacity,
    ruralAreaFinderRadiusMeters,
    focusedSavedPlaceCoordinates,
    onAvoidZoneProcessingStatusChange,
    onBuildingLoadStatusChange,
    onMapClick,
    savedPlaces,
    shouldLoadBuildingFeatures: isRuralAreaFinderEnabled,
    showLoadedBuildingsDebugLayer: isRuralAreaFinderEnabled && showLoadedBuildings,
    showRuralAreaFinderAvoidZoneLayer: isRuralAreaFinderEnabled,
    temporaryPinCoordinates
  });

  return <div ref={mapContainerRef} className="map-view" aria-label="Interactive map" />;
}
