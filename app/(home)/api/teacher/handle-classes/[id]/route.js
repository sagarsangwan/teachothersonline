import { NextResponse } from "next/server"
import { auth } from "@/auth"
export async function POST(req, { params }) {
    const classId = params.id

    console.log(classId, "gggggggggggggggggggggggggggggggggggggggggggggggggg")
    return NextResponse.json({ message: "Class submitted successfully", data: applicantId, status: 200 })
}


export async function PUT(req, { params }) {
    const classId = params.id
    const session = await auth()
    if (!session) {
        return NextResponse.unauthorized("Unauthorized")
    }
    const oneToOneClass = await prisma.oneToOneClass.findUnique({
        where: {
            id: classId
        }
    })
    if (!oneToOneClass) {
        return NextResponse.json({ message: "Class not found", data: classId, status: 404 })
    }


    const body = await req.json();
    const { Booked } = body
    try {
        const oneToOneClass = await prisma.oneToOneClass.update({
            where: {
                id: classId
            },
            data: {
                Booked
            }
        })
        // const oneToOneClass = "Class Booked Successfully"


        return NextResponse.json({ message: "Class submitted successfully", data: oneToOneClass, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Class not submitted", data: classId, status: 400 })
    }
    finally {
        await prisma.$disconnect()
    }





}


