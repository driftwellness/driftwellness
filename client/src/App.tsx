import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import MemberCounterBanner from "./components/MemberCounterBanner";
import Home from "./pages/Home";
import Impact from "./pages/Impact";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Audiobook from "./pages/Audiobook";
import Journal from "./pages/Journal";
import AICoach from "./pages/AICoach";
import AdventCalendar from "./pages/AdventCalendar";
import NewYearCalendar from "./pages/NewYearCalendar";
import GiftCard from "./pages/GiftCard";
import Pricing from "./pages/Pricing";
import Shop from "./pages/Shop";
import Soundscapes from "./pages/Soundscapes";
import SleepVideos from "./pages/SleepVideos";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import CoachSelection from "./pages/CoachSelection";
import AdminDashboard from "./pages/AdminDashboard";
import OurMission from "./pages/OurMission";
import SubscriptionDashboard from "./pages/SubscriptionDashboard";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import { useState } from "react";

function Router() {
  const [selectedCoach, setSelectedCoach] = useState<"maria" | "zane">("maria");

  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/impact" component={Impact} />
      <Route path="/our-mission" component={OurMission} />
      <Route path="/settings" component={Settings} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path={"/audiobook"} component={Audiobook} />
      <Route path={"/journal"} component={Journal} />
      <Route path={"/coach-selection"}>
        {() => <CoachSelection onSelectCoach={setSelectedCoach} />}
      </Route>
      <Route path={"/ai-coach"}>
        {() => <AICoach selectedCoach={selectedCoach} />}
      </Route>
      <Route path={"/advent-calendar"} component={AdventCalendar} />
      <Route path={"/new-year-calendar"} component={NewYearCalendar} />
      <Route path={"/ gift-card"} component={GiftCard} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/subscription"} component={SubscriptionDashboard} />
      <Route path={"/subscription-management"} component={SubscriptionManagement} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/order-success"} component={OrderSuccess} />
      <Route path={"/soundscapes"} component={Soundscapes} />
      <Route path={"/sleep-videos"} component={SleepVideos} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/analytics"} component={AnalyticsDashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
        <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <MemberCounterBanner />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
