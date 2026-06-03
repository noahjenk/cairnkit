type StatusIndicatorProps = {
  message: string;
};

export function StatusIndicator({ message }: StatusIndicatorProps) {
  return (
    <div className="status-indicator" role="status">
      <span className="status-indicator__dot" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
