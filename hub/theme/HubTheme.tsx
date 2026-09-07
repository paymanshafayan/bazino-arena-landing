import { Route, Switch } from "wouter";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import { EventsHubPage, RegisterEventPage, SeasonPage, SpecialPage, WeeklyPage } from "./pages/EventsPages";
import { BlogPage, ChatPage, ClubPage, ContactPage, FoodPage, Hub404, ProfilePage, RulesPage, ShopPage } from "./pages/MiscPages";
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
      <Route path="/hub/shop" component={ShopPage} />
      <Route path="/hub/food" component={FoodPage} />
      <Route path="/hub/club" component={ClubPage} />
      <Route path="/hub/blog" component={BlogPage} />
      <Route path="/hub/chat" component={ChatPage} />
      <Route path="/hub/profile" component={ProfilePage} />
      <Route path="/hub/contact" component={ContactPage} />
      <Route path="/hub/rules" component={RulesPage} />
      <Route component={Hub404} />
    </Switch>
  );
}
