import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Mail,
  User,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { SmitLogo } from "./SmitLogo";

export const LoginPage = () => {
  const { login, portalMode, setPortalMode, showToast } = useApp();

  const [cnic, setCnic] = useState("42101-7724011-3");
  const [email, setEmail] = useState("trainer.ali@saylani.org");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isStudent = portalMode === "student";

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (isStudent) {
        login("student", { cnic, password });
      } else {
        login("trainer", { email, password });
      }
    }, 400);
  };

  const handleDemoFill = () => {
    if (isStudent) {
      setCnic("42101-7724011-3");
      setPassword("smit@student2026");
      showToast("Student credentials loaded");
    } else {
      setEmail("trainer.ali@saylani.org");
      setPassword("smit@trainer2026");
      showToast("Trainer credentials loaded");
    }
  };

  return (
    <div
      id="login-page-container"
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 select-none"
    >
      <div className="w-full max-w-[430px] flex flex-col items-center">
        {/* Top SMIT Branding */}
        <div className="mb-2">
          <SmitLogo size="large" showSubtitle={true} />
        </div>

        {/* Portal Subtitle matching screenshots */}
        <h2 className="text-lg font-medium mb-6 tracking-normal text-center">
          {isStudent ? "Student Portal" : "Trainer Portal"}
        </h2>

        <div className="w-full border rounded-2xl p-7 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-normal">Login</h1>
            <p className="text-sm mt-1.5 leading-relaxed font-normal">
              {isStudent
                ? "Kindly provide the CNIC number and password used during SMIT course registration."
                : "Kindly provide your email and password to access the trainer portal."}
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {isStudent ? (
              /* Student CNIC Input */
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  CNIC *
                </label>
                <input
                  id="login-cnic-input"
                  type="text"
                  required
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  placeholder="42101-XXXXXXX-X"
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                />
              </div>
            ) : (
              /* Trainer Email Input */
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email *
                </label>
                <input
                  id="login-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="trainer@saylani.org"
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                />
              </div>
            )}

            {/* Password Input with Visibility Toggle */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Password *
              </label>
              <div className="relative">
                <input
                  id="login-password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  id="toggle-password-visibility-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit LOGIN Button */}
            <div className="pt-2">
              <button
                id="login-submit-button"
                type="submit"
                disabled={isSubmitting}
                className="w-full border active:scale-[0.99] font-bold py-3 rounded-xl text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 rounded-full animate-spin" />
                ) : (
                  <span>LOGIN</span>
                )}
              </button>
            </div>
          </form>

          {/* Demo Helper Button */}
          <div className="mt-5 pt-4 border-t flex items-center justify-between text-xs">
            <span>Need quick access?</span>
            <button
              type="button"
              onClick={handleDemoFill}
              className=" font-medium transition-colors"
            >
              Fill Demo Info
            </button>
          </div>
        </div>

        <div className="w-full mt-3">
          <button
            id="portal-toggle-btn"
            type="button"
            onClick={() => {
              const nextMode = isStudent ? "trainer" : "student";
              setPortalMode(nextMode);
              setPassword("••••••••••••");
              showToast(
                nextMode === "trainer"
                  ? "Switched to Trainer Portal"
                  : "Switched to Student Portal",
              );
            }}
            className="w-full border text-sm font-medium py-3 rounded-2xl transition-colors text-center shadow-md active:scale-[0.99]"
          >
            {isStudent ? "Login as teacher" : "Login as student"}
          </button>
        </div>
      </div>
    </div>
  );
};
