import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Sayanti Banerjee" },
      { name: "description", content: "Secure admin login for managing the Anchor Sayanti website content." },
      { property: "og:title", content: "Admin Login | Sayanti Banerjee" },
      { property: "og:description", content: "Secure admin login for managing the Anchor Sayanti website content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

// Temporary convenience login: typing "admin" / "admin" signs into the seeded admin account.
const TEMP_ADMIN = { user: "admin", pass: "admin", email: "admin@anchorsayanti.com", password: "admin123" };

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setLoading(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        void navigate({ to: "/admin", replace: true });
      } else {
        setNotice("Account created. Check your email to confirm, then log in.");
        setMode("login");
      }
      return;
    }

    const isTempAdmin =
      email.trim().toLowerCase() === TEMP_ADMIN.user && password === TEMP_ADMIN.pass;
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: isTempAdmin ? TEMP_ADMIN.email : email,
      password: isTempAdmin ? TEMP_ADMIN.password : password,
    });
    setLoading(false);
    if (authError) {
      setError("Invalid email or password");
      return;
    }
    if (!remember) sessionStorage.setItem("admin-session-only", "1");
    void navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-[color:var(--gold)]/25 bg-black/60 p-8 shadow-2xl">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]/70">
          Anchor Sayanti
        </Link>
        <h1 className="font-display mt-3 text-3xl text-foreground">
          {mode === "login" ? "Admin Login" : "Create Account"}
        </h1>
        <div className="gold-divider my-5" />

        <div className="mb-5 grid grid-cols-2 gap-1 rounded-full border border-[color:var(--gold)]/25 p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(""); setNotice(""); }}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                mode === m ? "bg-[color:var(--gold)]/20 text-[color:var(--gold)]" : "text-muted-foreground"
              }`}
            >
              {m === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>


        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
              {mode === "login" ? "Email or username" : "Email"}
            </label>
            <input
              id="email"
              type={mode === "login" ? "text" : "email"}
              required
              autoComplete={mode === "login" ? "username" : "email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[color:var(--gold)]/25 bg-black/50 px-4 py-3 text-sm text-foreground outline-none focus:border-[color:var(--gold)]"
            />
          </div>


          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
            <div className="relative">
              <input
                id="password"
                type={show ? "text" : "password"}
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[color:var(--gold)]/25 bg-black/50 px-4 py-3 pr-11 text-sm text-foreground outline-none focus:border-[color:var(--gold)]"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[color:var(--gold)]"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === "login" ? (
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-[color:var(--gold)]"
              />
              Remember me
            </label>
          ) : null}

          <button type="submit" disabled={loading} className="btn-gold flex w-full items-center justify-center rounded-full px-6 py-3 text-sm disabled:opacity-70">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>

          {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
          {notice ? <p className="text-center text-sm text-[color:var(--gold)]">{notice}</p> : null}
          {mode === "login" ? (
            <p className="text-center text-xs text-muted-foreground">
              Temporary access: username <span className="text-[color:var(--gold)]">admin</span> / password{" "}
              <span className="text-[color:var(--gold)]">admin</span>
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );

}
