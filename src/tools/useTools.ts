import { useContext } from 'react';
import { ToolContext } from './ToolProvider';

export function useTools() {
  const context = useContext(ToolContext);

  if (!context) {
    throw new Error('useTools must be used inside ToolProvider.');
  }

  return context;
}
