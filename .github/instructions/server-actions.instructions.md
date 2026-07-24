---
name: server-actions
description: Read this file before implementing or changing server actions, form submissions, or write-side data mutations in this app.
---

# Server Actions and Data Mutations

Follow these rules whenever adding or changing data mutations in this app.

- Implement all data mutations through server actions.
- Call server actions only from client components.
- Place each server action in an actions.ts file colocated with the component that invokes it.
- Define strongly typed inputs and outputs in TypeScript; do not use FormData as the mutation payload type.
- Validate all incoming data inside the server action with zod before any database work.
- Check that the current user is authenticated before any database operation.
- Server actions should not throw errors; instead, return an object with either an error or success property.
- Keep database writes inside helper functions in the /data directory; do not perform direct Drizzle queries inside server actions.
