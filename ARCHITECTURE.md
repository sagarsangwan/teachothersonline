# TeachOthersOnline — System Architecture

TeachOthersOnline is an online tutoring platform connecting students for 1-on-1 demo classes with subject teachers, featuring admin verification and Stream-powered video rooms.

## 1. Actual Technology Stack & Versions
- **Framework**: Next.js 15.2.3 (App Router)
- **UI & Runtime**: React 18.2.0 & React-DOM 18.2.0 (*Note: Next.js 15 expects React 19 peer*)
- **Database & ORM**: PostgreSQL via Prisma 6.5.0 (`@prisma/client` currently placed in devDependencies)
- **Authentication**: Auth.js / NextAuth 5.0.0-beta.25 with `@auth/prisma-adapter` 2.7.4
- **Live Video**: `@stream-io/video-react-sdk` 1.2.9 and `@stream-io/node-sdk` 0.2.6
- **Styling & UI**: Tailwind CSS 3.4.1, Radix UI primitives, Lucide / React Icons
- **Analytics**: Microsoft Clarity integration

## 2. Top-Level Folder Structure
- `app/`: Next.js App Router root containing two root layouts:
  - `(admin)/`: Admin portal (`/admin-dashboard`) with dedicated layout and sidebar
  - `(home)/`: Public, student, and teacher routes (`/`, `/teacher-*`, `/meetings/*`, `/api/*`)
- `components/`: UI components categorized into `auth/`, `student/`, `teacher/`, `providers/`, and `ui/` (shadcn-based)
- `lib/`: Helper libraries (`prisma.js`, `isAdmin.jsx`, `isAuth.jsx`, `teacher/teacher-info.js`, `student-info.js`)
- `hooks/`: Custom React hooks (`useLoadCall.js`)
- `prisma/`: Prisma schema definition (`schema.prisma`)
- `public/`: Static SVG graphics and assets

## 3. Important Routes & Pages
- `/`: Dynamic entry page. Renders student/teacher dashboard or demo booking form depending on session role.
- `/admin-dashboard`: Admin dashboard displaying platform statistics and teacher applications table.
- `/teacher-application`: Teacher onboarding form collecting credentials, contact, and subjects.
- `/teacher-book-new-class`: Unbooked student class requests matching the teacher's registered subjects.
- `/teacher-booked-classes`: Teacher schedule containing upcoming, completed, and expired classes.
- `/teacher-dashboard`: Placeholder route (currently renders a text stub).
- `/meetings/[id]`: Interactive video classroom powered by Stream Video SDK.
- `/meetings/[id]/left`: Post-call exit screen with rejoin option.
- `/api/auth/[...nextauth]`: Auth.js Google OAuth route handler.
- `/api/student/*`: Student endpoints (`student-class-create`, `class-review`).
- `/api/teacher/*`: Teacher endpoints (`teacher-form-submission`, `book-class/[id]`, `end-class/[id]`).
- `/api/admin-dashboard/*`: Admin applicant management (`teachers/[id]`).

## 4. Prisma Models & Relationships
- `User`: Central identity. Connects 1-to-many to `Account` & `Session`, and 1-to-1 to optional `Student` and `Teacher` records.
- `Teacher`: Teacher profile (education, experience, subjects, verification status). Owns classes, reviews, and ratings.
- `Student`: Student profile (contact, subjects). Owns booked classes, ratings, and reviews.
- `OneToOneClass`: Central class record. References `Student` (mandatory) and `Teacher` (optional until accepted). Tracks `startTime`, `endTime`, `status` (via `ClassStatus` enum), and `meetingId`.
- `ClassReviewByStudent`, `ClassReviewByTeacher`, `TeacherRating`: Feedback models linked to classes and participants (with unique constraints to prevent spam).

