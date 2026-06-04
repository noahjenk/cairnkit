# UI Overhaul Plan

## Goal

Make CairnKit feel like a considered, scalable map tool instead of a collection of floating controls.

The app should stay map-first, practical, and modular. The redesign should reduce visual noise, make workflows easier to follow, and create a layout system that can hold future tools without becoming bulky.

## Current problems

- Search, workspace, and status elements compete for floating space.
- The left workspace has grown into a long mixed list of tools, layers, settings, saved places, and temporary pin flows.
- Important map workflows do not have clear priority.
- Repeated card-like surfaces make the UI feel heavier than it needs to.
- The current CSS is mostly one-off layout rules rather than a small reusable layout system.
- Narrow-screen behavior is functional but not yet designed as a coherent workflow.

## Design direction

The target should feel closer to focused operational map tools:

- map remains the primary canvas
- one organized left command rail or workspace surface
- clear tool sections with predictable controls
- restrained colors and compact spacing
- status and feedback are informative but quiet
- search and saved-place workflows are discoverable without taking over the map
- controls scale as more tools are added

Avoid:

- marketing-style panels
- decorative gradients or oversized visual treatments
- nested cards inside cards
- large rewrites that change multiple workflows at once
- broad new dependencies for basic layout work

## Proposed task sequence

### Task 040: Define UI layout system tokens

Create a small set of CSS custom properties for spacing, panel width, borders, shadows, text sizes, and z-index layers. Apply only the safest substitutions first.

Purpose: create consistency before moving layout pieces.

### Task 041: Rework map workspace layout regions

Replace ad hoc floating offsets with named layout regions for search, workspace, status, and map controls. Ensure search and workspace no longer overlap.

Purpose: make the screen predictable and scalable.

### Task 042: Redesign workspace information architecture

Split the workspace into clearer sections: active tool, saved places, and secondary map options. Remove empty or low-value sections when they have no content.

Purpose: reduce the sense of one long mixed panel.

### Task 043: Consolidate search and saved-place selection UI

Make search results and saved-place list selection feel like one coherent saved-place workflow. Avoid duplicated result/list visual patterns.

Purpose: make local saved-place navigation easier to understand.

### Task 044: Simplify Rural Area Finder panel layout

Rework the Rural Area Finder controls into a compact settings block with clear hierarchy, aligned controls, and less explanatory text.

Purpose: make the first modular tool feel polished and repeatable for future tools.

### Task 045: Improve responsive workspace behavior

Define a narrow-screen mode for search, workspace, and status. Prefer predictable collapsible sections over stacked overlapping panels.

Purpose: make mobile and small windows intentional rather than patched.

### Task 046: UI polish pass

Apply final spacing, typography, button, focus, and selected-state polish across the changed surfaces.

Purpose: make the interface feel cohesive without changing behavior.

## Implementation rules

- Keep each task small and buildable.
- Do not change map/data logic during layout tasks unless a task explicitly says so.
- Preserve existing Rural Area Finder and saved-place behavior.
- Prefer CSS and component structure improvements over new libraries.
- Add reusable UI primitives only when they reduce repeated code or clarify behavior.
- Run `npm run build` after each task.
- Update `docs/tasks/README.md` after each task.

## Success criteria

- The first screen reads as one coherent map tool.
- Search, workspace, and status no longer overlap.
- The workspace is easier to scan.
- Rural Area Finder settings feel like part of a scalable tool system.
- Future tools can fit into the layout without another structural rewrite.
