import { mockBuildingSource } from './mock/mockBuildingSource';
import type { DataSourceAdapter } from './dataSourceTypes';

export const dataSourceRegistry: DataSourceAdapter[] = [mockBuildingSource];
