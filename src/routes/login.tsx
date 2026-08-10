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
        <h1 className="font-display mt-3 text-3xl text-foreground">Admin Login</h1>
        <div className="gold-divider my-5" />

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
              Email or username
            </label>
            <input
              id="email"
              type="text"
              required
              autoComplete="username"
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
                autoComplete="current-password"
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

          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-[color:var(--gold)]"
            />
            Remember me
          </label>

          <button type="submit" disabled={loading} className="btn-gold flex w-full items-center justify-center rounded-full px-6 py-3 text-sm disabled:opacity-70">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Please wait..." : "Login"}
          </button>

          {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
          {notice ? <p className="text-center text-sm text-[color:var(--gold)]">{notice}</p> : null}
        </form>
      </div>
    </div>
  );

}
