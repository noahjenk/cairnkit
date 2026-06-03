export type SavedPlaceCoordinates = {
  longitude: number;
  latitude: number;
};

export type SavedPlace = {
  id: string;
  name: string;
  notes: string;
  coordinates: SavedPlaceCoordinates;
  createdAt: string;
  updatedAt: string;
};

export type CreateSavedPlaceInput = {
  name: string;
  notes?: string;
  coordinates: SavedPlaceCoordinates;
};

export type UpdateSavedPlaceInput = Partial<Pick<SavedPlace, 'name' | 'notes' | 'coordinates'>>;
