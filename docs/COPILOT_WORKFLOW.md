# Copilot Workflow

## Goal

Copilot should act like a careful project assistant, not a feature generator that freely rewrites the app.

## Source of truth

The repo docs are the source of truth.

For task progress, `docs/tasks/README.md` is the live task ledger. Do not duplicate the current next task in this workflow doc.

Before implementing a change, Copilot should read the relevant docs:

- `docs/PRODUCT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/COPILOT_WORKFLOW.md`
- `.github/copilot-instructions.md`

## Workflow

1. Read the relevant repo docs.
2. Identify the next small task.
3. Write or follow a GitHub issue-style task brief.
4. Wait for review or approval if needed.
5. Implement only the approved task.
6. Test the change.
7. Update docs if the implementation changes the plan.
8. Suggest the next small task only after the current task is complete.

## Copilot should

- Keep issues small.
- Follow `.github/copilot-instructions.md`.
- Avoid large rewrites.
- Avoid out-of-scope MVP features.
- Prefer beginner-readable code.
- Update docs when decisions or structure change.
- Explain what changed after each implementation.
- Explain how to test each implementation.

## Copilot should not

- Build accounts early.
- Build login early.
- Build cloud sync early.
- Build photos early.
- Build tags early.
- Build social features early.
- Build advanced drawing tools early.
- Rewrite architecture without approval.
- Add libraries without explaining why.
- Skip ahead to Overpass before mock data works.

## Expected response after each implementation

After implementing a task, Copilot should summarise:

1. What changed.
2. Which files changed.
3. How to test it.
4. Whether docs were updated.
5. What the next small task should be.

## Continuing after existing task briefs are complete

When all existing task briefs in `docs/tasks/` are complete, Copilot should not freely invent the next feature.

Instead, Copilot should:

1. Re-read the repo docs.
2. Review the current codebase.
3. Compare the codebase against `docs/ROADMAP.md`.
4. Identify the next smallest logical task.
5. Write a new numbered task brief in `docs/tasks/`.
6. Wait for approval before implementing it.
7. Create or follow a matching GitHub issue.
8. Implement only that approved task.

The next task should be chosen from the roadmap and architecture boundaries, not from guesswork.

If the next step is unclear, Copilot should ask for a decision instead of coding.

## Current Starting Point

Read `docs/tasks/README.md` for the current completed-task summary and next task.

The later task sequence applies one task at a time.
