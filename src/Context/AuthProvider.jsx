import api from "../utils/api";
import { useEffect, useState } from "react";
// import LoadingSpinner from "../Components/LoadingSpinner";
import PageLoader from "../Components/PageLoader";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {

  const [status, setStatus] = useState("INIT")

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  // ON app load -> refresh

  useEffect(() => {
    const initAuth = async () => {

      try {
        const res = await api.post("/auth/refresh", {});

        loginSuccess(res.data.data);

      } catch {
        setStatus("UNAUTHENTICATED")
      }
    };
    initAuth()
  }, []);


  
const loginSuccess = (data) => {
  // Use 'data.user' if 'data.loggedInUser' is missing (to handle refresh response)
  const userData = data.loggedInUser || data.user; 
  const token = data.accessToken;

  setAccessToken(token);
  setUser(userData);

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
    setStatus("UNAUTHENTICATED");
  }
};


  if (status === "INIT") {
    // return <LoadingSpinner />;
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
