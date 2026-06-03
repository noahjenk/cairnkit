import { useLayers } from '../../layers';
import { RuralAreaFinderPanel, ruralAreaFinderTool, useTools } from '../../tools';
import { Panel, Toggle } from '../../ui';

const sections = [
  {
    title: 'Saved Places',
    summary: 'Saved place controls will appear here.'
  }
];

export function WorkspacePanel() {
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

        {sections.map((section) => (
          <section className="workspace-section" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.summary}</p>
          </section>
        ))}
      </Panel>
    </aside>
  );
}
