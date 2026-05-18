# 🚀 Deploying Backend to Render & Connecting Frontend

This guide outlines the exact steps to deploy the `/server` folder of your personal portfolio project to **Render** and configure your React frontend.

---

## 📋 Table of Contents
1. [Backend Code Optimizations (Completed)](#1-backend-code-optimizations-completed)
2. [Step 1: Get a Production MongoDB Database](#step-1-get-a-production-mongodb-database)
3. [Step 2: Deploy Backend to Render](#step-2-deploy-backend-to-render)
4. [Step 3: Connect Your React Frontend](#step-3-connect-your-react-frontend)

---

## 🛠️ Backend Code Optimizations (Completed)

We have already updated your codebase to be fully production-ready:
1. **Dynamic Image Upload Path** ([`projectRoutes.js`](file:///c:/Users/srika/OneDrive/Desktop/portfolio/Personal-Portfolio/server/routes/projectRoutes.js)): Instead of hardcoding `localhost:5000`, the server now dynamically detects the host and protocol (`https` or `http`) using headers. This ensures that uploaded project images resolve properly on Render without manual configuration.
2. **Configurable API Endpoint** ([`adminService.js`](file:///c:/Users/srika/OneDrive/Desktop/portfolio/Personal-Portfolio/client/src/services/adminService.js)): The frontend now looks for `import.meta.env.VITE_API_URL`. When built in production, it will hit your Render URL; otherwise, it falls back to `localhost:5000` for development.
3. **Refactored Admin Login** ([`Login.jsx`](file:///c:/Users/srika/OneDrive/Desktop/portfolio/Personal-Portfolio/client/src/pages/admin/Login.jsx)): The direct hardcoded fetch has been refactored to use the central `adminService.login` service.

---

## 🗄️ Step 1: Get a Production MongoDB Database
Since your local MongoDB (`mongodb://localhost:27017`) cannot be reached by Render, you need a free cloud database:

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new **Shared Cluster** (Free).
3. Under **Database Access**, create a database user with a username and password.
4. Under **Network Access**, add IP Address `0.0.0.0/0` (allows Render servers to connect).
5. Go to **Clusters** ➜ **Connect** ➜ **Drivers** and copy your **connection string**. It will look like this:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   *(Make sure to replace `<password>` with your actual database user password!)*

---

## ☁️ Step 2: Deploy Backend to Render

Render fully supports monorepos and subfolders (like your `/server` folder).

### 1. Push Your Code to GitHub
Ensure all your latest changes are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure production-ready URLs and environments"
git push origin main
```

### 2. Create a Web Service on Render
1. Log in to [Render](https://render.com/).
2. Click **New +** ➜ **Web Service**.
3. Connect your **GitHub repository**.
4. Configure the Web Service settings as follows:

| Field | Configuration | Notes |
| :--- | :--- | :--- |
| **Name** | `portfolio-backend` | Choose a clean name for your service |
| **Language** | `Node` | Selected automatically |
| **Branch** | `main` | Or whichever branch has your production code |
| **Root Directory** | `server` | **CRITICAL:** This tells Render to only build inside `/server` |
| **Build Command** | `npm install` | Installs backend node modules |
| **Start Command** | `npm start` | Executes `node server.js` |

### 3. Add Environment Variables
Scroll down to the **Environment Variables** section (or go to the **Environment** tab after creation) and add the following keys:

| Key | Value | Notes |
| :--- | :--- | :--- |
| **`NODE_ENV`** | `production` | Sets the node environment to production |
| **`MONGO_URI`** | `mongodb+srv://...` | Paste your MongoDB Atlas Connection String from Step 1 |
| **`JWT_SECRET`** | `your_own_secure_secret_key` | Make it a long random string (e.g. `sri_super_secret_portfolio_key_9988`) |

5. Click **Create Web Service**. 
6. Render will install your dependencies, build, and deploy. Once finished, you will see a public URL at the top left of your Render dashboard (e.g., `https://portfolio-backend.onrender.com`).

---

## 🎨 Step 3: Connect Your React Frontend

Once your backend is running on Render, you need to point your frontend to it:

### If Deploying Frontend on Vercel (Using `vercel.json`):
1. Go to your **Vercel Dashboard**.
2. Select your project and navigate to **Settings** ➜ **Environment Variables**.
3. Add a new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend.onrender.com/api` *(Make sure to include the `/api` at the end)*
4. Redeploy the frontend project on Vercel to pick up the new variable.

### For Local Development:
You don't need to change anything! If `VITE_API_URL` is not set locally, the frontend automatically falls back to `http://localhost:5000/api` so you can continue coding locally.

---

💡 *Tip: Render's free tier services spin down after 15 minutes of inactivity. The first request after some time might take 50 seconds to load while the service spins back up. To prevent this, you can use a free pinging service like UptimeRobot to ping your backend URL every 10 minutes.*
