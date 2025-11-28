import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  
  // AI Coach preference
  preferredCoach: mysqlEnum("preferredCoach", ["maria", "zane"]).default("maria"),
  
  // Stripe integration
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).unique(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Subscriptions table
 * Tracks user subscription status - stores ONLY Stripe IDs, fetch details from Stripe API
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  
  // Stripe references - the ONLY fields we store
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }).notNull().unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull(),
  stripePriceId: varchar("stripePriceId", { length: 255 }).notNull(),
  
  // Cached status for performance (updated via webhooks)
  // Possible values: 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid'
  status: varchar("status", { length: 50 }).notNull(),
  
  // Timestamps
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Journal entries table
 * Private user journal for thoughts, dreams, and reflections
 */
export const journalEntries = mysqlTable("journal_entries", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  
  title: varchar("title", { length: 255 }),
  content: text("content").notNull(),
  mood: varchar("mood", { length: 50 }), // e.g., "calm", "anxious", "happy", "sad"
  tags: text("tags"), // JSON array of tags
  
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
});

export type JournalEntry = typeof journalEntries.$inferSelect;
export type InsertJournalEntry = typeof journalEntries.$inferInsert;

/**
 * Products table
 * Physical wellness products for e-commerce shop
 */
export const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // "candles", "oils", "yoga", "jewelry", "clothing"
  subcategory: varchar("subcategory", { length: 100 }), // "tops", "pants", "kimonos", etc.
  
  price: int("price").notNull(), // Price in øre/cents (e.g., 29900 = 299 kr)
  currency: varchar("currency", { length: 3 }).notNull().default("NOK"),
  
  imageUrl: varchar("imageUrl", { length: 500 }).notNull(),
  images: text("images"), // JSON array of additional image URLs
  
  inStock: int("inStock").notNull().default(1),
  featured: int("featured").notNull().default(0), // Boolean: 1 = featured, 0 = not featured
  
  // Product attributes (JSON for flexibility)
  attributes: text("attributes"), // e.g., {"color": "burgundy", "size": "M", "scent": "lavender"}
  
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Shopping cart items table
 * Temporary storage for items before checkout
 */
export const cartItems = mysqlTable("cart_items", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: int("productId").notNull().references(() => products.id, { onDelete: "cascade" }),
  
  quantity: int("quantity").notNull().default(1),
  
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

/**
 * Orders table
 * Completed purchases
 */
export const orders = mysqlTable("orders", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  
  // Stripe payment reference
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }).notNull().unique(),
  
  totalAmount: int("totalAmount").notNull(), // Total in øre/cents
  currency: varchar("currency", { length: 3 }).notNull().default("NOK"),
  
  status: varchar("status", { length: 50 }).notNull(), // "pending", "paid", "shipped", "delivered", "cancelled"
  
  // Shipping details (JSON)
  shippingAddress: text("shippingAddress").notNull(),
  
  // Order items (JSON array)
  items: text("items").notNull(), // [{productId, name, price, quantity, imageUrl}]
  
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
