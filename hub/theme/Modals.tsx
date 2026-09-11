import { useState } from "react";
import { DAYS, HOURS } from "./data";
import { useHub } from "./HubContext";
import { HubIcon } from "../design-system/icons";

// ── OPENING HOURS MODAL ───────────────────────────────────────────
export function HoursModal() {
  const { hoursOpen, setHoursOpen } = useHub();
  if (!hoursOpen) return null;

  return (
    <div className="hub-modal-backdrop" onClick={() => setHoursOpen(false)}>
      <div className="hub-hours-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          type="button"
          className="hub-modal-close-btn"
          onClick={() => setHoursOpen(false)}
        >
          ✕
        </button>

        {/* Modal Head */}
        <div className="hub-hours-modal-head">
          <div className="hub-hours-clock-icon">
            <HubIcon.Clock size={40} />
          </div>
          <div>
            <h2 className="hub-hours-modal-title">OPENING HOURS</h2>
            <p className="hub-hours-modal-sub">We are open every day!</p>
          </div>
        </div>

        {/* Daily Schedule Table */}
        <div className="hub-hours-table">
          {DAYS.map((d) => (
            <div key={d} className="hub-hours-row">
              <span className="hub-hours-day">{d}</span>
              <span className="hub-hours-time">{HOURS}</span>
            </div>
          ))}
        </div>

        {/* Modal Foot */}
        <div className="hub-hours-modal-foot">
          <span>🎮</span>
          <b>SEE YOU AT BAZINO!</b>
        </div>

      </div>
    </div>
  );
}

