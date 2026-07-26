# Link Shortener Project

A lightweight URL shortening application built with Next.js, Clerk authentication, Drizzle ORM, and Tailwind CSS.

This repository is the `main` branch and follows the generic agent documentation convention using `AGENTS.md`.
Branch-specific GitHub Copilot instructions are kept in `.github/agents/` on dedicated branches.

## What it does

- Shortens long URLs into compact shareable links
- Provides an authenticated dashboard for link management
- Supports creating, editing, and deleting links
- Uses Clerk for user authentication
- Stores link metadata with Drizzle ORM

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:3000
```

## Project structure

- `app/` — Next.js App Router pages, layouts, and route actions
- `components/` — shared UI components and reusable primitives
- `db/` — Drizzle schema and database configuration
- `lib/` — application utilities and helpers
- `.github/agents/` — branch-specific GitHub Copilot instructions
- `AGENTS.md` — generic agent instructions for the main branch

## Notes

- This `main` branch is intended for generic LLM documentation with `AGENTS.md`.
- Copilot-specific branch instructions should remain separate in `.github/agents/`.
- The README is focused on project features and public presentation.
