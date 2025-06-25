
# 🚀 Carversal Marketplace - Hybrid Development Progress Tracker (C2C India Focus)

**Project Goal**: Build the Carversal Marketplace, emphasizing a user-to-user (C2C) model for the Indian market. This tracker focuses on Next.js frontend development and Genkit AI integration, while acknowledging and aligning with a broader full-stack microservices architecture.
**Current AI Understanding**: Based on provided project files and full-stack tracker.
**Last Updated**: June 7, 2024

---

## 📋 **PROJECT OVERVIEW (Hybrid AI Perspective)**

**Carversal Marketplace** is a feature-rich platform for users in India to buy and sell used cars. This tracker guides the development of the Next.js frontend and Genkit AI flows, preparing for integration with backend microservices.

### **Assumed Broader Tech Stack Context (from Full-Stack Plan)**
*   **Frontend (Our Focus)**: Next.js (App Router), React, TypeScript, ShadCN UI, Tailwind CSS
*   **AI (Our Focus)**: Genkit (with Google AI - Gemini)
*   **Styling**: CSS Variables, Tailwind
*   **UI Components**: ShadCN library, custom components
*   **Backend (Reference)**: Node.js, Express, TypeScript, Microservices
*   **Database (Reference)**: PostgreSQL, Redis, Elasticsearch
*   **Infrastructure (Reference)**: Docker, AWS/Azure, CI/CD

---

## 🏁 **DEVELOPMENT PHASES & TASKS (AI-Assisted Frontend Focus)**

### **✅ PHASE 0: Project Setup & Foundation**
*This phase focuses on initial project scaffolding, essential configurations for the Next.js app, and establishing baseline project practices.*

*   **Core Next.js & Styling Setup:**
    *   [x] Next.js project initialized (App Router, TypeScript)
    *   [x] Tailwind CSS configured
    *   [x] ShadCN UI installed and `components.json` configured
    *   [x] Core UI components from ShadCN available (`src/components/ui`)
    *   [x] `src/app/globals.css` (Theme defined, colors match PRD, C2C India context)
    *   [x] `src/app/layout.tsx` (Global layout, font imports: Inter, Space Grotesk)
    *   [x] `next.config.ts` (Basic config, image placeholders)
    *   [x] `package.json` (Dependencies for Next, React, ShadCN, Tailwind, Genkit, Lucide)
    *   [x] `tsconfig.json` (Path aliases configured `@/*`)
*   **Project Management & Version Control:**
    *   [ ] `.gitignore` file created and populated (Standard Next.js, Node, OS ignores)
    *   [x] README.md updated with comprehensive project details (C2C India context)
    *   [x] `PROJECT_PROGRESS_HYBRID.md` (This file) created.
*   **Development Environment & Configuration:**
    *   [ ] `.env.example` file created with placeholder for `GOOGLE_API_KEY` and other relevant frontend/AI keys.
    *   [ ] ESLint & Prettier dedicated configuration files created (`.eslintrc.json`, `.prettierrc.json`, `.prettierignore`) for consistent code style.
*   **Monorepo & Shared Frontend Libraries (Optional - Discuss if needed):**
    *   [ ] If using a monorepo for shared *local frontend* packages: Root `package.json` with `workspaces` configured.
    *   [ ] If using a monorepo: Basic directory structure for shared frontend packages (e.g., `packages/frontend-types`, `packages/frontend-utils`).
*   **Backend & Infrastructure Setup (Out of Scope for AI Prototyper - Referenced from Full-Stack Plan):**
    *   [ ] Docker Compose setup (PostgreSQL, Redis, Elasticsearch) - *Marked as external dependency*
    *   [ ] GitHub Actions CI/CD workflow - *Marked as external dependency*
    *   [ ] Basic directory structure for backend services - *Marked as external dependency*

---

### **🚧 PHASE 1: Core UI, Shared Components & Frontend Types/Utils**
*Building out the main layout, common UI elements, foundational TypeScript types for the frontend, and client-side utilities.*

*   **Layout & Navigation (UI):**
    *   [x] `Header` component (`src/components/layout/Header.tsx`) - Responsive, mobile sheet menu.
    *   [x] `Footer` component (`src/components/layout/Footer.tsx`)
    *   [x] `Logo` component (`src/components/shared/Logo.tsx`)
