import initialUserCheck from "@/components/teacher/initial-user-check";
import { auth } from "@/auth";

// export metadata with whatsapp card 

export async function generateMetadata() {

  return {
    title: "Home Page | Teach others online",
    description: ""
  }
}
export default async function Home() {
  const session = await auth()
  return (
    <div className="flex  flex-col">

      {session ? session.user.role !== "admin" ? initialUserCheck() : "admin" : initialUserCheck()}


    </div>
  );
}
