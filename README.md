# Nest Notes & Tasks Dashboard 📝

A premium, modern, and highly interactive note-taking and task-management web application. Built with **React 19**, **Vite**, and **Tailwind CSS**, featuring responsive glassmorphism designs, real-time rich text editing, search capabilities, and a personalized user profile dashboard.

---

## ✨ Features

- **🔒 Advanced Auth & Security**: Secured login and registration flow with email verification notices, status checking, password retrieval, and route protection.
- **📝 TipTap Rich Text Editor**: Real-time formatting (Bold, Italic, Strikethrough, Underline, Bullet Lists, Highlights, Blockquotes, Undo/Redo) with customizable note background palettes.
- **✅ Interactive Todo Checklists**: Toggle task items dynamically inside card canvases with responsive state sync.
- **📌 Pins, Favorites & Trash**: Organize critical items instantly. Pin important notes, mark items as favorites, move notes to trash, restore notes, or permanently wipe out storage space.
- **📊 Real-time User Profile Dashboard**: A personalized visual metrics panel showcasing:
  - Account statistics (total notes, favorited notes, todo list ratio).
  - Dynamic todo completion progress tracker.
  - Custom note-canvas background color preference (cached via localStorage).
  - Secure credential management (change password panel).

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (VClient setup)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Text Editor**: [TipTap Rich Text Suite](https://tiptap.dev/)
- **Routing**: [React Router Dom v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Utility Libraries**: `date-fns` (for relative dates), `dompurify` (for XSS sanitization)

---

## 📂 Codebase Structure

```text
src/
├── assets/             # Global media assets & dynamic backgrounds
├── Components/
│   ├── Header/         # Dashboard header with search, notifications, & avatars
│   ├── Note/           # Note card, RichText editor integration, & modals
│   ├── NotesGrid/      # Masonry layout grid for note sorting & displaying
│   ├── SideBar/        # Desktop & mobile responsive sidebar navigations
│   └── NavItem.jsx     # Navigation menu link wrappers
│   └── PageLoader.jsx  # Loading loader suspensions
│   └── ProtectedRoute  # Route shield checking verification status
├── Context/
│   ├── AuthContext.js  # Named export for AuthContext object
│   ├── AuthProvider.jsx# State provider handling login/logout & status checks
│   ├── NoteContext.js  # Named export for NoteContext object
│   └── NoteProvider.jsx# Note CRUD logic, infinite scrolling, & sorting
├── Pages/
│   ├── AuthPage.jsx    # Sleek login & sign-up forms with sliding transitions
│   ├── Dashboard.jsx   # Nested router outlet container for the app workspace
│   ├── Landing.jsx     # Product welcome landing page
│   ├── NotFound.jsx    # Custom 404 fallback page
│   ├── Profile.jsx     # Premium user settings, stats panel, & personalization
│   ├── ResetPassword   # Token-based password recovery lander
│   └── VerifyNotice.jsx# Polling card check & verification resend panel
├── App.jsx             # Route layout setup & lazy components bundle loader
└── main.jsx            # React root mount point & context wrapper
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the project repository and navigate into it.
2. Install all dependencies:
   ```bash
   npm install
   ```

### Development Environment

To start the Vite hot-reloading development server locally:
```bash
npm run dev
```
The app will run at `http://localhost:5173`. Make sure the companion backend API server is running on `http://localhost:5000` to handle user auth & database note syncing.

### Build & Lint Checks

To run ESLint code analysis:
```bash
npm run lint
```

To compile a highly optimized production static bundle in the `dist/` directory:
```bash
npm run build
```
