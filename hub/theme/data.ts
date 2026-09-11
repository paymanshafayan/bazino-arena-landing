export const NAV = [
  { id: "HOME", href: "/hub", key: "HOME" },
  { id: "GAMES", href: "/hub/games", key: "GAMES" },
  { id: "EVENTS", href: "/hub/events", key: "EVENTS" },
  { id: "GALLERY", href: "/hub/gallery", key: "GALLERY" },
  { id: "PRICES", href: "/hub/prices", key: "PRICES" },
  { id: "SHOP", href: "/hub/shop", key: "SHOP" },
  { id: "FOOD & DRINKS", href: "/hub/food", key: "FOOD" },
  { id: "ABOUT", href: "/hub/about", key: "ABOUT" },
  { id: "CONTACT", href: "/hub/contact", key: "CONTACT" },
] as const;

export const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
] as const;

export const HOURS = "11:00 – 23:50";

export const SYSTEMS = [
  { id: "tv85", name: "85\" TV + 2 CONTROLLERS", rate: 250, size: "85\"", pads: 2, group: "adults" as const, tagline: "BIGGER GAMES BIGGER FUN", cover: "fc26" },
  { id: "tv65", name: "65\" TV + 2 CONTROLLERS", rate: 200, size: "65\"", pads: 2, group: "adults" as const, tagline: "GREAT GAMES GREAT PEOPLE", cover: "forza" },
  { id: "extra", name: "EXTRA CONTROLLER", rate: 25, size: "—", pads: 1, group: "any" as const, tagline: "PLAY MORE TOGETHER", cover: "controller" },
];

export const KIDS_GAMES = [
  { title: "Astro's Playroom", genre: ["Platformer", "Adventure", "Kids"], pegi: "PEGI 3", pegiColor: "#10b981", players: "1-2 Players", console: "PS5", mode: "Offline Local Play", desc: "Join Astro on a fun and exciting adventure through amazing worlds. A perfect game for young players!" },
  { title: "Minecraft", genre: ["Adventure", "Creative", "Sandbox"], pegi: "PEGI 7", pegiColor: "#10b981", players: "1-4 Players", console: "PS5", mode: "Online & Offline", desc: "Build, explore and create your own world! A fun and imaginative game for kids." },
  { title: "LEGO Fortnite", genre: ["Action", "Adventure", "Survival"], pegi: "PEGI 7", pegiColor: "#10b981", players: "1-4 Players", console: "PS5", mode: "Online Multiplayer", desc: "Explore huge worlds, build, and play with friends in a safe and fun Lego version of Fortnite." },
  { title: "Sackboy: A Big Adventure", genre: ["Platformer", "Adventure", "Co-op"], pegi: "PEGI 7", pegiColor: "#10b981", players: "1-4 Players", console: "PS5", mode: "Offline Local Play", desc: "A fun and creative platformer full of imagination and exciting levels. Play alone or with friends!" },
  { title: "LEGO Harry Potter Collection", genre: ["Adventure", "Action", "Puzzle"], pegi: "PEGI 7", pegiColor: "#10b981", players: "1-2 Players", console: "PS5", mode: "Offline Local Play", desc: "Experience the magic of Hogwarts in a fun Lego world. Perfect for young wizards and fans!" },
  { title: "Rocket League", genre: ["Sports", "Racing", "Multiplayer"], pegi: "PEGI 3", pegiColor: "#10b981", players: "1-4 Players", console: "PS5", mode: "Online & Offline", desc: "Play fun and fast car football. Easy to learn and very exciting for all ages!" },
  { title: "Fall Guys", genre: ["Party", "Action", "Multiplayer"], pegi: "PEGI 3", pegiColor: "#10b981", players: "1-4 Players", console: "PS5", mode: "Online Multiplayer", desc: "Join the fun in this colorful and crazy obstacle course game. Perfect for playing with friends!" },
];

