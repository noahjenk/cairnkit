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
          className={`saved-place-option saved-places-list__item ${
            savedPlace.id === selectedSavedPlaceId ? 'saved-place-option--selected' : ''
          }`.trim()}
          key={savedPlace.id}
          onClick={() => onSelectSavedPlace?.(savedPlace)}
          type="button"
        >
          <span className="saved-place-option__name">{savedPlace.name}</span>
          <span className="saved-place-option__meta">
            {formatCoordinate(savedPlace.coordinates.latitude)}, {formatCoordinate(savedPlace.coordinates.longitude)}
          </span>
          {savedPlace.notes ? <span className="saved-place-option__notes">{savedPlace.notes}</span> : null}
        </button>
      ))}
    </div>
  );
}
