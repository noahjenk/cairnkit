# Copilot Instructions for CairnKit

CairnKit is a modular browser-based scouting map platform.

The app is called **CairnKit** with capital C and K.

Tagline:

> A modular map toolkit for finding and saving places.

## Current phase

The project is currently being built from scratch.

Do not assume existing app code unless it is already present in the repo.

## Core stack

The planned stack is:

- React
- Vite
- TypeScript
- MapLibre GL JS
- Plain CSS or CSS modules first
- Frontend-only MVP
- localStorage behind a storage adapter
- mock data before Overpass

## Main architecture rules

1. Keep the app map-first.
2. Keep tools modular.
3. Keep map output layer-based.
4. Use data-source adapters for external feature data.
5. Use storage adapters for saved user data.
6. Do not call localStorage directly from random UI components.
7. Do not hard-code Rural Area Finder directly to Overpass.
8. Do not make Rural Area Finder the whole app.
9. Keep saved places private-first and local-first.
10. Prefer clear beginner-readable code over clever abstractions.

## Repo docs are source of truth

Before implementing changes, read the relevant docs:

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`

If implementation changes the architecture, update `docs/ARCHITECTURE.md`.

If implementation changes the build order, update `docs/ROADMAP.md`.

If a major decision changes, update `docs/DECISIONS.md`.

## MVP exclusions

Do not build these unless explicitly approved:

- accounts
- login
- cloud sync
- photos
- tags
- social sharing
- project/trip grouping
- advanced drawing tools
- full mobile app mode
- offline mode
- production GIS backend
- polished dissolved buffer algorithm

## Issue discipline

Only implement the approved issue.

Do not freely add nearby features.

Do not do large rewrites without approval.

After each implementation, explain:

- what changed
- which files changed
- how to test it
- whether docs were updated
- what the next small task should be

## Beginner-friendly requirement

The repo owner is a beginner.

Write understandable code.

Avoid unnecessary abstractions, unnecessary packages, and unexplained architecture changes.

## Continuing after current tasks

When the existing task briefs in `docs/tasks/` are complete, do not invent a large new feature or skip ahead.

Before continuing:

1. Read the repo docs.
2. Review the current codebase.
3. Compare progress against `docs/ROADMAP.md`.
4. Propose the next smallest logical task.
5. Write a new numbered task brief in `docs/tasks/`.
6. Wait for approval before implementing it.

Continue the task numbering sequence. Do not reuse task numbers.

If unsure, ask for a decision before coding.

## ChatGPT planning context

The project was planned through a structured ChatGPT process before Copilot handover.

Read `docs/CHATGPT_PROJECT_CONTEXT.md` for background on how the repo docs were created.

Use that file as context, not as a replacement for the active task briefs, architecture docs, roadmap, or decision log.

## Current next implementation task

The current next implementation task is:

```txt
docs/tasks/001-create-vite-react-typescript-app.md
```

Start with Task 001.

Do not skip ahead to mock data, MapLibre, Rural Area Finder, saved places, Overpass, or later architecture tasks.
