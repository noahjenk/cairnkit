import { useLayers } from '../../layers';
import { SavedPlacesPanel, TemporaryPinCard, type SavedPlace, type SavedPlaceCoordinates } from '../../savedPlaces';
import { RuralAreaFinderPanel, ruralAreaFinderTool, useTools } from '../../tools';
import { Panel, Toggle } from '../../ui';

type WorkspacePanelProps = {
  onPlaceSaved: () => void;
  temporaryPinCoordinates: SavedPlaceCoordinates | null;
  onClearTemporaryPin: () => void;
  savedPlaces: SavedPlace[];
};

export function WorkspacePanel({
  onPlaceSaved,
  temporaryPinCoordinates,
  onClearTemporaryPin,
  savedPlaces
}: WorkspacePanelProps) {
  const { isLayerVisible, layers, toggleLayerVisibility } = useLayers();
  const { isToolEnabled, toggleTool, tools } = useTools();

  return (
    <aside className="workspace-panel" aria-label="Workspace panel">
      <Panel title="Workspace" summary="Placeholders only for the map-first layout.">
        <section className="workspace-section">
          <h2>Active Tools</h2>
          <div className="tool-list">
            {tools.map((tool) => (
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
        </section>

        {isToolEnabled(ruralAreaFinderTool.id) ? <RuralAreaFinderPanel /> : null}

        <section className="workspace-section">
          <h2>Layers</h2>
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

        <section className="workspace-section">
          <h2>Saved Places</h2>
          {temporaryPinCoordinates ? (
            <TemporaryPinCard
              coordinates={temporaryPinCoordinates}
              onCancel={onClearTemporaryPin}
              onSaved={onPlaceSaved}
            />
          ) : (
            <p>Click the map to choose a place to save.</p>
          )}
          <SavedPlacesPanel savedPlaces={savedPlaces} />
        </section>
      </Panel>
    </aside>
  );
}
