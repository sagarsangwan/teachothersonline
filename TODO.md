# TeachOthersOnline — Audit Findings & Action Items

## Critical

### 1. Inactive Edge Middleware Due to File Naming Typo
- **Classification**: Security issue / Confirmed bug
- **Evidence**: [middlewaree.js](file:///f:/teachothersonline/middlewaree.js)
- **Why it matters**: Because the file is named `middlewaree.js` (two 'e's), Next.js never runs it. Protected routes (`/admin-dashboard`, `/teacher-application`, etc.) lack network-edge authentication.
- **Recommended fix**: Rename to `middleware.js`, add proper route matchers, and protect all admin, teacher, and student dashboard paths.
- **Dependencies**: None.

### 2. Invalid `NextResponse.unauthorized()` Crashing API Handlers
- **Classification**: Confirmed bug
- **Evidence**: [app/(home)/api/student/student-class-create/route.js](file:///f:/teachothersonline/app/(home)/api/student/student-class-create/route.js#L8), [app/(home)/api/teacher/book-class/[id]/route.js](file:///f:/teachothersonline/app/(home)/api/teacher/book-class/[id]/route.js#L16), [app/(home)/api/teacher/end-class/[id]/route.js](file:///f:/teachothersonline/app/(home)/api/teacher/end-class/[id]/route.js#L16), [app/(home)/api/student/class-review/route.js](file:///f:/teachothersonline/app/(home)/api/student/class-review/route.js#L7), [app/(home)/api/admin-dashboard/teachers/[id]/route.js](file:///f:/teachothersonline/app/(home)/api/admin-dashboard/teachers/[id]/route.js#L12)
- **Why it matters**: `NextResponse.unauthorized()` is not a valid Next.js method. Unauthorized requests throw 500 runtime exceptions instead of returning 401 status codes.
- **Recommended fix**: Replace all occurrences with `NextResponse.json({ error: "Unauthorized" }, { status: 401 })`.
- **Dependencies**: None.

### 3. Missing Ownership & Authorization on Class Endpoints
- **Classification**: Security issue
- **Evidence**: [app/(home)/api/teacher/book-class/[id]/route.js](file:///f:/teachothersonline/app/(home)/api/teacher/book-class/[id]/route.js#L12-L55), [app/(home)/api/teacher/end-class/[id]/route.js](file:///f:/teachothersonline/app/(home)/api/teacher/end-class/[id]/route.js#L12-L47), [app/(home)/api/student/class-review/route.js](file:///f:/teachothersonline/app/(home)/api/student/class-review/route.js#L5-L48)
- **Why it matters**: Any authenticated user can end, modify, or review any class without verifying teacher assignment or student attendance. `POST` in `book-class` and `end-class` references an undefined variable `applicantId`, causing crashes.
- **Recommended fix**: Validate session identity against the class `teacherId` / `studentId` before modifying records, and remove broken `POST` handlers.
- **Dependencies**: Fix Auth.js session handling first.

### 4. React 18 / Next.js 15 Version Mismatch and Synchronous `params`
- **Classification**: Outdated dependency / Confirmed bug
- **Evidence**: [package.json](file:///f:/teachothersonline/package.json#L44-L52), [app/(home)/meetings/[id]/page.jsx](file:///f:/teachothersonline/app/(home)/meetings/[id]/page.jsx#L10), [app/(home)/api/admin-dashboard/teachers/[id]/route.js](file:///f:/teachothersonline/app/(home)/api/admin-dashboard/teachers/[id]/route.js#L8)
- **Why it matters**: Next.js 15 requires React 19. Running React 18 causes peer dependency conflicts and hydration anomalies. In Next.js 15, route parameters are promises; reading `params.id` without `await params` triggers warnings and runtime errors.
- **Recommended fix**: Upgrade React/React-DOM to 19 (or align Next.js to 14 LTS), and `await params` in all route handlers and dynamic pages.
- **Dependencies**: UI library compatibility check with React 19.

## Important

### 5. Subject Array JSON Parsing Failure in Matching Logic
- **Classification**: Confirmed bug
- **Evidence**: [app/(home)/(teacher)/teacher-application/page.js](file:///f:/teachothersonline/app/(home)/(teacher)/teacher-application/page.js#L82), [app/(home)/api/teacher/teacher-form-submission/route.js](file:///f:/teachothersonline/app/(home)/api/teacher/teacher-form-submission/route.js#L35-L46), [lib/teacher/teacher-info.js](file:///f:/teachothersonline/lib/teacher/teacher-info.js#L61-L64)
- **Why it matters**: The application form appends JSON-stringified subjects to FormData. The API saves it as a nested string inside an array (`['["Math"]']`), and `teacher-info.js` splits `teacher.subjects[0]` directly without JSON parsing. Teacher-student subject matching fails, and empty arrays throw an unhandled TypeError.
- **Recommended fix**: Parse `JSON.parse(formData.get("subjects"))` in the API route, store clean array elements, and add safety checks in `teacher-info.js`.
- **Dependencies**: None.

### 6. Premature `prisma.$disconnect()` Killing Serverless Connection Pool
- **Classification**: Technical debt
- **Evidence**: [lib/student-info.js](file:///f:/teachothersonline/lib/student-info.js#L41), [lib/teacher/teacher-info.js](file:///f:/teachothersonline/lib/teacher/teacher-info.js#L25), [lib/teacher/get-current-class.jsx](file:///f:/teachothersonline/components/teacher/get-current-class.jsx#L18), [app/(admin)/admin-dashboard/_components/all-user-card.jsx](file:///f:/teachothersonline/app/(admin)/admin-dashboard/_components/all-user-card.jsx#L23)
- **Why it matters**: Calling `$disconnect()` inside request functions closes database connections in serverless environments, causing latency spikes and connection failures under concurrent traffic.
- **Recommended fix**: Remove all manual `$disconnect()` calls from query helpers and routes; rely on global Prisma client singleton.
- **Dependencies**: None.

### 7. Student Rating Modal Never Renders Due to Truthy Array Check
- **Classification**: Confirmed bug
- **Evidence**: [components/student/student-demo-class-card-completed.jsx](file:///f:/teachothersonline/components/student/student-demo-class-card-completed.jsx#L51)
- **Why it matters**: `!demoClass.ClassReviewByStudent` evaluates to `false` because an empty array `[]` is truthy in JavaScript, permanently hiding the class rating dialog.
- **Recommended fix**: Update condition to `demoClass.ClassReviewByStudent?.length === 0`.
- **Dependencies**: None.

### 8. Admin Stat Cards Render Unawaited Promises in JSX
- **Classification**: Confirmed bug
- **Evidence**: [app/(admin)/admin-dashboard/_components/all-user-card.jsx](file:///f:/teachothersonline/app/(admin)/admin-dashboard/_components/all-user-card.jsx#L39), [all-student-card.jsx](file:///f:/teachothersonline/app/(admin)/admin-dashboard/_components/all-student-card.jsx#L39), [teachers/all-applicant-card.jsx](file:///f:/teachothersonline/app/(admin)/admin-dashboard/_components/teachers/all-applicant-card.jsx#L43)
- **Why it matters**: Async functions `countUsers()`, `countStudents()`, and `countTeacherApplicant()` are invoked inside JSX without `await`, rendering `[object Promise]` on screen.
- **Recommended fix**: Await database counts before rendering JSX elements.
- **Dependencies**: None.

### 9. Teacher Resume Upload Field Hardcoded to Empty String
- **Classification**: Missing feature
- **Evidence**: [app/(home)/(teacher)/teacher-application/page.js](file:///f:/teachothersonline/app/(home)/(teacher)/teacher-application/page.js#L69-L81), [app/(home)/api/teacher/teacher-form-submission/route.js](file:///f:/teachothersonline/app/(home)/api/teacher/teacher-form-submission/route.js#L32-L43)
- **Why it matters**: The client collects resume files, but the server handler ignores the file and hardcodes `resume: ""`. Admin table cannot view resumes.
- **Recommended fix**: Integrate cloud storage (e.g., Vercel Blob or AWS S3) to upload resumes and store the generated URL in Prisma.
- **Dependencies**: Storage service setup.

## Nice to have

### 10. Conflicting Next.js Config Files and Deprecated Image Config
- **Classification**: Technical debt
- **Evidence**: [next.config.js](file:///f:/teachothersonline/next.config.js), [next.config.mjs](file:///f:/teachothersonline/next.config.mjs)
- **Why it matters**: Having both `.js` and `.mjs` causes Next.js configuration collision warnings. `images.domains` is deprecated.
- **Recommended fix**: Delete `next.config.mjs` and migrate `images.domains` in `next.config.js` to `images.remotePatterns`.
- **Dependencies**: None.

### 11. README Feature & Environment Variable Discrepancies
- **Classification**: Documentation mismatch
- **Evidence**: [README.md](file:///f:/teachothersonline/README.md#L17-L73)
- **Why it matters**: README claims real-time notifications and signup role choice (neither exists), lists wrong Stream env vars (`STREAM_API_KEY` vs `NEXT_PUBLIC_STREAM_VIDEO_API_KEY`), and omits `AUTH_SECRET` and `NEXT_PUBLIC_BASE_URL`.
- **Recommended fix**: Synchronize README features and environment variable prerequisites with actual codebase implementation.
- **Dependencies**: None.

### 12. Dead Dependencies and Broken Navigation Links
- **Classification**: Technical debt
- **Evidence**: [package.json](file:///f:/teachothersonline/package.json#L13-L67), [components/ui/sidebar.jsx](file:///f:/teachothersonline/components/ui/sidebar.jsx#L34), [components/auth/user-avatar.jsx](file:///f:/teachothersonline/components/auth/user-avatar.jsx#L39), [app/(home)/(teacher)/teacher-dashboard/page.jsx](file:///f:/teachothersonline/app/(home)/(teacher)/teacher-dashboard/page.jsx)
- **Why it matters**: Unused packages (`"-"`, `"save"`, `"i"`, `"npm"`, `"socket.io"`, `"googleapis"`, `@editorjs/*`) bloat node_modules. Sidebar and avatar link to non-existent `/admin-dashboard/teachers` and `/profile` routes (404), while `/teacher-dashboard` is an empty text stub.
- **Recommended fix**: Prune dead packages, implement or remove broken navigation links, and move `@prisma/client` from devDependencies to dependencies.
- **Dependencies**: None.

### 13. Microphone Unmute Bug in Meeting Setup
- **Classification**: Confirmed bug
- **Evidence**: [app/(home)/meetings/[id]/MeetingPage.jsx](file:///f:/teachothersonline/app/(home)/meetings/[id]/MeetingPage.jsx#L105-L107)
- **Why it matters**: Toggling audio/video calls `currrentCall.camera.enable()` twice; microphone is never unmuted.
- **Recommended fix**: Change line 106 to `currrentCall.microphone.enable()`.
- **Dependencies**: None.

## Recommended implementation order
1. **Fix Critical API & Auth Crashes**: Replace invalid `NextResponse.unauthorized()` calls and handle async `params` to stabilize HTTP responses.
2. **Restore Edge Route Protection**: Rename `middlewaree.js` to `middleware.js` and add matcher rules for admin and teacher routes.
3. **Resolve Database Connection & Query Bugs**: Eliminate `$disconnect()` calls in serverless handlers, fix unawaited count promises in admin cards, and fix the `ClassReviewByStudent` array length check.
4. **Fix Core Subject Matching & Application Flow**: Normalize subject parsing between `teacher-application` and `teacher-info.js`, and verify teacher authorization on class updates.
5. **Align Dependencies & Configuration**: Resolve the React 18 / Next.js 15 peer dependency mismatch, delete `next.config.mjs`, and move `@prisma/client` to production dependencies.
6. **Implement Missing Storage & Polish UI**: Integrate cloud resume file uploads, fix the meeting microphone enable bug, and correct dead links and README documentation.
