import api from "../utils/api";
import { useEffect, useState } from "react";
import PageLoader from "../Components/PageLoader";
import { AuthContext } from "./AuthContext";

// ─── TOKEN SECURITY STRATEGY ─────────────────────────────────────────────────
// Access token  → memory only (React state). Never persisted. XSS-safe.
// Refresh token → httpOnly cookie managed entirely by the backend.
//                 Works reliably because Vercel rewrites proxy /auth/* and
//                 /api/* to the backend on the SAME origin — so the cookie
//                 is first-party and never blocked by any browser.
// User info     → localStorage only (non-sensitive display data for fast UI).
// ─────────────────────────────────────────────────────────────────────────────

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
};

const AuthProvider = ({ children }) => {

  // Access token → memory only, NEVER localStorage
  const [accessToken, setAccessToken] = useState(null);
  // Cached user profile for instant UI render (non-sensitive)
  const [user, setUser] = useState(getStoredUser);
  // Always start as INIT — the refresh call determines real auth state
  const [status, setStatus] = useState("INIT");

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Cookie is first-party (same origin via Vercel proxy) → always sent
        const res = await api.post("/auth/refresh", {});
        loginSuccess(res.data?.data || res.data);
      } catch (error) {
        console.error("Session refresh failed:", error);
        localStorage.removeItem('user');
        setUser(null);
        setStatus("UNAUTHENTICATED");
      }
    };
    initAuth();
  }, []);

  const loginSuccess = (data) => {
    const userData = data.loggedInUser || data.user;
    const token = data.accessToken;

    // Access token → memory only (secure, lost on refresh → restored by cookie)
    setAccessToken(token);
    setUser(userData);

    // Only non-sensitive user profile data persisted for fast initial render
    if (userData) localStorage.setItem('user', JSON.stringify(userData));

    if (userData?.isEmailVerified) {
      setStatus("AUTH_VERIFIED");
    } else {
      setStatus("AUTH_UNVERIFIED");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {});
    } catch {
      console.log("Server session already cleared or expired.");
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('user');
      setStatus("UNAUTHENTICATED");
    }
  };

  if (status === "INIT") {
    return <PageLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        accessToken,
        setAccessToken,
        user,
        setUser,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
