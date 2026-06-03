# CairnKit Decision Log

## Decision 001: Start from a new repo

CairnKit will start in a new repo called `cairnkit` instead of continuing the Remote Finder prototype.

Reason: the previous prototype proved the idea but became too narrow and messy for long-term growth.

## Decision 002: Use React, Vite, TypeScript, and MapLibre GL JS

The app will use React, Vite, TypeScript, and MapLibre GL JS.

Reason: this stack gives a better foundation for a modular browser-based map app with dynamic layers and future growth.

## Decision 003: Use plain CSS or CSS modules first

The app should start with plain CSS or CSS modules instead of Tailwind or a component library.

Reason: this keeps the beginner setup simpler and avoids adding another system before the architecture is stable.

## Decision 004: Build frontend-only for MVP

The MVP will not include a backend.

Reason: the first goal is to prove the app structure, map tools, saved places, and adapter boundaries before adding backend complexity.

## Decision 005: Use mock data before Overpass

Rural Area Finder will use mock building data before Overpass.

Reason: this proves the adapter architecture before introducing network requests, rate limits, and real-world data complexity.

## Decision 006: Use localStorage behind an adapter

Saved places will use localStorage first, but UI components must not call localStorage directly.

Reason: this keeps the app local-first while allowing future IndexedDB or cloud sync adapters.

## Decision 007: Saved places come before Overpass

Saved places should be built after the tool and layer architecture exists, but before Overpass.

Reason: this proves CairnKit is more than just Rural Area Finder.

## Decision 008: Manual testing first

Manual testing is enough during the earliest MVP setup.

Reason: test tooling can be added later for services and adapters once the architecture has settled.

## Decision 009: Do not build accounts, tags, photos, or social features in MVP

These features are planned for later.

Reason: the MVP should stay focused on the map, modular architecture, Rural Area Finder, and basic saved places.