export const ADULT_GAMES = [
  { title: "EA SPORTS FC 24", genre: ["Sports", "Football", "Multiplayer", "Competitive"], pegi: "PEGI 3", pegiColor: "#10b981", players: "1-4 Players", console: "PS5", mode: "Online & Offline", desc: "The world's game. Real teams, real players, real competition. Play with friends or challenge others at Bazino." },
  { title: "NBA 2K24", genre: ["Sports", "Basketball", "Multiplayer", "Competitive"], pegi: "PEGI 3", pegiColor: "#10b981", players: "1-4 Players", console: "PS5", mode: "Online & Offline", desc: "Step on the court with the most realistic basketball experience. Play solo or with friends at Bazino." },
  { title: "Call of Duty: Modern Warfare III", genre: ["Action", "Shooter", "Multiplayer", "War"], pegi: "PEGI 18", pegiColor: "#ef4444", players: "1-4 Players", console: "PS5", mode: "Online Multiplayer", desc: "Intense action, realistic combat and thrilling multiplayer battles. Team up and experience next generation warfare." },
  { title: "Grand Theft Auto V", genre: ["Action", "Open World", "Adventure", "Multiplayer"], pegi: "PEGI 18", pegiColor: "#ef4444", players: "1-4 Players", console: "PS5", mode: "Online & Offline", desc: "Explore a massive open world, complete missions and enjoy unlimited freedom. Play alone or with friends at Bazino." },
  { title: "Tekken 8", genre: ["Fighting", "Arcade", "Multiplayer", "Competitive"], pegi: "PEGI 16", pegiColor: "#f59e0b", players: "1-2 Players", console: "PS5", mode: "Offline Local Play", desc: "The next generation of fighting games. Stunning graphics and epic battles. Challenge your friends at Bazino." },
  { title: "UFC 5", genre: ["Sports", "Fighting", "Multiplayer", "Competitive"], pegi: "PEGI 16", pegiColor: "#f59e0b", players: "1-2 Players", console: "PS5", mode: "Online & Offline", desc: "Step into the octagon with the most realistic MMA experience. Fight your way to the top!" },
  { title: "Assetto Corsa Competizione", genre: ["Racing", "Simulation", "Multiplayer", "Competitive"], pegi: "PEGI 3", pegiColor: "#10b981", players: "1-4 Players", console: "PS5", mode: "Online & Offline", desc: "The most realistic racing simulation. Feel the true driving experience and compete with friends at Bazino." },
];

export const WEEKLY = [
  { game: "FC 26", title: "FC 26 WEEKLY TOURNAMENT", blurb: "Show your skills, compete with other players and become this week's champion!", tags: ["Football", "Sports", "1v1"], when: "EVERY SATURDAY", date: "12 SEP 2026", time: "20:00", fee: "150 ₺", first: "1,000 ₺", second: "300 ₺", third: "150 ₺", max: 32, prize: "500 BC", tone: "purple" as const, cover: "fc26" },
  { game: "UFC 5", title: "UFC 5 WEEKLY TOURNAMENT", blurb: "Step into the octagon and prove you are the best!", tags: ["Fighting", "Sports", "1v1"], when: "EVERY TUESDAY", date: "15 SEP 2026", time: "20:30", fee: "150 ₺", first: "800 ₺", second: "300 ₺", third: "150 ₺", max: 16, prize: "300 BC", tone: "purple" as const, cover: "ufc5" },
  { game: "MORTAL KOMBAT 1", title: "MORTAL KOMBAT 1 WEEKLY TOURNAMENT", blurb: "Choose your fighter, master your skills and claim victory!", tags: ["Fighting", "Action", "1v1"], when: "EVERY THURSDAY", date: "17 SEP 2026", time: "21:00", fee: "150 ₺", first: "800 ₺", second: "300 ₺", third: "150 ₺", max: 16, prize: "300 BC", tone: "purple" as const, cover: "mk1" },
  { game: "TEKKEN 8", title: "TEKKEN 8 WEEKLY TOURNAMENT", blurb: "Fast fights, high skills and non-stop action. Are you ready?", tags: ["Fighting", "Action", "1v1"], when: "EVERY FRIDAY", date: "18 SEP 2026", time: "21:00", fee: "150 ₺", first: "800 ₺", second: "300 ₺", third: "150 ₺", max: 16, prize: "300 BC", tone: "purple" as const, cover: "tekken8" },
];

export const SPECIAL = [
  { game: "FC 26", title: "FC 26 CHAMPIONS CUP", blurb: "The biggest FC 26 tournament of the season! Compete with the best players and claim the champion title.", tags: ["Football", "PS5", "1v1", "Knockout"], date: "12 JULY 2025", time: "18:00", fee: "150 ₺", bcReward: "+10 BC", first: "2,000 ₺", second: "800 ₺", third: "400 ₺", max: 64, cover: "fc26" },
  { game: "UFC 5", title: "UFC 5 BAZINO FIGHT NIGHT", blurb: "Step into the octagon! A special event with top fighters, bigger prizes and real competition.", tags: ["Fighting", "PS5", "1v1", "Knockout"], date: "26 AUGUST 2025", time: "20:00", fee: "200 ₺", bcReward: "+10 BC", first: "1,500 ₺", second: "500 ₺", third: "250 ₺", max: 32, cover: "ufc5" },
  { game: "MORTAL KOMBAT 1", title: "MORTAL KOMBAT 1 LEGENDS", blurb: "A legendary showdown. Only the strongest will survive!", tags: ["Fighting", "PS5", "1v1", "Knockout"], date: "DATE TO BE ANNOUNCED", time: "TIME TO BE ANNOUNCED", fee: "150 ₺", bcReward: "+10 BC", first: "1,200 ₺", second: "400 ₺", third: "250 ₺", max: 32, cover: "mk1" },
  { game: "TEKKEN 8", title: "TEKKEN 8 CHAMPIONSHIP", blurb: "A new generation of fighters. Prove your skills and be the legend!", tags: ["Fighting", "PS5", "1v1", "Knockout"], date: "10 SEPTEMBER 2025", time: "18:00", fee: "200 ₺", bcReward: "+10 BC", first: "1,000 ₺", second: "350 ₺", third: "150 ₺", max: 32, cover: "tekken8" },
];

