import { auth } from "@/auth";
import prisma from "./prisma";
export async function checkDemoClass() {

    const session = await auth()
    if (!session) {
        return null
    }
    let student = null;
    let demoClass = null
    try {
        student = await prisma.Student.findUnique({
            where: {
                userId: session.user.id
            }
        })
        if (!student) {
            return null
        }
        demoClass = await prisma.OneToOneClass.findFirst({
            where: {
                studentId: student.id,
                type: "demo",
                completed: false
            },
            include: {
                student: true

            }
        })
        if (demoClass) {
            return demoClass
        }
    }
    catch {
        return null
    } finally {
        await prisma.$disconnect()
    }
    return null
}