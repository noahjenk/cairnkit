const sections = [
  {
    title: 'Active Tools',
    summary: 'Tool controls will appear here.'
  },
  {
    title: 'Layers',
    summary: 'Map layer toggles will appear here.'
  },
  {
    title: 'Saved Places',
    summary: 'Saved place controls will appear here.'
  }
];

export function WorkspacePanel() {
  return (
    <aside className="workspace-panel" aria-label="Workspace panel">
      <div className="workspace-panel__header">
        <h2 className="workspace-panel__title">Workspace</h2>
        <p className="workspace-panel__summary">Placeholders only for the map-first layout.</p>
      </div>

      {sections.map((section) => (
        <section className="workspace-section" key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.summary}</p>
        </section>
      ))}
    </aside>
  );
}