// ── REGISTRATION / AUTH MODAL (Split 2-Panel Design) ──────────────
export function AuthModal() {
  const { authOpen, setAuthOpen, setUser, flash } = useHub();
  const [mode, setMode] = useState<"register" | "login">("register");
  
  // Registration Form Fields
  const [firstName, setFirstName] = useState("Arman");
  const [lastName, setLastName] = useState("Kalantari");
  const [username, setUsername] = useState("ArmanK");
  const [dob, setDob] = useState("1998-05-12");
  const [phone, setPhone] = useState("5391123747");
  const [countryCode, setCountryCode] = useState("+90");
  const [password, setPassword] = useState("••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  if (!authOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register" && !acceptedTerms) {
      flash("Please accept the Club Rules and Privacy Policy.");
      return;
    }

    const newUser = {
      displayName: `${firstName} ${lastName}`.trim() || username || "Gamer",
      username: username || "ArmanK",
      firstName: firstName || "Arman",
      lastName: lastName || "Kalantari",
      tag: "#BZN1024",
      phone: `${countryCode} ${phone}`,
      credits: 1250,
      memberSince: "AUG 2026",
      dob: dob || "12 May 1998",
      championships: 5,
      second: 3,
      third: 7,
      points: 48,
    };

    setUser(newUser);
    setAuthOpen(false);
    flash(mode === "register" ? "🎉 Welcome to Bazino Gaming Club!" : "👋 Welcome back!");
  };

  return (
    <div className="hub-modal-backdrop" onClick={() => setAuthOpen(false)}>
      <div className="hub-auth-split-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          type="button"
          className="hub-modal-close-btn"
          onClick={() => setAuthOpen(false)}
        >
          ✕
        </button>

        {/* ── LEFT ART PANEL ── */}
        <div className="hub-auth-art-panel">
          <div className="hub-auth-art-logo">
            <HubIcon.Gamepad size={36} />
            <b>BAZINO</b>
            <small>GAMING CLUB</small>
          </div>

          <div className="hub-auth-art-tagline">
            <span>PLAY • COMPETE • BELONG</span>
          </div>

          <div className="hub-auth-controller-visual">
            <div className="hub-auth-glowing-pad">
              <span className="hub-pad-neon-glow" />
              <div className="hub-auth-quote-slogan">
                <span>Good Games</span>
                <b>Better People</b>
              </div>
            </div>
          </div>

          <div className="hub-auth-art-foot">
            <span>JOIN OUR COMMUNITY</span>
            <div className="hub-auth-dash" />
          </div>
        </div>

        {/* ── RIGHT FORM PANEL ── */}
        <div className="hub-auth-form-panel">
          <h2 className="hub-auth-title">
            {mode === "register" ? "CREATE YOUR ACCOUNT" : "LOGIN TO BAZINO"}
          </h2>
          <p className="hub-auth-subtitle">
            {mode === "register"
              ? "Join Bazino Gaming Club and be part of our community!"
              : "Enter your phone number or credentials to access your club profile."}
          </p>

          <form onSubmit={handleSubmit} className="hub-auth-form">
            
            {mode === "register" ? (
              <>
                {/* First & Last Name */}
                <div className="hub-form-row-2">
                  <div className="hub-input-wrap">
                    <span className="hub-input-icon">👤</span>
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="hub-modal-input"
                    />
                  </div>
                  <div className="hub-input-wrap">
                    <span className="hub-input-icon">👤</span>
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="hub-modal-input"
                    />
                  </div>
                </div>

                {/* Username + Availability Badge */}
                <div className="hub-input-wrap">
                  <span className="hub-input-icon">@</span>
                  <input
                    type="text"
                    required
                    placeholder="Choose a Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="hub-modal-input"
                  />
                  <span className="hub-username-avail-badge">
                    ✓ Username available
                  </span>
                </div>
                <small className="hub-input-help">6-12 characters • English letters, numbers and _ only</small>

                {/* Date of Birth */}
                <div className="hub-input-wrap">
                  <span className="hub-input-icon">📅</span>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="hub-modal-input"
                  />
                </div>

                {/* Phone Number with Country Flag */}
                <div className="hub-phone-input-group">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="hub-country-select"
                  >
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+98">🇮🇷 +98</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+7">🇷🇺 +7</option>
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="hub-modal-input hub-phone-input"
                  />
                </div>

                {/* Password & Confirm Password */}
                <div className="hub-input-wrap">
                  <span className="hub-input-icon">🔒</span>
                  <input
                    type="password"
                    required
                    placeholder="Create a Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="hub-modal-input"
                  />
                </div>
                <div className="hub-input-wrap">
                  <span className="hub-input-icon">🔒</span>
                  <input
                    type="password"
                    required
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="hub-modal-input"
                  />
                </div>

                {/* Gender Radio Buttons */}
                <div className="hub-gender-row">
                  <span className="hub-gender-label">👤 Gender:</span>
                  <label className="hub-gender-opt">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "Male"}
                      onChange={() => setGender("Male")}
                    />
                    <span>Male</span>
                  </label>
                  <label className="hub-gender-opt">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "Female"}
                      onChange={() => setGender("Female")}
                    />
                    <span>Female</span>
                  </label>
                  <label className="hub-gender-opt">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "Other"}
                      onChange={() => setGender("Other")}
                    />
                    <span>Other</span>
                  </label>
                </div>

                {/* Terms Checkbox */}
                <label className="hub-terms-checkbox">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <span>
                    I accept the <a href="/hub/rules" target="_blank">Bazino Rules</a> and <a href="/hub/privacy" target="_blank">Privacy Policy</a>
                  </span>
                </label>
              </>
            ) : (
              /* LOGIN MODE FORM */
              <>
                <div className="hub-phone-input-group">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="hub-country-select"
                  >
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+98">🇮🇷 +98</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+7">🇷🇺 +7</option>
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="hub-modal-input hub-phone-input"
                  />
                </div>
                <div className="hub-input-wrap">
                  <span className="hub-input-icon">🔒</span>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="hub-modal-input"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button type="submit" className="hub-btn-submit-account">
              {mode === "register" ? "CREATE ACCOUNT" : "LOGIN TO BAZINO"}
            </button>

            {/* Switch Mode Footer */}
            <div className="hub-auth-switch-mode">
              {mode === "register" ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="hub-link-btn"
                    onClick={() => setMode("login")}
                  >
                    Login here
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="hub-link-btn"
                    onClick={() => setMode("register")}
                  >
                    Create Account
                  </button>
                </p>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
