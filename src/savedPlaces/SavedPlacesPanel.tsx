import type { SavedPlace } from './savedPlaceTypes';

type SavedPlacesPanelProps = {
  savedPlaces: SavedPlace[];
};

function formatCoordinate(coordinate: number) {
  return coordinate.toFixed(5);
}

export function SavedPlacesPanel({ savedPlaces }: SavedPlacesPanelProps) {
  if (savedPlaces.length === 0) {
    return <p>No saved places yet.</p>;
  }

  return (
    <div className="saved-places-list">
      {savedPlaces.map((savedPlace) => (
        <article className="saved-places-list__item" key={savedPlace.id}>
          <h3>{savedPlace.name}</h3>
          <p>
            {formatCoordinate(savedPlace.coordinates.latitude)}, {formatCoordinate(savedPlace.coordinates.longitude)}
          </p>
          {savedPlace.notes ? <p>{savedPlace.notes}</p> : null}
        </article>
      ))}
    </div>
  );
}
