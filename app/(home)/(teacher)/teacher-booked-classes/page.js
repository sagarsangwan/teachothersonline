import { auth } from "@/auth"
import prisma from "@/lib/prisma"
async function page() {
    const session = await auth()
    let teacher
    try {
        teacher = await prisma.Teacher.findUnique({
            where: {
                userId: session.user.id
            }
        })
    } catch {
        return null
    } finally {
        await prisma.$disconnect()
    }
    return (
        <p>
            no classes
        </p>
    )
}

export default page
