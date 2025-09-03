import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginWithPassword } from "../../api/login";
import { isLoggedIn } from "../../utils/auth";
import logo from "../../assets/adani-logo.png";

export default function Login() {
  const nav = useNavigate();
  const [q] = useSearchParams();
  const redirectTo = q.get("next") || "/education";

  const [username, setUsername] = useState("hd");
  const [password, setPassword] = useState("hd");
  const [showPwd, setShowPwd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await loginWithPassword(username.trim(), password);
      if (isLoggedIn()) nav(redirectTo, { replace: true });
      else setError("Login succeeded but no session detected.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials or access denied.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[100svh] bg-[#F7F9FC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center gap-2 mb-6">
          <img src={logo} alt="Adani Foundation" className="h-10" />
          <h1 className="text-xl font-bold text-[#007BBD]">MIS Dashboard Login</h1>
        </div>

        {error ? (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error}</div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BBD]/30"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="text-xs text-[#007BBD] hover:underline"
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BBD]/30"
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#007BBD] hover:bg-[#005e8e] text-white font-semibold rounded-lg py-2 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          You’ll be signed in using either a secure session cookie or a JWT (if provided by the server).
        </p>
      </div>
    </div>
  );
}
