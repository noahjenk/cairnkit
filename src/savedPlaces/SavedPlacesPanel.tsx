import type { SavedPlace } from './savedPlaceTypes';

type SavedPlacesPanelProps = {
  onSelectSavedPlace?: (savedPlace: SavedPlace) => void;
  savedPlaces: SavedPlace[];
  selectedSavedPlaceId?: string | null;
};

function formatCoordinate(coordinate: number) {
  return coordinate.toFixed(5);
}

export function SavedPlacesPanel({
  onSelectSavedPlace,
  savedPlaces,
  selectedSavedPlaceId = null
}: SavedPlacesPanelProps) {
  if (savedPlaces.length === 0) {
    return <p>No saved places yet.</p>;
  }

  return (
    <div className="saved-places-list">
      {savedPlaces.map((savedPlace) => (
        <button
          className={`saved-places-list__item ${
            savedPlace.id === selectedSavedPlaceId ? 'saved-places-list__item--selected' : ''
          }`.trim()}
          key={savedPlace.id}
          onClick={() => onSelectSavedPlace?.(savedPlace)}
          type="button"
        >
          <h3>{savedPlace.name}</h3>
          <p>
            {formatCoordinate(savedPlace.coordinates.latitude)}, {formatCoordinate(savedPlace.coordinates.longitude)}
          </p>
          {savedPlace.notes ? <p>{savedPlace.notes}</p> : null}
        </button>
      ))}
    </div>
  );
}