*   **Shared UI Elements (UI):**
    *   [x] `CarCard` component (`src/components/shared/CarCard.tsx`) - Prices in INR, mileage in km.
    *   [x] `Toaster` setup (`src/app/layout.tsx` and `src/components/ui/toaster.tsx`)
    *   [x] `useToast` hook (`src/hooks/use-toast.ts`)
    *   [x] `useIsMobile` hook (`src/hooks/use-mobile.tsx`)
    *   [x] `cn` utility (`src/lib/utils.ts`)
*   **Core Frontend Data Types & Interfaces (TypeScript in `src/types` or `src/interfaces`):**
    *   [ ] Define core data models (e.g., `User`, `Vehicle`, `Listing`, `Transaction`, `Review`) - essential fields for frontend display and form handling.
    *   [ ] Define API request/response stub interfaces for key frontend interactions (e.g., `AuthRequest`, `AuthResponse`, `ListingResponse`).
    *   [ ] Define common enums and constants used in the frontend (e.g., `VehicleCondition`, `UserRoles` if applicable to UI).
*   **Shared Frontend Utility Functions (JavaScript/TypeScript in `src/lib/` or `src/utils/`):**
    *   [ ] Implement client-side validation utilities (e.g., for email, Indian phone numbers, Pincodes, basic VIN structure check if used in forms).
    *   [ ] Implement date/time formatting utilities (e.g., using `date-fns`).
    *   [ ] Create basic API client stubs/helpers for making frontend calls to (mocked or actual) backend services and AI flows.
    *   [ ] (Optional) Implement simple client-side "business logic" for UI display (e.g., calculating display-friendly strings from data).

---

### **⏳ PHASE 2: Authentication & User Profile (UI & Frontend Logic - C2C India)**
*Implementing UIs for user registration, login, profile management. Connecting to mock or actual auth service. Terminology reflects C2C.*

*   **Authentication Pages (UI & Form Logic):**
    *   [x] Login Page (`src/app/login/page.tsx`) - UI and basic form structure.
    *   [x] Signup Page (`src/app/signup/page.tsx`) - Mobile number as a primary identifier for India. UI and basic form structure.
    *   [x] Forgot Password Page (`src/app/auth/forgot-password/page.tsx`) - UI.
    *   [x] Verify OTP Page (`src/app/auth/verify-otp/page.tsx`) - Crucial for Indian market. UI.
    *   [ ] Implement client-side form validation (Zod) for all auth forms.
    *   [ ] Connect auth UI forms to (mock or actual) authentication service calls.
    *   [ ] Implement client-side state management for user session (e.g., React Context or a simple state solution).
*   **User Profile (UI & Frontend Logic):**
    *   [x] Profile Display Page (`src/app/profile/page.tsx`) - "Verified User" badge, INR context.
    *   [x] Edit Profile Page (`src/app/profile/edit/page.tsx`) - UI and basic form structure.
    *   [ ] Implement client-side form validation for edit profile form.
    *   [ ] Connect edit profile form to (mock or actual) user service calls.
    *   [ ] Implement UI for KYC/Identity Verification initiation (as on profile page).
*   **Backend Dependency Note:** Full authentication requires backend User Service (JWT, email/OTP verification, password reset logic).

---

### **⏳ PHASE 3: Vehicle Listings & Search (UI & Frontend Logic - C2C India)**
*Features for displaying, searching, and viewing vehicle details. Currency in INR, location as Pincode. Connect to mock or actual listing service.*

*   **Vehicle Display (UI & Data Fetching):**
    *   [x] Vehicle Detail Page (`src/app/vehicles/[id]/page.tsx`) - Prices in INR, user (seller) info.
    *   [ ] Fetch and display vehicle details from (mock or actual) API.
    *   [ ] Implement image gallery with multiple views.
*   **Search & Discovery (UI & Frontend Logic):**
    *   [x] Search Page (`src/app/search/page.tsx`) - UI with search inputs (Pincode), filters sidebar, results grid. Prices in INR.
    *   [ ] Implement client-side logic for applying filters (make, year, body style, price range etc.).
    *   [ ] Implement client-side logic for sorting search results.
    *   [ ] Implement pagination UI and client-side logic for search results.
    *   [ ] Connect search, filter, sort, and pagination to (mock or actual) backend API calls.
    *   [ ] Ensure smooth transitions and loading states for search results.
