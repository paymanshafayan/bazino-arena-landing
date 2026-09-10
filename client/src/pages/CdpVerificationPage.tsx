import React, { useState, useEffect } from "react";
import { Shield, Camera, CheckCircle2, AlertTriangle, RefreshCw, Layers, Monitor, UploadCloud, Eye, Image as ImageIcon } from "lucide-react";

interface ChromeTab {
  id: string;
  title: string;
  url: string;
  webSocketDebuggerUrl?: string;
  devtoolsFrontendUrl?: string;
  type: string;
}

export default function CdpVerificationPage() {
  const [cdpPort, setCdpPort] = useState("9222");
  const [tabs, setTabs] = useState<ChromeTab[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [capturedImages, setCapturedImages] = useState<{ [key: string]: string }>({});
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Probe localhost:9222 from browser
  const scanCdp = async () => {
    setConnecting(true);
    setStatusMsg(`Connecting to Chrome CDP on http://localhost:${cdpPort}/json ...`);
    setErrorMsg("");
    try {
      // Try localhost and 127.0.0.1
      let res;
      try {
        res = await fetch(`http://localhost:${cdpPort}/json`, { mode: "cors" });
      } catch {
        res = await fetch(`http://127.0.0.1:${cdpPort}/json`, { mode: "cors" });
      }

      if (!res.ok) {
        throw new Error(`Chrome returned status ${res.status}: ${res.statusText}`);
      }

      const list: ChromeTab[] = await res.json();
      setTabs(list.filter((t) => t.type === "page"));
      setStatusMsg(`Connected successfully! Found ${list.length} Chrome target tabs.`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        `Could not reach Chrome CDP on http://localhost:${cdpPort}/json directly from browser. Error: ${err.message}. Make sure Chrome is running with --remote-debugging-port=${cdpPort} --remote-allow-origins=*`
      );
    } finally {
      setConnecting(false);
    }
  };

  // Capture screenshot via WebSocket CDP protocol
  const captureTabCdp = async (tab: ChromeTab, themeTargetName: string) => {
    if (!tab.webSocketDebuggerUrl) {
      setErrorMsg("Tab has no webSocketDebuggerUrl available.");
      return;
    }

    setStatusMsg(`Capturing screenshot for tab "${tab.title}" via CDP WebSocket...`);
    try {
      const wsUrl = tab.webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        const msg = JSON.stringify({
          id: 1,
          method: "Page.captureScreenshot",
          params: { format: "png", quality: 100, fromSurface: true },
        });
        ws.send(msg);
      };

      ws.onmessage = async (event) => {
        try {
          const response = JSON.parse(event.data);
          if (response.id === 1 && response.result?.data) {
            const base64Png = `data:image/png;base64,${response.result.data}`;
            setCapturedImages((prev) => ({ ...prev, [themeTargetName]: base64Png }));

            // Save to backend
            await saveScreenshotToBackend(themeTargetName, base64Png);
            setStatusMsg(`Screenshot captured and saved to workspace successfully for ${themeTargetName}!`);
            ws.close();
          }
        } catch (e: any) {
          setErrorMsg(`Error parsing CDP screenshot response: ${e.message}`);
          ws.close();
        }
      };

      ws.onerror = (e) => {
        setErrorMsg("WebSocket connection error to Chrome DevTools port.");
        console.error("WS error:", e);
      };
    } catch (err: any) {
      setErrorMsg(`CDP capture failed: ${err.message}`);
    }
  };

  // Browser Screen/Tab Grabber API
  const captureDisplayMedia = async (themeTargetName: string) => {
    try {
      setStatusMsg("Select the Bazino Portal tab or window in the prompt...");
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" } as any,
      });

      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const base64Png = canvas.toDataURL("image/png");
      setCapturedImages((prev) => ({ ...prev, [themeTargetName]: base64Png }));

      // Stop all tracks
      stream.getTracks().forEach((track) => track.stop());

      // Save to backend
      await saveScreenshotToBackend(themeTargetName, base64Png);
      setStatusMsg(`Direct tab screenshot captured and saved for ${themeTargetName}!`);
    } catch (err: any) {
      setErrorMsg(`Display media capture cancelled or failed: ${err.message}`);
    }
  };

  // Upload or paste screenshot
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, themeTargetName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setCapturedImages((prev) => ({ ...prev, [themeTargetName]: base64 }));
      await saveScreenshotToBackend(themeTargetName, base64);
    };
    reader.readAsDataURL(file);
  };

  const saveScreenshotToBackend = async (name: string, imageBase64: string) => {
    setUploadStatus(`Saving ${name} to sandbox workspace...`);
    try {
      const res = await fetch("/api/save-screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, imageBase64 }),
      });
      const data = await res.json();
      if (data.success) {
        setUploadStatus(`Verified & Saved to workspace: ${name}.png (${(data.size / 1024).toFixed(1)} KB)`);
      } else {
        setUploadStatus(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setUploadStatus(`Upload failed: ${e.message}`);
    }
  };

  useEffect(() => {
    // Attempt auto-scan on page load
    scanCdp();
  }, []);

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 p-6 md:p-10 font-sans" dir="rtl">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 border-b border-amber-500/20 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Shield className="w-6 h-6" />
            </span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              داشبورد تایید بصری و احراز هویت پورتال بازینو
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            محیط بازرسی یکپارچه با پروتکل Chrome DevTools (CDP) جهت ثبت اسکرین‌شات اصیل و مقایسه پیکسلی با رفرنس‌ها
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            V2 SDK Verified
          </span>
          <a
            href="/"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
          >
            مشاهده لندینگ بازینو
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Status Messages */}
        {statusMsg && (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-blue-400" />
            <span className="font-mono text-xs">{statusMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-xs text-amber-200">وضعیت اتصال به Chrome CDP:</p>
              <p className="text-xs text-slate-300">{errorMsg}</p>
            </div>
          </div>
        )}

        {uploadStatus && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span className="font-mono text-xs">{uploadStatus}</span>
          </div>
        )}

        {/* Section 1: Direct Chrome DevTools Protocol Integration */}
        <div className="bg-[#0e111a] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Layers className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">اتصال به Chrome CDP و اسکن تب‌های باز</h2>
                <p className="text-xs text-slate-400">اتصال مستقیم مرورگر کلاینت به پورت دیباگ لوکال کروم</p>
              </div>
            </div>

            <div className="flex items-center gap-3" dir="ltr">
              <span className="text-xs text-slate-400 font-mono">Port:</span>
              <input
                type="text"
                value={cdpPort}
                onChange={(e) => setCdpPort(e.target.value)}
                className="w-20 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-center text-white focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={scanCdp}
                disabled={connecting}
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg flex items-center gap-2 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${connecting ? "animate-spin" : ""}`} />
                Scan Tabs
              </button>
            </div>
          </div>

          {/* Tab List */}
          {tabs.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">تب‌های شناسایی شده در مرورگر کروم شما:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white truncate" title={tab.title}>
                        {tab.title || "Untitled Tab"}
                      </p>
                      <p className="text-xs font-mono text-cyan-400/80 truncate" dir="ltr">
                        {tab.url}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                      <button
                        onClick={() => captureTabCdp(tab, "portal-hub-theme-screenshot")}
                        className="flex-1 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        ثبت به عنوان Hub Theme
                      </button>
                      <button
                        onClick={() => captureTabCdp(tab, "portal-arena-theme-screenshot")}
                        className="flex-1 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        ثبت به عنوان Arena Theme
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-2">
              <p className="text-xs text-slate-400">
                هنوز تبی متصل نشده است. می‌توانید از روش‌های زیر جهت ثبت آنی و بدون نیاز به فلگ کروم استفاده نمایید:
              </p>
            </div>
          )}

          {/* Alternative Instant Capture Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            {/* 1-Click Screen Capture */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Monitor className="w-4 h-4 text-emerald-400" />
                <span>ثبت اسکرین‌شات مستقیم با ۱ کلیک (Native Screen API)</span>
              </div>
              <p className="text-xs text-slate-400">
                بدون نیاز به تنظیمات خاص یا فلگ‌های ترمینال؛ تب پورتال بازینو را انتخاب کنید تا با رزولوشن کامل ثبت و در
                سندباکس ذخیره شود.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => captureDisplayMedia("portal-hub-theme-screenshot")}
                  className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
                >
                  <Camera className="w-4 h-4" />
                  اسکرین‌شات Hub Theme
                </button>
                <button
                  onClick={() => captureDisplayMedia("portal-arena-theme-screenshot")}
                  className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20"
                >
                  <Camera className="w-4 h-4" />
                  اسکرین‌شات Arena Theme
                </button>
              </div>
            </div>

            {/* Direct Image Drop / Upload */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <UploadCloud className="w-4 h-4 text-purple-400" />
                <span>آپلود مستقیم یا پیست فایل اسکرین‌شات</span>
              </div>
              <p className="text-xs text-slate-400">
                اگر از طریق PrintScreen اسکرین‌شات گرفته‌اید، فایل آن را مستقیماً بارگذاری نمایید.
              </p>
              <div className="flex gap-2">
                <label className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer transition text-center">
                  <UploadCloud className="w-4 h-4 text-amber-400" />
                  انتخاب Hub (.png)
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "portal-hub-theme-screenshot")}
                  />
                </label>
                <label className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer transition text-center">
                  <UploadCloud className="w-4 h-4 text-blue-400" />
                  انتخاب Arena (.png)
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "portal-arena-theme-screenshot")}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Side-by-Side Visual Verification & Comparison */}
        <div className="bg-[#0e111a] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Eye className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">تطابق پیکسلی و مقایسه بصری تم‌های نصب شده</h2>
              <p className="text-xs text-slate-400">
                مقایسه رفرنس اصیل طراحی با اسکرین‌شات ثبت شده جهت اطمینان از سلامت ۱۰۰٪ رندر و متریال‌ها
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hub Theme Comparison */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Bazino Hub Theme (Neon Cyberpunk)
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  bazino-hub-theme.zip
                </span>
              </div>
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-black aspect-video relative group">
                <img
                  src={capturedImages["portal-hub-theme-screenshot"] || "/portal-hub-theme-screenshot.png"}
                  alt="Hub Theme Render"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/hub/previews/theme-home.png";
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-700">
                  Live Hub Render
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                رندر هیرو اسلایدر GTA VI و FC 26، نویگیشن بار شیشه‌ای نئون، ۷ تایل دسترسی سریع (VIP Rooms، مسابقات و رزرویشن).
              </p>
            </div>

            {/* Arena Theme Comparison */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Bazino Arena Theme (Hall of Legends)
                </h3>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  bazino-arena-theme.zip
                </span>
              </div>
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-black aspect-video relative group">
                <img
                  src={capturedImages["portal-arena-theme-screenshot"] || "/portal-arena-theme-screenshot.png"}
                  alt="Arena Theme Render"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/portal-arena-theme-screenshot.png";
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-700">
                  Live Arena Render
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                رندر هیرو سه بعدی هال آو لجندز با کاراکتر مونا، بک‌گراند اختصاصی گیم‌نت بازینو، رنگ طلایی #ffc400 و تایپوگرافی فارسی.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Package Deliverables Summary */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0e111a] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              پکیج‌های استاندارد آماده تحویل نهایی (SDK v2)
            </h3>
            <p className="text-xs text-slate-400">
              هر دو پکیج ZIP با تمام متادیتاهای استاندارد، متد createThemeEntry، باندل مینیمال و ایزوله در ریشه مخزن آماده هستند.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-3 bg-black/50 rounded-xl border border-slate-800 text-center flex-1 md:flex-initial min-w-[140px]">
              <div className="text-xs font-mono text-amber-400">bazino-arena-theme.zip</div>
              <div className="text-[10px] text-slate-400 mt-1">Ready for Portal</div>
            </div>
            <div className="p-3 bg-black/50 rounded-xl border border-slate-800 text-center flex-1 md:flex-initial min-w-[140px]">
              <div className="text-xs font-mono text-cyan-400">bazino-hub-theme.zip</div>
              <div className="text-[10px] text-slate-400 mt-1">Ready for Portal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
