import { useCallback, useState } from 'react';
import './app.css';
import { FloatingSearchBox } from './layout/FloatingSearchBox';
import { StatusIndicator } from './layout/StatusIndicator';
import { TopBar } from './layout/TopBar';
import { WorkspacePanel } from './layout/WorkspacePanel';
import { LayerProvider } from '../layers';
import { MapView } from '../map/MapView';
import { listSavedPlaces, type SavedPlace, type SavedPlaceCoordinates } from '../savedPlaces';
import { ruralAreaFinderTool, ToolProvider, useTools } from '../tools';

export type BuildingLoadStatus =
  | {
      state: 'idle';
    }
  | {
      state: 'loading';
    }
  | {
      featureCount: number;
      source: 'cache' | 'network' | 'refresh';
      state: 'success';
    }
  | {
      message: string;
      state: 'error';
    };

export type AvoidZoneProcessingStatus =
  | {
      state: 'idle';
    }
  | {
      buildingCount: number;
      state: 'processing';
    }
  | {
      buildingCount: number;
      featureCount: number;
      state: 'success';
    }
  | {
      message: string;
      state: 'error';
    };

type StatusIndicatorModel = {
  canRefresh: boolean;
  detail?: string;
  isLoading: boolean;
  message: string;
  tone: 'error' | 'idle' | 'loading' | 'success';
};

function getBuildingLoadStatusMessage(status: BuildingLoadStatus) {
  if (status.state === 'loading') {
    return 'Loading building data';
  }

  if (status.state === 'success') {
    if (status.featureCount === 0) {
      return 'No buildings loaded for this view';
    }

    if (status.source === 'cache') {
      return `Using ${status.featureCount.toLocaleString()} cached buildings`;
    }

    if (status.source === 'refresh') {
      return `Using ${status.featureCount.toLocaleString()} refreshed buildings`;
    }

    return `Using ${status.featureCount.toLocaleString()} loaded buildings`;
  }

  if (status.state === 'error') {
    return `Building data failed: ${status.message}`;
  }

  return 'Waiting for building data';
}

function getAvoidZoneProcessingStatusMessage(status: AvoidZoneProcessingStatus) {
  if (status.state === 'processing') {
    return `Processing avoid zones from ${status.buildingCount.toLocaleString()} buildings`;
  }

  if (status.state === 'success') {
    if (status.featureCount === 0) {
      return `No avoid zones generated from ${status.buildingCount.toLocaleString()} buildings`;
    }

    return `Avoid-zone mask ready for ${status.buildingCount.toLocaleString()} buildings`;
  }

  if (status.state === 'error') {
    return `Avoid-zone processing failed: ${status.message}`;
  }

  return 'Avoid-zone output is idle';
}

function getStatusIndicatorModel(
  buildingLoadStatus: BuildingLoadStatus,
  avoidZoneProcessingStatus: AvoidZoneProcessingStatus,
  isRuralAreaFinderEnabled: boolean
): StatusIndicatorModel {
  if (!isRuralAreaFinderEnabled) {
    return {
      canRefresh: false,
      detail: 'Enable Rural Area Finder to load building data.',
      isLoading: false,
      message: 'Ready',
      tone: 'idle'
    };
  }

  if (buildingLoadStatus.state === 'error') {
    return {
      canRefresh: true,
      detail: buildingLoadStatus.message,
      isLoading: false,
      message: 'Building data failed',
      tone: 'error'
    };
  }

  if (avoidZoneProcessingStatus.state === 'error') {
    return {
      canRefresh: true,
      detail: avoidZoneProcessingStatus.message,
      isLoading: false,
      message: 'Avoid-zone processing failed',
      tone: 'error'
    };
  }

  if (buildingLoadStatus.state === 'loading') {
    return {
      canRefresh: false,
      detail: 'Fetching buildings for the current map view.',
      isLoading: true,
      message: 'Loading building data',
      tone: 'loading'
    };
  }

  if (avoidZoneProcessingStatus.state === 'processing') {
    return {
      canRefresh: false,
      detail: `${avoidZoneProcessingStatus.buildingCount.toLocaleString()} buildings loaded.`,
      isLoading: true,
      message: 'Processing avoid zones',
      tone: 'loading'
    };
  }

  if (buildingLoadStatus.state === 'success') {
    return {
      canRefresh: true,
      detail: getAvoidZoneProcessingStatusMessage(avoidZoneProcessingStatus),
      isLoading: false,
      message: getBuildingLoadStatusMessage(buildingLoadStatus),
      tone: 'success'
    };
  }

  return {
    canRefresh: true,
    detail: 'Move the map or refresh to load buildings for this view.',
    isLoading: false,
    message: 'Rural Area Finder ready',
    tone: 'idle'
  };
}

