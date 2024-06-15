import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
export async function POST(req, res) {
    const session = await auth()
    if (!session) {
        return NextResponse.unauthorized("Unauthorized")
    }
    const existingClass = await prisma.Student.findUnique({
        where: { userId: session.user.id }
    })
    if (existingClass) {
        return NextResponse.json({ message: "You have already submitted a class", status: 400 }, {})
    }
    const body = await req.json()
    const { time_of_class, contact, subjects } = body
    console.log(time_of_class, contact, subjects)
    return NextResponse.json({ message: "Class submitted successfully", data: body, status: 200 })
}