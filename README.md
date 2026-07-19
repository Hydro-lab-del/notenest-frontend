# Nest Notes Dashboard 📝

A modern note-taking and task-management web app built with React, Vite, and Tailwind CSS. The project combines a polished landing experience with a protected dashboard where users can create, edit, organize, and manage notes through a connected API backend.

## ✨ What the app offers

- Secure authentication flow with login, registration, email verification, password reset, refresh sessions, and logout
- Protected routes for authenticated users and a dedicated dashboard experience
- Rich-text note editing with TipTap, including formatting, checklists, reminders, and background styling
- Note organization tools such as pinning, favorites, trash, restore, and permanent delete
- A profile page with account information, stats, and security-related actions
- Responsive UI with a sidebar, mobile navigation, notifications, and a floating note composer

## 🛠️ Tech stack

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 4
- TipTap editor extensions
- Axios for API requests
- Lucide React, react-hot-toast, date-fns, dompurify, and react-masonry-css

## 📁 Project structure

```text
src/
├── Components/         # Reusable UI pieces such as navbar, sidebar, note cards, and modals
├── Context/            # Auth, note, and notification state providers
├── Pages/              # Landing page, auth views, dashboard, profile, and error pages
├── utils/              # Shared API configuration
├── App.jsx             # Route setup and protected layout
└── main.jsx            # App entry point
```

## 🚀 Getting started

### Prerequisites

- Node.js 18+ recommended
- A working backend API that exposes the auth and notes endpoints

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
VITE_API_URL=http://localhost:5000
```

4. Start the development server:

```bash
npm run dev
```

The frontend will run at http://localhost:5173 by default.

## 🧪 Available scripts

```bash
npm run dev      # start the Vite development server
npm run build    # build the production bundle
npm run preview  # preview the built app locally
npm run lint     # run ESLint checks
```

## 🔗 Notes

- The app expects a backend API to be available through the configured API URL.
- Auth and note state are managed through context providers in the src/Context folder.
