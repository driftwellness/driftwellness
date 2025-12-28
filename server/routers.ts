import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getUserNotifications, markNotificationAsRead } from "./_core/emailNotifications";
import { getDb } from "./db";
import { users, subscriptions } from "../drizzle/schema";
import { eq, and, gte } from "drizzle-orm";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  notifications: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserNotifications(ctx.user.id, 20);
    }),
  }),

  admin: router({
    users: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const db = await getDb();
      if (!db) return [];
      return db.select().from(users).limit(100);
    }),
    analytics: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const db = await getDb();
      if (!db) return {
        totalUsers: 0,
        totalSubscribers: 0,
        activeSubscriptions: 0,
        cancelledSubscriptions: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        standardUsers: 0,
        premiumUsers: 0,
        impactUsers: 0,
        churnRate: 0,
        conversionRate: 0,
        averageRevenuePerUser: 0,
      };

      const allUsers = await db.select().from(users);
      const allSubscriptions = await db.select().from(subscriptions);
      
      const totalUsers = allUsers.length;
      const activeSubscriptions = allSubscriptions.filter(s => s.status === 'active').length;
      const cancelledSubscriptions = allSubscriptions.filter(s => s.status === 'canceled').length;
      
      // Estimate revenue based on price IDs
      const priceMap: Record<string, number> = {
        'req_oVa0P4RQRFd9la': 0,      // Standard (free)
        'req_M6MWuNq2YYWSVQ': 29900,  // Premium (299 NOK)
        'req_wVuVfy6PQ32LaR': 34900,  // Impact (349 NOK)
      };
      
      const totalRevenue = allSubscriptions.reduce((sum, s) => {
        const amount = priceMap[s.stripePriceId] || 0;
        return sum + amount;
      }, 0);
      
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthlyRevenue = allSubscriptions
        .filter(s => s.createdAt && new Date(s.createdAt) >= monthStart)
        .reduce((sum, s) => {
          const amount = priceMap[s.stripePriceId] || 0;
          return sum + amount;
        }, 0);
      
      const standardUsers = allSubscriptions.filter(s => s.stripePriceId === 'req_oVa0P4RQRFd9la' && s.status === 'active').length;
      const premiumUsers = allSubscriptions.filter(s => s.stripePriceId === 'req_M6MWuNq2YYWSVQ' && s.status === 'active').length;
      const impactUsers = allSubscriptions.filter(s => s.stripePriceId === 'req_wVuVfy6PQ32LaR' && s.status === 'active').length;
      
      const totalSubscribers = activeSubscriptions;
      const conversionRate = totalUsers > 0 ? Math.round((totalSubscribers / totalUsers) * 100) : 0;
      const churnRate = allSubscriptions.length > 0 ? Math.round((cancelledSubscriptions / allSubscriptions.length) * 100) : 0;
      const averageRevenuePerUser = totalSubscribers > 0 ? Math.round(totalRevenue / totalSubscribers / 100) : 0;

      return {
        totalUsers,
        totalSubscribers,
        activeSubscriptions,
        cancelledSubscriptions,
        totalRevenue: Math.round(totalRevenue / 100),
        monthlyRevenue: Math.round(monthlyRevenue / 100),
        standardUsers,
        premiumUsers,
        impactUsers,
        churnRate,
        conversionRate,
        averageRevenuePerUser,
      };
    }),
  }),
});

// REST endpoint for analytics (for fetch calls)
import type { Express } from 'express';

export async function setupAnalyticsEndpoint(app: Express) {
  app.get('/api/analytics/metrics', async (req, res) => {
    try {
      // Check if user is authenticated and is admin
      const userId = (req as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const db = await getDb();
      if (!db) {
        return res.json({
          totalUsers: 0,
          totalSubscribers: 0,
          activeSubscriptions: 0,
          cancelledSubscriptions: 0,
          totalRevenue: 0,
          monthlyRevenue: 0,
          standardUsers: 0,
          premiumUsers: 0,
          impactUsers: 0,
          churnRate: 0,
          conversionRate: 0,
          averageRevenuePerUser: 0,
        });
      }

      const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      if (!user.length || user[0].role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const allUsers = await db.select().from(users);
      const allSubscriptions = await db.select().from(subscriptions);
      
      const totalUsers = allUsers.length;
      const activeSubscriptions = allSubscriptions.filter(s => s.status === 'active').length;
      const cancelledSubscriptions = allSubscriptions.filter(s => s.status === 'canceled').length;
      
      // Estimate revenue based on price IDs
      const priceMap: Record<string, number> = {
        'req_oVa0P4RQRFd9la': 0,      // Standard (free)
        'req_M6MWuNq2YYWSVQ': 29900,  // Premium (299 NOK)
        'req_wVuVfy6PQ32LaR': 34900,  // Impact (349 NOK)
      };
      
      const totalRevenue = allSubscriptions.reduce((sum, s) => {
        const amount = priceMap[s.stripePriceId] || 0;
        return sum + amount;
      }, 0);
      
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthlyRevenue = allSubscriptions
        .filter(s => s.createdAt && new Date(s.createdAt) >= monthStart)
        .reduce((sum, s) => {
          const amount = priceMap[s.stripePriceId] || 0;
          return sum + amount;
        }, 0);
      
      const standardUsers = allSubscriptions.filter(s => s.stripePriceId === 'req_oVa0P4RQRFd9la' && s.status === 'active').length;
      const premiumUsers = allSubscriptions.filter(s => s.stripePriceId === 'req_M6MWuNq2YYWSVQ' && s.status === 'active').length;
      const impactUsers = allSubscriptions.filter(s => s.stripePriceId === 'req_wVuVfy6PQ32LaR' && s.status === 'active').length;
      
      const totalSubscribers = activeSubscriptions;
      const conversionRate = totalUsers > 0 ? Math.round((totalSubscribers / totalUsers) * 100) : 0;
      const churnRate = allSubscriptions.length > 0 ? Math.round((cancelledSubscriptions / allSubscriptions.length) * 100) : 0;
      const averageRevenuePerUser = totalSubscribers > 0 ? Math.round(totalRevenue / totalSubscribers / 100) : 0;

      res.json({
        totalUsers,
        totalSubscribers,
        activeSubscriptions,
        cancelledSubscriptions,
        totalRevenue: Math.round(totalRevenue / 100),
        monthlyRevenue: Math.round(monthlyRevenue / 100),
        standardUsers,
        premiumUsers,
        impactUsers,
        churnRate,
        conversionRate,
        averageRevenuePerUser,
      });
    } catch (error) {
      console.error('Analytics endpoint error:', error);
      res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  });
}

export type AppRouter = typeof appRouter;
