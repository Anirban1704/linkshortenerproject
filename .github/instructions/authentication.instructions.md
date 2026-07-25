---
description: Read this file before implemeting or modifying authentication logic in the project.
---

# Authentication and Access Rules

This project uses Clerk for all authentication and user management. Do not introduce other authentication providers, custom session logic, or manual auth flows.

## Required Rules

- Use Clerk for sign in, sign up, sign out, and user state.
- Do not add alternative auth methods such as NextAuth, Supabase Auth, or custom JWT-based auth.
- The /dashboard route is protected and must require an authenticated user.
- If an authenticated user visits the homepage, redirect them to /dashboard.
- Sign in and sign up should launch as Clerk modal experiences rather than full-page redirects.

## Implementation Guidance

- Keep auth-related logic aligned with the existing Clerk integration.
- Prefer the current app patterns over introducing parallel auth utilities.
- Surface auth failures clearly and preserve the existing user experience.
