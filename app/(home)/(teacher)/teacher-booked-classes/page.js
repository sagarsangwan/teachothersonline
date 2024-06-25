
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import AllBookedClasses from "@/components/teacher/all-booked-classes"
import moment from "moment"
import { redirect } from 'next/navigation'


async function fetchUnbookedClasses() {
    let booked_classes = [];
    let expired_classes = [];
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
    try {

        booked_classes = await prisma.OneToOneClass.findMany({
            where: {
                teacherId: teacher.id,
                endTime: {
                    gte: new Date()
                }
            },
            include: { student: true }
        })
        expired_classes = await prisma.OneToOneClass.findMany({
            where: {
                teacherId: teacher.id,
                classlink: null,
                endTime: {
                    lte: new Date()
                }
            },
            include: { student: true }
        })

    } catch (error) {
        console.log(error)
        return null
    } finally {
        await prisma.$disconnect();
    }
    return [booked_classes, expired_classes]
}



async function page() {
    const [booked_classes, expired_classes] = await fetchUnbookedClasses()
    console.log(booked_classes, "booked_classes=====================")
    console.log(expired_classes, "expired_classes=====================")

    // if (!booked_classes && !expired_classes) {
    //     return <div>..........loading</div>
    // }
    return (
        <div>
            <AllBookedClasses booked_classes={booked_classes} expired_classes={expired_classes} />

        </div>
    )
}

export default page
