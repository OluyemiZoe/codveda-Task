# ⚡ Advanced Savings Vault (Level 3 Full-Stack Application)

An advanced, high-performance, real-time savings application that implements a fully decoupled full-stack architecture. This project showcases **Token-Based Authentication**, **Role-Based Access Mapping**, a **GraphQL API Hub (Apollo Server)**, and **Bidirectional Real-Time Communication (Socket.io)** wrapped in a lightweight, ultra-optimized offline frontend.

---

## 🏗️ Architecture & Requirements Matrix

This project fulfills all criteria for **Level 3 (Advanced)** track milestones:

| Requirement Group | Specific Objective | Implementation Details |
| :--- | :--- | :--- |
| **Task 1: Full-Stack App** | User Authentication & Roles | Secure JWT emission via GraphQL mutations with explicit user role mapping (`user`/`admin`). |
| | Performance Optimization | Zero-compile browser architecture eliminating bundle bloat for instant paint times. |
| **Task 2: WebSockets** | Bidirectional Data Pipeline | Active `Socket.io` connection driving immediate data hydration across clients. |
| | User-Specific Notifications | Dynamic server rooms via `.join()` to securely scope micro-ledger updates to individual user IDs. |
| **Task 3: GraphQL API** | Schema Architecture | Modular TypeDefs and Resolvers powering an alternative data transport layers away from rigid REST patterns. |
| | Context Security Header | Request payload inspection to extract `Bearer` tokens for guarded route execution. |

---

## 📁 System Layout

```text
SimpleSavingsApp/
├── backend/                        # ⚙️ GraphQL & Real-Time Event Hub
│   ├── package.json
│   ├── server.js                   # Apollo Server & Socket.io Engine Initialization
│   └── src/
│       └── graphql/
│           └── schema.js           # Strongly Typed GraphQL Schemas
└── frontend/                       # 🎨 Highly Optimized Client Layer
    ├── index.html                  # App DOM Anchor Structure
    └── App.js                      # 100% Offline Core Logic & View Controller
```

---

## 🛠️ Deep-Dive Implementation Summary

### 1. GraphQL Integration (`backend/src/graphql/schema.js`)
Bypassing conventional REST constraints, the backend leverages an executable typed scheme managing financial entity updates:
* **Queries:** `getMySavings` selectively hydrates data for validated sessions.
* **Mutations:** `signupUser`, `loginUser`, `depositMoney`, and `setSavingsGoal` allow pinpoint modification constraints.

### 2. Live Socket Ledger Layer (`backend/server.js` & `frontend/App.js`)
Instead of polling the database or forcing full page reloads, a bidirectional WebSocket stream handles notifications:
* When a user emits a financial mutation, the resolver communicates through the live instance.
* The backend broadcasts `balance_updated` or `milestone_reached` events directly down into targeted client web viewports for instantaneous updates.

### 3. High-Performance Offline Client Engine (`frontend/App.js`)
To circumvent corporate proxies and restrictive internet firewalls, the frontend uses an entirely native approach:
* Implements direct browser rendering states to display the interactive authentication wrapper and system dashboards.
* Manages session preservation locally via asynchronous `localStorage` token parsing.

---

## 🚀 Local Deployment Execution Steps

Follow these exact execution procedures inside your Ubuntu development terminal shell:

### 1. Boot up the Backend Core Engine
```bash
cd ~/codveda-projects/SimpleSavingsApp/backend
npm start
```
*The terminal will initialize and print confirmation hooks showing that the system is listening for traffic on Port `4000`.*

### 2. Launch the Static Frontend View Server
Open a secondary terminal workspace tab, navigate into the client workspace, and execute the static delivery server:
```bash
cd ~/codveda-projects/SimpleSavingsApp/frontend
npx serve .
```

### 3. Run the Live Integration Test
1. Direct your browser window address bar to: **`http://localhost:3000`**
2. Click **Register** to submit a fresh username/password footprint into the volatile memory layer.
3. Input an amount under **Process Secure Deposit** and select **Deposit**.
4. The system progress metrics bar will update instantaneously, tracking your custom metrics, while the **Live WebSocket Ledger Notifications** log outputs a confirmation notice immediately.





## 🌐 Production Cloud Deployment Blueprint

To migrate this application from a local development workspace to a live cloud environment, the following enterprise hosting pattern is utilized:

### 1. Backend API & WebSocket Engine (Render / Railway)
* **Hosting Class:** Managed Container Instance (Web Service).
* **Environment Variables Required:**
  * `PORT`: `4000`
  * `JWT_SECRET`: `your_production_secure_hash`
  * `DATABASE_URL`: `your_live_mongodb_or_postgres_connection_string`
* **Deployment Trigger:** Connected directly to the project repository main branch for Automated Continuous Integration (CI/CD).

### 2. Frontend Interface (Vercel / Netlify)
* **Hosting Class:** Static Web Hosting.
* **Production Optimization:** Prior to deployment, the hardcoded local connection strings in `frontend/App.js` are updated to point to the live server instance:
  ```javascript
  const BACKEND_URL = 'https://onrender.com';
  const socket = io('https://onrender.com');
  ```