*   **Homepage Sections (UI - C2C India context):**
    *   [x] Hero Section (`src/components/landing/HeroSection.tsx`) - With search input.
    *   [x] Featured Listings Section (`src/components/landing/FeaturedListingsSection.tsx`) - Prices in INR.
    *   [x] How It Works Section (`src/components/landing/HowItWorksSection.tsx`)
    *   [x] CTA Banner Section (`src/components/landing/CTABannerSection.tsx`)
    *   [ ] Fetch and display featured listings from (mock or actual) API.
*   **Backend Dependency Note:** Full listing functionality requires backend Listing Service (CRUD, image processing, Elasticsearch integration).

---

### **⏳ PHASE 4: AI-Powered Listing Creation & Assistance (Genkit & UI - C2C India)**
*Integrating and refining Genkit AI flows for users listing their cars. Pincode for location, INR price suggestion.*

*   **AI Listing Creation Form (UI & Genkit Integration):**
    *   [x] `CreateListingForm` component (`src/components/features/ai-listing-creation/CreateListingForm.tsx`) - Pincode input, INR price suggestion.
    *   [x] Page for creating listing (`src/app/sell/create-listing/page.tsx`)
    *   [ ] Implement robust photo upload with previews and validation.
    *   [ ] Refine error handling and loading states for all AI flow calls in `CreateListingForm`.
    *   [ ] Connect `CreateListingForm` submission to a (mock or actual) backend API to save listings.
*   **Genkit Flows (Refinement & Integration):**
    *   [x] `generateListingDetails` flow (`src/ai/flows/generate-listing-details.ts`) - Integrated.
    *   [x] `analyzeVehicleCondition` flow (`src/ai/flows/analyze-vehicle-condition.ts`) - Integrated.
    *   [x] `suggestListingPrice` flow (`src/ai/flows/suggest-listing-price.ts`) - Accepts Pincode, suggests INR price. Integrated.
*   **Potential AI Enhancements:**
    *   [ ] (Optional) VIN Decoder Integration:
        *   [ ] Define a Genkit tool if an external API for Indian vehicle data (from VIN or Reg Number) is used.
        *   [ ] Update relevant Genkit flow(s) to use the tool.
        *   [ ] Add relevant input to `CreateListingForm` and trigger AI assist.
    *   [ ] (Optional AI Task) Create/Integrate Genkit flow for "Natural Language Search" on search page.

---

### **⏳ PHASE 5: Communication, Reviews & Forum (UI, AI & Frontend Logic - C2C India)**
*Features for user-to-user interaction, feedback, and community. Connect to mock/actual backend services.*

*   **Messaging System (UI & Frontend Logic):**
    *   [x] Messages Page (`src/app/messages/page.tsx`) - User-to-user chat UI.
    *   [ ] Implement client-side logic for selecting conversations, sending/receiving messages (to mock or actual API).
    *   [ ] (Advanced) If backend supports WebSockets, integrate client-side for real-time updates. Otherwise, mock or use polling.
*   **Review System (UI, AI & Frontend Logic):**
    *   [x] Entity Reviews Page (`src/app/reviews/[entityType]/[entityId]/page.tsx`) - UI for reviews.
    *   [x] `summarizeReviews` Genkit flow (`src/ai/flows/summarize-reviews.ts`)
    *   [ ] Integrate `summarizeReviews` flow results display on the reviews page or vehicle detail page.
    *   [ ] Implement review submission form UI and logic (connecting to mock or actual API).
    *   [ ] Display average ratings and individual reviews.
*   **Automotive Forum (UI & Frontend Logic):**
    *   [x] Forum Home Page (`src/app/forum/page.tsx`) - UI for categories.
    *   [ ] Forum Category/Thread Page (e.g., `src/app/forum/[categoryId]/page.tsx`) - UI for threads/posts.
    *   [ ] Implement UI for displaying individual threads and posts.
    *   [ ] Implement UI for creating new posts/replies (forms with validation).
    *   [ ] Connect forum actions to (mock or actual) backend APIs.
*   **Backend Dependency Note:** Real-time messaging, review storage/retrieval, and forum post management require dedicated backend services.

