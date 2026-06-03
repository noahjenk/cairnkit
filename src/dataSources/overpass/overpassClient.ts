const OVERPASS_ENDPOINT = 'https://overpass-api.de/api/interpreter';

export type OverpassNodeGeometry = {
  lat: number;
  lon: number;
};

export type OverpassElement = {
  id: number;
  type: 'node' | 'way' | 'relation';
  tags?: Record<string, string>;
  geometry?: OverpassNodeGeometry[];
};

export type OverpassResponse = {
  elements: OverpassElement[];
};

export async function queryOverpass(query: string): Promise<OverpassResponse> {
  const response = await fetch(OVERPASS_ENDPOINT, {
    method: 'POST',
    body: new URLSearchParams({ data: query })
  });

  if (!response.ok) {
    throw new Error(`Overpass request failed with status ${response.status}.`);
  }

  return response.json() as Promise<OverpassResponse>;
}
