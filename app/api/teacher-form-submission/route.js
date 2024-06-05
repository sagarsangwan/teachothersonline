import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { date } from "zod"
export async function POST(req, res) {
    const session = await auth()
    if (!session) {
        return NextResponse.unauthorized("Unauthorized")
    }
    const existingTeacher = await prisma.TeacherApplication.findUnique({
        where: {
            userId: session.user.id
        }
    })
    if (existingTeacher) {
        return NextResponse.json({ message: "You have already submitted a teacher application", }, { status: 400 })
    }
    const { name, email } = await session.user
    const body = await req.json()

    const { experience, contact, subjects, education } = body

    const teacher = await prisma.TeacherApplication.create({
        data: {
            name: name,
            resume: "",
            experience: experience,
            contact: contact,
            subjects: subjects,
            education: education,
            userId: session.user.id,
            verified: false
        }
    })
    return NextResponse.json(teacher)

    // res.json(teacher)
}

