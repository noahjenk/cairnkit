import { useState } from 'react';
import { TextInput, Toggle } from '../../ui';
import {
  RURAL_AREA_FINDER_DEFAULT_OPACITY_PERCENT,
  RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS,
  RURAL_AREA_FINDER_MAX_OPACITY_PERCENT,
  RURAL_AREA_FINDER_MAX_RADIUS_METERS,
  RURAL_AREA_FINDER_MIN_OPACITY_PERCENT,
  RURAL_AREA_FINDER_OPACITY_STEP_PERCENT,
  RURAL_AREA_FINDER_RADIUS_STEP_METERS
} from './ruralAreaFinderDefaults';
import {
  loadRuralAreaFinderShowLoadedBuildings,
  loadRuralAreaFinderOpacity,
  loadRuralAreaFinderRadius,
  saveRuralAreaFinderShowLoadedBuildings,
  saveRuralAreaFinderOpacity,
  saveRuralAreaFinderRadius
} from './ruralAreaFinderStorage';

type RuralAreaFinderPanelProps = {
  isEnabled: boolean;
  onToggleEnabled: () => void;
};

export function RuralAreaFinderPanel({
  isEnabled,
  onToggleEnabled
}: RuralAreaFinderPanelProps) {
  const [areSettingsExpanded, setAreSettingsExpanded] = useState(true);
  const [opacityPercent, setOpacityPercent] = useState(loadRuralAreaFinderOpacity);
  const [radiusMeters, setRadiusMeters] = useState(loadRuralAreaFinderRadius);
  const [showLoadedBuildings, setShowLoadedBuildings] = useState(loadRuralAreaFinderShowLoadedBuildings);

  function handleOpacityChange(value: number) {
    if (!Number.isFinite(value)) {
      return;
    }

    const nextOpacityPercent = saveRuralAreaFinderOpacity(value);
    setOpacityPercent(nextOpacityPercent);
  }

  function handleRadiusChange(value: number) {
    if (!Number.isFinite(value)) {
      return;
    }

    const nextRadiusMeters = saveRuralAreaFinderRadius(value);
    setRadiusMeters(nextRadiusMeters);
  }

  function handleShowLoadedBuildingsChange(isVisible: boolean) {
    const nextShowLoadedBuildings = saveRuralAreaFinderShowLoadedBuildings(isVisible);
    setShowLoadedBuildings(nextShowLoadedBuildings);
  }

  return (
    <section className="workspace-section" aria-label="Rural Area Finder panel">
      <div className="workspace-section__header">
        <h2>Rural Area Finder</h2>
        <Toggle checked={isEnabled} label={isEnabled ? 'Enabled' : 'Disabled'} onChange={onToggleEnabled} />
      </div>

      <div className="tool-shell">
        <div className="tool-shell__header">
          <h3>Settings</h3>
          <button
            className="workspace-section__toggle"
            type="button"
            aria-expanded={areSettingsExpanded}
            aria-label={
              areSettingsExpanded ? 'Collapse Rural Area Finder settings' : 'Expand Rural Area Finder settings'
            }
            onClick={() => setAreSettingsExpanded((currentState) => !currentState)}
          >
            {areSettingsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>

        {areSettingsExpanded ? (
          <>
            <TextInput
              label="Distance from buildings"
              max={RURAL_AREA_FINDER_MAX_RADIUS_METERS}
              onChange={(event) => handleRadiusChange(event.currentTarget.valueAsNumber)}
              step={RURAL_AREA_FINDER_RADIUS_STEP_METERS}
              type="number"
              value={radiusMeters}
            />
            <p>
              Default is {RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS.toLocaleString()} m. Avoid zones use loaded building
              data for the current map view.
            </p>
            <TextInput
              label="Overlay opacity"
              max={RURAL_AREA_FINDER_MAX_OPACITY_PERCENT}
              min={RURAL_AREA_FINDER_MIN_OPACITY_PERCENT}
              onChange={(event) => handleOpacityChange(event.currentTarget.valueAsNumber)}
              step={RURAL_AREA_FINDER_OPACITY_STEP_PERCENT}
              type="number"
              value={opacityPercent}
            />
            <p>Default is {RURAL_AREA_FINDER_DEFAULT_OPACITY_PERCENT}%.</p>
            <div className="tool-shell__header">
              <h3>Loaded buildings</h3>
              <Toggle
                checked={showLoadedBuildings}
                label={showLoadedBuildings ? 'Visible' : 'Hidden'}
                onChange={(event) => handleShowLoadedBuildingsChange(event.currentTarget.checked)}
              />
            </div>
            <p>Shows the currently loaded building polygons while Rural Area Finder is active.</p>
          </>
        ) : null}
      </div>
    </section>
  );
}
