import initialUserCheck from "@/components/teacher/initial-user-check";
import { auth } from "@/auth";
export default async function Home() {
  const session = await auth()
  return (
    <main className="flex  flex-col">

      {session.user.role !== "admin" && (
        initialUserCheck()
      )}


    </main>
  );
}
