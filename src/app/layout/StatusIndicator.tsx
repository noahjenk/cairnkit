import { Button } from '../../ui';

type StatusIndicatorProps = {
  canRefresh: boolean;
  detail?: string;
  isLoading: boolean;
  message: string;
  onRefresh: () => void;
  tone: 'error' | 'idle' | 'loading' | 'success';
};

export function StatusIndicator({ canRefresh, detail, isLoading, message, onRefresh, tone }: StatusIndicatorProps) {
  return (
    <div className={`status-indicator status-indicator--${tone}`} role="status">
      <span className="status-indicator__dot" aria-hidden="true" />
      <span className="status-indicator__text">
        <span className="status-indicator__message">{message}</span>
        {detail ? <span className="status-indicator__detail">{detail}</span> : null}
      </span>
      <Button className="status-indicator__refresh" disabled={isLoading || !canRefresh} onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  );
}
