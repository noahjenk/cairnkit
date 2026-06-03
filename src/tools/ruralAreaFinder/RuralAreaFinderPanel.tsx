import { useState } from 'react';
import { TextInput } from '../../ui';
import {
  RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS,
  RURAL_AREA_FINDER_MAX_RADIUS_METERS,
  RURAL_AREA_FINDER_MIN_RADIUS_METERS,
  RURAL_AREA_FINDER_RADIUS_STEP_METERS
} from './ruralAreaFinderDefaults';
import { loadRuralAreaFinderRadius, saveRuralAreaFinderRadius } from './ruralAreaFinderStorage';

export function RuralAreaFinderPanel() {
  const [radiusMeters, setRadiusMeters] = useState(loadRuralAreaFinderRadius);

  function handleRadiusChange(value: number) {
    if (!Number.isFinite(value)) {
      return;
    }

    const nextRadiusMeters = saveRuralAreaFinderRadius(value);
    setRadiusMeters(nextRadiusMeters);
  }

  return (
    <section className="workspace-section" aria-label="Rural Area Finder panel">
      <h2>Rural Area Finder</h2>
      <div className="tool-shell">
        <div className="tool-shell__header">
          <h3>Search radius</h3>
          <span>{radiusMeters.toLocaleString()} m</span>
        </div>
        <TextInput
          label="Distance from buildings"
          max={RURAL_AREA_FINDER_MAX_RADIUS_METERS}
          min={RURAL_AREA_FINDER_MIN_RADIUS_METERS}
          onChange={(event) => handleRadiusChange(event.currentTarget.valueAsNumber)}
          step={RURAL_AREA_FINDER_RADIUS_STEP_METERS}
          type="number"
          value={radiusMeters}
        />
        <p>
          Default is {RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS.toLocaleString()} m. Map output will be added in a
          later task.
        </p>
      </div>
    </section>
  );
}
