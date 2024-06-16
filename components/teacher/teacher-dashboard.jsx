import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import unbookedClassesCard from "./unbooked-classes-card"
async function teacherDashboard() {
    const session = auth()
    let unbooked_classes = []
    try {
        unbooked_classes = await prisma.OneToOneClass.findMany({
            where: {
                Booked: false
            },
            include: { student: true }
        })
    } catch {
        return null
    } finally {
        await prisma.$disconnect();
    }
    console.log(unbooked_classes)
    return (
        <div>
            {unbookedClassesCard(unbooked_classes)}
        </div>
    )
}

export default teacherDashboard
