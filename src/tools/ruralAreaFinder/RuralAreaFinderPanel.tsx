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

  const settingsSummary = `${radiusMeters.toLocaleString()} m / ${opacityPercent}% opacity`;

  return (
    <div className="workspace-tool" aria-label="Rural Area Finder panel">
      <div className="workspace-tool__header">
        <div>
          <h3>Rural Area Finder</h3>
          <p>{isEnabled ? 'Avoid zones active' : 'Settings available'}</p>
        </div>
        <Toggle checked={isEnabled} label={isEnabled ? 'Enabled' : 'Disabled'} onChange={onToggleEnabled} />
      </div>

      <div className="tool-shell">
        <div className="tool-shell__header">
          <div>
            <h3>Settings</h3>
            <p>{settingsSummary}</p>
          </div>
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
          <div className="tool-settings">
            <div className="tool-setting">
              <TextInput
                label="Distance from buildings"
                max={RURAL_AREA_FINDER_MAX_RADIUS_METERS}
                onChange={(event) => handleRadiusChange(event.currentTarget.valueAsNumber)}
                step={RURAL_AREA_FINDER_RADIUS_STEP_METERS}
                type="number"
                value={radiusMeters}
              />
              <p>{RURAL_AREA_FINDER_DEFAULT_RADIUS_METERS.toLocaleString()} m default</p>
            </div>

            <div className="tool-setting">
              <TextInput
                label="Overlay opacity"
                max={RURAL_AREA_FINDER_MAX_OPACITY_PERCENT}
                min={RURAL_AREA_FINDER_MIN_OPACITY_PERCENT}
                onChange={(event) => handleOpacityChange(event.currentTarget.valueAsNumber)}
                step={RURAL_AREA_FINDER_OPACITY_STEP_PERCENT}
                type="number"
                value={opacityPercent}
              />
              <p>{RURAL_AREA_FINDER_DEFAULT_OPACITY_PERCENT}% default</p>
            </div>

            <div className="tool-output-setting">
              <div>
                <h3>Loaded buildings</h3>
                <p>Show current building polygons when active.</p>
              </div>
              <Toggle
                checked={showLoadedBuildings}
                label={showLoadedBuildings ? 'Visible' : 'Hidden'}
                onChange={(event) => handleShowLoadedBuildingsChange(event.currentTarget.checked)}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
