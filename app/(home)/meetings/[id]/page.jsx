import { auth } from "@/auth"
import MeetingPage from "./MeetingPage"
import { redirect } from "next/navigation"
import { getClassByMeetingId } from "./getClassUsingMeetingId"



export async function generateMetadata({ params }, parent) {
  // read route params
  const id = params.id


  return {
    title: `Meeting : ${id}`,

  }
}

async function page({ params }) {
  const session = await auth()
  if (!session) { return redirect("/") }
  const id = params.id
  const currentClass = await getClassByMeetingId(id)

  return (
    <div>
      <MeetingPage id={id} currentClass={currentClass} />
    </div>
  )
}
export default page
