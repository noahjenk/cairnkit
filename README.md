# CairnKit

**CairnKit** is a modular map toolkit for finding and saving places.

CairnKit is a browser-based scouting map platform built around an interactive map. It is designed to support modular map tools, toggleable layers, private saved places, and future data sources.

The first major tool will be **Rural Area Finder**, which helps users explore areas that are farther away from mapped features such as buildings.

## Tagline

A modular map toolkit for finding and saving places.

## Core idea

CairnKit should not be a narrow one-purpose prototype. It should be a flexible map toolkit where tools, layers, data sources, saved places, and storage are separated clearly so the app can grow logically.

## MVP goals

The MVP should prove that:

1. The app opens directly into a MapLibre map.
2. CairnKit has a map-first layout.
3. Tools can be added as separate modules.
4. Layers can be added, updated, and toggled.
5. Rural Area Finder can create a shaded avoid-zone layer.
6. Data can come through adapters.
7. Saved places can be stored locally.
8. Repo documentation can guide future development.

## Planned tech stack

- React
- Vite
- TypeScript
- MapLibre GL JS
- Plain CSS or CSS modules first
- Mock data before Overpass
- localStorage behind a storage adapter

## Development principle

The repo documentation is the source of truth. Copilot and contributors should read the docs before implementing features.

## Project planning context

CairnKit was planned through a structured ChatGPT process before Copilot handover.

For background on how the repo docs were created, see:

- `docs/CHATGPT_PROJECT_CONTEXT.md`
