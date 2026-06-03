export type ToolId = string;

export type ToolDefinition = {
  id: ToolId;
  name: string;
  summary: string;
};

export type ToolState = {
  enabledToolIds: ToolId[];
};

export type ToolContextValue = {
  tools: ToolDefinition[];
  enabledToolIds: ToolId[];
  isToolEnabled: (toolId: ToolId) => boolean;
  toggleTool: (toolId: ToolId) => void;
};
