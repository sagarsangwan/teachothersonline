import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
export async function POST(req, res) {
    const session = await auth()
    if (!session) {
        return NextResponse.unauthorized("Unauthorized")
    }
    const existingTeacher = await prisma.Teacher.findUnique({
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

    const teacher = await prisma.Teacher.create({
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

// export async function GET(req, res) {
//     const session = await auth()
//     if (session.user.role !== "admin") {
//         return NextResponse.unauthorized("Unauthorized")
//     }
//     const teachers = await prisma.Teacher.findMany()
//     return NextResponse.json(teachers)

//     // res.json(teacher)
// }
