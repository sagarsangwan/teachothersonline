import { NextResponse } from "next/server"
import { auth } from "@/auth"
export async function POST(req, res) {
    const session = await auth()
    if (!session) {
        return NextResponse.unauthorized("Unauthorized")
    }

    const body = await req.json()

    const { name } = body
    // console.log(name , "inside api")
    return NextResponse.json(name)
    // const teacher = await prisma.teacher.create({
    //     data: {
    //         name,
    //         email,
    //         subjects: {
    //             set: subjects
    //         },
    //         contact,
    //         experience
    //     }
    // })

    // res.json(teacher)
}

