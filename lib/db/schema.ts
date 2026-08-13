import { integer, numeric, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 30 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
});

export const typingTests = pgTable('typing_tests', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  wpm: integer('wpm').notNull(),
  accuracy: numeric('accuracy', { precision: 5, scale: 2 }).notNull(),
  mode: varchar('mode', { length: 20 }).notNull(),
  timeTaken: integer('time_taken').notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type TypingTest = typeof typingTests.$inferSelect;
export type NewTypingTest = typeof typingTests.$inferInsert;