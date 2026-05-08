# Repository Guidelines

## Agent Workflow Preferences
- Do not ask for approval before normal file edits. Proceed directly with routine code and documentation changes.
- Ask only for dangerous, destructive, or permission-blocked actions.
- The main agent should act primarily as an orchestrator.
- When the user asks to do work, prefer dispatching the task to subagents so the main agent keeps context light and worker context stays fresh.
- Keep orchestration explicit: assign clear ownership and avoid overlapping edit scopes between subagents.
