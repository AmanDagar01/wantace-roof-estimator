# AI Usage Log

## Purpose

AI assistance was used as a development aid during the implementation of
the Wantace Roof Estimator assignment.

The developer remained responsible for reviewing, integrating, testing,
and validating the generated suggestions and code.

## Areas Where AI Assisted

### 1. Project planning

AI was used to break the assignment into implementation phases,
including:

``` text
Project setup
↓
Database and seed data
↓
Backend APIs
↓
Public estimator
↓
Authentication
↓
Owner panel
↓
Testing
↓
Deployment
```

This helped structure the implementation into smaller testable
milestones.

### 2. Database modeling

AI assisted with the MongoDB/Mongoose model structure for:

-   Users
-   Configurations
-   Leads

The configuration document was designed to store nested questions and
pricing options.

### 3. Seed data

AI helped prepare the seed script containing:

-   Northline Roofing & Exteriors configuration
-   Pricing options
-   Pitch multipliers
-   Layer tear-off values
-   Story multipliers
-   Pricing modifiers
-   Historical leads
-   Owner account

The seed script was tested locally and corrected when an asynchronous
password hashing issue was identified.


### 4. Estimate calculation

AI assisted with the implementation structure for the estimate
calculation based on the configuration values.

The calculation is performed on the backend rather than trusting values
calculated by the browser.

### 5. Dynamic React estimator

AI assisted with creating:

-   Dynamic question rendering
-   Number questions
-   Select questions
-   Progress indicator
-   Contact form
-   Estimate result
-   Loading and error states

The important architectural requirement was preserved: question content
and pricing come from the backend configuration rather than being
hard-coded into React.

### 6. Authentication

AI assisted with implementing:

-   Login endpoint
-   JWT generation
-   HTTP-only authentication cookie
-   Authentication middleware
-   Owner authorization middleware
-   `/auth/me`
-   Logout
-   Protected owner APIs

These flows were manually tested using API requests and the browser.

### 7. Owner dashboard

AI assisted with the owner interface for:

-   Configuration viewing
-   Pricing modifier editing
-   Question activation/deactivation
-   Material rate editing
-   Lead listing
-   Configuration saving

### 8. Configuration versioning

AI assisted with designing the versioning workflow:

``` text
Current active configuration
        ↓
Owner changes configuration
        ↓
Create new version
        ↓
Deactivate previous version
        ↓
New version becomes active
```

This was selected to preserve historical configuration context for
leads.

### 9. Debugging

AI was used to help diagnose development issues encountered during
implementation.
Generated suggestions were tested locally before being retained.

## Human Verification

AI-generated code was not treated as automatically correct.

The implementation was verified by running the application and testing
important flows, including:

``` text
[✓] MongoDB connection
[✓] Database seed
[✓] Public configuration API
[✓] Public lead submission
[✓] Estimate generation
[✓] Lead persistence
[✓] Owner login
[✓] Authentication protection
[✓] Owner configuration API
[✓] Owner leads API
[✓] Owner dashboard
[✓] Configuration updates
[✓] Configuration version creation
[✓] Dynamic estimator updates
```

## Example AI-Assisted Workflow

A typical development cycle was:

``` text
Requirement
    ↓
Ask AI for implementation approach
    ↓
Review generated approach
    ↓
Implement in project
    ↓
Run locally
    ↓
Inspect errors/results
    ↓
Ask AI for debugging assistance when required
    ↓
Retest
```

## Responsibility

AI was used as an assistant for planning, implementation suggestions,
debugging, and documentation.

Final implementation decisions, integration, testing, and submission
preparation remained the developer's responsibility.
