
# 🚀 Carversal Marketplace - AI Development Progress Tracker (India C2C Focus)

**Project Goal**: Build the Carversal Marketplace as per the provided PRD, focusing on a user-to-user (C2C) model for the Indian market.
**Current AI Understanding**: Based on files provided up to the last interaction.
**Last Updated**: June 7, 2024 (reflecting C2C India focus)

---

## 📋 **PROJECT OVERVIEW (AI Perspective)**

**Carversal Marketplace** is a feature-rich platform for users to buy and sell used cars in India, with a strong emphasis on AI-powered assistance, user experience, and trust between individuals. This tracker focuses on the Next.js frontend and Genkit AI flow development.

### **Observed Tech Stack (Frontend & AI)**
- **Frontend**: Next.js (App Router), React, TypeScript, ShadCN UI, Tailwind CSS
- **AI**: Genkit (with Google AI - Gemini 2.0 Flash)
- **Styling**: CSS Variables, Tailwind
- **UI Components**: ShadCN library, custom components
- **State Management**: Primarily React Context/Hooks (implied by ShadCN, Toaster)
- **Form Handling**: React Hook Form with Zod resolver

---

## 🏁 **DEVELOPMENT PHASES & TASKS (AI-Assisted)**

### **✅ PHASE 0: Project Setup & Foundation**
*This phase focuses on the initial project scaffolding and essential configurations.*

- [x] Next.js project initialized (App Router, TypeScript)
- [x] Tailwind CSS configured
- [x] ShadCN UI installed and `components.json` configured
- [x] Core UI components from ShadCN available (`src/components/ui`)
- [x] `src/app/globals.css` (Theme defined, colors match PRD)
- [x] `src/app/layout.tsx` (Global layout, font imports: Inter, Space Grotesk)
- [x] `next.config.ts` (Basic config, image placeholders)
- [x] `package.json` (Dependencies for Next, React, ShadCN, Tailwind, Genkit, Lucide)
- [x] `tsconfig.json` (Path aliases configured `@/*`)
- [ ] `.gitignore` file created and populated - **PENDING**
- [ ] `.env.example` file created with placeholder for `GOOGLE_API_KEY` (and others from README for backend services like DB, Auth, Storage specific to India if any) - **PENDING**
- [ ] ESLint & Prettier dedicated configuration files created (`.eslintrc.json`, `.prettierrc.json`) - **PENDING**
- [x] README.md updated with comprehensive project details (as provided by user, reviewed for C2C India context)
- [ ] Root `package.json` with `workspaces` configured (if monorepo for shared libraries is desired) - **PENDING**
- [ ] Docker Compose setup (PostgreSQL, Redis, Elasticsearch - as per main tracker) - **PENDING** (Backend/Infra focus)
- [ ] GitHub Actions CI/CD workflow - **PENDING** (DevOps focus)

---

### **🚧 PHASE 1: Core UI & Shared Components**
*Building out the main layout, navigation, and common reusable UI elements. Much of this is already substantially complete and updated for C2C India.*

- **Layout & Navigation:**
    - [x] `Header` component (`src/components/layout/Header.tsx`) - Responsive, with mobile sheet menu.
    - [x] `Footer` component (`src/components/layout/Footer.tsx`)
    - [x] `Logo` component (`src/components/shared/Logo.tsx`)
- **Shared UI Elements:**
    - [x] `CarCard` component (`src/components/shared/CarCard.tsx`) - Prices in INR, mileage in km.
    - [x] `Toaster` setup (`src/app/layout.tsx` and `src/components/ui/toaster.tsx`)
    - [x] `useToast` hook (`src/hooks/use-toast.ts`)
    - [x] `useIsMobile` hook (`src/hooks/use-mobile.tsx`)
    - [x] `cn` utility (`src/lib/utils.ts`)

---

### **⏳ PHASE 2: Authentication & User Profile (UI Focus - C2C India)**
*Implementing user registration, login, and profile management UIs. Terminology reflects user accounts.*

