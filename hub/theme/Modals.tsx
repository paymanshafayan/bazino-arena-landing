import { useState } from "react";
import { DAYS, HOURS } from "./data";
import { DEMO_USER, tx, useHub } from "./HubContext";
import authArt from "./assets/auth-controller.jpg";

export function HoursModal() {
  const { hoursOpen, setHoursOpen, lang } = useHub();
  if (!hoursOpen) return null;
  return (
    <div className="hub-modal-bg" onClick={() => setHoursOpen(false)}>
      <div className="hub-modal is-hours hub-neon-box hub-neon-box--magenta" onClick={(e) => e.stopPropagation()}>
        <button className="hub-x" type="button" onClick={() => setHoursOpen(false)}>✕</button>
        <h2 style={{ display: "flex", alignItems: "center", gap: 10 }}>🕐 {tx(lang, "HOURS_TITLE")}</h2>
        <p className="sub">{tx(lang, "HOURS_SUB")}</p>
        <div className="hub-hours-list">
          {DAYS.map((d) => (
            <div key={d}><span>{d}</span><b>{HOURS}</b></div>
          ))}
        </div>
        <button className="hub-cta" type="button" onClick={() => setHoursOpen(false)}>{tx(lang, "SEE_YOU")}</button>
      </div>
    </div>
  );
}

export function AuthModal() {
  const { authOpen, authMode, setAuthOpen, setUser, flash, lang } = useHub();
  const [step, setStep] = useState<"phone" | "code" | "password">(authMode === "password" ? "password" : "phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  if (!authOpen) return null;

  const close = () => {
    setAuthOpen(false);
    setStep("phone");
    setCode("");
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 8) {
      flash("Enter a valid phone number");
      return;
    }
    setStep("code");
    flash("Demo OTP sent — use 123456");
  };

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() !== "123456") {
      flash("Wrong code. Demo code is 123456");
      return;
    }
    setUser({ ...DEMO_USER, phone });
    flash("Welcome to Bazino");
    close();
  };

  const passwordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !pass) {
      flash("Username and password required");
      return;
    }
    setUser({ ...DEMO_USER, username: userName, displayName: userName });
    flash(`Welcome back, ${userName}`);
    close();
  };

  return (
    <div className="hub-modal-bg" onClick={close}>
      <div className="hub-modal hub-neon-box hub-neon-box--magenta" onClick={(e) => e.stopPropagation()}>
        <div className="hub-modal-art" style={{ backgroundImage: `url(${authArt})` }}>
          <div className="hub-logo-word"><b>BAZINO</b><small>GAMING CLUB</small></div>
          <p style={{ color: "#c5ceee", letterSpacing: "0.2em", fontSize: 11 }}>PLAY · COMPETE · BELONG</p>
        </div>
        <div className="hub-modal-body">
          <button className="hub-x" type="button" onClick={close}>✕</button>
          {step === "phone" && (
            <form onSubmit={send}>
              <h2>LOGIN TO YOUR ACCOUNT</h2>
              <p className="sub">OTP is the portal path — first success creates the account.</p>
              <div className="hub-field">
                <label>PHONE NUMBER</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 5xx xxx xx xx" />
              </div>
              <button className="hub-cta" type="submit">SEND CODE</button>
              <p className="hub-switch">
                Have a password?{" "}
                <button type="button" onClick={() => setStep("password")}>Login with password</button>
              </p>
            </form>
          )}
          {step === "code" && (
            <form onSubmit={verify}>
              <h2>ENTER OTP</h2>
              <p className="sub">Code sent to {phone || "your phone"} (demo: 123456)</p>
              <div className="hub-field">
                <label>VERIFICATION CODE</label>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
              </div>
              <button className="hub-cta" type="submit">{tx(lang, "LOGIN")}</button>
              <p className="hub-switch"><button type="button" onClick={() => setStep("phone")}>{tx(lang, "BACK")}</button></p>
            </form>
          )}
          {step === "password" && (
            <form onSubmit={passwordLogin}>
              <h2>PASSWORD LOGIN</h2>
              <p className="sub">For staff and members who set a permanent password.</p>
              <div className="hub-field">
                <label>USERNAME</label>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="hub-field">
                <label>PASSWORD</label>
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
              </div>
              <button className="hub-cta" type="submit">{tx(lang, "LOGIN")}</button>
              <p className="hub-switch"><button type="button" onClick={() => setStep("phone")}>Use OTP instead</button></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
