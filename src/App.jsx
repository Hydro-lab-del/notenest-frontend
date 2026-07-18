
import ProtectedRoute from "./Components/ProtectedRoute";
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import PageLoader from "./Components/PageLoader";
import NotesGrid from "./Components/NotesGrid/NotesGrid";

const Landing = React.lazy(() => import("./Pages/Landing"));
const AuthPage = React.lazy(() => import("./Pages/AuthPage"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const VerifyEmailPage = React.lazy(() => import("./Pages/VerifyEmailPage"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const VerifyNotice = React.lazy(() => import("./Pages/VerifyNotice"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./Pages/ResetPassword"));
const Profile = React.lazy(() => import("./Pages/Profile"));

const App = () => {

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<PageLoader />}>

        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/welcome" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/verify-notice" element={<VerifyNotice />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />

          {/* --- PROTECTED DASHBOARD ROUTES --- */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>

            }
          >
            <Route index element={<NotesGrid view="all" />} />

            {/* Nested paths: */}
            <Route path="favorites" element={<NotesGrid view="favorites" />} />
            <Route path="trash" element={<NotesGrid view="trash" />} />
            <Route path="reminders" element={<NotesGrid view="reminders" />} />

            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<div className="p-8">Settings Component</div>} />
          </Route>
          {/* --- 404 FALLBACK --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
