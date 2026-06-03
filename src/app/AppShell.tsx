import { useCallback, useState } from 'react';
import './app.css';
import { FloatingSearchBox } from './layout/FloatingSearchBox';
import { StatusIndicator } from './layout/StatusIndicator';
import { TopBar } from './layout/TopBar';
import { WorkspacePanel } from './layout/WorkspacePanel';
import { LayerProvider } from '../layers';
import { MapView } from '../map/MapView';
import { listSavedPlaces, type SavedPlace, type SavedPlaceCoordinates } from '../savedPlaces';
import { ToolProvider } from '../tools';

export type BuildingLoadStatus =
  | {
      state: 'idle';
    }
  | {
      state: 'loading';
    }
  | {
      featureCount: number;
      state: 'success';
    }
  | {
      message: string;
      state: 'error';
    };

function getBuildingLoadStatusMessage(status: BuildingLoadStatus) {
  if (status.state === 'loading') {
    return 'Loading buildings';
  }

  if (status.state === 'success') {
    return `${status.featureCount} buildings loaded`;
  }

  if (status.state === 'error') {
    return 'Building load failed';
  }

  return 'Ready';
}

export function AppShell() {
  const [temporaryPinCoordinates, setTemporaryPinCoordinates] = useState<SavedPlaceCoordinates | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>(listSavedPlaces);
  const [buildingLoadStatus, setBuildingLoadStatus] = useState<BuildingLoadStatus>({ state: 'idle' });

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
    <ToolProvider>
      <LayerProvider>
        <main className="app-shell">
          <TopBar />

          <section className="map-workspace" aria-label="CairnKit map workspace">
            <MapView
              onBuildingLoadStatusChange={handleBuildingLoadStatusChange}
              onMapClick={setTemporaryPinCoordinates}
              savedPlaces={savedPlaces}
              temporaryPinCoordinates={temporaryPinCoordinates}
            />

            <FloatingSearchBox />
            <WorkspacePanel
              onPlaceSaved={handlePlaceSaved}
              temporaryPinCoordinates={temporaryPinCoordinates}
              onClearTemporaryPin={() => setTemporaryPinCoordinates(null)}
              savedPlaces={savedPlaces}
            />
            <StatusIndicator message={getBuildingLoadStatusMessage(buildingLoadStatus)} />
          </section>
        </main>
      </LayerProvider>
    </ToolProvider>
  );
}
