import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
export async function PUT(req, { params }) {
    const { id } = await params
    const classId = id
    const session = await auth()
    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }
    const current_teacher = await prisma.teacher.findUnique({
        where: {
            userId: session.user.id
        }
    })
    if (!current_teacher) {
        return NextResponse.json({ message: "Teacher not found", status: 404 })
    }
    const oneToOneClass = await prisma.oneToOneClass.findUnique({
        where: {
            id: classId
        }
    })
    if (!oneToOneClass) {
        return NextResponse.json({ message: "Class not found", data: classId, status: 404 })
    }
    if (oneToOneClass.teacherId !== current_teacher.id) {
        return NextResponse.json({ message: "You are not authorized to end this class", status: 403 })
    }


    const body = await req.json();
    const { completed, endTime } = body
    console.log(completed, endTime)
    try {
        const oneToOneClass = await prisma.oneToOneClass.update({
            where: {
                id: classId
            },
            data: {
                completed, endTime
            }
        })
        // const oneToOneClass = "Class Booked Successfully"


        return NextResponse.json({ message: "Class completed successfully", data: oneToOneClass, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Class not completed", data: classId, status: 400 })
    }
    finally {
        await prisma.$disconnect()
    }





}


