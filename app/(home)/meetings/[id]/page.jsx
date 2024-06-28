import { auth } from "@/auth"
import MeetingPage from "./MeetingPage"
import { redirect } from "next/navigation"



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

  return (
    <div>
      <MeetingPage id={id} />
    </div>
  )
}
export default page
