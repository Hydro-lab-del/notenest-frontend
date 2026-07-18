import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider.jsx";
import NoteProvider from "./Context/NoteProvider.jsx";
import NotificationProvider from "./Context/NotificationProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <NotificationProvider>
      <NoteProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NoteProvider>
    </NotificationProvider>
  </AuthProvider>
);

