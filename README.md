# Wantace Roof Estimator

A full-stack, configuration-driven roofing cost estimator built for the
Wantace assignment.

## Overview

The application has two primary experiences:

1.  **Public homeowner estimator**
    -   Loads estimator configuration dynamically from the backend.
    -   Displays active questions and options from MongoDB.
    -   Collects homeowner contact information.
    -   Calculates and displays an estimated low/high price range.
    -   Stores submitted leads.
2.  **Authenticated owner panel**
    -   Owner login protected by authentication.
    -   View submitted leads.
    -   View and edit estimator configuration.
    -   Update material rates, multipliers, fees, and other pricing
        modifiers.
    -   Activate/deactivate estimator questions.
    -   Save configuration changes as a new version rather than
        overwriting the active version.

## Tech Stack

### Frontend

-   React
-   Vite
-   React Router
-   Axios
-   Tailwind CSS

### Backend

-   Node.js
-   Express
-   Mongoose
-   MongoDB
-   JWT
-   bcryptjs

### Deployment

-   Frontend: Vercel
-   Backend: Render
-   Database: MongoDB Atlas

## Project Structure

``` text
wantace-roof-estimator/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   └── estimator/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
├── server/
│   ├── seed/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── validators/
│   └── package.json
│
├── README.md
├── DECISIONS.md
└── AI_LOG.md
```

## Core Architecture

``` text
                 ┌──────────────────────┐
                 │   React / Vite       │
                 │   Public Estimator   │
                 └──────────┬───────────┘
                            │
                            │ REST API
                            ▼
                 ┌──────────────────────┐
                 │   Express / Node.js  │
                 │                      │
                 │ Controllers          │
                 │ Services             │
                 │ Validators           │
                 │ Auth Middleware      │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │     MongoDB Atlas    │
                 │                      │
                 │ configurations       │
                 │ leads                │
                 │ users                │
                 └──────────────────────┘

                 Owner
                   │
                   ▼
             /login → /owner
                   │
                   ▼
          Authenticated REST APIs
```

## Configuration-Driven Estimator

The frontend does not hard-code the estimator questions, labels,
options, or pricing.

The flow is:

``` text
MongoDB configuration
        ↓
GET /api/config
        ↓
React
        ↓
Dynamic question renderer
        ↓
POST /api/leads
        ↓
Backend calculation
        ↓
Lead + estimate stored in MongoDB
```

This makes the estimator editable without changing frontend code.

## Configuration Versioning

Configuration changes create a new version.

For example:

``` text
v3 → inactive
v4 → active
v5 → active
```

Only one configuration is active at a time.

Historical versions are retained so that previously submitted leads can
remain associated with the configuration version used for their
estimate.

## Main API Endpoints

### Public

``` text
GET  /api/health
GET  /api/config
POST /api/leads
```

### Authentication

``` text
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Owner

``` text
GET /api/owner/config
PUT /api/owner/config
GET /api/leads/owner
```

Owner endpoints require authenticated owner access.

## Local Development

### Prerequisites

-   Node.js 20+
-   npm
-   MongoDB Atlas account or local MongoDB instance

### Backend

``` bash
cd server
npm install
```

Create `server/.env`:

``` env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
```

Seed the database:

``` bash
npm run seed
```

Start the server:

``` bash
npm run dev
```

Backend:

``` text
http://localhost:5000
```

### Frontend

``` bash
cd client
npm install
```

Create `client/.env`:

``` env
VITE_API_URL=http://localhost:5000/api
```

Start:

``` bash
npm run dev
```

Frontend:

``` text
http://localhost:5173
```

## Seeded Owner Account

For local development, the seed script creates:

``` text
Email:
owner@northline.local

Password:
WantaceDemo123!
```

Change production credentials before deployment.

## Testing the Application

### Public estimator

1.  Open `/`.
2.  Complete the dynamic estimator questions.
3.  Enter name, phone, and email.
4.  Submit the estimator.
5.  Verify the estimate is displayed.
6.  Verify the lead appears in MongoDB.

### Owner panel

1.  Open `/login`.
2.  Sign in using the owner account.
3.  Open `/owner`.
4.  Verify configuration and leads load.
5.  Change a pricing value.
6.  Save the configuration.
7.  Confirm a new configuration version is created.
8.  Open the public estimator and verify it uses the new active
    configuration.
9.  Deactivate a question and verify it disappears from the public
    estimator.
10. Log out and verify `/owner` redirects to `/login`.

## Security Notes

-   Passwords are hashed using bcrypt.
-   Authentication uses an HTTP-only JWT cookie.
-   Owner APIs require authentication and the `OWNER` role.
-   MongoDB credentials and JWT secrets are kept in environment
    variables.
-   Frontend environment variables must not contain secrets.

## Deployment

The intended deployment architecture is:

``` text
Vercel
  │
  │ HTTPS
  ▼
Render
  │
  │ MongoDB connection
  ▼
MongoDB Atlas
```

See the deployment process for environment variables, CORS, cookies,
build commands, and production verification.

## Assignment Documentation

-   `DECISIONS.md` --- important architecture and implementation
    decisions.
-   `AI_LOG.md` --- how AI assistance was used during development.
