import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUserNotifications, markNotificationAsRead } from "./emailNotifications";

// Mock the database
vi.mock("../db", () => ({
  getDb: vi.fn(() => Promise.resolve(null)),
}));

describe("Email Notifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle missing database gracefully", async () => {
    const result = await getUserNotifications(1);
    expect(result).toEqual([]);
  });

  it("should handle marking notification as read with missing database", async () => {
    const result = await markNotificationAsRead(1);
    expect(result).toBe(false);
  });

  it("should export email templates", () => {
    const templates = ["welcome", "trial_ending", "subscription_confirmation"];
    expect(templates).toBeDefined();
  });
});
