# Task 023: Update docs from current implementation

## Goal

Update the durable project docs so they reflect the current implementation.

## Why this matters

The app has moved through map setup, tool foundations, mock and Overpass data-source foundations, Rural Area Finder output, saved-place basics, loading status, cache, and manual refresh. The durable docs should now catch up without duplicating live task progress.

## Relevant docs

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`
- `docs/tasks/README.md`

## Scope

This task should include:

- updating architecture notes for implemented modules
- updating roadmap phase descriptions or current direction
- adding decisions if recent implementation choices should be durable
- preserving `docs/tasks/README.md` as the live task ledger

This task should not include:

- new feature code
- task implementation beyond docs
- duplicating current next task across stable docs

## Files likely involved

- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/PRODUCT_BRIEF.md`
- `docs/tasks/README.md`

## Implementation steps

1. Review current source modules.
2. Update architecture and roadmap docs to match real implementation.
3. Add any durable decisions that emerged.
4. Keep task progress centralized in `docs/tasks/README.md`.
5. Confirm docs are internally consistent.

## Acceptance criteria

- [x] Durable docs reflect the current implementation.
- [x] Current task progress remains centralized in `docs/tasks/README.md`.
- [x] No new feature code has been added.
- [x] Docs avoid contradictory next-task instructions.

## Testing instructions

Run:

```bash
npm run build
```

Then scan docs for stale current-task instructions outside `docs/tasks/README.md`.

## Notes for Copilot

Keep this docs-only. Do not start a new feature task until this cleanup is complete.

## Completion note

Updated the product brief, architecture, roadmap, and decision log to match the current implementation. Live task progress remains centralized in `docs/tasks/README.md`.
