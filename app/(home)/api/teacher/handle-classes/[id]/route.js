import { NextResponse } from "next/server"
export async function POST(req, { params }) {
    const classId = params.id

    console.log(classId, "gggggggggggggggggggggggggggggggggggggggggggggggggg")
    return NextResponse.json({ message: "Class submitted successfully", data: applicantId, status: 200 })
}


export async function PUT(req, { params }) {
    const classId = params.id

    console.log(classId, "gvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    return NextResponse.json({ message: "Class submitted successfully", data: classId, status: 200 })
}

