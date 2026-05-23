# Hintro Mock Dashboard Sandbox

Welcome to the **Hintro Mock Dashboard**. This repository is built as part of the Hintro Frontend Developer Internship assignment. It is designed to emulate the premium, pixel-perfect user interface designs of Hintro, connecting dynamically to real-time mock endpoints for both empty/new (`u1`) and active (`u2`) user personas.

Now featuring a **100% pixel-perfect responsive mobile view** built completely in vanilla CSS matching your attached mobile design specifications.

---

## 🚀 Tech Stack

1. **Frontend Core**:
   - **React (Vite)**: Scaffolded utilizing Vite for lightning-fast compilation, fast refresh, and minimal production bundles.
   - **Vanilla CSS**: Scoped inline `<style>` blocks in each JSX component. Free from heavy utility frameworks, using modern CSS variables, fluid responsive layouts, standard flexbox/grid, and smooth transition mechanics.
   - **Lucide Icons**: Beautiful, lightweight vector icon package providing clean, modern UI components.

2. **Backend Services**:
   - **Node.js + Express**: A local Mock API Server running on port `3001` handling all HTTP data transactions.
   - **Dynamic State Generator**: Dynamically yields randomized statistical records and call logs for persona `u2` to keep the visual charts alive.

---

## 🛠️ Installation & Setup

Launch the integrated developer sandbox (client + server running concurrently) in seconds!

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18+) installed.

### Step 1: Install Dependencies
Run the following script command in the project root folder. This will automatically install dependencies in both the React client root and the `mock-server` subdirectory:
```bash
npm run install:all
```

### Step 2: Start Client & Server Concurrently
To launch both the Node.js mock backend (port `3001`) and the Vite client dev server (port `5173`) simultaneously:
```bash
npm run dev
```

*The frontend sandbox will open automatically in your browser at `http://localhost:5173`. The backend server logs will be visible in the console.*

### Production Build
To bundle the frontend for production, run:
```bash
npm run build
```

---

## 📱 Pixel-Perfect Responsive Mobile View (`max-width: 768px`)
The entire dashboard has been thoroughly optimized for mobile screens to match your screenshot reference:
- **Apple Status Bar Mockup**: Displays a high-fidelity Apple status bar on mobile layouts showing time (`9:41`), network signals, wifi, and a battery level icon.
- **Top Header Bar**: Styled exactly like the iOS display, featuring a hamburger menu icon on the left, the page title (e.g., `"Feedback History"`) centered in the middle, and the profile avatar aligned on the right.
- **Feedback History Cards**: On mobile viewports, the desktop feedback table smoothly transforms into beautiful, spacious vertical cards:
  - White card base (`#FFFFFF`) with thin elegant borders (`1px solid #ECECEC`) and smooth rounded corners (`border-radius: 12px`).
  - Left-aligned bold title (`Feedback Title`) paired with a space-adjusted 5-star rating (using gold `#FBBF24` and light-grey `#E5E7EB` solid stars).
  - Single-line truncated soft grey description (`Had issues understanding boxy contro....`).
  - Spaced blue date (`#2563EB`) separated by a blue period (` . `) and followed by a light grey clock time (`5:00 pm`).
- **Centered Topbar Navigation**: On mobile, the active dashboard viewport title is centered perfectly in the top navigation bar.

---

## 📝 Key Design Assumptions & Details

- **Default Registered Users**: Pre-registered two sandbox users shown at the bottom of the LoginPage with frictionless click-to-autologin helpers:
  - **u1 (John Doe - Empty State)**: Represents a new user with `0` logged call history, empty status indicators, Google calendar synchronization box, and interactive onboarding walkthrough screens.
  - **u2 (Om Patel - Active State)**: Represents a premium active user, displaying live randomized sessions, professional usage indicators, and relative dates (e.g. `"2 days ago"`).
- **Tab Swapping**: Clicking tab options in the navigation sidebar seamlessly switches views without page reloads.
- **Feedback Loop Integration**: Clicking "Give Feedback" opens an overlay modal. Star ratings dynamically adjust commenting prompts (1-3 stars ask "What frustrated you?"; 4-5 stars ask "What did you like?"). On submit, ratings write directly to `localStorage` under `hintro_feedbacks`, instantly updating the **Feedback History** listing.
- **Removed User-Switch Menu**: Per specification guidelines, the user-switch selector has been completely removed from the header and sidebar after authentication, leaving the layout sleek and secure.
- **Locked Tabs**: Sidebar categories like "Knowledge Base", "Prompts", and "Boxy Controls" show warning locks in the navigation menu and open visually premium "Premium Upgrade" descriptions to reflect a realistic enterprise subscription model.