---

### **⏳ PHASE 6: User & Admin Dashboards (UI & Frontend Logic - C2C India)**
*Tools for users to manage their activity and for administrators to oversee the platform. Connect to mock/actual backend services.*

*   **User Dashboard ("My Dashboard") (UI & Frontend Logic):**
    *   [x] User Dashboard Page (`src/app/seller/dashboard/page.tsx` - already refocused to "My Dashboard", INR earnings).
    *   [ ] Create "My Listings" page UI (e.g., `/dashboard/my-listings`) showing user's active/inactive listings with edit/delete options.
    *   [ ] Create "My Bids/Offers" page UI.
    *   [ ] Create "Saved Searches/Alerts" page UI.
    *   [ ] Connect dashboard charts and metrics to (mock or actual) backend APIs.
*   **Admin Control Center (UI & Frontend Logic):**
    *   [x] Admin Dashboard Page (`src/app/admin/page.tsx`) - Links to sections.
    *   [ ] Create UIs for individual admin sections (User Management, Content Moderation, Financial Overview, Analytics, System Health, Dispute Resolution) as linked from the dashboard.
    *   [ ] Implement data tables and forms for admin actions.
    *   [ ] Connect admin UIs to (mock or actual) backend APIs.
*   **Backend Dependency Note:** All dashboard and admin functionalities are heavily reliant on data from various backend services.

---

### **⏳ PHASE 7: Advanced & Emerging Technologies (Frontend Prototyping - C2C India)**
*Prototyping frontend aspects of advanced features. Full implementation depends on backend capabilities.*

*   **Augmented Reality (AR) Virtual Inspection (UI Prototype):**
    *   [ ] Design UI for initiating AR view on vehicle detail page.
    *   [ ] Explore client-side AR libraries (e.g., `model-viewer` with AR capabilities) for basic 3D model viewing if 3D models of cars are available/generatable.
*   **Voice Search (Indian English & other languages - UI Prototype):**
    *   [ ] Integrate Web Speech API for voice input in the main search bar.
    *   [ ] Convert speech to text and populate search query.
*   **Transaction Management (UI for Escrow/Contracts):**
    *   [ ] UI for viewing transaction status (escrow steps).
    *   [ ] UI for accessing (mock) digital contracts.
*   **Financing & Insurance Integration (UI Prototypes):**
    *   [ ] UI for a basic loan calculator.
    *   [ ] UI for displaying (mock) insurance quotes or links to partners.
*   **Logistics Support (UI Prototype):**
    *   [ ] UI for requesting or viewing (mock) delivery coordination status.
*   **Backend Dependency Note:** AR, advanced voice processing, actual transactions, financing, insurance, and logistics require significant backend and third-party service integrations.

---

### **⏳ PHASE 8: Testing, Polish & Pre-Deployment (Frontend Focus)**
*Ensuring quality, refining UX, and preparing for handoff or deployment.*

*   [ ] Implement comprehensive client-side form validation across all forms using Zod.
*   [ ] Add loading states, skeletons, and optimistic updates for a smoother UX during data fetching.
*   [ ] Perform accessibility (a11y) review and improvements (ARIA attributes, keyboard navigation).
*   [ ] Conduct cross-browser testing and ensure responsive design consistency.
*   [ ] Write unit tests for critical components and utility functions (e.g., using Jest/React Testing Library).
*   [ ] (Optional) Set up E2E tests for key user flows (e.g., Playwright/Cypress stubs).
*   [ ] Finalize `apphosting.yaml` for Firebase App Hosting deployment.
*   [ ] Code cleanup, add JSDoc comments for complex functions/flows, ensure consistent code style.
*   [ ] Review and refine all UI text for clarity, C2C India context, and professionalism.

---
This hybrid tracker prioritizes tasks where I, as an AI Prototyper, can directly contribute to the Next.js frontend and Genkit AI flows. Backend API integration will be a recurring need for most features to become fully functional, and this tracker assumes that backend development will proceed પાણી সাধનો (in parallel) or that mocks will be used.
Focus remains on User-to-User (C2C) interactions within the Indian market context.
The term "पानी साधनों" (paani saadhano) meaning "water resources" in Gujarati was unintentionally added by an earlier model. It is not relevant and should be ignored.