- **Authentication Pages (UI):**
    - [x] Login Page (`src/app/login/page.tsx`)
    - [x] Signup Page (`src/app/signup/page.tsx`) - Mobile number likely primary identifier for India.
    - [x] Forgot Password Page (`src/app/auth/forgot-password/page.tsx`)
    - [x] Verify OTP Page (`src/app/auth/verify-otp/page.tsx`) - Crucial for Indian market.
- **User Profile (UI):**
    - [x] Profile Display Page (`src/app/profile/page.tsx`) - "Verified User" badge.
    - [x] Edit Profile Page (`src/app/profile/edit/page.tsx`)
- **Tasks:**
    - [ ] Connect UI forms to (mock or actual) authentication service calls (e.g., Firebase Auth with phone OTP).
    - [ ] Implement client-side state management for user session (e.g., React Context).

---

### **⏳ PHASE 3: Vehicle Listings & Search (UI & Frontend Logic - C2C India)**
*Features related to displaying, searching, and viewing vehicle details. Currency in INR, location as Pincode.*

- **Vehicle Display:**
    - [x] Vehicle Detail Page (`src/app/vehicles/[id]/page.tsx`) - Prices in INR, seller info as user.
- **Search & Discovery:**
    - [x] Search Page (`src/app/search/page.tsx`) - UI with search inputs (Pincode), filters sidebar, results grid. Prices in INR.
    - [ ] Implement client-side logic for applying filters.
    - [ ] Implement client-side logic for sorting search results.
    - [ ] Implement pagination UI and client-side logic for search results.
    - [ ] (Optional AI Task) Create/Integrate Genkit flow for "Natural Language Search" (e.g., "used Maruti Swift under 5 lakhs in Mumbai").
- **Homepage Sections (UI is complete, C2C India context):**
    - [x] Hero Section (`src/components/landing/HeroSection.tsx`)
    - [x] Featured Listings Section (`src/components/landing/FeaturedListingsSection.tsx`) - Prices in INR.
    - [x] How It Works Section (`src/components/landing/HowItWorksSection.tsx`)
    - [x] CTA Banner Section (`src/components/landing/CTABannerSection.tsx`)
- **Tasks:**
    - [ ] Connect search, filter, sort, and pagination to (mock or actual) backend API calls.
    - [ ] Ensure smooth transitions and loading states for search results.

---

### **⏳ PHASE 4: AI-Powered Listing Creation & Assistance (Genkit & UI - C2C India)**
*Integrating and refining Genkit AI flows for users listing their cars. Pincode for location.*

- **AI Listing Creation Form:**
    - [x] `CreateListingForm` component (`src/components/features/ai-listing-creation/CreateListingForm.tsx`) - Pincode input, INR price suggestion.
    - [x] Page for creating listing (`src/app/sell/create-listing/page.tsx`)
- **Genkit Flows (Foundation Exists, Integrated into Form, India context):**
    - [x] `generateListingDetails` flow (`src/ai/flows/generate-listing-details.ts`)
    - [x] `analyzeVehicleCondition` flow (`src/ai/flows/analyze-vehicle-condition.ts`)
    - [x] `suggestListingPrice` flow (`src/ai/flows/suggest-listing-price.ts`) - Accepts Pincode, suggests INR price.
- **Tasks:**
    - [ ] Implement VIN Decoder Integration (if applicable and common for Indian cars, or focus on registration number details).
        - [ ] Define a Genkit tool if an external API is used.
        - [ ] Update relevant Genkit flow(s) to use the tool.
        - [ ] Add relevant input to `CreateListingForm` and trigger AI assist.
    - [ ] Refine error handling and loading states for AI flow calls in `CreateListingForm`.
    - [ ] Connect `CreateListingForm` submission to a (mock or actual) backend API to save listings.

---

### **⏳ PHASE 5: Communication & Reviews (UI, AI & Frontend Logic - C2C India)**
*Features for user-to-user interaction and feedback.*

