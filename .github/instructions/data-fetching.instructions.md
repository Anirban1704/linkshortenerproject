---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Guidelines
This document provides guidelines for fetching data in the project. It covers best practices, recommended libraries, and examples of how to fetch data efficiently.

## 1. Use server components for data fetching
ALWAYS use server components for data fetching. NEVER use client components for data fetching.

### 2. Data Fetching methods
ALWAYS use helper function in the /data directory for data fetching. NEVER use fetch data directly in the component.

ALL helper function in the /data directory should use Drizzle ORM for database interaction.