export const SEASONS = ["SPRING", "SUMMER", "AUTUMN", "WINTER"] as const;

export const SEASON_WINDOWS: Record<(typeof SEASONS)[number], { from: string; to: string; end: string }> = {
  SPRING: { from: "1 MARCH 2026", to: "31 MAY 2026", end: "2026-05-31" },
  SUMMER: { from: "1 JUNE 2026", to: "31 AUGUST 2026", end: "2026-08-31" },
  AUTUMN: { from: "1 SEPTEMBER 2026", to: "30 NOVEMBER 2026", end: "2026-11-30" },
  WINTER: { from: "1 DECEMBER 2026", to: "28 FEBRUARY 2027", end: "2027-02-28" },
};

export function daysLeft(iso: string, now: Date = new Date()) {
  const ms = new Date(`${iso}T23:59:59`).getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export const LEADERBOARD = [
  { rank: 1, name: "ArmanK", tag: "#BZN1024", pts: 48, game: "FC26" },
  { rank: 2, name: "RezaB", tag: "#BZN0876", pts: 42, game: "FC26" },
  { rank: 3, name: "Mahan10", tag: "#BZN0341", pts: 35, game: "FC26" },
  { rank: 4, name: "Shayan", tag: "#BZN0287", pts: 28, game: "FC26" },
  { rank: 5, name: "AliGameR", tag: "#BZN0912", pts: 25, game: "FC26" },
  { rank: 6, name: "DarkLord", tag: "#BZN0674", pts: 23, game: "FC26" },
  { rank: 7, name: "NimaPro", tag: "#BZN0456", pts: 20, game: "FC26" },
  { rank: 8, name: "RezaMVP", tag: "#BZN0789", pts: 18, game: "FC26" },
  { rank: 9, name: "Hitman", tag: "#BZN0112", pts: 16, game: "FC26" },
  { rank: 10, name: "Parsa", tag: "#BZN0398", pts: 15, game: "FC26" },
];

export const GALLERY_ITEMS = [
  { id: 1, title: "PS5 Lounge & Big Screens", likes: 128, img: "/assets/tour/tour-06-lounge.webp", desc: "Main gaming lounge with 85-inch screens and ambient RGB lighting." },
  { id: 2, title: "FC 26 Weekly Finals", likes: 94, img: "/assets/tour/tour-01-grid.webp", desc: "Intense head-to-head match during the weekly championship." },
  { id: 3, title: "VIP Bay & DualSense RGB", likes: 112, img: "/assets/tour/tour-05-dock.webp", desc: "Customized gaming pod with edge controllers and surround audio." },
  { id: 4, title: "Ronaldinho VIP Station", likes: 88, img: "/assets/tour/tour-02-ronaldinho.webp", desc: "Station 02 featuring warm amber lighting and 4K 120Hz display." },
  { id: 5, title: "Arena Match Screen", likes: 76, img: "/assets/tour/tour-04-sport.webp", desc: "Live match broadcasting screen with ocean ice Ambilight." },
  { id: 6, title: "Bazino Pro Royal Crown", likes: 145, img: "/assets/tour/tour-03-bazinopro.webp", desc: "Royal golden crown emblem at the club reception." },
];

export const BLOG_POSTS = [
  { id: "1", title: "Season 3 kicks off this Saturday", tag: "ARENA", date: "01 Sep 2026", excerpt: "FC 26 weekly #13 opens the new season. 32 players, live bracket, TV overlay." },
  { id: "2", title: "New 85\" stations are live", tag: "CLUB", date: "22 Aug 2026", excerpt: "Two extra VIP bays with dual pads. Book from Games → Adults." },
  { id: "3", title: "How Bazino Credits work", tag: "GUIDE", date: "10 Aug 2026", excerpt: "Weekly 5/2/1, special 10/4/2. Credits rank the season — they are not wallet cash." },
];

export const PROFILE_TABS = [
  { id: "overview", en: "Personal Information" },
  { id: "wallet", en: "Bazino Credits" },
  { id: "tournaments", en: "Tournament Statistics" },
  { id: "security", en: "Change Password" },
] as const;

export const GOOGLE_MAPS =
  "https://www.google.com/maps/search/?api=1&query=Hotel%20VistaMare%2C%20%C4%B0skele%2C%20Long%20Beach%2C%20Cyprus";
