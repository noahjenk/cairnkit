# ChatGPT Project Context

## Purpose of this document

This document explains how CairnKit reached its current repo setup.

CairnKit was planned through a structured ChatGPT conversation before the GitHub repo was fully prepared for Copilot handover.

The purpose of Phase 0 was to move the useful project context out of ChatGPT conversations and into the repo, so the repo becomes the source of truth.

Copilot should treat this file as background context. The active implementation instructions remain in:

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`
- `docs/tasks/README.md`
- `.github/copilot-instructions.md`

## How the project was developed with ChatGPT

The project began as a wider idea for a browser-based scouting map tool.

The earlier prototype was called Remote Finder. It proved that the basic idea was interesting, but it became too narrow and prototype-like for long-term growth.

Through ChatGPT planning, the project was reframed as **CairnKit**.

CairnKit is not just Remote Finder with extra features. It is a clean V2 project with a broader toolkit architecture.

The planning process focused on:

1. clarifying what CairnKit is
2. choosing a clean project name and basic identity
3. deciding the first MVP scope
4. separating the first major tool from the wider app
5. defining a modular technical architecture
6. creating a repo documentation structure
7. preparing Copilot instructions and task briefs
8. preventing project context from staying trapped in chat history

## Important project sources

The repo docs were based on these project sources:

1. ChatGPT planning conversations about the original Remote Finder prototype.
2. ChatGPT planning conversations about the new CairnKit V2 direction.
3. The uploaded architecture planning material.
4. The user's architecture question answers and preferences.
5. The generated CairnKit architecture plan.
6. The generated Phase 0 context-migration plan.
7. The Phase 0 checkpoint process followed while setting up the repo.

The most important migrated decisions are now recorded directly in the repo docs.

## Key decisions that came from ChatGPT planning

### Project name

The project is called **CairnKit**.

Use capital C and K.

Tagline:

> A modular map toolkit for finding and saving places.

### Product direction

CairnKit is a modular, browser-based scouting map platform.

It should open directly into a map and support tools, layers, saved places, and future data sources.

### First major tool

The first major tool is **Rural Area Finder**.

Rural Area Finder helps users explore areas that are farther away from selected mapped features, starting with buildings.

Rural Area Finder is one tool inside CairnKit. It should not become the whole app.

### Clean V2 repo

CairnKit should start from a clean repo called `cairnkit`.

It should not copy the Remote Finder prototype.

Remote Finder is useful background, but CairnKit is the cleaner V2 architecture.

### Technical stack

The planned stack is:

- React
- Vite
- TypeScript
- MapLibre GL JS
- Plain CSS or CSS modules first
- Frontend-only MVP
- localStorage behind a storage adapter
- mock data before Overpass

### Architecture boundaries

CairnKit should be organised around these boundaries:

1. App shell
2. Map module
3. Tool system
4. Layer system
5. Data-source adapters
6. Feature types
7. Storage adapters
8. Saved places
9. Shared UI

The purpose of these boundaries is to stop the app becoming a messy prototype where every new feature is bolted onto one large component.

### Mock data before Overpass

Rural Area Finder should use mock building data before Overpass.

This allows the app architecture to be proven before adding network requests, rate limits, caching, and real-world data issues.

### Saved places before Overpass

Saved places should be built after the tool and layer foundations exist, but before Overpass.

This proves CairnKit is more than just Rural Area Finder.

### localStorage behind an adapter

Saved places and persisted settings may use localStorage in the MVP.

However, UI components should not call localStorage directly.

Storage should go through a storage adapter or service so future storage options can be added without rewriting the UI.

### Manual testing first

Manual testing is acceptable during early MVP setup.

Automated tests can be added later for services, adapters, and more stable logic.

## What ChatGPT has already helped create

ChatGPT helped create the Phase 0 repo structure:

```txt
docs/
  PRODUCT_BRIEF.md
  ARCHITECTURE.md
  ROADMAP.md
  DECISIONS.md
  COPILOT_WORKFLOW.md
  CHATGPT_PROJECT_CONTEXT.md
  tasks/

.github/
  copilot-instructions.md
  ISSUE_TEMPLATE/
    feature_task.md
    bug_fix.md
```

ChatGPT also helped create the first task briefs in:

```txt
docs/tasks/
```

These task briefs are intended to guide Copilot through the first implementation steps without losing the larger architecture.

## How Copilot should use this document

Copilot should use this document as background context only.

This file explains where the repo docs came from and why the project is structured this way.

When implementing, Copilot should follow:

1. the current task brief in `docs/tasks/`
2. `.github/copilot-instructions.md`
3. `docs/COPILOT_WORKFLOW.md`
4. the architecture and roadmap docs

Copilot should not treat old ChatGPT chat history as more important than the repo docs.

If there is a conflict between this document and the active repo docs, the active repo docs should win.

## How ChatGPT should be used after handover

After Phase 0, ChatGPT should not be the hidden source of truth.

Use ChatGPT for:

1. reviewing Copilot's proposed tasks
2. breaking large tasks into smaller GitHub issues
3. checking whether Copilot is staying within scope
4. explaining beginner-level development steps
5. helping debug problems
6. improving repo docs when the project changes

Do not rely on ChatGPT chat history alone to store project decisions.

If ChatGPT helps make a meaningful decision, that decision should be copied into the repo, usually in one of these files:

- `docs/DECISIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/COPILOT_WORKFLOW.md`
- a new numbered task brief in `docs/tasks/`

## How new tasks should be created after the initial task list

When existing task briefs are complete, Copilot should not invent large new features.

Copilot should:

1. read the repo docs
2. review the current codebase
3. compare progress against the roadmap
4. identify the next smallest logical task
5. write a new numbered task brief in `docs/tasks/`
6. wait for approval before implementing it

The repo should continue to use small task briefs and GitHub issues as the bridge between planning and implementation.

## What should not happen

Do not let the project drift back into scattered planning across:

- random ChatGPT chats
- vague Copilot prompts
- untracked GitHub comments
- large unspecific issues
- undocumented architecture changes

If a decision matters, put it in the repo.

If a task matters, write it as a small task brief or GitHub issue.

If the architecture changes, update the architecture docs.

## Current handover status

At the time this document was originally added, the project was still in Phase 0.

That original handover status has been superseded. The repo has since completed Tasks 001 through 008.

The current next implementation task is:

```txt
docs/tasks/009-add-mock-building-data-source.md
```

That task should only add mock building data and its data-source adapter. It should not add Rural Area Finder UI, saved places, Overpass, or avoid-zone rendering.

## Important clarification before implementation

The current next implementation task is:

```txt
docs/tasks/009-add-mock-building-data-source.md
```

The mock building data source is now the current next task because the earlier numbered task briefs have been completed in order.
