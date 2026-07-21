import api from "../utils/api";
import { useEffect, useState } from "react";
import PageLoader from "../Components/PageLoader";
import { AuthContext } from "./AuthContext";


const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }) => {

  // Access token lives ONLY in memory — never persisted to localStorage
  const [accessToken, setAccessToken] = useState(null);

  // Non-sensitive user info from localStorage for fast initial render
  const [user, setUser] = useState(getStoredUser);

  // Start as INIT so we always attempt a token refresh on load
  const [status, setStatus] = useState("INIT");

  // On every page load/refresh → ask the backend for a fresh access token
  // The browser automatically sends the httpOnly refresh-token cookie
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post("/auth/refresh", {});
        loginSuccess(res.data?.data || res.data);
      } catch (error) {
        console.error("Session refresh failed:", error);
        // Clear any stale user info and mark as unauthenticated
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

    // Access token → memory only (secure)
    setAccessToken(token);
    setUser(userData);

    // Only non-sensitive user profile data goes to localStorage
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
      // Wipe everything — token from memory, user info from localStorage
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
