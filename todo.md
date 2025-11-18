# Drift Wellness App - TODO

## Phase 1: Core Infrastructure
- [x] Initialize project with database and authentication
- [x] Set up database schema
- [x] Design main app layout and navigation
- [x] Implement Drift branding (colors, logo, typography)
- [x] Create landing/home page with ocean video background

## Phase 2: Audiobook Player
- [ ] Design audiobook player UI
- [ ] Implement audio playback controls
- [ ] Create chapter navigation
- [ ] Add progress tracking
- [ ] Implement background audio support

## Phase 3: Journal & AI Features
- [ ] Create journal/diary interface
- [ ] Implement local storage for privacy
- [ ] Add AI daily check-in feature
- [ ] Build dream analysis AI integration
- [ ] Add search and filtering for journal entries

## Phase 4: Advent Calendar
- [ ] Design advent calendar UI
- [ ] Implement daily unlock system (Dec 1-31)
- [ ] Create prize draw system
- [ ] Add daily wellness content (meditations, exercises, quotes)
- [ ] Build winner notification system

## Phase 5: Soundscapes & Music
- [ ] Build real-time soundscape mixer (rain, wind, birds, waves)
- [ ] Implement interactive sliders for sound control
- [ ] Create sleep music library
- [ ] Add baby/children sleep sounds section
- [ ] Implement audio mixing engine

## Phase 6: Unique AI Features
- [ ] Implement pulse measurement with camera
- [ ] Build biofeedback visualization
- [ ] Create AI chatbot ("listening friend")
- [ ] Add personalized content recommendations

## Phase 7: Membership & E-commerce
- [ ] Design membership tiers (Free vs Drift+)
- [ ] Implement payment system (150 kr/month)
- [ ] Create single audiobook purchase option (199 kr)
- [ ] Integrate with Shopify store
- [ ] Design welcome package flow

## Phase 8: Testing & Polish
- [ ] Test all features on mobile
- [ ] Optimize performance
- [ ] Add loading states and error handling
- [ ] Implement PWA features (installable)
- [ ] Test payment flows
- [ ] Final QA and bug fixes

## Phase 9: Deployment
- [ ] Prepare for App Store submission
- [ ] Prepare for Google Play submission
- [ ] Set up custom domain
- [ ] Configure analytics
- [ ] Launch!

## Design Changes
- [x] Update theme to lighter, ocean-blue aesthetic (more daylight, less dark)
- [x] Adjust colors for calmer, more serene feel

## New Feature Requests
- [x] Add ocean wave video background to hero section
- [ ] Implement gamification/level system with XP for activities
- [ ] Create milestone rewards (Level 5, 10, 14, 20, 30)
- [ ] Build progress tracking and badge system
- [ ] Add address collection for physical gift delivery at Level 14
- [ ] Create "Level Up!" animation and notifications
- [ ] Design user profile page showing level and progress

## Design Adjustments
- [x] Increase ocean wave video visibility (make it more prominent)

## Audiobook Voice Production
- [x] Generate Chapter 1 audio with deep, calm male AI voice
- [x] Generate Chapter 2 audio with deep, calm male AI voice
- [x] Generate Chapter 3 audio with deep, calm male AI voice
- [x] Generate Chapter 4 audio with deep, calm male AI voice
- [x] Generate Chapter 5 audio with deep, calm male AI voice

## CURRENT PRIORITY: Complete all app features before marketing
User wants to see fully functional app before moving to marketing phase.

Focus areas:
1. Complete audiobook player with all 5 chapters
2. Build gamification system (XP, levels, badges, prizes)
3. Implement journal with AI dream analysis
4. Create advent calendar with 24 doors
5. Build real-time soundscape mixer
6. Add sleep music library
7. Implement AI personalization (daily check-in)
8. Set up membership system with Shopify integration

## Audiobook Player Enhancements
- [x] Add playback speed control (0.5x, 0.75x, 1x, 1.25x, 1.5x)

