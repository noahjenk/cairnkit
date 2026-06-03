import { useState, type FormEvent } from 'react';
import { Button, TextArea, TextInput } from '../ui';
import { createSavedPlace } from './savedPlaceService';
import type { SavedPlace, SavedPlaceCoordinates } from './savedPlaceTypes';

type SavePlaceFormProps = {
  coordinates: SavedPlaceCoordinates;
  onCancel: () => void;
  onSaved: (savedPlace: SavedPlace) => void;
};

export function SavePlaceForm({ coordinates, onCancel, onSaved }: SavePlaceFormProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const savedPlace = createSavedPlace({
      name,
      notes,
      coordinates
    });

    onSaved(savedPlace);
    setName('');
    setNotes('');
  }

  return (
    <form className="save-place-form" onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        onChange={(event) => setName(event.currentTarget.value)}
        placeholder="Place name"
        required
        value={name}
      />
      <TextArea
        label="Notes"
        onChange={(event) => setNotes(event.currentTarget.value)}
        placeholder="Optional notes"
        value={notes}
      />
      <div className="save-place-form__actions">
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
