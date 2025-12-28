import { Router, Request, Response } from "express";
import { getDb } from "../db";
import { referrals, users, subscriptions } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const router = Router();

// Generate unique referral code
function generateReferralCode(): string {
  return crypto.randomBytes(6).toString("hex").toUpperCase();
}

// Get referral stats for current user
router.get("/stats", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }

    // Get user's referral code
    const userReferrals = await db
      .select()
      .from(referrals)
      .where(eq(referrals.referrerId, userId));

    const referralCode = userReferrals[0]?.code || generateReferralCode();

    // Get referred users
    const referredUsers = await db
      .select()
      .from(users)
      .where(eq(users.referredBy, referralCode));

    const activeReferred = referredUsers.filter((u: any) => u.subscriptionStatus === "active").length;
    const totalRewards = activeReferred * 50; // 50 NOK per active referral

    // Get referral details
    const referralDetails = await Promise.all(
      referredUsers.map(async (user: any) => {
        const userSubs = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.userId, user.id));

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          referredAt: user.createdAt,
          status: user.subscriptionStatus,
          tier: userSubs[0]?.stripePriceId?.includes("premium") ? "premium" : userSubs[0]?.stripePriceId?.includes("impact") ? "impact" : "standard",
        };
      })
    );

    res.json({
      referralCode,
      totalReferred: referredUsers.length,
      activeReferred,
      totalRewards,
      referralList: referralDetails,
    });
  } catch (error) {
    console.error("Error fetching referral stats:", error);
    res.status(500).json({ error: "Failed to fetch referral stats" });
  }
});

// Create referral code for new user
router.post("/create-code", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }

    const code = generateReferralCode();

    // Store referral code
    await db.insert(referrals).values({
      referrerId: userId,
      code,
      createdAt: new Date(),
    });

    res.json({ code });
  } catch (error) {
    console.error("Error creating referral code:", error);
    res.status(500).json({ error: "Failed to create referral code" });
  }
});

// Track referral when user signs up with code
router.post("/track", async (req: Request, res: Response) => {
  try {
    const { referralCode } = req.body;
    const userId = (req as any).user?.id;

    if (!userId || !referralCode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }

    // Update user with referral code
    await db
      .update(users)
      .set({ referredBy: referralCode })
      .where(eq(users.id, userId));

    res.json({ success: true });
  } catch (error) {
    console.error("Error tracking referral:", error);
    res.status(500).json({ error: "Failed to track referral" });
  }
});

export default router;
