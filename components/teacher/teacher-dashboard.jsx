import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { Button } from "../ui/button"
import unbookedClassesCard from "./unbooked-classes-card"
async function teacherDashboard(teacher) {
    const teacher_subjects = teacher.subjects
    let unbooked_classes = []

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
    return (
        <div>

            {unbooked_classes.length > 0 &&
                <div>
                    <div>
                        <h1 className="text-xl font-bold">Unbooked classes</h1>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {unbookedClassesCard(unbooked_classes, teacher)}

                    </div>
                    <div className=" justify-end">
                        <Button>View More</Button>
                    </div>
                </div>}
        </div>
    )
}

export default teacherDashboard