function MapWorkspace() {
  const { isToolEnabled } = useTools();
  const [temporaryPinCoordinates, setTemporaryPinCoordinates] = useState<SavedPlaceCoordinates | null>(null);
  const [selectedSavedPlaceId, setSelectedSavedPlaceId] = useState<string | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>(listSavedPlaces);
  const [buildingLoadStatus, setBuildingLoadStatus] = useState<BuildingLoadStatus>({ state: 'idle' });
  const [avoidZoneProcessingStatus, setAvoidZoneProcessingStatus] = useState<AvoidZoneProcessingStatus>({
    state: 'idle'
  });
  const [buildingRefreshToken, setBuildingRefreshToken] = useState(0);
  const isRuralAreaFinderEnabled = isToolEnabled(ruralAreaFinderTool.id);
  const statusIndicator = getStatusIndicatorModel(
    buildingLoadStatus,
    avoidZoneProcessingStatus,
    isRuralAreaFinderEnabled
  );
  const focusedSavedPlaceCoordinates =
    savedPlaces.find((savedPlace) => savedPlace.id === selectedSavedPlaceId)?.coordinates ?? null;

  const handleBuildingLoadStatusChange = useCallback((status: BuildingLoadStatus) => {
    setBuildingLoadStatus(status);
  }, []);

  function refreshSavedPlaces() {
    setSavedPlaces(listSavedPlaces());
  }

  function handlePlaceSaved() {
    refreshSavedPlaces();
    setTemporaryPinCoordinates(null);
  }

  return (
    <section className="map-workspace" aria-label="CairnKit map workspace">
      <MapView
        buildingRefreshToken={buildingRefreshToken}
        onAvoidZoneProcessingStatusChange={setAvoidZoneProcessingStatus}
        onBuildingLoadStatusChange={handleBuildingLoadStatusChange}
        onMapClick={setTemporaryPinCoordinates}
        focusedSavedPlaceCoordinates={focusedSavedPlaceCoordinates}
        savedPlaces={savedPlaces}
        selectedSavedPlaceId={selectedSavedPlaceId}
        temporaryPinCoordinates={temporaryPinCoordinates}
      />

      <div className="map-ui-region map-ui-region--primary" aria-label="Search and workspace controls">
        <FloatingSearchBox
          onClearSelectedSavedPlace={() => setSelectedSavedPlaceId(null)}
          onSelectSavedPlace={(savedPlace) => setSelectedSavedPlaceId(savedPlace.id)}
          savedPlaces={savedPlaces}
          selectedSavedPlaceId={selectedSavedPlaceId}
        />
        <WorkspacePanel
          onPlaceSaved={handlePlaceSaved}
          onSelectSavedPlace={(savedPlace) => setSelectedSavedPlaceId(savedPlace.id)}
          temporaryPinCoordinates={temporaryPinCoordinates}
          onClearTemporaryPin={() => setTemporaryPinCoordinates(null)}
          savedPlaces={savedPlaces}
          selectedSavedPlaceId={selectedSavedPlaceId}
        />
      </div>
      <div className="map-ui-region map-ui-region--status" aria-label="Map status controls">
        <StatusIndicator
          canRefresh={statusIndicator.canRefresh}
          detail={statusIndicator.detail}
          isLoading={statusIndicator.isLoading}
          message={statusIndicator.message}
          onRefresh={() => setBuildingRefreshToken((currentToken) => currentToken + 1)}
          tone={statusIndicator.tone}
        />
      </div>
    </section>
  );
}

export function AppShell() {
  return (
    <ToolProvider>
      <LayerProvider>
        <main className="app-shell">
          <TopBar />
          <MapWorkspace />
        </main>
      </LayerProvider>
    </ToolProvider>
  );
}