## 5. Authentication & Role Handling
- **Auth Flow**: Users sign in exclusively via Google OAuth handled by Auth.js (`auth.js`). The session callback injects `user.id` and `user.role` into the client session.
- **Roles (`Role` enum)**:
  - `user`: Default role for all newly signed-in accounts.
  - `student`: Assigned automatically upon submitting the first demo class request.
  - `teacher`: Assigned by an admin upon approving a teacher application.
  - `admin`: Elevated platform administrator (must be set directly in the database).

## 6. Core Business Workflows
- **Teacher Application & Approval**:
  A `user` navigates to `/teacher-application`, enters education, experience, and subjects, and submits to `/api/teacher/teacher-form-submission`. A `Teacher` record is created with `verified: false`. The admin inspects the applicant at `/admin-dashboard` and toggles verification via `/api/admin-dashboard/teachers/[id]`. This flips `verified` to `true` and upgrades the user's role to `teacher`.
- **Student Booking Flow**:
  A `user` fills the `DemoClassStudent` form on `/` selecting subject, date, and phone number, posting to `/api/student/student-class-create`. If first-time, a `Student` record is created and user role becomes `student`. An unbooked `OneToOneClass` is inserted (`status: "REQUESTED"`, `teacherId: null`).
- **Teacher Acceptance Flow**:
  A verified teacher opens `/teacher-book-new-class`. The query checks for unbooked classes matching the teacher's subject list. When clicking "Book class", a request is sent to `/api/teacher/book-class/[id]`. The server invokes the Stream SDK securely to create a `private_meeting` call room, saves the `meetingId`, and sets `status: "CONFIRMED"` and `teacherId`.
- **Stream Video / Live Class Flow**:
  Participants open `/meetings/[id]`. `ClientProvider` wraps the tree and requests a signed user token from server action `getToken()`. `MeetingPage` joins the call, verifies the user is a listed call member, configures camera/microphone in `SetupUi`, and enters `MyCallUI`. When finished, the teacher clicks "End call for everyone", triggering `PUT /api/teacher/end-class/[id]` which sets `status: "COMPLETED"`.
- **Notification Flow**:
  *Not implemented.* Although claimed in the README, there is zero notification infrastructure (no websocket events, push notifications, or email alerts). Dependencies `socket.io` and `socket.io-client` are installed but unused.

## 7. Environment Variables & External Services
- **Required Variable Names**:
  - `DATABASE_URL`: PostgreSQL connection string.
  - `GOOGLE_CLIENT_ID` / `AUTH_GOOGLE_ID`: Google OAuth application client ID.
  - `GOOGLE_CLIENT_SECRET` / `AUTH_GOOGLE_SECRET`: Google OAuth client secret.
  - `AUTH_SECRET` / `NEXTAUTH_SECRET`: Secret used to sign Auth.js session tokens.
  - `NEXT_PUBLIC_STREAM_VIDEO_API_KEY`: Stream public client key.
  - `STREAM_VIDEO_API_SECRET`: Stream server-side secret for token generation.
  - `NEXT_PUBLIC_BASE_URL` (and `NEXT_PUBLIC_URL`): Base host URL for meeting links.
  - `NEXT_PUBLIC_CLARITY_PROJECT_ID`: Microsoft Clarity analytics ID.
- **External Services**:
  - Google Identity (OAuth 2.0 authentication)
  - PostgreSQL / Neon (Relational database)
  - Stream Video API (WebRTC audio/video infrastructure)
  - Microsoft Clarity (User behavior tracking)
  - Vercel (Deployment target)

## 8. Major Architectural Risks
1. **Disabled Edge Middleware**: `middlewaree.js` has a naming typo, leaving private routes without edge-level protection.
2. **React 18 / Next.js 15 Compatibility Mismatch**: Next.js 15 requires React 19. Running React 18 leads to peer dependency warnings and Turbopack issues.
3. **Database Connection Pool Exhaustion**: Handlers repeatedly call `await prisma.$disconnect()`, tearing down serverless connection pools on every request.
4. **Missing API Authorization**: Several API routes accept arbitrary updates without confirming if the authenticated caller owns the target class or teacher record.
