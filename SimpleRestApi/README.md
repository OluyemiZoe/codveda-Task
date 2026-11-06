# ☁️ React Product Catalog Admin (Full-Stack REST API)

A full-stack, secure inventory management application built using **Node.js, Express, React, and native MongoDB Atlas**. This project has been fully migrated away from an ORM layer to utilize native database driver architecture, maintaining a strict 3-layer separation of concerns.

---

## 🚀 Level 2 (Intermediate) Requirements Fulfillment

### Task 1: Frontend with a JavaScript Framework (React)
* **Modern Framework Setup:** Frontend engineered entirely in **React** using functional components.
* **State Management:** Tracks global inventory, loading statuses, error captures, and authorization states reactively using `useState` and `useEffect` hooks.
* **Asynchronous API Client:** Interfaces with backend routes using the native browser `fetch` API, wrapped inside proxy rules to communicate across network ports seamlessly.
* **Component-Based Development:** Discretely separates UI blocks into reusable structural layout files:
  * `<Login />`: Independent authentication portal.
  * `<ProductForm />`: Handles input validation and asset construction payloads.
  * `<ProductItem />`: Dynamic collection card with discrete context action bindings.

### Task 2: Authentication and Authorization
* **Password Security:** Hashes user account passwords asynchronously using `bcryptjs` with a cost factor of 10 salts before persisting records to the database.
* **JWT Engine:** Utilizes `jsonwebtoken` to sign unique, secure identity markers expiring in 1 hour on login.
* **Token Storage:** Frontend catches response strings on successful login and stores tokens securely inside the browser's `localStorage` layer.
* **Role-Based Access Control (RBAC):** Backend endpoints are fortified with custom middleware layers (`authenticateToken`, `authorizeRoles`). Public users can view the catalog, but mutations (`POST`, `PUT`, `DELETE`) strictly require a validated token tied to an `admin` role.

---

## 📂 Project Architecture Map

```text
SimpleRestApi/
├── src/
│   ├── config/
│   │   └── database.js            # Direct MongoClient pool connection helper
│   ├── controllers/
│   │   ├── auth.controller.js     # Orchestrates login execution & JWT creation
│   │   └── product.controller.js  # Directs product request logic mappings
│   ├── middleware/
│   │   └── auth.middleware.js     # Validates JWT tokens & shields route roles
│   ├── models/
│   │   ├── product.model.js       # Asynchronous native product MongoDB queries
│   │   └── user.model.js          # Handles user registrations & password salting
│   ├── routes/
│   │   ├── auth.routes.js         # Public identity path endpoints
│   │   └── product.routes.js      # Authenticated/RBAC product path rules
│   └── app.js                     # Configures Express middleware, CORS, and static file routing
├── server.js                      # Root application entry point (Boots DB before server listening)
└── package.json
```

---

## 🛠️ Installation & Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js** and **npm** installed on your system.

### 2. Backend Environment Variables
Create a `.env` file in the root backend directory or ensure your connection string configuration is active inside `src/config/database.js`:
```env
MONGODB_URI=mongodb+srv://zoeinspired1609_db_user:<YOUR_PASSWORD>@cluster0.mnouqmn.mongodb.net/
PORT=3000
```

### 3. Installation
Navigate to your project root directories and install the respective dependencies:

**Backend Setup:**
```bash
cd SimpleRestApi
npm install
```

**Frontend Setup:**
```bash
cd ../react-frontend
npm install
```

---

## 🏃 Running the Application

### Option A: Unified Mode (Express serving compiled React static production code)
1. Navigate to your frontend workspace and build the static distribution bundle:
   ```bash
   cd react-frontend
   npm run build
   ```
2. Head back to your backend workspace and fire up the unified server:
   ```bash
   cd ../SimpleRestApi
   npm start
   ```
3. Open your web browser and navigate directly to: **`http://localhost:3000`**

### Option B: Local Hot-Reload Development Mode (Two separate terminals)
1. **Terminal 1 (Backend):** Start the Express server on port 3000:
   ```bash
   cd SimpleRestApi
   npm start
   ```
2. **Terminal 2 (Frontend):** Start Vite's rapid dev workspace:
   ```bash
   cd react-frontend
   npm run dev
   ```
3. Open your browser and navigate to: **`http://localhost:5173`** *(Vite automatically proxies `/api` network queries straight to port 3000 behind the scenes)*.

---

## 🧪 Testing the Security Workflow Matrix

1. **Create an Admin Profile:** Send a `POST` request using Postman to `http://localhost:3000/api/auth/signup` with the payload below:
   ```json
   {
     "username": "admin_zoe",
     "password": "SecurePassword123",
     "role": "admin"
  }
   ```
2. **Authenticate via the UI:** Load the application in your browser, enter these exact credentials into the dashboard login panel form, and submit.
3. **Verify DB Permissions:** Once inside the dashboard layout grid, add items via the product form or drop them using the **Delete** button to watch mutations update natively inside your MongoDB Atlas cloud database collection!
