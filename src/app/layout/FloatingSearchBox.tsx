import { useMemo, useState, type FormEvent } from 'react';
import type { SavedPlace } from '../../savedPlaces';
import { TextInput } from '../../ui';

type FloatingSearchBoxProps = {
  onSelectSavedPlace: (savedPlace: SavedPlace) => void;
  savedPlaces: SavedPlace[];
  selectedSavedPlaceId: string | null;
};

function getSearchableText(savedPlace: SavedPlace) {
  return `${savedPlace.name} ${savedPlace.notes}`.toLowerCase();
}

export function FloatingSearchBox({ onSelectSavedPlace, savedPlaces, selectedSavedPlaceId }: FloatingSearchBoxProps) {
  const [query, setQuery] = useState('');
  const trimmedQuery = query.trim();
  const matchingSavedPlaces = useMemo(() => {
    const normalizedQuery = trimmedQuery.toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return savedPlaces
      .filter((savedPlace) => getSearchableText(savedPlace).includes(normalizedQuery))
      .slice(0, 5);
  }, [savedPlaces, trimmedQuery]);
  const statusMessage = (() => {
    if (!trimmedQuery) {
      return savedPlaces.length === 0 ? 'No saved places yet.' : 'Search saved places.';
    }

    if (matchingSavedPlaces.length === 0) {
      return 'No saved places found.';
    }

    return `${matchingSavedPlaces.length} saved ${matchingSavedPlaces.length === 1 ? 'place' : 'places'} found.`;
  })();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstMatch = matchingSavedPlaces[0];

    if (firstMatch) {
      onSelectSavedPlace(firstMatch);
    }
  }

  return (
    <form className="floating-search" onSubmit={handleSubmit}>
      <TextInput
        label="Search saved places"
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Search saved places"
        type="search"
        value={query}
      />
      <div className="floating-search__results" aria-live="polite">
        <p>{statusMessage}</p>
        {matchingSavedPlaces.length > 0 ? (
          <div className="floating-search__result-list">
            {matchingSavedPlaces.map((savedPlace) => (
              <button
                className={`floating-search__result ${
                  savedPlace.id === selectedSavedPlaceId ? 'floating-search__result--selected' : ''
                }`.trim()}
                key={savedPlace.id}
                onClick={() => onSelectSavedPlace(savedPlace)}
                type="button"
              >
                <span>{savedPlace.name}</span>
                <span>
                  {savedPlace.coordinates.latitude.toFixed(5)}, {savedPlace.coordinates.longitude.toFixed(5)}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  );
}
