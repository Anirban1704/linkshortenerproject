import {
  pgTable,
  text,
  timestamp,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const shortLinks = pgTable(
  "short_links",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    clerkUserId: text("clerk_user_id").notNull(),
    shortCode: text("short_code").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    shortCodeUniqueIndex: uniqueIndex("short_links_short_code_unique").on(
      table.shortCode,
    ),
  }),
);
