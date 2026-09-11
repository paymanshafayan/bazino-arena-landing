/*
 * Bazino visual direction: the application shell separates the cinematic home scene
 * from shared portal routes, so every page can inherit the Hall of Legends theme.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PortalPage from "./pages/PortalPage";
import BracketDemo from "../../hub/bracket-demo/BracketDemo";
import HubKit from "../../hub/design-system/KitPage";
import HubTheme from "../../hub/theme/HubTheme";
import { HubProvider } from "../../hub/theme/HubContext";
import ThemeHarness from "./pages/ThemeHarness";
import CdpVerificationPage from "./pages/CdpVerificationPage";
import Dimension3DPage from "./pages/Dimension3DPage";
import type { PortalPageId } from "./data/portalData";

const portalRoutes: PortalPageId[] = ["reservations", "cafe", "shop", "tournaments", "blog", "loyalty", "chat"];

function Router() {
  return (
    <HubProvider>
      <Switch>
        <Route path="/3d" component={Dimension3DPage} />
        <Route path="/dimension" component={Dimension3DPage} />
        <Route path="/verify-cdp" component={CdpVerificationPage} />
        <Route path="/theme-harness" component={ThemeHarness} />
        <Route path="/brackets" component={BracketDemo} />
        <Route path="/hub/kit" component={HubKit} />
        <Route path="/hub/events/brackets" component={BracketDemo} />
        <Route path="/hub/:a/:b" component={HubTheme} />
        <Route path="/hub/:a" component={HubTheme} />
        <Route path="/hub" component={HubTheme} />
        <Route path="/" component={Home} />
        {portalRoutes.map((pageId) => <Route key={pageId} path={`/${pageId}`} component={() => <PortalPage pageId={pageId} />} />)}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </HubProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
