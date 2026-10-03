import { auth } from "@/auth"
import MeetingPage from "./MeetingPage"
import { redirect } from "next/navigation"
import { getClassByMeetingId } from "./getClassUsingMeetingId"







export async function generateMetadata({ params }, parent) {
  // read route params
  const { id } = await params;


  return {
    title: `Meeting : ${id}`,

  }
}

async function page({ params }) {
  const session = await auth()
  if (!session) { return redirect("/") }
  const { id } = await params;
  const currentClass = await getClassByMeetingId(id)

  return (
    <div>
      <MeetingPage id={id} currentClass={currentClass} />
    </div>
  )
}
export default page
