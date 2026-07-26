# Link Shortener Project

A lightweight URL shortening application built with Next.js, Clerk authentication, Drizzle ORM, and Tailwind CSS.

> **Branch note:** This branch is configured for GitHub Copilot and uses branch-local agent instructions under `.github/agents/`.
> The `main` branch is intended for generic LLM documentation and follows the repository-level `AGENTS.md` convention.

## What it does

- Shorten long URLs into compact links
- Manage links from a dashboard
- Track usage and allow authenticated users to create, edit, and delete links
- Use Clerk for user authentication
- Store link data in a Drizzle ORM-backed database

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:3000
```

## Project structure

- `app/` — Next.js App Router pages, layouts, and route actions
- `components/` — shared UI components and primitives
- `db/` — Drizzle schema and database setup
- `lib/` — utility functions used across the app
- `.github/agents/` — branch-specific GitHub Copilot agent instructions
- `AGENTS.md` — repository-level generic agent documentation for the main branch

## Branch conventions

- This branch uses `.github/agents/` for Copilot-specific instructions.
- `main` uses `AGENTS.md` for broader LLM compatibility.

## Notes

- Keep branch-specific GitHub Copilot instructions separate from the generic `AGENTS.md` documentation.
- Remove unrelated template content when preparing public-facing repository docs.
