# TeachOthersOnline 🚀

Welcome to **TeachOthersOnline**, an innovative platform designed to bridge the gap between students and teachers through seamless online learning. Whether you're a student looking for expert guidance or a teacher wanting to share knowledge, this platform provides an efficient and interactive way to connect and learn.

---

## ✨ Features

### 🔐 Authentication & Role Selection
- **Google Authentication**: Quick and secure login via Google.
- **User Role Choice**: Select either **Student** or **Teacher** upon sign-up.

### 🎓 For Students
- **Effortless Class Booking**: Choose subjects and book classes with available teachers.
- **Flexible Scheduling**: Pick a time slot that works best for you.
- **Teacher Matching**: Your class request is visible to all teachers of the selected subject.
- **Real-time Notifications**: Get notified when a teacher accepts your booking.
- **Live Sessions via STREAM**: Attend interactive classes at your chosen time.

### 👨‍🏫 For Teachers
- **Application & Approval System**: Submit an application to become a verified teacher.
- **Admin Approval Process**: Only approved teachers get access to the dashboard.
- **Browse Student Requests**: View and accept student class bookings.
- **Engage in Live Classes**: Conduct one-on-one interactive sessions through STREAM.

### 🛠️ For Admins
- **Teacher Verification & Approval**: Review and manage teacher applications.
- **Platform Oversight**: Maintain quality and credibility of the teaching community.

---

## 🏗️ Tech Stack

- **Frontend**: Next.js (React framework)
- **Backend**: Prisma ORM for database management
- **Authentication**: Auth.js for Google-based sign-in
- **UI Library**: ShadCN for a sleek and modern interface
- **Live Communication**: STREAM for real-time class hosting
- **Styling**: TailwindCSS for responsive design

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS version)
- **PostgreSQL** (or any Prisma-supported database)
- **Google OAuth credentials**
- **STREAM API credentials**

### 🔧 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/TeachOthersOnline.git
   cd TeachOthersOnline
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file and add the following:
   ```env
   DATABASE_URL="your-database-url"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   STREAM_API_KEY="your-stream-api-key"
   STREAM_API_SECRET="your-stream-api-secret"
   ```

4. **Run database migrations**
   ```sh
   npx prisma migrate dev --name init
   ```

5. **Start the development server**
   ```sh
   npm run dev
   ```

---

## 🎭 User Journey

### 🎓 Student Flow
1. Sign in using Google.
2. Select "Student" role.
3. Browse subjects and book a class.
4. Await teacher acceptance.
5. Receive a confirmation notification.
6. Join the live class at the scheduled time via STREAM.

### 👨‍🏫 Teacher Flow
1. Sign in using Google.
2. Select "Teacher" role and submit an application.
3. Wait for admin approval.
4. Once approved, access your teacher dashboard.
5. Browse student requests and accept suitable ones.
6. Conduct the class at the scheduled time via STREAM.

### 🔧 Admin Flow
1. Sign in as an admin.
2. Review pending teacher applications.
3. Approve or reject applications based on eligibility.

---

## 🌍 Deployment
Deploy your project easily using **Vercel**:

1. Push the project to GitHub.
2. Connect your repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy with a single click.

---

## 📌 Future Enhancements
- **📢 Real-time Notifications**: Instant alerts for class bookings and approvals.
- **⏰ Automated Reminders**: Notifications for upcoming classes.
- **📹 Class Recording & Playback**: Save and revisit sessions.
- **📊 Performance Analytics**: Insights for students and teachers.
- **💬 In-App Chat**: Seamless student-teacher communication.

---

## 🛠️ Contributing
We welcome contributions! Follow these steps:
1. **Fork the repository**.
2. **Create a new feature branch** (`feature-branch`).
3. **Commit and push changes**.
4. **Open a pull request**.

---

🔗 Feel free to reach out for any queries or collaboration opportunities!

🚀 Happy Learning & Teaching with **TeachOthersOnline**! 🎓