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
- [x] Build pricing/subscription page with Basic (99kr) and Premium (199kr) tiers
- [ ] Implement Stripe checkout flow for subscriptions
- [ ] Implement Stripe checkout for gift cards and mystery gifts
- [ ] Create Stripe webhook handler for payment confirmations
- [ ] Add subscription management to user dashboard
- [ ] Test payment flow end-to-end
- [ ] Guide user through Stripe account setup and API key configuration

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

## Audiobook Content & Scripts
- [x] Write 5 meditation scripts (Welcome to Drift, Art of Breathing, Body Scan, Loving-Kindness, Evening Ritual)
- [x] Each script is 7-11 minutes when read aloud
- [x] Scripts saved in MEDITATION_SCRIPTS.md
- [ ] Record voice-overs for each chapter (user to do with ElevenLabs or similar)
- [ ] Convert audio files to WAV format
- [ ] Upload audio files to app
- [ ] Test audiobook playback

## Premium Mystery Gift (High-Margin Product)
- [x] Add Premium Mystery Gift to gift card options (999 kr)
- [x] Set perceived value at 2,000-3,000 kr
- [x] Add BEST DEAL badge to highlight it
- [x] Update grid layout to 3 columns
- [ ] Create supplier list for bulk wellness products (yoga mat, meditation cushion, oils, etc.)
- [ ] Set up inventory management
- [ ] Create fulfillment process (send to winners/buyers)
- [ ] Track profit margin (~500 kr per sale)

## PWA (Progressive Web App) Setup
- [x] Create manifest.json with app metadata
- [x] Add PWA meta tags to index.html
- [x] Configure app icons for installation
- [x] Set theme colors and display mode
- [ ] Test PWA installation on mobile devices (user to do)
- [ ] Verify "Add to Home Screen" prompt appears

## Marketing & Launch Strategy
- [x] Create comprehensive social media marketing strategy document
- [x] Define target audience and platform strategy
- [x] Plan content calendar for Instagram, TikTok, YouTube
- [x] Outline influencer collaboration approach
- [x] Set KPIs and growth goals
- [ ] Set up social media accounts (Instagram, TikTok, YouTube)
- [ ] Create first 30 pieces of content
- [ ] Reach out to micro-influencers
- [ ] Launch first giveaway campaign

## AI Coach Personalization
- [x] Generate 4 different AI coach character portrait options
- [x] User selected character (mystical spiritual in yoga outfit)
- [x] Generated final version in earth-toned yoga clothing
- [x] Character named "Amara" (meaning "eternal" in Sanskrit)
- [x] Implement Amara's portrait in AI Coach page
- [x] Add Amara's personality description
- [x] Create personalized welcome messages from Amara

## E-Commerce Shop
- [x] Generate product images (4 candles, oils set, yoga mat, 2 cushions, Ankh necklace, 4 pants, 4 tops, 2 kimonos)
- [x] Research and document wholesale suppliers (PRODUCT_SOURCING.md)
- [x] Generate luxury perfume-style video (blonde woman with blue eyes applying oil - Rituals aesthetic)
- [x] Add video to Shop page hero section
- [x] Create database schema for products, cart, and orders
- [x] Create classy Shop page with Rituals-inspired design
- [x] Fix product image URLs to display correctly
- [ ] Add product catalog with filtering and categories
- [ ] Implement shopping cart functionality
- [ ] Add product detail pages
- [ ] Integrate Stripe checkout for product purchases
- [ ] Test complete purchase flow

## Product Sourcing for E-Commerce Shop
- [x] Find wholesale candles (beige, burgundy, terracotta, gold colors)
- [x] Find essential oils sets (lavender, eucalyptus, etc.)
- [x] Find yoga mats with custom branding options
- [x] Find meditation cushions (Nordic minimal + luxury styles)
- [x] Find Ankh necklaces (gold/brass)
- [x] Find yoga pants in earth tones (brown, white, beige, plum)
- [x] Find yoga wrap tops/sweaters in earth tones
- [x] Find meditation kimonos (luxury + minimal styles)
- [x] Compare prices and margins for each product category
- [x] Create PRODUCT_SOURCING.md with all supplier links and pricing
- [ ] Contact suppliers and request samples
- [ ] Order first batch of products for inventory

## Amara (AI Coach) Integration Across App
- [ ] Generate 3 new Amara images (welcome portrait, lifestyle/shop, hero portrait with open eyes)
- [ ] Add "Meet Your Wellness Guide" section to home page
- [ ] Add Amara avatar to navigation header
- [ ] Update Pricing page to show Amara with Premium tier
- [ ] Add Amara to Shop page ("Curated by Amara" section)
- [ ] Create welcome popup with Amara greeting
- [ ] Test all Amara appearances across app

