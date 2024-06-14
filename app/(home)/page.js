import checkIsTeacherOrNot from "@/components/teacher/teacher-application-check";
import { auth } from "@/auth";
export default async function Home() {
  const session = await auth()
  return (
    <main className="flex  flex-col">
      {/* only show this if user role is not admin */}
      {session.user.role !== "admin" && (
        checkIsTeacherOrNot()
      )}


    </main>
  );
}
