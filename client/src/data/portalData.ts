/*
 * Bazino portal vocabulary follows the Theme Engine contract: genres, tournaments,
 * match history, lounge sections, pricing, staff, settings, and navigation tabs.
 * Content is intentionally console-only and keeps official prize claims on bazino.pro.
 */
export type PortalPageId = "reservations" | "cafe" | "shop" | "tournaments" | "blog" | "loyalty" | "chat";

export const portalPageCopy: Record<PortalPageId, { eyebrow: string; title: string; body: string; action: string; image: string; accent: string; cards: Array<{ label: string; title: string; body: string }> }> = {
  reservations: {
    eyebrow: "PORTAL / RESERVATIONS",
    title: "Save your\nplace in the scene.",
    body: "Choose the console experience, the VIP pace, or the next tournament night. Final availability and reservation confirmation are handled through the official Bazino portal.",
    action: "Open bazino.pro",
    image: "/manus-storage/bazino-hero-reference_074c7394.png",
    accent: "BOOKING SIGNAL",
    cards: [
      { label: "01 / CONSOLE", title: "PS5 Arena", body: "A focused setup for a solo run or a head-to-head round." },
      { label: "02 / CONSOLE", title: "Xbox Series X", body: "A big-screen station for teams, rematches and late sessions." },
      { label: "03 / VIP", title: "VIP Lounge", body: "More room, more comfort, and a quieter rhythm between rounds." },
    ],
  },
  cafe: {
    eyebrow: "PORTAL / CAFÉ",
    title: "Reset between\nrounds.",
    body: "A social café layer for the lounge: simple refreshments, conversation, and a better pause before the next match.",
    action: "Find the lounge",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=88",
    accent: "LOUNGE SIGNAL",
    cards: [
      { label: "01 / PAUSE", title: "Between rounds", body: "Keep the night moving without leaving the arena." },
      { label: "02 / SOCIAL", title: "Bring your people", body: "A place to meet before, after, and between console sessions." },
      { label: "03 / NIGHT", title: "İskele after dark", body: "A warm café rhythm inside a blue-and-gold gaming atmosphere." },
    ],
  },
  shop: {
    eyebrow: "PORTAL / SHOP",
    title: "Carry the\nnight signal.",
    body: "A storefront-ready page for Bazino merchandise and club items. Product availability and checkout remain controlled by the portal backend.",
    action: "Browse official shop",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=88",
    accent: "MERCH SIGNAL",
    cards: [
      { label: "01 / DROP", title: "Arena essentials", body: "A future-ready slot for official club products and drops." },
      { label: "02 / MEMBER", title: "Club identity", body: "A themed surface for loyalty items and member benefits." },
      { label: "03 / OFFICIAL", title: "Secure checkout", body: "Connect this page to the portal’s live shop flow when enabled." },
    ],
  },
  tournaments: {
    eyebrow: "PORTAL / TOURNAMENTS",
    title: "The next match\nhas a date.",
    body: "A dedicated tournament hub for active events, entry details, match history and official prize information. Always direct users to bazino.pro for current rules and prizes.",
    action: "See official details",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=88",
    accent: "LIVE COMPETITION",
    cards: [
      { label: "ACTIVE / 01", title: "Featured tournament", body: "Status, date, format and registration slot supplied by portal data." },
      { label: "RESULTS / 02", title: "Match history", body: "A scoreboard surface for recent results and verified winners." },
      { label: "RULES / 03", title: "Official information", body: "Prize details and conditions belong on the official Bazino destination." },
    ],
  },
  blog: {
    eyebrow: "PORTAL / BLOG",
    title: "Stories from\nthe lounge.",
    body: "A branded editorial page for game-night stories, club announcements and social content that keeps the four-language campaign coherent.",
    action: "Back to arena",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=88",
    accent: "EDITORIAL SIGNAL",
    cards: [
      { label: "STORY / 01", title: "Inside the VIP scene", body: "A long-form slot for lounge stories and behind-the-scenes atmosphere." },
      { label: "GUIDE / 02", title: "How to enter", body: "Simple explainers for reservations, tournaments and app notifications." },
      { label: "SOCIAL / 03", title: "From the feed to the floor", body: "Cross-link the live Instagram energy back to the physical lounge." },
    ],
  },
  loyalty: {
    eyebrow: "PORTAL / LOYALTY",
    title: "Keep your\nplace in the league.",
    body: "A members-only destination for club notifications, return visits and future loyalty mechanics. Keep benefits factual and sourced from live portal settings.",
    action: "Open official site",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=88",
    accent: "MEMBER SIGNAL",
    cards: [
      { label: "01 / CLUB", title: "Member profile", body: "A clear place for account state, preferences and notifications." },
      { label: "02 / SIGNAL", title: "Club updates", body: "Stay informed about new nights, official events and announcements." },
      { label: "03 / RETURN", title: "Your next round", body: "A route back to the official reservation and app experience." },
    ],
  },
  chat: {
    eyebrow: "PORTAL / CHAT",
    title: "Ask the\nfront desk.",
    body: "A support-ready page for lounge questions, opening information and reservation guidance. Live chat behavior can be connected to the portal service later.",
    action: "Contact Bazino",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=88",
    accent: "SUPPORT SIGNAL",
    cards: [
      { label: "01 / HOURS", title: "Opening information", body: "Keep the latest venue hours and holiday changes in one place." },
      { label: "02 / ROUTE", title: "Find Vistamare Hotel", body: "Guide visitors to the lounge in İskele with clear location details." },
      { label: "03 / HELP", title: "Reservation support", body: "Turn common questions into fast, useful answers." },
    ],
  },
};

export const portalNav: Array<{ id: PortalPageId; label: string }> = [
  { id: "reservations", label: "Reservations" },
  { id: "cafe", label: "Café" },
  { id: "shop", label: "Shop" },
  { id: "tournaments", label: "Tournaments" },
  { id: "blog", label: "Blog" },
  { id: "loyalty", label: "Loyalty" },
  { id: "chat", label: "Chat" },
];

export const portalRequiredProps = ["gameGenres", "tournaments", "matchHistory", "loungeSections"] as const;