## Amara Integration & English Translation
- [x] Generate 3 new Amara images with blue-green eyes (welcome, lifestyle, hero)
- [x] User approved new Amara images
- [x] Move Shop link to top navigation (make more visible)
- [x] Add Amara to home page (Meet Your Guide section)
- [ ] Add Amara avatar to navigation header
- [x] Add Amara to Shop page (Curated by section)
- [ ] Add Amara to Pricing page
- [x] Translate entire app to English (all pages, buttons, forms - changed kr to NOK)
- [ ] Set up language switcher system for future multi-language support

## Shop Launch Preparation
- [x] Add "Launching January 1st" banner to Shop page
- [x] Update product availability messaging (disabled Add to Cart buttons)
- [x] Update Home page Shop button with launch date
- [ ] Add pre-order or waitlist functionality (optional)
- [ ] Save checkpoint with launch date updates

## Product Image Updates
- [x] Regenerate 4 candle images without flames (beige, burgundy, terracotta, gold)
- [x] Update Shop page with new candle images
- [ ] Save checkpoint with updated images

## DRIFT Branding for Candles
- [x] Generate 4 new candle images with DRIFT logo on labels
- [x] Design printable DRIFT candle label template (for DIY candles)
- [x] Update Shop page with new branded candle images
- [ ] Save checkpoint with DRIFT-branded products

## Product Sourcing - Meditation Cushions
- [ ] Find meditation cushions on Temu matching product images
- [ ] Add to TEMU_SHOPPING_GUIDE.md

## Meditation Cushion Update
- [x] Generate new luxury cushion image matching Temu product (grey-blue with pink floral embroidery)
- [x] Update Shop page with new cushion image
- [ ] Save checkpoint with updated cushion

## Soundscapes Feature
- [x] Create Soundscapes page with nature sound players
- [x] Add ambient sounds (rain, ocean, forest, fire, wind, birds, etc.)
- [x] Implement audio controls (play/pause, volume, mix sounds)
- [x] Add Soundscapes link to navigation
- [ ] Test audio playback
- [ ] Save checkpoint with Soundscapes feature

## Shop Button Visual Enhancement
- [x] Add golden ring/border around Shop button
- [x] Add subtle pulsing animation to draw attention
- [x] Add "Soon" badge
- [x] Make Shop button more visually prominent
- [ ] Save checkpoint with enhancements

## Shop Button Design Update
- [x] Replace burgundy blob with curved gold circle around Shop button (more elegant, luxury style)

## Shop Button - Hand-drawn Gold Circle
- [x] Replace perfect ellipse with organic hand-drawn gold circle (casual, imperfect style like user's sketch)

## Home Page Shop Section
- [x] Add dedicated Shop section to home page between features and Maria section
- [x] Display 3-4 featured products with images and prices
- [x] Add "Curated by Maria" branding
- [x] Include "Explore Shop" call-to-action button
- [x] Show "Pre-order now" messaging

## Daily Poem Feature
- [x] Write 30-50 original poems categorized by mood (Calming, Motivating, Empowering, Loving, Mixed)
- [x] Create Daily Poem popup component
- [ ] Add poem display on app open or scheduled time
- [ ] Create Settings page with Daily Poem preferences
- [ ] Add toggle to enable/disable Daily Poem
- [ ] Add mood preference selector
- [ ] Add notification time picker
- [ ] Store user preferences in database

## Rename AI Coach from Amara to Maria
- [x] Update Home page (Meet Your Guide section)
- [x] Update AI Coach page
- [x] Update Shop page (Curated by section)
- [x] Update all references throughout the app

## Pre-order Functionality
- [x] Enable "Add to Cart" buttons on Shop page
- [x] Add "Pre-order - Ships January 1st, 2026" messaging
- [x] Update product cards with pre-order badge
- [x] Update banner to say "Pre-order now" instead of disabled message
- [x] Add shipping date information to product details

## Pricing Update
- [ ] Update meditation cushion price from 109 NOK to 499 NOK on home page
- [ ] Update meditation cushion price from 109 NOK to 499 NOK in Shop page

## Stripe Payment Integration
- [x] Add Stripe API keys to environment
- [x] Validate Stripe API keys with test
- [x] Implement checkout flow
- [x] Create checkout page
- [x] Create order success page
- [x] Register Stripe API routes
- [ ] Test payment with test card
- [ ] Verify order confirmation
