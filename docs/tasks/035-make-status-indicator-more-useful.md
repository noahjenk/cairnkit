# Task 035: Make status indicator more useful

## Goal

Make the page-wide status indicator more intelligent, relevant, and easier to act on.

## Why this matters

The status indicator now carries multiple map and Rural Area Finder messages, but it is still a flat text string. It should prioritize the most useful state for the current workflow and avoid showing idle or irrelevant information as if it needs attention.

## Relevant docs

- `docs/ARCHITECTURE.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- prioritizing active, error, loading, and success states in a clearer order
- hiding or downplaying idle Rural Area Finder messages when the tool is not active
- making refresh availability match whether building data can currently be loaded
- keeping the status indicator compact and clear on narrow screens

This task should not include:

- changing Overpass loading behavior
- changing Rural Area Finder settings UI
- changing map layer rendering

## Files likely involved

- `src/app/AppShell.tsx`
- `src/app/layout/StatusIndicator.tsx`
- `src/app/app.css`
- `docs/tasks/README.md`

## Implementation steps

1. Review the current status message composition.
2. Add status prioritization for loading, errors, active output, and idle states.
3. Adjust refresh enabled/disabled behavior if needed.
4. Keep the compact visual layout stable.
5. Build the app.

## Acceptance criteria

- [x] Status indicator prioritizes actionable states over idle text.
- [x] Rural Area Finder idle messages do not dominate when the tool is off.
- [x] Refresh availability matches whether building loading is relevant.
- [x] Status text remains readable on narrow screens.
- [x] App still builds.

## Testing instructions

Run:

```bash
npm run build
```

Then inspect the status indicator with Rural Area Finder off, loading, loaded, errored, and processing.

## Completion note

Completed on 2026-06-04. The status indicator now uses a prioritized status model that accounts for Rural Area Finder enabled state, separates primary and detail text, tones the indicator by status, and disables refresh when building loading is not relevant or already in progress.
