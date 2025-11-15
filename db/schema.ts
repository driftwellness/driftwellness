import { pgTable, text, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Users table (extended from auth)
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  openId: text("open_id").notNull().unique(),
  name: text("name"),
  email: text("email"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  
  // Gamification fields
  xp: integer("xp").default(0).notNull(),
  level: integer("level").default(1).notNull(),
  currentStreak: integer("current_streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  lastActivityDate: timestamp("last_activity_date"),
  
  // Membership
  membershipTier: varchar("membership_tier", { length: 50 }).default("free").notNull(), // free, drift_plus
  membershipExpiresAt: timestamp("membership_expires_at"),
  
  // Shipping info for prizes
  shippingName: text("shipping_name"),
  shippingAddress: text("shipping_address"),
  shippingCity: text("shipping_city"),
  shippingPostalCode: text("shipping_postal_code"),
  shippingCountry: text("shipping_country"),
});

// Audiobook chapters
export const audiobookChapters = pgTable("audiobook_chapters", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  chapterNumber: integer("chapter_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  audioUrl: text("audio_url").notNull(),
  duration: integer("duration").notNull(), // in seconds
  transcript: text("transcript"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User audiobook progress
export const audiobookProgress = pgTable("audiobook_progress", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  chapterId: integer("chapter_id").notNull().references(() => audiobookChapters.id),
  completed: boolean("completed").default(false).notNull(),
  currentPosition: integer("current_position").default(0).notNull(), // in seconds
  lastListenedAt: timestamp("last_listened_at").defaultNow().notNull(),
});

// Journal entries
export const journalEntries = pgTable("journal_entries", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title"),
  content: text("content").notNull(),
  entryType: varchar("entry_type", { length: 50 }).default("general").notNull(), // general, dream, gratitude
  mood: integer("mood"), // 1-5 scale
  aiAnalysis: jsonb("ai_analysis"), // AI-generated insights
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Advent calendar
export const adventCalendar = pgTable("advent_calendar", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  day: integer("day").notNull().unique(), // 1-24
  title: text("title").notNull(),
  description: text("description"),
  contentType: varchar("content_type", { length: 50 }).notNull(), // meditation, exercise, quote, etc.
  contentData: jsonb("content_data").notNull(), // flexible content storage
  unlockDate: timestamp("unlock_date").notNull(),
});

// User advent calendar progress
export const adventProgress = pgTable("advent_progress", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  day: integer("day").notNull(),
  opened: boolean("opened").default(false).notNull(),
  openedAt: timestamp("opened_at"),
});

// Gamification achievements/badges
export const achievements = pgTable("achievements", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  iconUrl: text("icon_url"),
  xpReward: integer("xp_reward").default(0).notNull(),
  requiredLevel: integer("required_level"),
});

// User achievements
export const userAchievements = pgTable("user_achievements", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});

// Activity log for XP tracking
export const activityLog = pgTable("activity_log", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  activityType: varchar("activity_type", { length: 100 }).notNull(), // listened_chapter, wrote_journal, etc.
  xpEarned: integer("xp_earned").notNull(),
  metadata: jsonb("metadata"), // additional activity data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Prize draw entries (for advent calendar and level milestones)
export const prizeEntries = pgTable("prize_entries", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  prizeType: varchar("prize_type", { length: 100 }).notNull(), // advent_grand, level_14, etc.
  enteredAt: timestamp("entered_at").defaultNow().notNull(),
  won: boolean("won").default(false).notNull(),
  claimedAt: timestamp("claimed_at"),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertAudiobookChapterSchema = createInsertSchema(audiobookChapters);
export const selectAudiobookChapterSchema = createSelectSchema(audiobookChapters);

export const insertJournalEntrySchema = createInsertSchema(journalEntries);
export const selectJournalEntrySchema = createSelectSchema(journalEntries);

export const insertAdventCalendarSchema = createInsertSchema(adventCalendar);
export const selectAdventCalendarSchema = createSelectSchema(adventCalendar);
