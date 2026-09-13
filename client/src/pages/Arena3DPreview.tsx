import React, { useEffect, useState } from "react";

declare global { interface Window { BazinoThemeSDK?: any } }

const props = {
  language: "fa", dir: "rtl", assetsBase: "/arena3d-assets/assets/",
  ts: (key:string) => ({reserve:"رزرو کن",genres:"ژانرهای بازی",lounges:"سالن‌ها",results:"نتایج اخیر",tournaments:"مسابقات",pricing:"تعرفه‌ها",staff:"تیم بازینو",location:"موقعیت ما",empty:"اطلاعات به‌زودی"} as Record<string,string>)[key] || key,
  onNavigate: (page:string) => console.info("Navigate:", page),
  gameGenres: [{title:"رقابتی",description:"رقابت حرفه‌ای و تیمی"},{title:"ماجراجویی",description:"جهان‌های تازه"},{title:"ورزشی",description:"هیجان مسابقه"},{title:"استراتژی",description:"فرمانده میدان باش"}],
  loungeSections: [{title:"PC Arena",description:"سیستم‌های قدرتمند"},{title:"Console Lounge",description:"کنسول‌های نسل جدید"},{title:"VIP Room",description:"فضای اختصاصی"}],
  matchHistory: [{title:"Night Cup",teamA:"NOVA",scoreA:3,scoreB:1,teamB:"RAVEN"},{title:"Arena League",teamA:"VIPER",scoreA:2,scoreB:2,teamB:"ORBIT"}],
  tournaments: [{title:"Bazino Open",description:"ثبت‌نام آزاد"},{title:"Weekend Clash",description:"جمعه شب"},{title:"Pro League",description:"مرحله نهایی"}],
  pricingPackages: [{title:"Starter",description:"یک ساعت بازی"},{title:"Squad",description:"پکیج گروهی"},{title:"Night Pass",description:"بازی شبانه"}],
  staffTeam: [{name:"تیم پشتیبانی",role:"همراه شما در آرنا"},{name:"مدیر مسابقات",role:"برگزاری لیگ‌ها"},{name:"تیم فنی",role:"آماده‌سازی سیستم‌ها"}],
  settings: {club_address:"Bazino Pro Gaming Club"}
};

export default function Arena3DPreview(){
  const [render, setRender] = useState<null | ((p:any)=>React.ReactNode)>(null);
  useEffect(()=>{
    const link=document.createElement("link"); link.rel="stylesheet"; link.href="/arena3d-assets/theme.css?v=persisted-1"; document.head.appendChild(link);
    window.BazinoThemeSDK={React,registerComponent:(region:string,def:any)=>{if(region==="home") setRender(()=>def.render);}};
    const script=document.createElement("script"); script.src="/arena3d-assets/theme.js?v=persisted-1"; document.body.appendChild(script);
    return ()=>{link.remove();script.remove();delete window.BazinoThemeSDK;};
  },[]);
  return render ? <>{render(props)}</> : <main style={{minHeight:"100vh",background:"#020305",color:"white",display:"grid",placeItems:"center"}}>در حال بارگذاری قالب…</main>;
}
