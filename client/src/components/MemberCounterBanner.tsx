import { Link } from "wouter";
import { Users } from "lucide-react";
import NotificationBell from "./NotificationBell";
import NavigationMenu from "./NavigationMenu";

export default function MemberCounterBanner() {
  const memberCount = 1000;

  return (
    <Link href="/pricing">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 cursor-pointer hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm md:text-base">
          <Users className="w-5 h-5 flex-shrink-0" />
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-bold">
              ✨ {memberCount.toLocaleString()}+ members
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold">Join Drift today</span>
            <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
              💧 Membership open
            </span>
          </div>
          <NotificationBell />
          <NavigationMenu />
        </div>
      </div>
    </Link>
  );
}
