
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import AllUnbookedClasses from "@/components/teacher/all-unbooked-classes"
import { redirect } from "next/navigation"
async function fetchUnbookedClasses() {
    let unbooked_classes = []
    const session = await auth()
    if (!session) {
        return redirect('/api/auth/signin')
    }
    const teacher = await prisma.Teacher.findUnique({
        where: {
            userId: session.user.id
        }
    })
    if (!teacher) {
        return redirect('/')
    }
    const teacher_subjects = teacher.subjects[0].split(',');
    console.log(teacher_subjects, "teacher_subjects")
    try {

        unbooked_classes = await prisma.OneToOneClass.findMany({
            where: {
                Booked: false,
                subject: {
                    in: teacher_subjects
                }
            },
            include: { student: true }
        })

    } catch {
        return null
    } finally {
        await prisma.$disconnect();
    }
    console.log("unbooked_classes=======;;;;;;;;;;;;;;;;;;;", unbooked_classes)
    return (unbooked_classes)
}



async function page() {
    const unbooked_classes = await fetchUnbookedClasses()
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
