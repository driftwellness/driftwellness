import { Link } from "wouter";
import { Users } from "lucide-react";

export default function MemberCounterBanner() {
  // TODO: Replace with actual member count from database
  const currentMembers = 0;
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
              💧 7M NOK donation goal
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
