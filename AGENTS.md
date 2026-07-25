# Agent Instructions for This Repository

This repository is a Next.js application for a link shortener with Clerk authentication, Drizzle ORM, TypeScript, and Tailwind-based UI components.

## Primary Expectations

- Follow the existing architecture and conventions instead of introducing unrelated patterns.
- Keep edits small, targeted, and easy to review.
- Prefer clear, maintainable TypeScript over clever abstractions.
- Preserve existing behavior unless the task explicitly requires a change.
- Do not add dependencies or large refactors without a clear reason.

## Project Conventions

- Use the App Router structure under app/ for pages, layouts, and route-level logic.
- Default to server components; only use client components when interactivity is required.
- Keep UI primitives in components/ui and reuse existing patterns before creating new ones.
- Use the @/ import alias for workspace-relative imports.
- Favor Tailwind utility classes for styling and avoid introducing ad-hoc CSS when a Tailwind-based solution already fits.
- Keep components focused and composable rather than tightly coupling unrelated UI.
- Never create or use middleware.ts for this project; this approach is deprecated in the Next.js version used here, and the supported pattern is to use proxy.ts for Clerk middleware configuration.

## TypeScript and Code Quality

- Write strict, typed TypeScript and avoid any when possible.
- Prefer descriptive names for functions, variables, and components.
- Keep functions small and readable; extract repeated logic when it improves clarity.
- Maintain accessibility by using semantic HTML and meaningful labels for interactive elements.
- Avoid silent failures; surface errors clearly when user actions or data operations fail.

## Data and Backend Rules

- Keep database schema changes in db/schema.ts and align them with Drizzle conventions.
- Prefer existing patterns in lib/ and db/ over creating parallel utilities.
- Handle authentication and user context through the existing Clerk integration rather than introducing custom auth logic.
- Keep secrets and sensitive configuration out of source files; use environment variables and existing project conventions.

## Workflow for Changes

1. Read the relevant files before editing, especially nearby components, route files, and shared utilities.
2. Match the local style and structure instead of introducing a new pattern.
3. Make the smallest change that satisfies the task.
4. Verify the result with linting or build checks before declaring the work complete.
5. If a task requires a broader refactor, explain the scope and rationale clearly.
