import { useState } from 'react';
import './app.css';
import { FloatingSearchBox } from './layout/FloatingSearchBox';
import { StatusIndicator } from './layout/StatusIndicator';
import { TopBar } from './layout/TopBar';
import { WorkspacePanel } from './layout/WorkspacePanel';
import { LayerProvider } from '../layers';
import { MapView } from '../map/MapView';
import type { SavedPlaceCoordinates } from '../savedPlaces';
import { ToolProvider } from '../tools';

export function AppShell() {
  const [temporaryPinCoordinates, setTemporaryPinCoordinates] = useState<SavedPlaceCoordinates | null>(null);

  return (
    <ToolProvider>
      <LayerProvider>
        <main className="app-shell">
          <TopBar />

          <section className="map-workspace" aria-label="CairnKit map workspace">
            <MapView onMapClick={setTemporaryPinCoordinates} />

            <FloatingSearchBox />
            <WorkspacePanel
              temporaryPinCoordinates={temporaryPinCoordinates}
              onClearTemporaryPin={() => setTemporaryPinCoordinates(null)}
            />
            <StatusIndicator />
          </section>
        </main>
      </LayerProvider>
    </ToolProvider>
  );
}
