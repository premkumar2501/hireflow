import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import hireflowLogo from "./assets/images/hireflow_logo.png";

import "./App.css";
import { clearTokens, saveTokens } from "./utils/token";
import { api } from "./api/api";
import { TokenKeys } from "./utils/enum";
import { Workspace } from "./feature/Workspace";

type User = {
  id: number;
  username: string;
  email: string;
  phoneNo: string;
  created_at?: string;
  role?: "ADMIN" | "RECRUITER" | "CANDIDATE";
};
type Tokens = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};
type RegisterResponse = { user: User; verification_token: string };
type View = "home" | "login" | "register" | "verify";

function tokenUserId(token: string): number | null {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    return Number(payload.sub) || null;
  } catch {
    return null;
  }
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#top"
      aria-label="Hireflow home"
    >
      <img className="brand-logo" src={hireflowLogo} alt="" />
      <span>hireflow</span>
    </a>
  );
}

function App() {
  const [view, setView] = useState<View>("home");
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState<RegisterResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!localStorage.getItem(TokenKeys.ACCESS_KEY) && !localStorage.getItem(TokenKeys.REFRESH_KEY))
      return;
    const token = localStorage.getItem(TokenKeys.ACCESS_KEY);
    const id = token ? tokenUserId(token) : null;
    if (id)
      api<User>(`/users/${id}`)
        .then(setUser)
        .catch(() => clearTokens());
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      if (view === "register") {
        const result = await api<RegisterResponse>("/auth/register", {
          method: "POST",
          body: JSON.stringify({
            username: form.get("username"),
            email: form.get("email"),
            phoneNo: form.get("phoneNo"),
            password: form.get("password"),
          }),
        });
        setPending(result);
        setView("verify");
      } else if (view === "verify") {
        if (!pending) throw new Error("Please start by creating your account.");
        await api<User>("/auth/verify-user", {
          method: "POST",
          body: JSON.stringify({
            id: pending.user.id,
            token: form.get("token"),
          }),
        });
        setPending(null);
        setNotice("Your email is verified. You can now log in.");
        setView("login");
      } else {
        const tokens = await api<Tokens>("/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password"),
          }),
        });
        saveTokens(tokens);
        const id = tokenUserId(tokens.access_token);
        if (!id) throw new Error("Signed in, but could not read your profile.");
        const profile = await api<User>(`/users/${id}`);
        setUser(profile);
        setView("home");
        setNotice(`Welcome back, ${profile.username}.`);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to complete your request.",
      );
    } finally {
      setBusy(false);
    }
  }

  function go(next: View) {
    setError("");
    setNotice("");
    setView(next);
  }
  function signOut() {
    clearTokens();
    setUser(null);
    setNotice("You have been signed out.");
  }

  return (
    <div className={user ? "workspace-app-shell" : "app-shell"} id="top">
      {!user && <header className="site-header">
        <Brand />
        <nav aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#for-teams">For teams</a>
        </nav>
        <div className="header-actions">
          <button className="text-button" onClick={() => go("login")}>Log in</button>
          <button className="button button-dark button-small" onClick={() => go("register")}>Get started <span>↗</span></button>
        </div>
      </header>}

      {user ? (
        <Workspace user={user} onSignOut={signOut} />
      ) : (
        <main>
          <section className="hero-section">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" /> THE FUTURE OF HIRING
              </div>
              <h1>
                Find the people
                <br />
                who <span>move you forward.</span>
              </h1>
              <p className="hero-description">
                Great teams don’t happen by accident. Hireflow brings every part
                of hiring together, so the right people can find each other.
              </p>
              <div className="hero-actions">
                <button
                  className="button button-dark"
                  onClick={() => go("register")}
                >
                  Build your team <span>↗</span>
                </button>
                <button
                  className="button button-link"
                  onClick={() => go("login")}
                >
                  I already have an account <span>→</span>
                </button>
              </div>
              <div className="proof">
                <div className="avatar-stack">
                  <span>J</span>
                  <span>M</span>
                  <span>A</span>
                  <span>+</span>
                </div>
                <span>
                  Good people. Great teams. <b>One place.</b>
                </span>
              </div>
            </div>
            <div
              className="hero-art"
              aria-label="A connected hiring team illustration"
            >
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-sun" />
              <div className="art-card art-card-top">
                <span className="mini-avatar mini-one">J</span>
                <span>
                  <b>Jordan Lee</b>
                  <small>Product designer</small>
                </span>
                <span className="match">98%</span>
              </div>
              <div className="art-card art-card-bottom">
                <span className="mini-avatar mini-two">S</span>
                <span>
                  <b>Sam Rivera</b>
                  <small>Engineering lead</small>
                </span>
                <span className="match">Great fit</span>
              </div>
              <span className="spark spark-one">✳</span>
              <span className="spark spark-two">✳</span>
              <div className="art-label">
                The right connection
                <br />
                changes everything.
              </div>
            </div>
          </section>

          <section className="trust-strip">
            <span>MADE FOR PEOPLE WHO BUILD</span>
            <div>
              <b>northstar</b>
              <b className="serif">Bloom & Co.</b>
              <b className="mono">/orbit</b>
              <b className="wide">goodwork</b>
              <b className="serif">Fieldnotes</b>
            </div>
          </section>
          <section className="how-section" id="how-it-works">
            <div className="section-intro">
              <span className="eyebrow">A BETTER WAY TO GET THERE</span>
              <h2>
                Hiring should feel
                <br />
                like a <span>human thing.</span>
              </h2>
            </div>
            <div className="steps">
              <article>
                <span className="step-number">01</span>
                <h3>Meet your next chapter</h3>
                <p>
                  Bring your opportunities and people into one thoughtful
                  workspace.
                </p>
              </article>
              <article>
                <span className="step-number">02</span>
                <h3>Make the connection</h3>
                <p>
                  Keep conversations, decisions, and your team on the same page.
                </p>
              </article>
              <article>
                <span className="step-number">03</span>
                <h3>Make good things happen</h3>
                <p>
                  Spend less time juggling tools and more time building your
                  team.
                </p>
              </article>
            </div>
          </section>
          <section className="cta-section" id="for-teams">
            <div>
              <span className="eyebrow">YOUR NEXT GREAT HIRE STARTS HERE</span>
              <h2>
                Let’s make work
                <br />
                work better.
              </h2>
            </div>
            <button
              className="button button-light"
              onClick={() => go("register")}
            >
              Get started for free <span>↗</span>
            </button>
            <span className="cta-spark">✳</span>
          </section>
        </main>
      )}

      {!user && <footer className="site-footer">
        <Brand />
        <span>Made for the work that matters.</span>
        <span>© 2026 Hireflow</span>
      </footer>}
      {notice && (
        <div className="toast" role="status">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
      {!user && view !== "home" && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) go("home");
          }}
        >
          <section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
          >
            <button
              className="modal-close"
              onClick={() => go("home")}
              aria-label="Close"
            >
              ×
            </button>
            <Brand />
            <div className="modal-heading">
              <span className="eyebrow">
                {view === "register"
                  ? "A GOOD MOVE"
                  : view === "verify"
                    ? "ONE LAST THING"
                    : "WELCOME BACK"}
              </span>
              <h2 id="auth-title">
                {view === "register"
                  ? "Let’s get you started."
                  : view === "verify"
                    ? "Verify your email."
                    : "Good to see you."}
              </h2>
              <p>
                {view === "register"
                  ? "Create your account and make room for what’s next."
                  : view === "verify"
                    ? `Enter the verification token for ${pending?.user.email}.`
                    : "Sign in to pick up where you left off."}
              </p>
            </div>
            <form onSubmit={submit} className="auth-form" key={view}>
              {view === "register" && (
                <>
                  <label>
                    Your name
                    <input
                      name="username"
                      autoComplete="name"
                      placeholder="Alex Morgan"
                      required
                      minLength={2}
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      name="phoneNo"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </label>
                </>
              )}
              {view !== "verify" && (
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                  />
                </label>
              )}
              {view === "verify" && (
                <>
                  <div className="verify-note">
                    <span>✳</span>
                    <p>
                      Your account is ready to verify. The server returned a
                      verification token, already filled in below. Email
                      delivery can be connected when mail is configured.
                    </p>
                  </div>
                  <label>
                    Verification token
                    <input
                      name="token"
                      placeholder="Paste your verification token"
                      required
                      defaultValue={pending?.verification_token}
                    />
                  </label>
                </>
              )}
              {view !== "verify" && (
                <label>
                  Password
                  <input
                    name="password"
                    type="password"
                    autoComplete={
                      view === "register" ? "new-password" : "current-password"
                    }
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                  />
                </label>
              )}
              {error && (
                <div className="form-error" role="alert">
                  {error}
                </div>
              )}
              <button
                className="button button-dark submit-button"
                type="submit"
                disabled={busy}
              >
                {busy
                  ? "One moment…"
                  : view === "register"
                    ? "Create your account"
                    : view === "verify"
                      ? "Verify and continue"
                      : "Log in"}{" "}
                <span>→</span>
              </button>
            </form>
            <div className="auth-switch">
              {view === "register" ? (
                <>
                  Already have an account?{" "}
                  <button onClick={() => go("login")}>Log in</button>
                </>
              ) : view === "verify" ? (
                <>
                  Need a new account?{" "}
                  <button
                    onClick={() => {
                      setPending(null);
                      go("register");
                    }}
                  >
                    Start again
                  </button>
                </>
              ) : (
                <>
                  New to Hireflow?{" "}
                  <button onClick={() => go("register")}>
                    Create an account
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
