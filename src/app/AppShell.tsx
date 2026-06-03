import './app.css';
import { FloatingSearchBox } from './layout/FloatingSearchBox';
import { StatusIndicator } from './layout/StatusIndicator';
import { TopBar } from './layout/TopBar';
import { WorkspacePanel } from './layout/WorkspacePanel';
import { LayerProvider } from '../layers';
import { MapView } from '../map/MapView';
import { ToolProvider } from '../tools';

export function AppShell() {
  return (
    <ToolProvider>
      <LayerProvider>
        <main className="app-shell">
          <TopBar />

          <section className="map-workspace" aria-label="CairnKit map workspace">
            <MapView />

            <FloatingSearchBox />
            <WorkspacePanel />
            <StatusIndicator />
          </section>
        </main>
      </LayerProvider>
    </ToolProvider>
  );
}