## MAJOR REDESIGN: Victorian Luxury Spa Theme
- [x] Replace cold Nordic ocean theme with warm Victorian luxury spa aesthetic
- [x] Update color palette: burgundy, gold, peach/pink, warm beige, mahogany
- [x] Replace ocean wave video with warm sunset/sunrise background image
- [x] Add Victorian ornamental details and elegant typography (Cormorant Garamond + Montserrat)
- [x] Implement gold accent colors throughout design
- [x] Update all pages with new warm, spa-like atmosphere
- [x] Ensure design appeals to global audience (not just Nordic)
- [x] Maintain all existing functionality while updating visual design

## Interactive Video Preview Popups
- [ ] Generate evening stretch/yoga sunset wellness scene images
- [ ] Create elegant popup modal component with video/image preview
- [ ] Add popup triggers to feature cards on homepage
- [ ] Design popup with aspirational yet relatable aesthetic
- [ ] Include call-to-action buttons in popups
- [ ] Test popup functionality and user flow

## App Icon Design
- [x] Generate Egyptian-luxury inspired icon concepts (lotus + pyramids + ancient aesthetics)
- [x] Create final combined icon (Pyramid + Ankh + Lotus)
- [x] Update app logo constant to use new icon
- [ ] Update favicon in app (user must do this in Management UI Settings)

## Legal & Business Setup (Low-Cost Priority)
- [ ] Check if "Drift" trademark is available in Norway, USA, EU (user will do with guidance)
- [x] Create Privacy Policy (GDPR-compliant)
- [x] Create Terms of Service
- [x] Create Cookie Policy
- [ ] Register domain name (drift.no, drift.com, or driftapp.com) - LATER
- [ ] Register business entity (ENK or AS) - LATER
- [ ] Set up Apple Developer Account ($99/year) - LATER
- [ ] Set up Google Play Developer Account ($25 one-time) - LATER

## Stripe Payment Integration
- [x] Add Stripe feature to project
- [x] Create database schema for subscriptions
- [x] Create subscription pricing plans (99 kr/month, 990 kr/year)
- [ ] Build pricing/subscription page
- [ ] Implement payment checkout flow
- [ ] Create Stripe webhook handler
- [ ] Add subscription management to user dashboard
- [ ] Test payment flow end-to-end
- [ ] Guide user through Stripe account setup

## Navigation & UX Improvements (Free)
- [x] Add "Back to Home" button on Audiobook page
- [x] Add consistent header/navigation across all pages
- [x] Improve mobile responsiveness
- [x] Test all navigation flows

## Private Journal Feature
- [x] Create Journal page with entry list
- [x] Add new entry form with title, content, mood
- [x] Implement mood tracking (calm, anxious, happy, sad, neutral)
- [x] Add tags support for entries
- [x] Connect to database (schema ready, frontend complete)
- [x] Add "Back to Home" button

## AI Wellness Coach (PREMIUM FEATURE)
- [x] Create AI Coach chat interface
- [x] Add personality customization (supportive, motivating, calming)
- [x] Build chat UI with message history
- [x] Add daily reminder preview/explanation
- [ ] Integrate with real AI API (currently simulated)
- [ ] Implement actual daily reminder system with push notifications
- [ ] Add chat history storage to database

## Updated Stripe Pricing
- [ ] Update pricing plans: Basic (99 kr/month) and Premium (199 kr/month)
- [ ] Premium includes AI Wellness Coach
- [ ] Basic includes: Audiobook, Journal, Soundscapes
- [ ] Update products.ts with new pricing structure

## Advent Calendar Feature
- [x] Generate luxury Victorian-style advent calendar image
- [x] Create Advent Calendar page with 24 doors (1-24 December)
- [x] Define daily prizes for each door
- [x] Show grand prize for December 24th (5,000+ kr value)
- [x] Lock future dates, unlock current/past dates
- [x] Display prize details when door is opened
- [x] Add route and link from home page

## Gift Card System
- [x] Create gift card purchase page
- [x] Offer 1-month (199 kr) and 1-year (1990 kr) gift cards
- [x] Gift card form with recipient details and personal message
- [x] Create gift code redemption section
- [x] Add gift card link to home page CTA
- [ ] Connect to Stripe for payment (requires Stripe setup)
- [ ] Generate unique gift codes (backend integration)
- [ ] Email gift code to recipient (backend integration)
- [ ] Store gift cards in database (backend integration)
