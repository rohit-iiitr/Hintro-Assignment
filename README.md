# Hintro Mock Dashboard Sandbox

Welcome to the **Hintro Mock Dashboard**. This repository is built as part of the Hintro Frontend Developer Internship assignment. It is designed to emulate the premium, pixel-perfect user interface designs of Hintro, connecting dynamically to real-time mock endpoints for both empty/new (`u1`) and active (`u2`) user personas.

---

## 🚀 Tech Stack & Design Choices

1. **Frontend Architecture**:
   - **React (Vite)**: Scaffolded utilizing Vite for lightning-fast dev compilations.
   - **Vanilla CSS**: Employs custom CSS custom properties (variables) to maintain global styling consistency, transitions, glassmorphic filters, and interactive overlays. Completely free from bloated utility frameworks, matching the Figma layout end-to-end.
   - **Lucide Icons**: Beautiful, highly consistent vector icon set matching Hintro's clean product feel.
   
2. **Backend Architecture**:
   - **Node.js + Express**: A self-contained Mock API Server running on port `3001` providing the complete HTTP lifecycle.
   - **Dynamic Randomized State Generator**: In line with the backend API specifications, the server dynamically yields randomized statistical records and grouped call session histories on each request for `u2` (Active User), keeping the dashboard data alive and fresh.

---

## 🛠️ Installation & Setup

You can download dependencies and launch the integrated developer sandbox (client + server running concurrently) in seconds!

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18+) installed.

### Step 1: Install Dependencies
Run the following script command in the project root folder. This will automatically install dependencies in both the React client root and the `mock-server` subdirectory:
```bash
npm run install:all
```

### Step 2: Start Client & Server Concurrently
To launch both the Node.js mock backend (port 3001) and the Vite client dev server (port 5173) simultaneously:
```bash
npm run dev
```

*The frontend sandbox will open automatically in your browser at `http://localhost:5173`. The backend server logs will be visible in the console.*

---

## 💎 Key Features & Capabilities

- **User Persona Selector (Sleek Entryway)**: On load, choose which persona to log in as:
  - **Persona 1: John Doe (`u1` - New User)**: Returns empty dashboard statistics, 0 sessions, a Google Calendar sync empty-state container, and onboarding modules.
  - **Persona 2: Om Patel (`u2` - Active Professional)**: Returns professional tier usage levels, active call session metrics, dynamic time formats (seconds converted to `Xm Ysec`), and relative dates (e.g. `2 days ago`).
- **Dynamic Onboarding View (Screen 4)**: For user `u1`, a dash toggle allows the reviewer to switch between the "Standard Dashboard View" (Screen 1) and the "How It Works Dashboard View" (Screen 4), featuring step cards, footer copyright signatures, and sidebar usage trackers.
- **Robust Client-Side Fallback**: If the Express backend server is offline or not booted, the React client automatically detects this, displays a friendly "Offline Simulation Mode" banner, and transparently emulates the server endpoints locally.
- **Persistent LocalStorage Feedback**: The sidebar feedback drawer features rating emojis, category chips, description textboxes, and anonymous toggles. On click, submissions save directly to the browser's `localStorage` and populate in the live `Feedback History` tracker tab.
- **Glassmorphic Logout Confirmation**: Standard profile dropdown trigger with a full-screen confirmation dialogue, blurring content beneath with `backdrop-filter: blur(8px)`.

---

## 🌐 Endpoint Routes Implemented

The Express server implements the following routes on `http://localhost:3001`:

| Method | Route | Description |
| :--- | :--- | :--- |
| **GET** | `/health` | Server health check validation |
| **GET** | `/api/auth/profile` | Fetches user profile card depending on `x-user-id` header |
| **GET** | `/api/auth/dashboard` | Returns usage tracking metrics & active subscription state |
| **GET** | `/api/call-sessions/stats` | Delivers aggregated meeting session counters |
| **GET** | `/api/call-sessions?limit=N` | Returns list of paginated call history logs |

---

## 📝 Key Design Assumptions & Details

- **Average Duration**: Aggregated session duration is returned by the API in raw seconds. The dashboard formats this as `Xm Ysec` (e.g., `2211` seconds $\rightarrow$ `36m 51sec`).
- **Last Session Timing**: The relative time is calculated from the array of timestamps: e.g., current time minus last meeting date $\rightarrow$ `2 days ago`.
- **Locked Tabs**: Sidebar categories like "Knowledge Base", "Prompts", and "Boxy Controls" show warning locks in the navigation menu and open visually premium "Premium Upgrade" descriptions to reflect a realistic enterprise subscription model.
