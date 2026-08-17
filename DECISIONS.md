# Architecture & Implementation Decisions

## 1. MongoDB instead of a relational database

**Decision:** Use MongoDB with Mongoose.

**Reason:** The estimator configuration contains nested questions and
option objects. MongoDB maps naturally to this structure and makes
configuration documents straightforward to edit and version.

The main collections are:

``` text
users
configurations
leads
```

## 2. Configuration-driven frontend

**Decision:** Keep estimator questions and pricing in the database
instead of hard-coding them in React.

**Reason:** The owner must be able to change estimator behavior without
requiring a frontend deployment.

The React application receives:

``` text
questions
options
labels
rates
multipliers
modifiers
```

from the active configuration.

## 3. Separate public and owner APIs

**Decision:** Public estimator endpoints and owner management endpoints
are separate.

**Reason:** The homeowner should be able to retrieve the active
configuration and submit a lead without authentication, while
configuration management and lead viewing require owner authentication.

## 4. JWT authentication using an HTTP-only cookie

**Decision:** Store the JWT in an HTTP-only cookie.

**Reason:** This avoids exposing the authentication token directly to
normal JavaScript access and provides a clean browser session model.

The backend validates the cookie before allowing access to owner
endpoints.

## 5. Role-based owner authorization

**Decision:** Use an `OWNER` role and separate authentication and
authorization middleware.

**Reason:** Authentication answers "is this user logged in?" while
authorization answers "is this user allowed to perform owner actions?"

The backend therefore uses:

``` text
requireAuth
    ↓
requireOwner
    ↓
owner controller
```

## 6. Versioned configuration

**Decision:** Never overwrite the active configuration when the owner
saves changes.

**Reason:** A pricing/configuration change can affect future estimates,
but historical leads should remain traceable to the configuration
version used when they were submitted.

Example:

``` text
v3 inactive
v4 inactive
v5 active
```

Only the latest version is active.

## 7. One active configuration

**Decision:** Maintain exactly one active configuration.

**Reason:** The public estimator needs an unambiguous configuration
source. The backend deactivates the current configuration before
creating the new active version.

## 8. Backend owns estimate calculation

**Decision:** The final estimate is calculated on the backend.

**Reason:** Pricing rules should not be trusted from the browser. The
frontend collects answers, while the backend loads the active
configuration and performs the calculation.

This prevents a client from modifying rates or multipliers before
calculation.

## 9. Dynamic question renderer

**Decision:** Use a renderer based on the configuration's `type`.

``` text
number → NumberQuestion
select → SelectQuestion
```

**Reason:** This keeps the estimator extensible and avoids putting every
question directly inside the page component.

## 10. Service/controller/route separation

**Decision:** Separate routes, controllers, services, models,
middleware, and validators.

**Reason:** This keeps HTTP concerns separate from business logic and
makes the backend easier to test and extend.

The general flow is:

``` text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model / Database
```

## 11. MongoDB indexes

**Decision:** Index fields used for common lookups such as active
configuration and lead timestamps.

**Reason:** The public configuration request and owner lead list are
common operations and should remain efficient as data grows.

## 12. Frontend state management

**Decision:** Use React state and context rather than introducing a
large global state library.

**Reason:** The application has relatively small state requirements.
Authentication is shared globally, while estimator and owner
configuration state is local to their respective flows.

## 13. Axios API client

**Decision:** Use one Axios instance with a shared API base URL.

**Reason:** It centralizes the backend URL and credential behavior and
avoids repeating request configuration throughout the frontend.

## 14. Responsive UI

**Decision:** Use a mobile-first responsive layout.

**Reason:** The estimator is intended for homeowners and may be accessed
from phones. Inputs and controls are designed to remain usable on small
screens.

## 15. Deployment architecture

**Decision:** Deploy the React frontend separately from the Express
backend.

``` text
Vercel
  ↓
React frontend

Render
  ↓
Express API

MongoDB Atlas
  ↓
Database
```

**Reason:** This keeps frontend and backend deployments independent and
matches the project's full-stack architecture.

## 16. Environment variables

**Decision:** Keep environment-specific configuration outside source
code.

Examples:

``` text
MONGODB_URI
JWT_SECRET
CLIENT_URL
VITE_API_URL
```

**Reason:** Credentials, deployment URLs, and environment-specific
values should not be committed to Git.

## 17. Historical lead data

**Decision:** Seed the provided historical leads into MongoDB.

**Reason:** The owner dashboard should demonstrate that the
lead-management portion of the application works with existing data
rather than only newly submitted leads.

## 18. Error handling

**Decision:** Use centralized Express error handling and explicit
frontend loading/error states.

**Reason:** API failures should return predictable responses, while the
UI should avoid leaving users with a blank or broken screen.

## 19. Simplicity over unnecessary dependencies

**Decision:** Use the existing React, Express, MongoDB, Axios, JWT, and
bcrypt stack without introducing unnecessary infrastructure.

**Reason:** The assignment is small enough that additional
state-management, caching, or service infrastructure would add
complexity without a clear benefit.
