import { createContext, useMemo, useState, type ReactNode } from 'react';
import { toolRegistry } from './toolRegistry';
import type { ToolContextValue, ToolId } from './toolTypes';

export const ToolContext = createContext<ToolContextValue | null>(null);

type ToolProviderProps = {
  children: ReactNode;
};

export function ToolProvider({ children }: ToolProviderProps) {
  const [enabledToolIds, setEnabledToolIds] = useState<ToolId[]>([]);

  const value = useMemo<ToolContextValue>(() => {
    function isToolEnabled(toolId: ToolId) {
      return enabledToolIds.includes(toolId);
    }

    function toggleTool(toolId: ToolId) {
      setEnabledToolIds((currentToolIds) =>
        currentToolIds.includes(toolId)
          ? currentToolIds.filter((currentToolId) => currentToolId !== toolId)
          : [...currentToolIds, toolId]
      );
    }

    return {
      tools: toolRegistry,
      enabledToolIds,
      isToolEnabled,
      toggleTool
    };
  }, [enabledToolIds]);

  return <ToolContext.Provider value={value}>{children}</ToolContext.Provider>;
}
