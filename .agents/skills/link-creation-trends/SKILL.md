---
name: link-creation-trends
description: Use this skill whenever the user wants a monthly bar chart of link creation activity from the project's database over the past 12 months. Trigger it for requests such as "plot links created each month", "show monthly link creation", "export a PNG chart from the database", or any request to analyze link-creation trends using the DATABASE_URL from the repo's .env file.
---

# Link creation trend charting

Use this skill when the user wants a chart that shows how many links were created each month over the last 12 months.

## What to do

1. Look for the repository root and load the project's .env file.
2. Read the DATABASE_URL value from .env.
3. Connect to the database and query the short_links table for link creation counts by month.
4. Build a monthly bar chart for the last 12 months, including months with zero results.
5. Export the chart as a PNG file and return the saved path.

## Data source

- Table: short_links
- Relevant column: created_at
- Use the DATABASE_URL from the repository's .env file unless the user explicitly asks for a different database.

## Script to use

Use the bundled Python script at scripts/plot_link_creation_trends.py.

- Default output path: link_creation_trends.png
- Override the output path with --output if the user requests a different filename or directory.
- The script should be run from the repository root so it can discover .env automatically.

## Expected output

- A PNG file containing a bar chart
- X-axis: month labels for the last 12 months
- Y-axis: total links created in each month
- A brief summary of the busiest month and the overall trend when helpful
