# CairnKit Task Briefs

This folder contains small task briefs that guide implementation.

Each task should be treated as a controlled handover unit between the repo docs, GitHub issues, Copilot, and the codebase.

## Task Tracking Source Of Truth

This file is the live task ledger for CairnKit.

When task progress changes, update this file and the affected task brief. Other docs should link here for current task status instead of repeating the current task number.

The stable planning docs still matter:

- `docs/ROADMAP.md` describes phase direction.
- `docs/ARCHITECTURE.md` describes boundaries.
- `docs/COPILOT_WORKFLOW.md` describes process.
- `.github/copilot-instructions.md` gives operating rules.
- `docs/CHATGPT_PROJECT_CONTEXT.md` preserves historical planning context.

Those files should only be updated when their durable guidance changes, not after every task.

## Current Project Status

The repo has completed Tasks 001 through 038, plus inserted Tasks 8.5, 8.6, and 10.5.

The current next implementation task is Task 039: `039-add-clear-selected-saved-place-action.md`.

Copilot must not skip ahead to later refinement work before adding a clear selected saved-place action.

## Update Rules

After completing a task:

1. Mark that task brief's acceptance criteria as complete.
2. Add a short completion note to that task brief.
3. Update `Current Project Status` in this file.
4. Update `Current next task` in this file.
5. Add the next task brief if it does not already exist.
6. Update roadmap, architecture, workflow, or instruction docs only if durable guidance changed.

Do not duplicate the current next task in roadmap, workflow, instruction, or historical context docs.

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
010.5-[short-task-name].md
011-[short-task-name].md
012-[short-task-name].md
013-[short-task-name].md
014-[short-task-name].md
015-[short-task-name].md
016-[short-task-name].md
017-[short-task-name].md
018-[short-task-name].md
019-[short-task-name].md
020-[short-task-name].md
021-[short-task-name].md
022-[short-task-name].md
023-[short-task-name].md
024-[short-task-name].md
024.5-[short-task-name].md
024.6-[short-task-name].md
024.7-[short-task-name].md
024.8-[short-task-name].md
024.9-[short-task-name].md
024.10-[short-task-name].md
025-[short-task-name].md
026-[short-task-name].md
027-[short-task-name].md
028-[short-task-name].md
029-[short-task-name].md
030-[short-task-name].md
031-[short-task-name].md
032-[short-task-name].md
033-[short-task-name].md
034-[short-task-name].md
035-[short-task-name].md
036-[short-task-name].md
037-[short-task-name].md
038-[short-task-name].md
039-[short-task-name].md
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
4. Add Rural Area Finder tool shell. Done.
5. Relocate status indicator away from bottom-right map controls. Done.
6. Persist Rural Area Finder radius. Done.
7. Render mock building features as a debug layer. Done.
8. Add approximate avoid-zone layer from mock buildings. Done.
9. Add saved-place types and service. Done.
10. Add map click temporary pin and save-place flow. Done.
11. Render saved pins and/or add the All Places list. Done.
12. Add Overpass adapter. Done.
13. Add debounced map movement loading. Done.
14. Add simple cache. Done.
15. Add manual refresh. Done.
16. Add status and error states. Done.
17. Improve avoid-zone geometry. Done.
18. Update docs from real implementation. Done.
19. Connect loaded buildings to Rural Area Finder output. Done.
20. Replace mock buildings debug layer with loaded buildings debug layer. Done.
21. Replace radius slider with number input. Done.
22. Merge avoid-zone shapes. Done.
23. Use polygon union for avoid zones. Done.
24. Stabilize avoid-zone union performance. Done.
25. Move avoid-zone union to worker. Done.
26. Add Rural Area Finder data status. Done.
27. Add Rural Area Finder processing status. Done.
28. Use canvas mask avoid-zone rendering. Done.
29. Add Rural Area Finder opacity control. Done.
30. Load buildings only when Rural Area Finder is enabled. Done.
31. Add collapsible workspace panel. Done.
32. Move loaded buildings visibility to Rural Area Finder. Done.
33. Decouple Rural Area Finder settings disclosure from the active toggle. Done.
34. Simplify Rural Area Finder setting labels. Done.
35. Approximate avoid zones from building perimeters. Done.
36. Make status indicator more useful. Done.
37. Make search box useful. Done.
38. Highlight selected saved place search result. Done.
39. Select saved place from workspace list. Done.
40. Add clear selected saved place action.

This list is the later implementation sequence now that the initial task briefs are complete.

This order can change if the repo docs are updated, but Copilot should not skip ahead without approval.

## Copilot rule

If Copilot is unsure what to do next, it should not start coding.

It should first produce a proposed next task brief and explain why that task is the next logical step.

## Current Next Task

The current next implementation task is:

```txt
039-add-clear-selected-saved-place-action.md
```

Copilot must start with Task 039 and keep it focused on adding a clear selected saved-place action.
