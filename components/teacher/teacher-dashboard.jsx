
import { auth } from "@/auth"
import AllBookedClasses from "./all-booked-classes"
import AllUnbookedClasses from "./all-unbooked-classes"
import { getAllBookedClasses, getAllCompletedClasses, getAllUnbookedClasses, getAllUnCompletedExpiredClasses } from "@/lib/teacher/teacher-info"
export default async function TeacherDashboard() {
    let teacher = null
    // try {
    //     teacher = await prisma.Teacher.findUnique({
    //         where: {
    //             userId: session.user.id
    //         }
    //     })
    // } catch {
    //     return null
    // } finally {
    //     await prisma.$disconnect()
    // }
    const bookedClasses = await getAllBookedClasses()
    const unbookedClasses = await getAllUnbookedClasses()
    const completedClasses = await getAllCompletedClasses()
    const expired_not_completed_classes = await getAllUnCompletedExpiredClasses()
    const session = await auth()
    return (
        <div>
            <div className="text-2xl font-medium mb-7">

                {session ? <span>Hi, {session.user.name}</span> : <span>Hi, Teacher</span>}
            </div >
            <div>
                <AllBookedClasses booked_classes={bookedClasses} completed_classes={completedClasses} expired_not_completed_classes={expired_not_completed_classes} />

                <AllUnbookedClasses unbooked_classes={unbookedClasses} />
            </div>
        </div>)
}


