import initialUserCheck from "@/components/teacher/initial-user-check";
import { auth } from "@/auth";
export default async function Home() {
  const session = await auth()
  return (
    <div className="flex  flex-col">

      {session ? session.user.role !== "admin" ? initialUserCheck() : "admin" : initialUserCheck()}


    </div>
  );
}
