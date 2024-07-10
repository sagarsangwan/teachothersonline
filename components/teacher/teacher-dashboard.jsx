
import AllBookedClasses from "./all-booked-classes"
import AllUnbookedClasses from "./all-unbooked-classes"
import { getAllBookedClasses, getAllCompletedClasses, getAllUnbookedClasses, getAllUnCompletedExpiredClasses } from "@/lib/teacher/teacher-info"
async function TeacherDashboard({ teacher }) {
    const bookedClasses = await getAllBookedClasses()
    const unbookedClasses = await getAllUnbookedClasses()
    const completedClasses = await getAllCompletedClasses()
    const expired_not_completed_classes = await getAllUnCompletedExpiredClasses()
    return (
        <div>
            <AllBookedClasses booked_classes={bookedClasses} completed_classes={completedClasses} expired_not_completed_classes={expired_not_completed_classes} />

            <AllUnbookedClasses unbooked_classes={unbookedClasses} />
        </div>)
}

export default TeacherDashboard
