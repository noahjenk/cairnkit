import { mockBuildingSource } from './mock/mockBuildingSource';
import { overpassBuildingSource } from './overpass/overpassBuildingSource';
import type { DataSourceAdapter } from './dataSourceTypes';

export const dataSourceRegistry: DataSourceAdapter[] = [mockBuildingSource, overpassBuildingSource];
