import { readJsonFromLocalStorage, storageKeys, writeJsonToLocalStorage } from '../storage';
import { createId } from '../utils';
import type { CreateSavedPlaceInput, SavedPlace, UpdateSavedPlaceInput } from './savedPlaceTypes';

function readSavedPlaces() {
  return readJsonFromLocalStorage<SavedPlace[]>(storageKeys.savedPlaces, []);
}

function writeSavedPlaces(savedPlaces: SavedPlace[]) {
  writeJsonToLocalStorage(storageKeys.savedPlaces, savedPlaces);
}

export function listSavedPlaces() {
  return readSavedPlaces();
}

export function getSavedPlace(savedPlaceId: string) {
  return readSavedPlaces().find((savedPlace) => savedPlace.id === savedPlaceId) ?? null;
}

export function createSavedPlace(input: CreateSavedPlaceInput) {
  const now = new Date().toISOString();
  const savedPlace: SavedPlace = {
    id: createId('saved-place'),
    name: input.name.trim(),
    notes: input.notes?.trim() ?? '',
    coordinates: input.coordinates,
    createdAt: now,
    updatedAt: now
  };
  const nextSavedPlaces = [...readSavedPlaces(), savedPlace];

  writeSavedPlaces(nextSavedPlaces);

  return savedPlace;
}

export function updateSavedPlace(savedPlaceId: string, input: UpdateSavedPlaceInput) {
  const now = new Date().toISOString();
  let updatedSavedPlace: SavedPlace | null = null;
  const nextSavedPlaces = readSavedPlaces().map((savedPlace) => {
    if (savedPlace.id !== savedPlaceId) {
      return savedPlace;
    }

    updatedSavedPlace = {
      ...savedPlace,
      ...input,
      name: input.name?.trim() ?? savedPlace.name,
      notes: input.notes?.trim() ?? savedPlace.notes,
      updatedAt: now
    };

    return updatedSavedPlace;
  });

  writeSavedPlaces(nextSavedPlaces);

  return updatedSavedPlace;
}

export function deleteSavedPlace(savedPlaceId: string) {
  const savedPlaces = readSavedPlaces();
  const nextSavedPlaces = savedPlaces.filter((savedPlace) => savedPlace.id !== savedPlaceId);

  writeSavedPlaces(nextSavedPlaces);

  return nextSavedPlaces.length !== savedPlaces.length;
}
