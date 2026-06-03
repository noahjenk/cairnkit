export function StatusIndicator() {
  return (
    <div className="status-indicator" role="status">
      <span className="status-indicator__dot" aria-hidden="true" />
      <span>Ready for map setup</span>
    </div>
  );
}
