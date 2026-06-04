import { useState } from 'react';
import { useLayers } from '../../layers';
import { SavedPlacesPanel, TemporaryPinCard, type SavedPlace, type SavedPlaceCoordinates } from '../../savedPlaces';
import { RuralAreaFinderPanel, ruralAreaFinderTool, useTools } from '../../tools';
import { Panel, Toggle } from '../../ui';

type WorkspacePanelProps = {
  onPlaceSaved: () => void;
  onSelectSavedPlace: (savedPlace: SavedPlace) => void;
  temporaryPinCoordinates: SavedPlaceCoordinates | null;
  onClearTemporaryPin: () => void;
  savedPlaces: SavedPlace[];
  selectedSavedPlaceId: string | null;
};

export function WorkspacePanel({
  onPlaceSaved,
  onSelectSavedPlace,
  temporaryPinCoordinates,
  onClearTemporaryPin,
  savedPlaces,
  selectedSavedPlaceId
}: WorkspacePanelProps) {
  const { isLayerVisible, layers, toggleLayerVisibility } = useLayers();
  const { isToolEnabled, toggleTool, tools } = useTools();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const workspaceTools = tools.filter((tool) => tool.id !== ruralAreaFinderTool.id);

  return (
    <aside
      className={`workspace-panel ${isCollapsed ? 'workspace-panel--collapsed' : ''}`.trim()}
      aria-label="Workspace panel"
    >
      <button
        className="workspace-panel__toggle"
        type="button"
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? 'Expand workspace panel' : 'Collapse workspace panel'}
        title={isCollapsed ? 'Expand workspace panel' : 'Collapse workspace panel'}
        onClick={() => setIsCollapsed((currentState) => !currentState)}
      >
        <span aria-hidden="true">{isCollapsed ? '>' : '<'}</span>
      </button>

      {!isCollapsed ? (
        <Panel title="Workspace">
          <section className="workspace-section workspace-section--primary">
            <div className="workspace-section__heading">
              <h2>Tools</h2>
              <p>{isToolEnabled(ruralAreaFinderTool.id) ? 'Rural Area Finder active' : 'Ready'}</p>
            </div>

            <RuralAreaFinderPanel
              isEnabled={isToolEnabled(ruralAreaFinderTool.id)}
              onToggleEnabled={() => toggleTool(ruralAreaFinderTool.id)}
            />

            {workspaceTools.length > 0 ? (
              <div className="tool-list" aria-label="Additional tools">
                {workspaceTools.map((tool) => (
                  <div className="tool-list__item" key={tool.id}>
                    <div>
                      <h3>{tool.name}</h3>
                      <p>{tool.summary}</p>
                    </div>
                    <Toggle
                      checked={isToolEnabled(tool.id)}
                      label={isToolEnabled(tool.id) ? 'Enabled' : 'Disabled'}
                      onChange={() => toggleTool(tool.id)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          <section className="workspace-section">
            <div className="workspace-section__heading">
              <h2>Places</h2>
              <p>{savedPlaces.length.toLocaleString()} saved</p>
            </div>
            {temporaryPinCoordinates ? (
              <TemporaryPinCard
                coordinates={temporaryPinCoordinates}
                onCancel={onClearTemporaryPin}
                onSaved={onPlaceSaved}
              />
            ) : (
              <p className="workspace-empty-state">No place selected.</p>
            )}
            <SavedPlacesPanel
              onSelectSavedPlace={onSelectSavedPlace}
              savedPlaces={savedPlaces}
              selectedSavedPlaceId={selectedSavedPlaceId}
            />
          </section>

          {layers.length > 0 ? (
            <section className="workspace-section">
              <div className="workspace-section__heading">
                <h2>Map Display</h2>
                <p>{layers.length.toLocaleString()} optional</p>
              </div>
              <div className="tool-list">
                {layers.map((layer) => (
                  <div className="tool-list__item" key={layer.id}>
                    <div>
                      <h3>{layer.name}</h3>
                      <p>{layer.summary}</p>
                    </div>
                    <Toggle
                      checked={isLayerVisible(layer.id)}
                      label={isLayerVisible(layer.id) ? 'Visible' : 'Hidden'}
                      onChange={() => toggleLayerVisibility(layer.id)}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </Panel>
      ) : null}
    </aside>
  );
}
