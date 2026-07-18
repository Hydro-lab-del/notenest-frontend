# NoteNest Deployment & Git Setup Guide

This guide will walk you through setting up two clean GitHub repositories (one for your React frontend and one for your Node.js backend) and deploying them to free hosting platforms.

---

## Part 1: Setting up GitHub Repositories

Follow these steps for both directories on your computer to push them to GitHub.

### 1. Frontend Repository (`login_reviewed`)
1. Go to your GitHub dashboard and click **New Repository**.
2. Name it **`notenest-frontend`**, make it Public/Private, and click **Create repository** (do NOT initialize with README or .gitignore).
3. Open terminal/PowerShell in `D:\Desktop\login_reviewed` and run:

   ```bash
   # Initialize local git repository
   git init

   # Add all files to staging
   git add .

   # Commit the files
   git commit -m "Initial commit: React frontend"

   # Rename branch to main
   git branch -M main

   # Link to your new GitHub repository (replace with your URL)
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/notenest-frontend.git

   # Push to GitHub
   git push -u origin main
   ```

---

### 2. Backend Repository (`NOTESNEST_v4`)
1. Go to your GitHub dashboard and click **New Repository**.
2. Name it **`notenest-backend`**, and click **Create repository** (do NOT initialize with README or .gitignore).
3. Open terminal/PowerShell in `D:\Desktop\NOTESNEST_v4` and run:

   ```bash
   # Initialize local git repository
   git init

   # Add all files to staging
   git add .

   # Commit the files
   git commit -m "Initial commit: Express backend"

   # Rename branch to main
   git branch -M main

   # Link to your new GitHub repository (replace with your URL)
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/notenest-backend.git

   # Push to GitHub
   git push -u origin main
   ```

---

## Part 2: Hosting & Deployment (Free Tier)

### Step 1: Database Setup (MongoDB Atlas)
1. Sign up on [MongoDB Atlas](https://www.mongodb.com/).
2. Create a free **M0 Sandbox** cluster.
3. Under **Database Access**, create a user with a secure password.
4. Under **Network Access**, click **Add IP Address** and enter `0.0.0.0/0` (allows connection from Koyeb).
5. Go to your cluster, click **Connect** -> **Drivers**, and copy the connection string:
   `mongodb+srv://<username>:<password>@cluster.g6mmyi7.mongodb.net/Notenest_v4`

---

### Step 2: Backend Deployment (Koyeb)
Koyeb keeps your Node.js server awake 24/7 on the free tier.

1. Sign up on [Koyeb](https://www.koyeb.com/).
2. Click **Create App** and choose **GitHub**.
3. Select your **`notenest-backend`** repository.
4. In the configuration settings, add the following **Environment Variables**:
   * `NODE_ENV` = `production`
   * `PORT` = `8000`
   * `MONGO_URL` = *(Your MongoDB Atlas connection string)*
   * `ACCESS_TOKEN_SECRET` = *(Any long random string)*
   * `REFRESH_TOKEN_SECRET` = *(Any long random string)*
   * `ACCESS_TOKEN_EXPIRY` = `1d`
   * `REFRESH_TOKEN_EXPIRY` = `10d`
   * `SMTP_HOST` = `smtp-relay.brevo.com` (or your SMTP host)
   * `SMTP_PORT` = `587`
   * `SMTP_USER` = *(Your SMTP User)*
   * `SMTP_PASS` = *(Your SMTP Password)*
   * `SENDER_EMAIL` = *(Your Sender Email)*
   * `SENDER_FROM` = `NoteNest`
   * `APP_URL` = *(Temporarily leave blank or set to localhost; you will update this after deploying the frontend)*
5. Click **Deploy**. Once successfully deployed, copy the public URL provided by Koyeb (e.g., `https://notenest-backend.koyeb.app`).

---

### Step 3: Frontend Deployment (Vercel)
1. Sign up on [Vercel](https://vercel.com/) with GitHub.
2. Click **Add New** -> **Project** and import **`notenest-frontend`**.
3. Under **Environment Variables**, add:
   * `VITE_API_URL` = *(Your Koyeb backend URL)*
4. Click **Deploy**. Vercel will build the static `dist` folder and generate your frontend URL (e.g., `https://notenest-frontend.vercel.app`).

---

### Step 4: Final Connection (CORS & Cookies)
To allow the frontend and backend to talk to each other securely:
1. Copy your Vercel frontend URL (e.g., `https://notenest-frontend.vercel.app`).
2. Go to your **Koyeb Dashboard** -> select your App -> settings/environment variables.
3. Update `APP_URL` value with your **Vercel frontend URL**.
4. Save and redeploy Koyeb. 

Your NoteNest application is now fully deployed and connected!
