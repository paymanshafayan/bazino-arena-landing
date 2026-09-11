import { Route, Switch } from "wouter";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import PricesPage from "./pages/PricesPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import { EventsHubPage, RegisterEventPage, SeasonPage, SpecialPage, WeeklyPage } from "./pages/EventsPages";
import { ContactPage, FoodPage, Hub404, PrivacyPage, ProfilePage, RulesPage, ShopPage } from "./pages/MiscPages";
import BracketDemo from "../bracket-demo/BracketDemo";

export default function HubTheme() {
  return (
    <Switch>
      <Route path="/hub" component={HomePage} />
      <Route path="/hub/games" component={GamesPage} />
      <Route path="/hub/events" component={EventsHubPage} />
      <Route path="/hub/events/weekly" component={WeeklyPage} />
      <Route path="/hub/events/special" component={SpecialPage} />
      <Route path="/hub/events/season" component={SeasonPage} />
      <Route path="/hub/events/register" component={RegisterEventPage} />
      <Route path="/hub/events/brackets" component={BracketDemo} />
      <Route path="/hub/gallery" component={GalleryPage} />
      <Route path="/hub/prices" component={PricesPage} />
      <Route path="/hub/shop" component={ShopPage} />
      <Route path="/hub/food" component={FoodPage} />
      <Route path="/hub/about" component={AboutPage} />
      <Route path="/hub/club" component={AboutPage} />
      <Route path="/hub/profile" component={ProfilePage} />
      <Route path="/hub/contact" component={ContactPage} />
      <Route path="/hub/rules" component={RulesPage} />
      <Route path="/hub/privacy" component={PrivacyPage} />
      <Route component={Hub404} />
    </Switch>
  );
}
