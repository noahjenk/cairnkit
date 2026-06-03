# CairnKit Task Briefs

This folder contains small task briefs that guide implementation.

Each task should be treated as a controlled handover unit between the repo docs, GitHub issues, Copilot, and the codebase.

## Current project status

The repo has completed Tasks 001 through 009, plus inserted Tasks 8.5 and 8.6.

The current next implementation task is Task 010: `010-add-rural-area-finder-tool-shell.md`.

Copilot must not skip ahead to radius persistence, layer rendering, saved places, Overpass, or any later tasks before completing the Rural Area Finder tool shell.

## Task workflow

For each task:

1. Read the relevant repo docs.
2. Read the current task brief.
3. Create or follow a matching GitHub issue.
4. Implement only that task.
5. Test the task.
6. Update docs if the implementation changes architecture, roadmap, or decisions.
7. Summarise what changed.
8. Suggest the next small task.

## When the existing task briefs are complete

When all existing task briefs in this folder are complete, Copilot should not invent large features or skip ahead.

Instead, Copilot should:

1. Read:
   - `docs/PRODUCT_BRIEF.md`
   - `docs/ARCHITECTURE.md`
   - `docs/ROADMAP.md`
   - `docs/DECISIONS.md`
   - `docs/COPILOT_WORKFLOW.md`
   - `.github/copilot-instructions.md`

2. Review the current codebase.

3. Identify the next smallest logical task from the roadmap.

4. Write a new task brief in this folder using the next number.

5. Wait for approval before implementing it.

6. After approval, create or follow a matching GitHub issue.

7. Implement only that approved task.

## Task numbering

Task files should use this format:

```txt
001-create-vite-react-typescript-app.md
002-add-base-folder-structure.md
003-build-map-first-app-shell.md
```

After task `008`, an inserted task may use this format when a small prerequisite is discovered before Task 009:

```txt
008.5-[short-task-name].md
008.6-[short-task-name].md
```

After those inserted tasks, regular task numbering should continue:

```txt
009-[short-task-name].md
010-[short-task-name].md
```

Task numbers should never be reused.

## Task size

Tasks should stay small enough that they can be implemented, tested, and reviewed independently.

A task is too large if it includes several unrelated features.

For example, this is too large:

```txt
Add Rural Area Finder, Overpass, saved places, and styling polish
```

This is better:

```txt
Add mock building data source
```

## Build order after the first eight tasks

After the initial task briefs are complete, the next expected tasks should continue roughly in this order:

1. Complete small UI tweaks inserted as Task 8.5. Done.
2. Complete bottom-right UI overlap fix inserted as Task 8.6. Done.
3. Add mock building data source. Done.
4. Add Rural Area Finder tool shell.
5. Persist Rural Area Finder radius.
6. Render mock building features as a debug layer.
7. Add approximate avoid-zone layer from mock buildings.
8. Add saved-place types and service.
9. Add map click temporary pin and save-place flow.
10. Add Overpass adapter.
11. Add debounced map movement loading.
12. Add simple cache.
13. Add manual refresh.
14. Add status and error states.
15. Improve avoid-zone geometry.
16. Update docs from real implementation.

This list is the later implementation sequence now that the initial task briefs are complete.

This order can change if the repo docs are updated, but Copilot should not skip ahead without approval.

## Copilot rule

If Copilot is unsure what to do next, it should not start coding.

It should first produce a proposed next task brief and explain why that task is the next logical step.

## Current next task

The current next implementation task is:

```txt
010-add-rural-area-finder-tool-shell.md
```

Copilot must start with Task 010 and keep it focused on the Rural Area Finder shell only.
