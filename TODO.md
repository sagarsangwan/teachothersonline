# TeachOthersOnline — Audit Findings & Action Items

## 🔴 Priority 1: Critical Runtime Bugs & Crashes (Do First)
- [x] **Fix Fatal Crash on Teacher Booked Classes Route:** Update `teacher-booked-classes/page.js` to correctly fetch and pass `completed_classes` (instead of the misnamed `expired_classes` prop) to `<AllBookedClasses />` to prevent a `TypeError` when reading `.length`.
- [x] **Fix Teacher Application Premature Redirect & Status Check:** Remove the immediate `router.push("/")` during session load state in `teacher-application/page.js`. Fix the inverted HTTP 201 check so successful applications don't throw an error toast.
- [x] **Fix SSR Hydration Crash in Student Demo Form:** Remove synchronous `localStorage.getItem("formValue")` from the `defaultValues` in `demo-class-form.jsx` which causes SSR/hydration mismatches. Move this to a `useEffect`.
- [x] **Fix Unsafe Object Access in MeetingPage.jsx:** Add null checks before accessing `currentClass.id` and `currentCall.state.custom?.description.split(' ')` to prevent fatal exceptions when a class is invalid or description is missing. Also rename the inverted `notAllowedToJoin` variable.
- [x] **Fix HTTP Status Anti-Pattern in API Routes:** Update `NextResponse.json({ status: 400 })` to `NextResponse.json({...}, { status: 400 })` across `book-class`, `end-class`, `student-class-create`, and `class-review` routes to send correct HTTP headers instead of HTTP 200 OK for errors.
- [x] **Restore Edge Route Protection:** Rename `proxy.js` to `middleware.js` and use standard Next.js App Router matchers to properly secure `/admin-dashboard` and `/teacher-*` routes at the network edge.
- [x] **Fix Admin Dashboard Array Return:** Prevent `app/(admin)/admin-dashboard/page.js` from returning an array on database failures, which breaks Next.js App Router rendering.

## 🟠 Priority 2: Architectural & Database Schema Flaws
- [x] **Refactor Prisma Schema (Naming & Normalization):** Fix `subittedAt` typo, standardize model casing, and remove duplicated student `name`/`email` fields that already exist in the `User` model.
- [x] **Introduce `ClassStatus` Enum for Lifecycle Management:** Replace `Booked` and `completed` booleans in `OneToOneClass` with a robust `ClassStatus` enum (`REQUESTED`, `CONFIRMED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
- [x] **Add Missing Database Indexes:** Add `@@index` on foreign keys (`studentId`, `teacherId`) and queryable fields (`startTime`, `status`) to prevent sequential table scans as the platform scales.
- [x] **Implement Server-Side Video Meeting Creation:** Prevent clients from creating Stream UUIDs arbitrarily. Move Stream token and call generation into secure Next.js Server Actions.
- [x] **Enforce Unique Review Constraints:** Add `@@unique([classId, studentId])` constraints in schema to prevent students from submitting spam/duplicate reviews for the same class.
- [x] **Avoid Hardcoded Origins in DB:** Stop storing full `classlink` URLs (e.g., `http://localhost:3000/...`) in the database; store only the `meetingId` and construct the route dynamically to support multi-environment deployments.

## 🟡 Priority 3: Foundational UI/UX Redesign (Sikhao Design System)
- [ ] **Integrate Orphaned Landing Page Components:** Wire up the beautiful UI in `components/landing-page/*` to the main `/` route, replacing the raw forms currently rendered by `initialUserCheck()`.
- [ ] **Update Tailwind & Global Styling Tokens:** Add the missing CSS variables (`bg-surface-container-*`, `px-space-*`, `text-on-surface`) to `tailwind.config.js` and `globals.css` so the landing page components render with their intended styles.
- [ ] **Fix Navigation Menus & Broken URLs:** Fix the 404 `/admin-dashboard/teachers` sidebar link, populate the empty `menus = []` array in `Navbar.jsx`, and add Student dashboard links to the `UserAvatar` dropdown menu.
- [ ] **Convert Components to Idiomatic JSX:** Stop invoking React functional components as raw javascript functions (e.g., `{studentClassStatusCardCompleted(demoClass)}`) and remove invalid `"use server"` directives from client presentation files.
- [x] **Consolidate Toast Libraries:** Remove duplicate toast packages (`react-hot-toast`, `react-toastify`) and adopt standard shadcn/ui `sonner`.
- [ ] **Fix Unconditional "no classes found" Text:** Wrap the empty state footer in `all-booked-classes.jsx` with a proper `classes.length === 0` conditional so it doesn't always render at the bottom.

## 🟢 Priority 4: Missing & Requested Features (Roadmap)
- [ ] **Teacher Resume Cloud Upload:** Integrate Vercel Blob or AWS S3 to upload and store the teacher's resume instead of hardcoding `resume: ""` on form submission.
- [ ] **Interactive Availability & Calendar Scheduling:** Let teachers define their weekly available time slots, allowing students to book confirmed availability instead of guessing dates.
- [ ] **Stripe / Razorpay Payment Integration:** Implement a checkout flow for paid classes, bundles, and recurring monthly tutoring subscriptions.
- [ ] **In-Call Interactive Whiteboard:** Embed `tldraw` or `excalidraw` in the Stream video room for collaborative learning and math equation solving.
- [ ] **Class Rescheduling & Cancellation UI:** Add functional API endpoints and handlers for the dead "Cancel" and "Reassign class" buttons on the student/teacher dashboards.
- [ ] **Automated Notifications:** Implement email confirmations and reminders via Resend for bookings, acceptances, and upcoming classes (the `socket.io` dependency is currently unused).

## ⚪ Priority 5: Technical Debt & Cleanup
- [ ] **Delete Empty/Dead Files:** Remove `components/New.js` (0 bytes), `app/(home)/api/admin-dashboard/route.js` (0 bytes).
- [ ] **Remove Dead Feature Stubs:** Remove or fully implement the orphaned EditorJS page at `app/(home)/(teacher)/new-post/page.jsx`.
- [ ] **Sync README.md:** Update documentation to reflect actual environment variables (`NEXT_PUBLIC_STREAM_VIDEO_API_KEY` vs `STREAM_API_KEY`), dependencies, and implemented capabilities.
