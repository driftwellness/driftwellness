# 🌿 Drift - Luxury Wellness App

**Drift** is a premium wellness application combining AI coaching, meditation, soundscapes, and a social impact mission. Every subscription helps provide clean water to communities in need.

**Live Site:** [driftwellness.no](https://driftwellness.no)

---

## ✨ Features

### 🤖 AI Wellness Coaches
- **Maria** 🪷 - Warm, empathetic guidance focused on emotional support
- **Zane** 🌿 - Grounded, practical wisdom for clarity and strength
- Personalized daily check-ins and meditation recommendations

### 🎧 Content Library
- **Audiobook** - 5 chapters of guided wellness content
- **Soundscapes** - 14 curated nature sounds (ocean, forest, rain, birds, etc.)
- **Sleep Videos** - 5 YouTube forest brain wave videos for deep rest
- **Sadhguru Meditations** - Authentic meditation and wisdom talks

### 📅 Holder Our Calendar
- 30 days of daily surprises
- Exclusive discounts, gifts, and product offers
- One surprise per day (locked after opening)

### 🛍️ Wellness Shop
- Serenity Candle (299 NOK)
- Calm Pulse Point Oil (249 NOK)
- Sleep Pillow Mist (199 NOK)
- Meditation Cushion (449 NOK)

### 💧 Clean Water Mission
- **Goal:** 15,000 members → 10 million NOK to clean water projects
- **Premium:** 50 NOK/month donated per subscriber
- **Impact:** 100 NOK/month donated per Impact tier subscriber
- Members vote on which projects to support

### 🔐 Authentication & Waitlist
- Manus OAuth login
- 4,847+ people on waitlist
- Premium subscription tiers (Standard, Premium, Impact)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Tailwind CSS 4, Wouter (routing) |
| **Backend** | Express 4, tRPC 11 |
| **Database** | MySQL with Drizzle ORM |
| **Auth** | Manus OAuth |
| **Storage** | AWS S3 |
| **Payment** | Stripe (test mode) |
| **Mobile** | Capacitor (iOS/Android) |
| **Hosting** | Manus WebDev |

---

## 📁 Project Structure

```
drift-tracker/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utilities (tRPC client, etc.)
│   │   ├── App.tsx           # Main router
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   └── index.html            # HTML template
├── server/                    # Express backend
│   ├── routers.ts            # tRPC procedures
│   ├── db.ts                 # Database helpers
│   ├── storage.ts            # S3 integration
│   └── _core/                # Framework internals
├── drizzle/                   # Database schema & migrations
│   └── schema.ts             # Drizzle ORM tables
├── shared/                    # Shared types & constants
├── storage/                   # S3 helpers
├── vite.config.ts            # Vite configuration
├── drizzle.config.ts         # Drizzle configuration
└── package.json              # Dependencies

```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22+ (or use nvm)
- pnpm (or npm/yarn)
- MySQL database (or use Manus-provided)

### Installation

```bash
# Clone repository
git clone https://github.com/driftwellness/driftwellness.git
cd driftwellness

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

**Dev server runs at:** `http://localhost:3000`

---

## 🔧 Development

### Build Loop

1. **Update Database Schema**
   ```bash
   # Edit drizzle/schema.ts
   pnpm db:push  # Generates migrations and syncs database
   ```

2. **Add Database Helpers**
   - Create query functions in `server/db.ts`
   - Return raw Drizzle results

3. **Create tRPC Procedures**
   - Add routes in `server/routers.ts`
   - Use `publicProcedure` or `protectedProcedure`

4. **Build Frontend UI**
   - Create pages in `client/src/pages/`
   - Use `trpc.*.useQuery()` and `trpc.*.useMutation()`
   - Leverage shadcn/ui components

### Key Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm test             # Run vitest
pnpm format           # Format code with Prettier
pnpm db:push          # Sync database schema
```

---

## 🎨 Design System

### Color Palette
- **Primary:** Burgundy (#8B4049)
- **Accent:** Gold (#D4AF37)
- **Background:** Beige/Cream
- **Text:** Dark gray on light backgrounds

### Typography
- **Font:** System fonts (elegant, modern)
- **Headings:** Bold, large
- **Body:** Clear, readable

### Components
- Built with shadcn/ui
- Tailwind CSS utilities
- Responsive design (mobile-first)

---

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL=mysql://user:password@host/drift

# Authentication
JWT_SECRET=your-secret-key
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://oauth.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Storage
AWS_S3_BUCKET=drift-assets
AWS_REGION=us-east-1

# Payment
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App Configuration
VITE_APP_TITLE=Drift
VITE_APP_LOGO=/logo.svg
```

---

## 📱 Mobile Development

### Android Build

```bash
# Add Android platform
npx cap add android

# Build web assets
pnpm build

# Copy to Android
npx cap copy android

# Open Android Studio
npx cap open android
```

### iOS Build

```bash
# Add iOS platform
npx cap add ios

# Build web assets
pnpm build

# Copy to iOS
npx cap copy ios

# Open Xcode
npx cap open ios
```

### Google Play Store Submission
1. Build release APK in Android Studio
2. Create Google Play Developer account
3. Upload APK and complete store listing
4. Submit for review

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test --watch

# Coverage
pnpm test --coverage
```

---

## 📊 Database

### Schema Overview

**users** table:
- `id` - Auto-increment primary key
- `openId` - Manus OAuth identifier (unique)
- `name` - User's name
- `email` - User's email
- `role` - 'user' or 'admin'
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp
- `lastSignedIn` - Last login timestamp

### Migrations

Drizzle handles migrations automatically:
```bash
pnpm db:push  # Generates and runs migrations
```

---

## 🚀 Deployment

### Manus WebDev (Recommended)
- Built-in hosting at driftwellness.no
- Automatic SSL/TLS
- Custom domain support
- Database included

### Manual Deployment
1. Build: `pnpm build`
2. Deploy `dist/` folder to your hosting
3. Set environment variables on host
4. Configure database connection
5. Run migrations: `pnpm db:push`

---

## 📝 API Routes

All API routes are under `/api/trpc`:

### Authentication
- `auth.me` - Get current user
- `auth.logout` - Logout user

### System
- `system.notifyOwner` - Send notification to app owner

### Custom Routes
Add your own procedures in `server/routers.ts`

---

## 🎯 Roadmap

- [ ] Live Stripe payments
- [ ] PayPal integration
- [ ] Android app (Google Play)
- [ ] iOS app (App Store)
- [ ] Advanced analytics
- [ ] Community features
- [ ] Multi-language support

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to GitHub: `git push origin feature/your-feature`
4. Open a Pull Request

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 📞 Support

For questions or support:
- Email: support@driftwellness.no
- Website: https://driftwellness.no

---

**Made with ❤️ for wellness and clean water** 💧
