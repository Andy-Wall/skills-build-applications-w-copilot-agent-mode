---
applyTo: "**"
---
# GitHub Copilot Planning Mode Instructions

## Purpose
Planning mode helps teams break down complex tasks into actionable steps, track progress, and ensure visibility throughout the coding session.

## Workflow
1. **Start Planning Mode:**
   - Create or update a todo list in the repo (e.g., `.github/todo.md` or use the Copilot todo tool).
   - Break down large tasks into smaller, actionable items.
2. **Track Progress:**
   - Mark one todo as `in-progress` before starting work.
   - Complete the work for that specific todo.
   - Mark the todo as `completed` immediately after finishing.
   - Move to the next todo and repeat.
3. **Visibility:**
   - Keep the todo list up to date for all contributors.
   - Use clear, concise titles and detailed descriptions for each todo item.

## Todo List Format
- Each todo should have:
  - A unique ID (sequential numbers)
  - Title (3-7 words)
  - Status (`not-started`, `in-progress`, `completed`)
  - Description (detailed context, requirements, or implementation notes)

## Example Todo List
```yaml
- id: 1
  title: Setup Django backend
  status: not-started
  description: Initialize Django project, configure settings, and create initial models.
- id: 2
  title: Implement REST API
  status: not-started
  description: Create API endpoints for users, teams, and activities.
```

## Best Practices
- Always plan before starting work on any complex task.
- Update the todo list frequently to reflect current progress.
- Mark todos completed as soon as they are done.
- Use the todo list for team visibility and coordination.

## Related Files
- `.github/instructions/copilot_planning_mode.instructions.md` (this file)
- `.github/todo.md` or similar for tracking todos
- Project documentation referencing Planning mode

## Usage
- Reference this file in your README and contributor guides.
- Use the todo list as the source of truth for planning and progress tracking.
