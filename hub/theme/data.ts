export const NAV = [
  { id: "HOME", href: "/hub", key: "HOME" },
  { id: "GAMES", href: "/hub/games", key: "GAMES" },
  { id: "EVENTS", href: "/hub/events", key: "EVENTS" },
  { id: "SHOP", href: "/hub/shop", key: "SHOP" },
  { id: "FOOD & DRINKS", href: "/hub/food", key: "FOOD" },
  { id: "CLUB", href: "/hub/club", key: "CLUB" },
  { id: "BLOG", href: "/hub/blog", key: "BLOG" },
  { id: "CHAT", href: "/hub/chat", key: "CHAT" },
] as const;

export const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
] as const;

export const HOURS = "11:00 – 23:50";

export const SYSTEMS = [
  { id: "tv85", name: "85\" TV + 2 PADS", rate: 250, size: "85\"", pads: 2, group: "adults" as const },
  { id: "tv65", name: "65\" TV + 2 PADS", rate: 200, size: "65\"", pads: 2, group: "adults" as const },
  { id: "kids", name: "KIDS STATION + 2 PADS", rate: 180, size: "55\"", pads: 2, group: "kids" as const },
  { id: "extra", name: "EXTRA CONTROLLER", rate: 25, size: "—", pads: 1, group: "any" as const },
];

export const WEEKLY = [
  { game: "FC 26", title: "FC 26 WEEKLY TOURNAMENT", blurb: "Show your skills, compete with other players and become this week's champion.", tags: ["Football", "Sports", "1v1"], when: "EVERY SATURDAY", max: 32, prize: "300 BC", tone: "purple" as const, cover: "fc26" },
  { game: "UFC 5", title: "UFC 5 WEEKLY TOURNAMENT", blurb: "Step into the octagon and prove you are the best.", tags: ["Fighting", "Sports", "1v1"], when: "EVERY TUESDAY", max: 16, prize: "250 BC", tone: "purple" as const, cover: "ufc5" },
  { game: "MORTAL KOMBAT 1", title: "MORTAL KOMBAT 1 WEEKLY TOURNAMENT", blurb: "Choose your fighter, finish your rivals and claim victory.", tags: ["Fighting", "Action", "1v1"], when: "EVERY THURSDAY", max: 16, prize: "250 BC", tone: "purple" as const, cover: "mk1" },
  { game: "TEKKEN 8", title: "TEKKEN 8 WEEKLY TOURNAMENT", blurb: "Fast fights, high skills and iron-clad action are guaranteed.", tags: ["Fighting", "Action", "1v1"], when: "EVERY FRIDAY", max: 16, prize: "250 BC", tone: "purple" as const, cover: "tekken8" },
];

export const SPECIAL = [
  { game: "FC 26", title: "FC 26 CHAMPIONS CUP", blurb: "The biggest FC 26 tournament of the season. Compete with 64 players and take the champion title.", tags: ["Football", "PS5", "1v1", "Knockout"], date: "12 JULY 2026", fee: "50 ₺", first: "1,000 ₺", second: "500 ₺", third: "400 ₺", max: 64, cover: "fc26" },
  { game: "UFC 5", title: "UFC 5 BAZINO FIGHT NIGHT", blurb: "Step into the octagon for a special event with extra fights, bigger prizes and live competition.", tags: ["Fighting", "PS5", "1v1", "Knockout"], date: "02 AUGUST 2026", fee: "30 ₺", first: "1,250 ₺", second: "800 ₺", third: "250 ₺", max: 32, cover: "ufc5" },
  { game: "MORTAL KOMBAT 1", title: "MORTAL KOMBAT 1 LEGENDS", blurb: "A night of fatalities. Only the strongest will remain.", tags: ["Fighting", "PS5", "1v1", "Knockout"], date: "18 AUGUST 2026", fee: "30 ₺", first: "1,100 ₺", second: "400 ₺", third: "250 ₺", max: 32, cover: "mk1" },
  { game: "TEKKEN 8", title: "TEKKEN 8 CHAMPIONSHIP", blurb: "A new generation of fighters. Prove your skills and be the legend.", tags: ["Fighting", "PS5", "1v1", "Knockout"], date: "09 SEPTEMBER 2026", fee: "30 ₺", first: "1,200 ₺", second: "350 ₺", third: "250 ₺", max: 32, cover: "tekken8" },
];

export const SEASONS = ["SPRING", "SUMMER", "AUTUMN", "WINTER"] as const;

export const LEADERBOARD = [
  { rank: 1, name: "ArmanK", tag: "#BZN1024", pts: 48, game: "FC26" },
  { rank: 2, name: "Kasra", tag: "#BZN0719", pts: 42, game: "FC26" },
  { rank: 3, name: "Mahan10", tag: "#BZN1148", pts: 35, game: "FC26" },
  { rank: 4, name: "NimaPro", tag: "#BZN2210", pts: 28, game: "TEKKEN8" },
  { rank: 5, name: "AliGameR", tag: "#BZN0901", pts: 25, game: "UFC5" },
  { rank: 6, name: "KianPro", tag: "#BZN3302", pts: 23, game: "MK1" },
  { rank: 7, name: "RezaB", tag: "#BZN4411", pts: 20, game: "FC26" },
  { rank: 8, name: "Hitman", tag: "#BZN5518", pts: 18, game: "UFC5" },
  { rank: 9, name: "Shayan", tag: "#BZN6604", pts: 16, game: "TEKKEN8" },
  { rank: 10, name: "Saeed", tag: "#BZN7703", pts: 15, game: "FC26" },
];

export const BLOG_POSTS = [
  { id: "1", title: "Season 3 kicks off this Saturday", tag: "ARENA", date: "01 Sep 2026", excerpt: "FC 26 weekly #13 opens the new season. 32 players, live bracket, TV overlay." },
  { id: "2", title: "New 85\" stations are live", tag: "CLUB", date: "22 Aug 2026", excerpt: "Two extra VIP bays with dual pads. Book from Games → Adults." },
  { id: "3", title: "How Bazino Credits work", tag: "GUIDE", date: "10 Aug 2026", excerpt: "Weekly 5/2/1, special 10/4/2. Credits rank the season — they are not wallet cash." },
];

export const CHAT_THREADS = [
  { id: "lobby", name: "Lobby", last: "Who is on FC 26 tonight?", time: "21:04" },
  { id: "fc26", name: "FC 26 Weekly", last: "Bracket is live on TV 3", time: "20:51" },
  { id: "staff", name: "Staff", last: "Station 4 is free in 20 min", time: "19:12" },
];

export const PROFILE_TABS = [
  { id: "overview", en: "My account" },
  { id: "wallet", en: "Wallet" },
  { id: "points", en: "Points" },
  { id: "reservations", en: "Reservations" },
  { id: "orders", en: "Orders" },
  { id: "tournaments", en: "Tournaments" },
  { id: "tickets", en: "Support" },
  { id: "affiliate", en: "Affiliate" },
  { id: "security", en: "Security" },
] as const;

export const GOOGLE_MAPS =
  "https://www.google.com/maps/search/?api=1&query=Hotel%20VistaMare%2C%20%C4%B0skele%2C%20Long%20Beach%2C%20Cyprus";
