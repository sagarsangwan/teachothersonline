"use server"
import prisma from "@/lib/prisma";
async function getCurrentClass(id) {
    let class_
    try {
        class_ = await prisma.OneToOneClass.findUnique({
            where: {
                id: id
            },
            include: {
                student: true,
                teacher: true
            }
        })
    } catch (error) {
        console.log("erorrrrrrrrrrrrrrr, ", error)
    } finally {
        await prisma.$disconnect();
    }
    console.log(class_)
    return class_
}

export default getCurrentClass
