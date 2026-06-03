import { SavePlaceForm } from './SavePlaceForm';
import type { SavedPlace, SavedPlaceCoordinates } from './savedPlaceTypes';

type TemporaryPinCardProps = {
  coordinates: SavedPlaceCoordinates;
  onCancel: () => void;
  onSaved: (savedPlace: SavedPlace) => void;
};

function formatCoordinate(coordinate: number) {
  return coordinate.toFixed(5);
}

export function TemporaryPinCard({ coordinates, onCancel, onSaved }: TemporaryPinCardProps) {
  return (
    <div className="temporary-pin-card">
      <div>
        <h3>Temporary pin</h3>
        <p>
          {formatCoordinate(coordinates.latitude)}, {formatCoordinate(coordinates.longitude)}
        </p>
      </div>
      <SavePlaceForm coordinates={coordinates} onCancel={onCancel} onSaved={onSaved} />
    </div>
  );
}
