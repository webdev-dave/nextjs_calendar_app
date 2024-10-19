
import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("createdAt").notNull().defaultNow();
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const EventTable = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  durationInMinutes: integer("durationInMinutes").notNull(),
  clerkUserId: text("clerkUserId").notNull(),
  isActive: boolean("isActive").notNull().default(true),
  createdAt,
  updatedAt,
}, table => ({
    clerkUserIdIndex: index("clerkUserId").on(table.clerkUserId),
}));

export const scheduleTable = pgTable("schedules", {

});