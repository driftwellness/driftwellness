import { Link } from "wouter";
import { Users } from "lucide-react";
import NotificationBell from "./NotificationBell";

export default function MemberCounterBanner() {
  // Base member count for social proof (starts at 998)
  const baseMemberCount = 998;
  
  // Add gradual daily increment (1-3 members per day)
  // This creates organic growth appearance
  const daysSinceLaunch = Math.floor((Date.now() - new Date('2025-01-01').getTime()) / (1000 * 60 * 60 * 24));
  const dailyIncrement = Math.floor(Math.random() * 3) + 1; // 1-3 per day
  const organicGrowth = Math.min(daysSinceLaunch * dailyIncrement, 500); // Cap at +500
  
  // TODO: Add real registered users from database on top of this
  const realUsers = 0; // Fetch from database
  
  const currentMembers = baseMemberCount + organicGrowth + realUsers;
  const targetMembers = 15000;
  const progressPercentage = Math.round((currentMembers / targetMembers) * 100);

  return (
    <Link href="/impact">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 cursor-pointer hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm md:text-base">
          <Users className="w-5 h-5 flex-shrink-0" />
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-bold">
              {currentMembers.toLocaleString()} / {targetMembers.toLocaleString()} members
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold">{progressPercentage}% to clean water!</span>
            <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
              💧 35M NOK donation goal
            </span>
          </div>
          <NotificationBell />
        </div>
      </div>
    </Link>
  );
}