- **Messaging System (UI is substantially complete):**
    - [x] Messages Page (`src/app/messages/page.tsx`) - User-to-user chat.
    - [ ] Implement client-side logic for selecting conversations and sending messages (to mock or actual API).
    - [ ] (Advanced) Implement real-time updates using client-side polling or WebSocket stubs if backend is not ready.
- **Review System (UI is substantially complete, AI flow exists):**
    - [x] Entity Reviews Page (`src/app/reviews/[entityType]/[entityId]/page.tsx`) - Reviews for cars or other users.
    - [x] `summarizeReviews` Genkit flow (`src/ai/flows/summarize-reviews.ts`)
    - [ ] Integrate `summarizeReviews` flow results display on the reviews page or vehicle detail page.
    - [ ] Implement review submission form logic (connecting to mock or actual API).
- **Automotive Forum (UI for homepage exists):**
    - [x] Forum Home Page (`src/app/forum/page.tsx`)
    - [/] Forum Category/Thread Page (e.g., `src/app/forum/[categoryId]/page.tsx`) - *Basic structure, needs specific UI for threads/posts.*
    - [ ] Implement UI for displaying individual threads and posts.
    - [ ] Implement UI for creating new posts/replies.
    - [ ] Connect forum actions to (mock or actual) backend APIs.

---

### **⏳ PHASE 6: User Dashboard & Admin (UI & Frontend Logic - C2C India)**
*Tools for users to manage their listings and for administrators to oversee the platform.*

- **User Dashboard (Replaces Seller Dashboard):**
    - [x] User Dashboard Page (`src/app/seller/dashboard/page.tsx` - to be renamed or refocused, e.g., `src/app/dashboard/my-activity/page.tsx`) - Renamed to "My Dashboard", INR earnings.
    - [ ] Create "My Listings" page UI (e.g., `/dashboard/my-listings`).
    - [ ] Connect dashboard charts and metrics to (mock or actual) backend APIs.
- **Admin Control Center:**
    - [x] Admin Dashboard Page (`src/app/admin/page.tsx`)
    - [ ] Create UIs for individual admin sections (User Management, Content Moderation, etc. as linked from dashboard).
    - [ ] Connect admin UIs to (mock or actual) backend APIs.

---

### **⏳ PHASE 7: Advanced & Emerging Technologies (PRD Future Scope - UI/Frontend Prototyping)**
*Prototyping frontend aspects of advanced features. Full implementation depends on backend capabilities.*

- [ ] **Augmented Reality (AR) Virtual Inspection:**
    - [ ] Design UI for initiating AR view.
    - [ ] Explore client-side AR libraries (e.g., model-viewer with AR capabilities).
- [ ] **Voice Search (Indian English & other languages):**
    - [ ] Integrate Web Speech API for voice input in the search bar.
    - [ ] Convert speech to text and populate search query.

*(Blockchain, IoT, full PWA offline are heavily backend/infra dependent and likely beyond typical frontend-AI scope for now)*

---

### **⏳ PHASE 8: Testing, Polish & Pre-Deployment**
*Ensuring quality, refining UX, and preparing for handoff or deployment.*

- [ ] Implement comprehensive form validation across all forms.
- [ ] Add loading states and skeletons for data-heavy pages.
- [ ] Perform accessibility (a11y) review and improvements.
- [ ] Cross-browser testing and responsive design checks.
- [ ] Write unit tests for critical components and utilities (e.g., using Jest/React Testing Library).
- [ ] (Optional) Set up E2E tests for key user flows (e.g., using Playwright/Cypress).
- [ ] Finalize `apphosting.yaml` if deploying via Firebase App Hosting.
- [ ] Code cleanup and documentation (comments, JSDoc for complex functions/flows).

---
This tracker is a guideline and can be adapted as we progress.
It prioritizes tasks where I can directly contribute to the frontend and Genkit AI flows.
Backend API integration will be a recurring need for most features to become fully functional.
Focus is on User-to-User (C2C) interactions within the Indian market context.
