import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "tr" | "fa" | "ru";

export type HubUser = {
  username: string;
  displayName: string;
  tag: string;
  phone: string;
  firstName: string;
  lastName: string;
  dob: string;
  credits: number;
  points: number;
  championships: number;
  second: number;
  third: number;
  memberSince: string;
};

export const DEMO_USER: HubUser = {
  username: "ArmanK",
  displayName: "ArmanK",
  tag: "#BZN1024",
  phone: "+90 539 112 37 47",
  firstName: "Arman",
  lastName: "Kelesyan",
  dob: "12 May 1998",
  credits: 1250,
  points: 48,
  championships: 5,
  second: 3,
  third: 7,
  memberSince: "AUG 2020",
};

type HubCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  user: HubUser | null;
  setUser: (u: HubUser | null) => void;
  hoursOpen: boolean;
  setHoursOpen: (v: boolean) => void;
  authOpen: boolean;
  authMode: "otp" | "password";
  setAuthOpen: (v: boolean, mode?: "otp" | "password") => void;
  mobileNav: boolean;
  setMobileNav: (v: boolean) => void;
  notify: string | null;
  flash: (msg: string) => void;
};

const HubContext = createContext<HubCtx | null>(null);

export function HubProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [user, setUser] = useState<HubUser | null>(DEMO_USER);
  const [hoursOpen, setHoursOpen] = useState(false);
  const [authOpen, setAuthOpenState] = useState(false);
  const [authMode, setAuthMode] = useState<"otp" | "password">("otp");
  const [mobileNav, setMobileNav] = useState(false);
  const [notify, setNotify] = useState<string | null>(null);

  const setAuthOpen = (v: boolean, mode: "otp" | "password" = "otp") => {
    setAuthMode(mode);
    setAuthOpenState(v);
  };

  const flash = (msg: string) => {
    setNotify(msg);
    window.setTimeout(() => setNotify(null), 2800);
  };

  const value = useMemo(
    () => ({
      lang, setLang, user, setUser, hoursOpen, setHoursOpen,
      authOpen, authMode, setAuthOpen, mobileNav, setMobileNav, notify, flash,
    }),
    [lang, user, hoursOpen, authOpen, authMode, mobileNav, notify],
  );

  return <HubContext.Provider value={value}>{children}</HubContext.Provider>;
}

export function useHub() {
  const ctx = useContext(HubContext);
  if (!ctx) throw new Error("useHub must be inside HubProvider");
  return ctx;
}

export const T: Record<Lang, Record<string, string>> = {
  en: {
    HOME: "HOME", GAMES: "GAMES", EVENTS: "EVENTS", SHOP: "SHOP",
    FOOD: "FOOD & DRINKS", CLUB: "CLUB", BLOG: "BLOG", CHAT: "CHAT",
    CONTACT: "CONTACT", LOGIN: "LOGIN", JOIN: "JOIN", LOGOUT: "LOG OUT",
    OPEN: "OPEN EVERYDAY", WHATSAPP: "WHATSAPP", INSTAGRAM: "INSTAGRAM",
    HOURS_TITLE: "OPENING HOURS", HOURS_SUB: "We are open every day!",
    SEE_YOU: "SEE YOU AT BAZINO", CLOSE: "CLOSE",
    BACK: "BACK", STAY: "STAY TUNED",
  },
  tr: {
    HOME: "ANA SAYFA", GAMES: "OYUNLAR", EVENTS: "ETKİNLİKLER", SHOP: "MAĞAZA",
    FOOD: "YİYECEK & İÇECEK", CLUB: "KULÜP", BLOG: "BLOG", CHAT: "SOHBET",
    CONTACT: "İLETİŞİM", LOGIN: "GİRİŞ", JOIN: "KATIL", LOGOUT: "ÇIKIŞ",
    OPEN: "HER GÜN AÇIK", WHATSAPP: "WHATSAPP", INSTAGRAM: "INSTAGRAM",
    HOURS_TITLE: "ÇALIŞMA SAATLERİ", HOURS_SUB: "Her gün açığız!",
    SEE_YOU: "BAZINO'DA GÖRÜŞÜRÜZ", CLOSE: "KAPAT",
    BACK: "GERİ", STAY: "TAKİPTE KAL",
  },
  fa: {
    HOME: "خانه", GAMES: "بازی‌ها", EVENTS: "رویدادها", SHOP: "فروشگاه",
    FOOD: "غذا و نوشیدنی", CLUB: "باشگاه", BLOG: "بلاگ", CHAT: "چت",
    CONTACT: "تماس", LOGIN: "ورود", JOIN: "عضویت", LOGOUT: "خروج",
    OPEN: "هر روز باز", WHATSAPP: "واتساپ", INSTAGRAM: "اینستاگرام",
    HOURS_TITLE: "ساعات کاری", HOURS_SUB: "هر روز باز هستیم!",
    SEE_YOU: "با زینو می‌بینمت", CLOSE: "بستن",
    BACK: "بازگشت", STAY: "منتظر بمانید",
  },
  ru: {
    HOME: "ГЛАВНАЯ", GAMES: "ИГРЫ", EVENTS: "СОБЫТИЯ", SHOP: "МАГАЗИН",
    FOOD: "ЕДА И НАПИТКИ", CLUB: "КЛУБ", BLOG: "БЛОГ", CHAT: "ЧАТ",
    CONTACT: "КОНТАКТЫ", LOGIN: "ВХОД", JOIN: "ВСТУПИТЬ", LOGOUT: "ВЫХОД",
    OPEN: "ОТКРЫТО КАЖДЫЙ ДЕНЬ", WHATSAPP: "WHATSAPP", INSTAGRAM: "INSTAGRAM",
    HOURS_TITLE: "ЧАСЫ РАБОТЫ", HOURS_SUB: "Мы открыты каждый день!",
    SEE_YOU: "ЖДЁМ В BAZINO", CLOSE: "ЗАКРЫТЬ",
    BACK: "НАЗАД", STAY: "СКОРО",
  },
};

export function tx(lang: Lang, key: string) {
  return T[lang][key] ?? T.en[key] ?? key;
}
