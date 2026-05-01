import { Link } from "wouter";
import { Users } from "lucide-react";
import NotificationBell from "./NotificationBell";
import NavigationMenu from "./NavigationMenu";

export default function MemberCounterBanner() {
  // Waitlist counter - shows people waiting for app launch
  const baseWaitlistCount = 2847;
  
  // Add gradual daily increment (5-15 people per day for urgency)
  const daysSinceLaunch = Math.floor((Date.now() - new Date('2025-01-01').getTime()) / (1000 * 60 * 60 * 24));
  const dailyIncrement = Math.floor(Math.random() * 10) + 5; // 5-15 per day
  const organicGrowth = Math.min(daysSinceLaunch * dailyIncrement, 2000); // Cap at +2000
  
  // TODO: Add real registered users from database on top of this
  const realUsers = 0; // Fetch from database
  
  const currentWaitlist = baseWaitlistCount + organicGrowth + realUsers;

  return (
    <Link href="/impact">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 cursor-pointer hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm md:text-base">
          <Users className="w-5 h-5 flex-shrink-0" />
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-bold">
              🔥 {currentWaitlist.toLocaleString()} people waiting
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold">Join the waitlist!</span>
            <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
              💧 Launching Soon
            </span>
          </div>
          <NotificationBell />
          <NavigationMenu />
        </div>
      </div>
    </Link>
  );
}
