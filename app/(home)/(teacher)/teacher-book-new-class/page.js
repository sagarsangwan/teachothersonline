
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import AllUnbookedClasses from "@/components/teacher/all-unbooked-classes"
import { redirect } from "next/navigation"
import { getAllUnbookedClasses } from "@/lib/teacher/teacher-info"




async function page() {
    const unbooked_classes = await getAllUnbookedClasses()
    if (!unbooked_classes) {
        return <div>..........loading</div>
    }
    return (
        <div>
            {unbooked_classes.length > 0 ? (
                <AllUnbookedClasses unbooked_classes={unbooked_classes} />
            ) : (<div>No classes available</div>)
            }
        </div>
    )
}

export default page
