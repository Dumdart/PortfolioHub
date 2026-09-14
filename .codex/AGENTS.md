# Repository Harness Guidance

This file applies to repository-local Codex skills and other harness material
under `.codex/`. These files guide agents; they are not application source.

## Skill maintenance

- Keep each skill narrowly triggered and task-oriented. Its description must
  state when it applies, while `SKILL.md` contains the workflow, invariants,
  stop conditions, and verification commands.
- Treat repository files as current truth. Skills must tell agents to inspect
  the live implementation and parent `AGENTS.md` files rather than rely on a
  frozen architecture snapshot.
- Put detailed, reusable contracts in `references/` and link them directly from
  `SKILL.md`. Read every referenced instruction file before acting.
- Prefer commands and paths that work from the repository root on Windows
  PowerShell. Never embed credentials, private personal data, machine-specific
  temporary paths, or unpublished job-material content.
- Make authorization boundaries explicit. A content-edit request does not
  imply permission to publish, delete assets, change the private workspace,
  stage, commit, push, or deploy.
- Keep agent metadata consistent with the skill name and purpose. Default
  prompts should explicitly invoke the skill and describe the supported task.

## Validation

- Re-read the edited skill and every linked reference as one workflow. Check
  that triggers are neither so broad that they hijack unrelated work nor so
  narrow that obvious requests miss the skill.
- Verify every referenced repository path and command against the current tree.
- Review the final guidance-only diff and run `git diff --check`. Run
  application tests only when harness changes alter generated or executable
  behavior.
