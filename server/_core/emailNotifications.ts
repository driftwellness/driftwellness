import { invokeLLM } from "./llm";
import { getDb } from "../db";
import { emailLogs, notifications } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export type EmailTemplate = 
  | "welcome" 
  | "trial_ending" 
  | "subscription_confirmation" 
  | "subscription_renewal"
  | "new_feature"
  | "general";

interface EmailContent {
  subject: string;
  htmlBody: string;
  textBody: string;
}

/**
 * Generate email content using LLM
 */
async function generateEmailContent(
  template: EmailTemplate,
  userName: string,
  context?: Record<string, any>
): Promise<EmailContent> {
  const prompts: Record<EmailTemplate, string> = {
    welcome: `Generate a professional welcome email for a new Drift wellness app user named ${userName}. Include: warm greeting, app features overview, getting started tips, and encouragement. Keep it friendly but professional.`,
    
    trial_ending: `Generate a professional email for ${userName} whose 7-day free trial is ending in 2 days. Emphasize the benefits they've experienced, special offer to continue, and easy upgrade path. Be persuasive but not pushy.`,
    
    subscription_confirmation: `Generate a professional subscription confirmation email for ${userName} who just subscribed to Drift Premium. Include: subscription details, access to features, support contact, and welcome to premium community.`,
    
    subscription_renewal: `Generate a professional subscription renewal confirmation email for ${userName}. Thank them for their continued membership, highlight recent features added, and provide support information.`,
    
    new_feature: `Generate an exciting announcement email for ${userName} about a new Drift feature: ${context?.featureName || "New Wellness Feature"}. Explain the feature, how to use it, and why it's beneficial.`,
    
    general: `Generate a professional email for ${userName} with the following message: ${context?.message || "Important update"}. Keep it clear and actionable.`,
  };

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are a professional email copywriter for a wellness app. Generate emails that are warm, professional, and engaging.",
      },
      {
        role: "user",
        content: prompts[template],
      },
    ],
  });

  const content = response.choices[0].message.content as string;
  
  // Extract subject and body (assume first line is subject)
  const lines = content.split("\n");
  const subject = lines[0].replace(/^Subject:\s*/i, "").trim();
  const htmlBody = lines.slice(1).join("\n").trim();

  return {
    subject,
    htmlBody,
    textBody: htmlBody.replace(/<[^>]*>/g, ""), // Strip HTML tags for text version
  };
}

/**
 * Send email and log it
 */
export async function sendEmailNotification(
  userId: number,
  userEmail: string,
  userName: string,
  template: EmailTemplate,
  context?: Record<string, any>
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = await getDb();
    if (!db) {
      return { success: false, error: "Database not available" };
    }

    // Generate email content
    const emailContent = await generateEmailContent(template, userName, context);

    // TODO: Integrate with actual email service (SendGrid, Resend, etc.)
    // For now, we'll just log it
    console.log(`[EMAIL] Sending ${template} to ${userEmail}`, emailContent);

    // Log the email
    await db.insert(emailLogs).values({
      userId,
      recipientEmail: userEmail,
      subject: emailContent.subject,
      template,
      status: "sent", // In production, update after actual send
    });

    // Create in-app notification
    await db.insert(notifications).values({
      userId,
      title: emailContent.subject,
      message: emailContent.textBody.substring(0, 200),
      type: template as any,
      read: 0,
    });

    return { success: true };
  } catch (error) {
    console.error("[EMAIL ERROR]", error);
    
    const db = await getDb();
    if (db) {
      await db.insert(emailLogs).values({
        userId,
        recipientEmail: userEmail,
        subject: template,
        template,
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      });
    }

    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to send email" 
    };
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(
  userId: number,
  userEmail: string,
  userName: string
): Promise<{ success: boolean; error?: string }> {
  return sendEmailNotification(userId, userEmail, userName, "welcome");
}

/**
 * Send trial ending reminder
 */
export async function sendTrialEndingReminder(
  userId: number,
  userEmail: string,
  userName: string
): Promise<{ success: boolean; error?: string }> {
  return sendEmailNotification(userId, userEmail, userName, "trial_ending");
}

/**
 * Send subscription confirmation
 */
export async function sendSubscriptionConfirmation(
  userId: number,
  userEmail: string,
  userName: string
): Promise<{ success: boolean; error?: string }> {
  return sendEmailNotification(userId, userEmail, userName, "subscription_confirmation");
}

/**
 * Get user notifications
 */
export async function getUserNotifications(userId: number, limit = 10) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy((t) => t.createdAt)
    .limit(limit);
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: number) {
  const db = await getDb();
  if (!db) return false;

  await db
    .update(notifications)
    .set({ read: 1 })
    .where(eq(notifications.id, notificationId));

  return true;
}
