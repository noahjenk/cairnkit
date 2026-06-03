import { Button } from '../../ui';

type StatusIndicatorProps = {
  isLoading: boolean;
  message: string;
  onRefresh: () => void;
};

export function StatusIndicator({ isLoading, message, onRefresh }: StatusIndicatorProps) {
  return (
    <div className="status-indicator" role="status">
      <span className="status-indicator__dot" aria-hidden="true" />
      <span>{message}</span>
      <Button className="status-indicator__refresh" disabled={isLoading} onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  );
}
