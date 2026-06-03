import './app.css';
import { FloatingSearchBox } from './layout/FloatingSearchBox';
import { StatusIndicator } from './layout/StatusIndicator';
import { TopBar } from './layout/TopBar';
import { WorkspacePanel } from './layout/WorkspacePanel';

export function AppShell() {
  return (
    <main className="app-shell">
      <TopBar />

      <section className="map-workspace" aria-label="CairnKit map workspace">
        <div className="map-placeholder" aria-label="Map placeholder">
          <div className="map-placeholder__grid" />
          <div className="map-placeholder__label">
            <span>Map placeholder</span>
            <strong>CairnKit map workspace</strong>
          </div>
        </div>

        <FloatingSearchBox />
        <WorkspacePanel />
        <StatusIndicator />
      </section>
    </main>
  );
}
